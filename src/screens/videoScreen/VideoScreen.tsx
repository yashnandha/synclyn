import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@navigation/rootStackParams'

type VideoScreenRouteProp = RouteProp<RootStackParams, 'Video'>

export default function VideoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const route = useRoute<VideoScreenRouteProp>()
  const { videoURL } = route.params

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Video Preview</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Info Card */}
      <View style={styles.content}>
        <View style={styles.videoSuccessIcon}>
          <Text style={styles.videoSuccessEmoji}>🎥</Text>
        </View>

        <Text style={styles.successText}>Video Successfully Recorded!</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Video Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Storage Path:</Text>
            <Text style={styles.value} numberOfLines={3} ellipsizeMode="head">
              {videoURL}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionButtonText}>Back to Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0616',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#281D3B',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#221936',
    borderWidth: 1,
    borderColor: '#3D2B5E',
  },
  backButtonText: {
    color: '#FF9F9F',
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  videoSuccessIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#311C2B',
    borderWidth: 2,
    borderColor: '#FF9F9F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoSuccessEmoji: {
    fontSize: 40,
  },
  successText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#160F22',
    borderWidth: 1,
    borderColor: '#281D3B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  actionButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: '#241A35',
    borderWidth: 1,
    borderColor: '#3D2B5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FF9F9F',
    fontSize: 15,
    fontWeight: '700',
  },
})
