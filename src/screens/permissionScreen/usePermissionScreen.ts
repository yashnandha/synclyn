import { View, Text } from 'react-native'
import {
    useCameraPermission,
    useMicrophonePermission,
} from 'react-native-vision-camera'

const usePermissionScreen = () => {

    const cameraPermission = useCameraPermission()
    const microphonePermission = useMicrophonePermission()

    return {}
}

export default usePermissionScreen