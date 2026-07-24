import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@navigation/rootStackParams'
import { color } from '@theme'
import SvgIndex from '@svgIndex'

type PhotoScreenRouteProp = RouteProp<RootStackParams, 'Photo'>

export default function PhotoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const route = useRoute<PhotoScreenRouteProp>()
  const { photo } = route.params

  const location = photo.metadata?.['{GPS}'] || photo.location

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
        <Text style={styles.title}>Photo Preview</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        {photo?.path ? (
          <Image
            source={{ uri: `file://${photo.path}` }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.errorText}>No photo path available</Text>
        )}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Photo Details</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Resolution:</Text>
          <Text style={styles.value}>{photo.width} x {photo.height}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Format:</Text>
          <Text style={styles.value}>{photo.containerFormat || 'jpeg'}</Text>
        </View>

        {location ? (
          <View style={styles.locationContainer}>
            <View style={styles.locationHeader}>
              <SvgIndex.LocationIcon color={color.permissionLocationIcon} width={16} height={16} />
              <Text style={styles.locationTitle}>Geotag Location</Text>
            </View>
            <Text style={styles.locationValue}>
              Lat: {location.latitude?.toFixed(6) || location.Latitude?.toFixed(6) || 'N/A'}
            </Text>
            <Text style={styles.locationValue}>
              Lon: {location.longitude?.toFixed(6) || location.Longitude?.toFixed(6) || 'N/A'}
            </Text>
          </View>
        ) : (
          <Text style={styles.noLocationText}>No Location Geotag Available</Text>
        )}
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#FF9F9F',
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#160F22',
    borderWidth: 1,
    borderColor: '#281D3B',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 13,
  },
  value: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  locationContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#281D3B',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationTitle: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
  locationValue: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  noLocationText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
})
