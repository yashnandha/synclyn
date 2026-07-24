import React, { useState, useEffect, useRef } from 'react'
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
import { deviceWidth } from '@utility/common'

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
  const MODES = ['CINEMATIC', 'VIDEO', 'PHOTO', 'PORTRAIT', 'PANO'] as const
  const [activeMode, setActiveMode] = useState<typeof MODES[number]>('PHOTO')
  const modeScrollRef = useRef<ScrollView>(null)

  const ITEM_WIDTH = 90
  const spacerWidth = (deviceWidth - ITEM_WIDTH) / 2

  const scrollToMode = (index: number, animated = true) => {
    modeScrollRef.current?.scrollTo({
      x: index * ITEM_WIDTH,
      animated,
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const idx = MODES.indexOf(activeMode)
      if (idx !== -1) {
        scrollToMode(idx, false)
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / ITEM_WIDTH)
    if (index >= 0 && index < MODES.length) {
      const mode = MODES[index]
      if (mode !== activeMode) {
        setActiveMode(mode)
        if (mode === 'VIDEO' || mode === 'CINEMATIC') {
          setCaptureMode('video')
        } else {
          setCaptureMode('photo')
        }
      }
    }
  }

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
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M2 2l20 20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              ) : flash === 'on' ? (
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              ) : (
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M16 16.5l2.5-6 2.5 6" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M17.2 13.5h3.6" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              )}
            </TouchableOpacity>

            {/* Grid Toggle Button */}
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => setShowGrid(!showGrid)}
            >
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Rect x="3" y="3" width="18" height="18" rx="2" stroke={showGrid ? '#EAB308' : '#ffffff'} strokeWidth="2" />
                <Path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke={showGrid ? '#EAB308' : '#ffffff'} strokeWidth="1.5" />
              </Svg>
            </TouchableOpacity>

            {/* Telemetry Console Toggle Button */}
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => setShowConsole(!showConsole)}
            >
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Rect x="3" y="3" width="18" height="18" rx="3" stroke={showConsole ? '#4ADE80' : '#ffffff'} strokeWidth="2" />
                <Path d="M7 8l4 4-4 4M13 15h4" stroke={showConsole ? '#4ADE80' : '#ffffff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>

            {/* Live Photo / Concentric Dotted Circles Icon */}
            <TouchableOpacity style={styles.headerIconButton}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
                <Circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.5" />
                <Circle cx="12" cy="12" r="3" fill="#ffffff" />
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
          {/* Zoom Bar placed above Mode Selector */}
          <View style={styles.zoomContainer}>
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
                      {opt}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          {/* Scrollable Mode Selector horizontal bar */}
          <View style={styles.modeSelectorContainer}>
            <ScrollView
              ref={modeScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              contentContainerStyle={styles.modeScrollContent}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              snapToAlignment="center"
            >
              <View style={{ width: spacerWidth }} />
              {MODES.map((mode, index) => {
                const isActive = mode === activeMode
                const onPressMode = () => {
                  setActiveMode(mode)
                  scrollToMode(index, true)
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
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.modeTextNew, isActive && styles.modeTextNewActive]}>
                      {mode}
                    </Text>
                    {isActive && <View style={styles.modeActiveDot} />}
                  </TouchableOpacity>
                )
              })}
              <View style={{ width: spacerWidth }} />
            </ScrollView>
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
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M4 12a8 8 0 0113.6-5.6L20 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M20 5v4h-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M20 12a8 8 0 01-13.6 5.6L4 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M4 19v-4h4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  )
}