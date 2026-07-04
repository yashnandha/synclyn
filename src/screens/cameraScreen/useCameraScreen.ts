import { useEffect, useState } from 'react'
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

const useCameraScreen = () => {
  const devices = useCameraDevices()
  const defaultDevice = devices[0]

  const photoOutput = usePhotoOutput({})
  const videoOutput = useVideoOutput({
    enableAudio: true,
  })

  const [device, setDevice] = useState(defaultDevice)

  useEffect(() => {
    setDevice(defaultDevice)
  }, [defaultDevice])

  const location = useLocation({
    accuracy: 'high',
    distanceFilter: 10,
  })




  return {
    devices
  }
}

export default useCameraScreen