import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useEvents } from '@/context/EventContext';
import { EventItem } from '@/types';

export default function EventDetailScreen() {
  const router = useRouter();
  // 1. Mengambil data yang dikirim melalui parameter rute (padanan putExtra / Bundle di Android Native)
  const params = useLocalSearchParams<{
    id: string;
    title?: string;
    date?: string;
    time?: string;
    location?: string;
    category?: string;
    description?: string;
    imageUri?: string;
  }>();

  const { events, favorites, toggleFavorite } = useEvents();

  // Cari dari state global, atau gunakan data yang diteruskan via params (Bundle fallback)
  const matchedEvent = events.find((e) => e.id === params.id);

  const event: EventItem | null = matchedEvent || (params.id && params.title ? {
    id: params.id,
    title: params.title || '',
    date: params.date || '',
    time: params.time || '19:00 WIB',
    location: params.location || 'Lokasi Acara',
    category: params.category || 'General',
    description: params.description || 'Tidak ada deskripsi tersedia.',
    imageUri: params.imageUri || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
  } : null);

  const isFav = event ? favorites.includes(event.id) : false;

  // Lifecycle & Safe Navigation: Cegah crash jika back stack kosong
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleShare = async () => {
    if (!event) return;
    try {
      await Share.share({
        message: `Ayo hadiri acara "${event.title}" pada ${event.date} di ${event.location}! Info lengkap di EventMate.`,
      });
    } catch {
      // Ignore share cancellation
    }
  };

  const handleRegister = () => {
    if (!event) return;
    Alert.alert(
      'Konfirmasi Pendaftaran',
      `Apakah Anda ingin mendaftar untuk menghadiri acara "${event.title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Daftar Sekarang',
          onPress: () => {
            Alert.alert(
              'Pendaftaran Berhasil! 🎉',
              `Tiket virtual untuk "${event.title}" telah disimpan ke profil Anda. Sampai jumpa di lokasi!`
            );
          },
        },
      ]
    );
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text style={styles.errorTitle}>Event Tidak Ditemukan</Text>
        <Text style={styles.errorSubtitle}>
          Data acara tidak dapat dimuat atau telah dihapus.
        </Text>
        <TouchableOpacity style={styles.backHomeBtn} onPress={handleBack}>
          <Text style={styles.backHomeBtnText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.imageUri }} style={styles.heroImage} />
          <View style={styles.imageGradientOverlay} />

          {/* Floating Top Header Buttons */}
          <SafeAreaView edges={['top']} style={styles.floatingHeader}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={24} color="#162736" />
            </TouchableOpacity>

            <View style={styles.headerRightActions}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={handleShare}
                activeOpacity={0.8}
              >
                <Feather name="share-2" size={20} color="#162736" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.circleButton}
                onPress={() => toggleFavorite(event.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isFav ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isFav ? '#F77036' : '#162736'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Content Section */}
        <View style={styles.detailsSheet}>
          {/* Category Badge & Status */}
          <View style={styles.categoryRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{event.category}</Text>
            </View>
            <View style={styles.verifiedRow}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.verifiedText}>Acara Terverifikasi</Text>
            </View>
          </View>

          {/* Event Title */}
          <Text style={styles.title}>{event.title}</Text>

          {/* Meta Info Cards */}
          <View style={styles.metaCardsContainer}>
            {/* Date & Time */}
            <View style={styles.metaCard}>
              <View style={[styles.metaIconWrapper, { backgroundColor: '#FFF2EB' }]}>
                <Ionicons name="calendar" size={22} color="#F77036" />
              </View>
              <View style={styles.metaTextWrapper}>
                <Text style={styles.metaLabel}>Tanggal & Waktu</Text>
                <Text style={styles.metaValue}>{event.date}</Text>
                <Text style={styles.metaSubValue}>{event.time || '19:00 WIB'}</Text>
              </View>
            </View>

            {/* Location */}
            <View style={styles.metaCard}>
              <View style={[styles.metaIconWrapper, { backgroundColor: '#EBF3FB' }]}>
                <Ionicons name="location" size={22} color="#2A73C9" />
              </View>
              <View style={styles.metaTextWrapper}>
                <Text style={styles.metaLabel}>Lokasi Pelaksanaan</Text>
                <Text style={styles.metaValue} numberOfLines={2}>
                  {event.location}
                </Text>
              </View>
            </View>
          </View>

          {/* Organizer Card */}
          <View style={styles.organizerCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
              }}
              style={styles.organizerAvatar}
            />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerTitle}>Penyelenggara</Text>
              <Text style={styles.organizerName}>EventMate Community</Text>
            </View>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
              <Text style={styles.followButtonText}>Ikuti</Text>
            </TouchableOpacity>
          </View>

          {/* Description Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Deskripsi Acara</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Floating Booking Bar */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBarContainer}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Biaya Masuk</Text>
            <Text style={styles.priceValue}>Gratis</Text>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.bookButtonText}>Daftar Sekarang</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#162736',
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: '#6F88A0',
    textAlign: 'center',
    marginBottom: 24,
  },
  backHomeBtn: {
    backgroundColor: '#F77036',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backHomeBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  imageContainer: {
    width: '100%',
    height: 340,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#FFF0EA',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: '#F77036',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#162736',
    lineHeight: 32,
    marginBottom: 20,
  },
  metaCardsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  metaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  metaIconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  metaTextWrapper: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: '#8A9BA8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#162736',
  },
  metaSubValue: {
    fontSize: 13,
    color: '#6F88A0',
    marginTop: 2,
  },
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    marginBottom: 24,
  },
  organizerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerTitle: {
    fontSize: 11,
    color: '#8A9BA8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  organizerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#162736',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#FFF2EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F77036',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#162736',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B6276',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  priceContainer: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#8A9BA8',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F77036',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F77036',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
    shadowColor: '#F77036',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
