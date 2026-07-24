import { color } from '@theme'
import { deviceHeight, deviceWidth } from '@utility/common'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0616',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Overlay Layer
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    zIndex: 10,
  },

  // Glassmorphic Header / Panels
  glassPanel: {
    backgroundColor: 'rgba(22, 15, 34, 0.7)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  locationText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },

  // Stream Configuration Panel
  streamPanel: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  streamPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  streamPanelTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  streamToggles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streamToggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  streamToggleButtonActive: {
    backgroundColor: 'rgba(154, 117, 240, 0.2)',
    borderColor: 'rgba(154, 117, 240, 0.5)',
  },
  streamToggleText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontWeight: '600',
  },
  streamToggleTextActive: {
    color: '#9A75F0',
    fontWeight: '700',
  },

  // Developer Logging Console
  logTerminal: {
    marginHorizontal: 16,
    maxHeight: 140,
    marginTop: 10,
    flex: 1,
  },
  logTerminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 6,
    marginBottom: 6,
  },
  logTerminalTitle: {
    color: '#4ADE80',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logScroll: {
    flex: 1,
  },
  logText: {
    fontFamily: 'Courier',
    color: 'rgba(74, 222, 128, 0.85)',
    fontSize: 10,
    lineHeight: 13,
    marginBottom: 4,
  },

  // Recording Status / Pulser
  recordingIndicatorContainer: {
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  recordingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Bottom Control Section
  bottomContainer: {
    backgroundColor: 'rgba(11, 6, 22, 0.5)',
    paddingBottom: 30,
    paddingTop: 15,
  },

  // Camera Mode Tab Bar (Photo vs Video)
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  modeButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  modeTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },

  // Camera Capture Row
  captureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  // Glassmorphic side control
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Capture / Shutter buttons
  shutterOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterOuterRecording: {
    borderColor: '#EF4444',
  },
  shutterInnerPhoto: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ffffff',
  },
  shutterInnerVideo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EF4444',
  },
  shutterInnerRecording: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  shutterOuterActiveRecording: {
    borderColor: '#ffffff',
  },
  viewfinderContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    left: '33.3%',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    top: '33.3%',
  },
  zoomPillWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  zoomPillContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 3,
    alignItems: 'center',
  },
  zoomCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  zoomCircleActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  zoomText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  zoomTextActive: {
    color: '#EAB308',
    fontSize: 12,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    width: '100%',
  },
  modeButtonNew: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 6,
  },
  modeTextNew: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  modeTextNewActive: {
    color: '#EAB308',
  },
  galleryButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1C1917',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  galleryPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1917',
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
