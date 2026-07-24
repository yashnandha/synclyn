import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import {
  type Recorder,
  useCameraDeviceExtensions,
  useCameraDevices,
  useDepthOutput,
  useFrameOutput,
  usePhotoOutput,
  useVideoOutput,
} from 'react-native-vision-camera'
import { useLocation } from 'react-native-vision-camera-location'
import { useResizer } from 'react-native-vision-camera-resizer'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@navigation/rootStackParams'
import { runOnJS } from 'react-native-reanimated'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

export default function useCameraScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const [enablePhoto, setEnablePhoto] = useState(true)
  const [enableVideo, setEnableVideo] = useState(false)
  const [enableFrameStream, setEnableFrameStream] = useState(false)
  const [enableDepthStream, setEnableDepthStream] = useState(false)

  // Extra camera states
  const [lastMediaUri, setLastMediaUri] = useState<string | undefined>(undefined)
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off')
  const [showGrid, setShowGrid] = useState(true)
  const [selectedZoomOption, setSelectedZoomOption] = useState<'0.5' | '1x' | '2' | '3'>('1x')
  const [zoom, setZoom] = useState(1)

  // System logs to show on screen overlay
  const [logs, setLogs] = useState<string[]>([])
  
  const addLog = useCallback((msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 9)])
  }, [])

  const devices = useCameraDevices()
  const defaultDevice = devices[0]
  const [device, setDevice] = useState(defaultDevice)

  useEffect(() => {
    if (defaultDevice != null && device == null) {
      setDevice(defaultDevice)
    }
  }, [defaultDevice, device])

  useEffect(() => {
    const fetchLastMedia = async () => {
      try {
        const photos = await CameraRoll.getPhotos({
          first: 1,
          assetType: 'All',
        })
        if (photos.edges.length > 0) {
          setLastMediaUri(photos.edges[0].node.image.uri)
        }
      } catch (e) {
        console.log('Error fetching last media:', e)
      }
    }
    fetchLastMedia()
  }, [])

  const location = useLocation({
    accuracy: 'balanced',
    distanceFilter: 10,
  })

  // Location Permissions Request
  useEffect(() => {
    if (!location.hasPermission) {
      ;(async () => {
        console.log(`requesting location permission...`)
        const has = await location.requestPermission()
        console.log(`location permssion: ${has}`)
      })()
    }
  }, [location.hasPermission, location.requestPermission])

  useEffect(() => {
    const l = location.currentLocation
    if (l == null) return
    console.log(`Location: ${l.latitude} ${l.longitude}`)
  }, [location.currentLocation])

  const photoOutput = usePhotoOutput({})
  const videoOutput = useVideoOutput({
    enableAudio: true,
  })

  // Resizer preparation
  const { resizer, error } = useResizer({
    width: 192,
    height: 192,
    channelOrder: 'rgb',
    dataType: 'float32',
    scaleMode: 'cover',
    pixelLayout: 'interleaved',
  })

  useEffect(() => {
    if (error != null) console.error('Failed to prepare Resizer!', error)
  }, [error])

  // Frame processor 1 (with resizing and logs)
  const frameOutput1 = useFrameOutput({
    pixelFormat: 'yuv',
    onFrame(frame) {
      'worklet'
      if (resizer != null) {
        const start = Date.now()
        const resized = resizer.resize(frame)
        const end = Date.now()
        const time = `${(end - start).toFixed(2)}ms`
        const logMsg = `[Frame 1] Resized ${frame.width}x${frame.height} -> ${resized.width}x${resized.height} rgb-float32 in ${time}`
        
        console.log(logMsg)
        
        // Read buffer pixels
        try {
          const buffer = resized.getPixelBuffer()
          const view = new Float32Array(buffer)
          let pixelsInfo = ''
          for (let i = 0; i < 3 * 3; i += 3) {
            pixelsInfo += `[${view[i].toFixed(1)},${view[i + 1].toFixed(1)},${view[i + 2].toFixed(1)}] `
          }
          runOnJS(addLog)(`${logMsg}\nPixels: ${pixelsInfo}`)
        } catch (e) {
          runOnJS(addLog)(`${logMsg}\nFailed to get pixel buffer`)
        }

        resized.dispose()
      } else {
        runOnJS(addLog)(`Resizer isn't ready yet...`)
      }
      frame.dispose()
    },
  })

  // Frame processor 2 (native format)
  const frameOutput2 = useFrameOutput({
    pixelFormat: 'native',
    onFrame(frame) {
      'worklet'
      const logMsg = `[Frame 2] ${frame.width}x${frame.height} in ${frame.pixelFormat}`
      console.log(logMsg)
      try {
        const data = frame.getPixelBuffer()
        runOnJS(addLog)(`${logMsg}\nBuffer Bytes: ${data.byteLength}`)
      } catch (e) {
        runOnJS(addLog)(`${logMsg}\nNo Pixel Buffer`)
      }
      frame.dispose()
    },
  })

  // Depth Frame processor
  const depthOutput = useDepthOutput({
    onDepth(depth) {
      'worklet'
      const calibrationData = depth.cameraCalibrationData
      let logMsg = `[Depth] ${depth.width}x${depth.height}`
      if (calibrationData != null) {
        logMsg += `\nLens Center: [${calibrationData.lensDistortionCenter.x}, ${calibrationData.lensDistortionCenter.y}]`
      } else {
        logMsg += `\nNo Calibration Data`
      }
      console.log(logMsg)
      runOnJS(addLog)(logMsg)
      depth.dispose()
    },
  })

  const extensions = useCameraDeviceExtensions(device)
  useEffect(() => {
    if (extensions == null) return
    console.log(
      'Available Camera Extensions:',
      extensions.map((e) => e.type),
    )
  }, [extensions])

  // Zoom selection mapping
  const handleZoomSelect = useCallback((option: '0.5' | '1x' | '2' | '3') => {
    if (!device) return
    setSelectedZoomOption(option)
    
    let targetZoom = 1
    const minZ = device.minZoom ?? 1
    const maxZ = device.maxZoom ?? 10
    
    if (option === '0.5') {
      targetZoom = minZ
    } else if (option === '1x') {
      targetZoom = Math.max(minZ, 1)
    } else if (option === '2') {
      targetZoom = Math.min(maxZ, Math.max(minZ, 2))
    } else if (option === '3') {
      targetZoom = Math.min(maxZ, Math.max(minZ, 3))
    }
    
    setZoom(targetZoom)
  }, [device])

  // Capture photo
  const takePhoto = useCallback(async () => {
    try {
      console.log(`Capturing Photo...`)
      const start = Date.now()
      const photo = await photoOutput.capturePhoto(
        {
          location: location.currentLocation,
          flashMode: flash,
        },
        {},
      )
      const end = Date.now()
      const duration = (end - start).toFixed(2)
      console.log(
        `Captured ${photo.width}x${photo.height} ${photo.containerFormat} Photo in ${duration}ms!`,
      )
      
      let tempPath = ''
      try {
        tempPath = await photo.saveToTemporaryFileAsync()
        const savedUri = await CameraRoll.saveAsset(tempPath, { type: 'photo' })
        setLastMediaUri(savedUri.node.image.uri)
        console.log(`Saved photo to gallery: ${savedUri.node.image.uri}`)
      } catch (saveError) {
        console.error(`Failed to save photo to gallery:`, saveError)
      }

      // Keep photo details for navigating, but dispose the native reference
      const serializedPhoto = {
        path: tempPath,
        width: photo.width,
        height: photo.height,
        containerFormat: photo.containerFormat,
        location: location.currentLocation,
      }
      photo.dispose()

      navigation.navigate('Photo', { photo: serializedPhoto as any })
    } catch (e) {
      console.error(`Failed to take Photo!`, e)
    }
  }, [navigation, photoOutput, location.currentLocation, flash])

  const preparedRecorder = useRef<Recorder>(undefined)
  const activeRecorder = useRef<Recorder>(undefined)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const recordingTimer = useRef<any | null>(null)

  // Start recording
  const startRecording = useCallback(async () => {
    console.log(`Starting Recording...`)
    let recorder = preparedRecorder.current
    if (recorder == null) {
      console.log(`No prepared Recorder available, creating one...`)
      recorder = await videoOutput.createRecorder({})
    }
    if (activeRecorder.current != null) {
      console.error(`Cannot start recording - already actively recording!`)
      return
    }
    activeRecorder.current = recorder

    setRecordingDuration(0)
    setIsRecording(true)
    recordingTimer.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1)
    }, 1000)

    await recorder.startRecording(
      async (path) => {
        console.log(`Recording finished! Path:`, path)
        if (recordingTimer.current) clearInterval(recordingTimer.current)
        setIsRecording(false)
        activeRecorder.current = undefined

        try {
          const savedUri = await CameraRoll.saveAsset(path, { type: 'video' })
          setLastMediaUri(savedUri.node.image.uri)
          console.log(`Saved video to gallery: ${savedUri.node.image.uri}`)
        } catch (saveError) {
          console.error(`Failed to save video to gallery:`, saveError)
        }

        navigation.navigate('Video', { videoURL: path })
      },
      (error) => {
        console.error(`Failed to record!`, error)
        if (recordingTimer.current) clearInterval(recordingTimer.current)
        setIsRecording(false)
        activeRecorder.current = undefined
      },
      () => console.log(`Recording paused`),
      () => console.log(`Recording resumed.`),
    )
    console.log(`Recording started!`)
    preparedRecorder.current = await videoOutput.createRecorder({})
  }, [navigation, videoOutput])

  // Stop recording
  const stopRecording = useCallback(async () => {
    console.log(`Stopping Recording...`)
    const recorder = activeRecorder.current
    if (recorder == null) {
      console.error(`Not actively recording - cannot stop recording!`)
      return
    }
    activeRecorder.current = undefined
    if (recordingTimer.current) clearInterval(recordingTimer.current)
    setIsRecording(false)
    await recorder.stopRecording()
    console.log(`Recording stopped!`)
  }, [])

  // Cycle cameras (Front/Back)
  const toggleCameraType = useCallback(() => {
    if (!device) return
    const nextPosition = device.position === 'back' ? 'front' : 'back'
    const found = devices.find((d) => d.position === nextPosition)
    if (found) {
      setDevice(found)
    }
  }, [device, devices])

  // Compute active camera outputs array dynamically
  const outputs = useMemo(() => {
    const list: any[] = []
    if (enablePhoto) list.push(photoOutput)
    if (enableVideo) list.push(videoOutput)
    if (enableFrameStream) {
      list.push(frameOutput1)
      list.push(frameOutput2)
    }
    if (enableDepthStream) list.push(depthOutput)
    return list
  }, [enablePhoto, enableVideo, enableFrameStream, enableDepthStream, photoOutput, videoOutput, frameOutput1, frameOutput2, depthOutput])

  return {
    device,
    devices,
    setDevice,
    toggleCameraType,
    enablePhoto,
    setEnablePhoto,
    enableVideo,
    setEnableVideo,
    enableFrameStream,
    setEnableFrameStream,
    enableDepthStream,
    setEnableDepthStream,
    location,
    logs,
    clearLogs: () => setLogs([]),
    takePhoto,
    startRecording,
    stopRecording,
    isRecording,
    recordingDuration,
    outputs,
    lastMediaUri,
    flash,
    setFlash,
    showGrid,
    setShowGrid,
    selectedZoomOption,
    zoom,
    handleZoomSelect,
  }
}