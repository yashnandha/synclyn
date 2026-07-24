import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native'
import { Camera } from 'react-native-vision-camera'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@navigation/rootStackParams'
import { color } from '@theme'
import SvgIndex from '@svgIndex'
import { useIsActive } from '@hooks/useIsActive'
import { useSafeAreaPadding } from '@hooks/useSafeAreaPadding'
import Svg, { Circle, Path, G, Rect } from 'react-native-svg'

import useCameraScreen from './useCameraScreen'
import styles from './cameraScreen.style'

export default function CameraScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const isAppActive = useIsActive()
  const isScreenFocused = useIsFocused()
  const safePadding = useSafeAreaPadding()

  const {
    device,
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
    clearLogs,
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
  } = useCameraScreen()

  const [showConsole, setShowConsole] = useState(false)

  // Format recording timer: mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle capture trigger based on selected mode
  const handleCapturePress = () => {
    if (enablePhoto) {
      takePhoto()
    } else if (enableVideo) {
      if (isRecording) {
        stopRecording()
      } else {
        startRecording()
      }
    }
  }

  // Set Photo or Video mode
  const setCaptureMode = (mode: 'photo' | 'video') => {
    if (mode === 'photo') {
      setEnablePhoto(true)
      setEnableVideo(false)
      // Stop recording if running
      if (isRecording) {
        stopRecording()
      }
    } else {
      setEnablePhoto(false)
      setEnableVideo(true)
    }
  }

  if (device == null) {
    return (
      <View style={styles.textContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.text}>No Camera Device Found!</Text>
        <TouchableOpacity
          style={{ marginTop: 20, padding: 12, backgroundColor: '#241A35', borderRadius: 8 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#FF9F9F', fontWeight: '700' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Live Camera Viewfinder Container */}
      <View style={styles.viewfinderContainer}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={isAppActive && isScreenFocused}
          outputs={outputs}
          zoom={zoom}
          onError={(err) => console.error('Camera view error:', err)}
        />

        {/* 3x3 Grid Overlay */}
        {showGrid && (
          <View style={styles.gridOverlay} pointerEvents="none">
            <View style={styles.gridLineVertical} />
            <View style={[styles.gridLineVertical, { left: '66.6%' }]} />
            <View style={styles.gridLineHorizontal} />
            <View style={[styles.gridLineHorizontal, { top: '66.6%' }]} />
          </View>
        )}

        {/* Floating Zoom Pill Overlay */}
        <View style={styles.zoomPillWrapper}>
          <View style={styles.zoomPillContainer}>
            {(['0.5', '1x', '2', '3'] as const).map((opt) => {
              const isActive = selectedZoomOption === opt
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.zoomCircle,
                    isActive && styles.zoomCircleActive,
                  ]}
                  onPress={() => handleZoomSelect(opt)}
                >
                  <Text
                    style={[
                      styles.zoomText,
                      isActive && styles.zoomTextActive,
                    ]}
                  >
                    {opt === '0.5' ? '0,5' : opt}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>

      {/* Recording Duration Indicator */}
      {isRecording && (
        <View style={[styles.recordingIndicatorContainer, { top: (safePadding as any).paddingTop + 15 }]}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>{formatDuration(recordingDuration)}</Text>
        </View>
      )}

      {/* Translucent UI Controls Overlay */}
      <View style={[styles.overlayContainer, safePadding]}>
        
        {/* Top Header Section */}
        <View>
          <View style={styles.headerRow}>
            {/* Flash Toggle */}
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => {
                if (flash === 'off') setFlash('on')
                else if (flash === 'on') setFlash('auto')
                else setFlash('off')
              }}
            >
              {flash === 'off' ? (
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path d="M19 11l-6 6h4l-1 5 6-7h-5l1-4z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M2 2l20 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              ) : flash === 'on' ? (
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path d="M19 11l-6 6h4l-1 5 6-7h-5l1-4z" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              ) : (
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <Path d="M19 11l-6 6h4l-1 5 6-7h-5l1-4z" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Circle cx="8" cy="8" r="3" stroke="#EAB308" strokeWidth="1.5" />
                  <Path d="M7 11h2" stroke="#EAB308" strokeWidth="1.5" />
                </Svg>
              )}
            </TouchableOpacity>

            {/* Filter / Exposure Button */}
            <TouchableOpacity 
              style={styles.headerIconButton}
              onPress={() => setShowGrid(!showGrid)}
            >
              <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <Path d="M12 2a10 10 0 000 20V2z" fill="#ffffff" />
                <Circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="2" />
              </Svg>
            </TouchableOpacity>

            {/* Settings Chevron Dropdown */}
            <TouchableOpacity 
              style={styles.headerIconButton}
              onPress={() => setShowConsole(!showConsole)}
            >
              <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <Path d="M6 9l6 6 6-6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>

            {/* Live Photo / Concentric Dotted Circles Icon */}
            <TouchableOpacity style={styles.headerIconButton}>
              <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3,3" />
                <Circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" />
                <Circle cx="12" cy="12" r="2.5" fill="#ffffff" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Collapsible Developer Logging Console */}
          {showConsole && (
            <View style={[styles.glassPanel, styles.logTerminal]}>
              <View style={styles.logTerminalHeader}>
                <Text style={styles.logTerminalTitle}>TELEMETRY LOGS</Text>
                <TouchableOpacity onPress={clearLogs}>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 10 }}>CLEAR</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.logScroll}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
                ref={(ref) => ref?.scrollToEnd({ animated: true })}
              >
                {logs.length === 0 ? (
                  <Text style={[styles.logText, { color: 'rgba(255, 255, 255, 0.3)' }]}>
                    Console idle. Double-click chevron to stream logs...
                  </Text>
                ) : (
                  logs.map((log, index) => (
                    <Text key={index} style={styles.logText}>
                      &gt; {log}
                    </Text>
                  ))
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Bottom Control Section */}
        <View style={styles.bottomContainer}>
          {/* Mode Selector horizontal bar */}
          <View style={styles.modeSelectorContainer}>
            {['CINEMATIC', 'VIDEO', 'PHOTO', 'PORTRAIT', 'PANO'].map((mode) => {
              const isActive = (mode === 'PHOTO' && enablePhoto) || (mode === 'VIDEO' && enableVideo)
              const onPressMode = () => {
                if (mode === 'VIDEO' || mode === 'CINEMATIC') {
                  setCaptureMode('video')
                } else {
                  setCaptureMode('photo')
                }
              }
              return (
                <TouchableOpacity
                  key={mode}
                  style={styles.modeButtonNew}
                  onPress={onPressMode}
                >
                  <Text style={[styles.modeTextNew, isActive && styles.modeTextNewActive]}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Capture Trigger and Flip Controls */}
          <View style={styles.captureRow}>
            {/* Gallery Thumbnail */}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => {
                if (lastMediaUri) {
                  if (enableVideo) {
                    navigation.navigate('Video', { videoURL: lastMediaUri })
                  } else {
                    navigation.navigate('Photo', { photo: { path: lastMediaUri.replace('file://', '') } })
                  }
                }
              }}
            >
              {lastMediaUri ? (
                <Image source={{ uri: lastMediaUri }} style={styles.galleryImage} />
              ) : (
                <View style={styles.galleryPlaceholder} />
              )}
            </TouchableOpacity>

            {/* Shutter capture button */}
            <TouchableOpacity
              style={[
                styles.shutterOuter,
                enableVideo && styles.shutterOuterRecording,
                isRecording && styles.shutterOuterActiveRecording
              ]}
              activeOpacity={0.9}
              onPress={handleCapturePress}
            >
              {enablePhoto ? (
                <View style={styles.shutterInnerPhoto} />
              ) : (
                <View
                  style={[
                    styles.shutterInnerVideo,
                    isRecording && styles.shutterInnerRecording,
                  ]}
                />
              )}
            </TouchableOpacity>

            {/* Camera Switch/Flip Button */}
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <Svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="11" fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <Path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 01-2.8-.7l-1.01 1.01A7.88 7.88 0 0012 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.01-1.01A7.88 7.88 0 0012 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" fill="#ffffff" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  )
}