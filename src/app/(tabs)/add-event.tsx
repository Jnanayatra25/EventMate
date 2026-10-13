import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EventMateLogo } from '@/components/EventMateLogo';
import { useEvents } from '@/context/EventContext';

export default function AddEventScreen() {
  const router = useRouter();
  const { addEvent } = useEvents();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop'
  );
  const [location] = useState('Gelora Bung Karno, Senayan, Jakarta');

  const handlePickSampleImage = () => {
    // Quick demo selector between top high quality event banner images
    const samples = [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    ];
    const nextIdx = (samples.indexOf(selectedImage) + 1) % samples.length;
    setSelectedImage(samples[nextIdx]);
    Alert.alert('Gambar Dipilih', 'Gambar poster event berhasil diperbarui.');
  };

  const handleSaveEvent = () => {
    if (!title.trim()) {
      Alert.alert('Perhatian', 'Nama Event wajib diisi.');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Perhatian', 'Tanggal pelaksanaan (DD/MM/YYYY) wajib diisi.');
      return;
    }

    const createdEvent = addEvent({
      title: title.trim(),
      date: date.trim(),
      time: '19:00 WIB',
      location: location,
      category: 'Music',
      description: description.trim() || 'Deskripsi acara menarik di EventMate.',
      imageUri: selectedImage,
    });

    Alert.alert('Berhasil', 'Event baru berhasil ditambahkan!', [
      {
        text: 'Lihat Detail Event',
        onPress: () => {
          router.push({
            pathname: '/events/[id]' as any,
            params: {
              id: createdEvent.id,
              title: createdEvent.title,
              date: createdEvent.date,
              time: createdEvent.time || '19:00 WIB',
              location: createdEvent.location,
              category: createdEvent.category,
              description: createdEvent.description,
              imageUri: createdEvent.imageUri,
            },
          });
        },
      },
      {
        text: 'Ke Beranda',
        onPress: () => router.push('/(tabs)/home'),
      },
    ]);

    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Add Event</Text>
          <View style={styles.logoBadge}>
            <EventMateLogo size={62} showText={false} />
          </View>
        </View>

        {/* Input: Nama Event */}
        <View style={styles.pillInputWrapper}>
          <TextInput
            style={styles.pillInput}
            placeholder="Nama Event"
            placeholderTextColor="#486076"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Input: DD/MM/YYYY */}
        <View style={styles.pillInputWrapper}>
          <TextInput
            style={styles.pillInput}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#486076"
            value={date}
            onChangeText={setDate}
          />
        </View>

        {/* Row: Keterangan & Upload Image */}
        <View style={styles.rowWrapper}>
          {/* Keterangan */}
          <View style={styles.keteranganWrapper}>
            <TextInput
              style={styles.keteranganInput}
              placeholder="Keterangan"
              placeholderTextColor="#486076"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/* Upload Image Button */}
          <TouchableOpacity
            style={styles.uploadImageButton}
            onPress={handlePickSampleImage}
            activeOpacity={0.8}
          >
            <Ionicons name="image-outline" size={24} color="#2A4056" style={styles.uploadIcon} />
            <Text style={styles.uploadImageText}>Upload{'\n'}Image</Text>
          </TouchableOpacity>
        </View>

        {/* Map Preview Container */}
        <View style={styles.mapCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop',
            }}
            style={styles.mapImage}
            resizeMode="cover"
          />

          {/* Map Location Pin Overlay */}
          <View style={styles.mapPinContainer}>
            <View style={styles.mapPinPulse} />
            <Ionicons name="location" size={32} color="#F77036" />
          </View>

          <View style={styles.mapLocationBadge}>
            <Ionicons name="navigate" size={14} color="#FFFFFF" />
            <Text style={styles.mapLocationText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveEvent}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>Simpan Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 130, // Tab bar padding
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#182A3A',
    letterSpacing: -0.5,
  },
  logoBadge: {
    paddingTop: 4,
  },
  pillInputWrapper: {
    backgroundColor: '#D6DAE0',
    borderRadius: 30,
    height: 58,
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  pillInput: {
    fontSize: 16,
    color: '#1E354D',
    fontWeight: '500',
  },
  rowWrapper: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  keteranganWrapper: {
    flex: 1.4,
    backgroundColor: '#D6DAE0',
    borderRadius: 28,
    height: 104,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  keteranganInput: {
    fontSize: 15,
    color: '#1E354D',
    fontWeight: '500',
    flex: 1,
    textAlignVertical: 'top',
  },
  uploadImageButton: {
    flex: 1,
    backgroundColor: '#D6DAE0',
    borderRadius: 28,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  uploadIcon: {
    marginBottom: 4,
  },
  uploadImageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22384D',
    textAlign: 'center',
    lineHeight: 18,
  },
  mapCard: {
    height: 190,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#C5CCD6',
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPinContainer: {
    position: 'absolute',
    top: '40%',
    left: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinPulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(247, 112, 54, 0.3)',
  },
  mapLocationBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(22, 38, 56, 0.85)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapLocationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#F77036',
    borderRadius: 30,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F77036',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
