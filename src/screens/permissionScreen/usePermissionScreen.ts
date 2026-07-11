import { useEffect, useState, useCallback, useRef } from 'react'
import { PermissionsAndroid, Platform, AppState, AppStateStatus } from 'react-native'
import {
    useCameraPermission,
    useMicrophonePermission,
} from 'react-native-vision-camera'
import { useLocation } from 'react-native-vision-camera-location'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@navigation/rootStackParams'

export type PermissionState = {
    camera: boolean
    microphone: boolean
    location: boolean
    storage: boolean
}

const usePermissionScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    
    // Vision Camera Hooks
    const cameraHook = useCameraPermission()
    const micHook = useMicrophonePermission()
    
    // Vision Camera Location Hook
    const locationHook = useLocation({
        accuracy: 'balanced',
    })

    // Local states to ensure reactivity
    const [cameraGranted, setCameraGranted] = useState(cameraHook.hasPermission)
    const [micGranted, setMicGranted] = useState(micHook.hasPermission)
    const [locationGranted, setLocationGranted] = useState(locationHook.hasPermission)
    const [storageGranted, setStorageGranted] = useState(false)
    const [isChecking, setIsChecking] = useState(true)

    const appState = useRef(AppState.currentState)

    // Check Android storage permission
    const checkStoragePermission = useCallback(async (): Promise<boolean> => {
        if (Platform.OS !== 'android') {
            // iOS storage/photos permission - since we don't have react-native-permissions
            // we will default this to true or track it via custom state
            return true
        }

        try {
            if (Platform.Version >= 33) {
                const readImages = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                )
                const readVideos = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
                )
                return readImages && readVideos
            } else {
                const readStorage = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                )
                const writeStorage = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                )
                return readStorage && writeStorage
            }
        } catch (error) {
            console.error('Error checking storage permission:', error)
            return false
        }
    }, [])

    // Check all permissions
    const checkAllPermissions = useCallback(async () => {
        setIsChecking(true)
        
        // Refresh statuses
        const cam = cameraHook.hasPermission
        const mic = micHook.hasPermission
        const loc = locationHook.hasPermission
        const stor = await checkStoragePermission()

        setCameraGranted(cam)
        setMicGranted(mic)
        setLocationGranted(loc)
        setStorageGranted(stor)
        
        setIsChecking(false)
    }, [cameraHook.hasPermission, micHook.hasPermission, locationHook.hasPermission, checkStoragePermission])

    // Monitor AppState to check permissions when user returns from settings
    useEffect(() => {
        checkAllPermissions()

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkAllPermissions()
            }
            appState.current = nextAppState
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange)
        return () => {
            subscription.remove()
        }
    }, [checkAllPermissions])

    // Request handlers
    const requestCamera = async () => {
        try {
            const granted = await cameraHook.requestPermission()
            setCameraGranted(granted)
            return granted
        } catch (error) {
            console.error('Error requesting camera permission:', error)
            return false
        }
    }

    const requestMicrophone = async () => {
        try {
            const granted = await micHook.requestPermission()
            setMicGranted(granted)
            return granted
        } catch (error) {
            console.error('Error requesting microphone permission:', error)
            return false
        }
    }

    const requestLocation = async () => {
        try {
            const granted = await locationHook.requestPermission()
            setLocationGranted(granted)
            return granted
        } catch (error) {
            console.error('Error requesting location permission:', error)
            return false
        }
    }

    const requestStorage = async () => {
        if (Platform.OS !== 'android') {
            // Simulated toggle/grant for iOS Photo Library
            setStorageGranted(true)
            return true
        }

        try {
            if (Platform.Version >= 33) {
                const statuses = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ])
                const granted =
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
                setStorageGranted(granted)
                return granted
            } else {
                const statuses = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ])
                const granted =
                    statuses[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
                    statuses[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
                setStorageGranted(granted)
                return granted
            }
        } catch (error) {
            console.error('Error requesting storage permission:', error)
            return false
        }
    }

    const navigateToCamera = () => {
        navigation.navigate('CameraScreen')
    }

    const isRequiredGranted = cameraGranted && micGranted

    return {
        permissions: {
            camera: cameraGranted,
            microphone: micGranted,
            location: locationGranted,
            storage: storageGranted,
        } as PermissionState,
        isChecking,
        requestCamera,
        requestMicrophone,
        requestLocation,
        requestStorage,
        isRequiredGranted,
        navigateToCamera,
    }
}

export default usePermissionScreen