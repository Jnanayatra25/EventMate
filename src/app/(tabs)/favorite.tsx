import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { EventMateLogo } from '@/components/EventMateLogo';
import { useEvents } from '@/context/EventContext';

export default function FavoriteScreen() {
  const router = useRouter();
  const { events, favorites, toggleFavorite } = useEvents();

  const favoriteEvents = events.filter((e) => favorites.includes(e.id));

  const handleOpenDetail = (item: (typeof events)[0]) => {
    // Pengiriman data via route parameters (putExtra, Bundle)
    router.push({
      pathname: '/events/[id]' as any,
      params: {
        id: item.id,
        title: item.title,
        date: item.date,
        time: item.time || '19:00 WIB',
        location: item.location,
        category: item.category,
        description: item.description,
        imageUri: item.imageUri,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Favorite</Text>
            <View style={styles.eventRow}>
              <Text style={styles.headerSubtitle}>Event</Text>
              <Text style={styles.heartEmoji}>🧡</Text>
            </View>
          </View>

          <View style={styles.logoBadge}>
            <EventMateLogo size={62} showText={false} />
          </View>
        </View>

        {/* List of Favorite Event Cards */}
        {favoriteEvents.length > 0 ? (
          <View style={styles.cardList}>
            {favoriteEvents.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.cardContainer}
                activeOpacity={0.92}
                onPress={() => handleOpenDetail(item)}
              >
                <ImageBackground
                  source={{ uri: item.imageUri }}
                  style={styles.cardImage}
                  imageStyle={styles.cardImageStyle}
                >
                  {/* Top-Left Solid White Heart Button */}
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(item.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="heart" size={24} color="#FFFFFF" />
                  </TouchableOpacity>

                  {/* Bottom Event Info Overlay */}
                  <View style={styles.cardOverlay}>
                    <View style={styles.textContainer}>
                      <Text style={styles.eventTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.eventDate}>{item.date}</Text>
                    </View>

                    <View style={styles.locationPin}>
                      <Ionicons name="location-sharp" size={22} color="#FFFFFF" />
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#A0B0C0" />
            <Text style={styles.emptyTitle}>Belum Ada Event Favorit</Text>
            <Text style={styles.emptySubtitle}>
              Simpan event menarik yang ingin kamu hadiri dengan menekan tombol hati.
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push('/(tabs)/home')}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreButtonText}>Cari Event Sekarang</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120, // Tab bar padding
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#182A3A',
    letterSpacing: -0.5,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -4,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#182A3A',
  },
  heartEmoji: {
    fontSize: 24,
  },
  logoBadge: {
    paddingTop: 4,
  },
  cardList: {
    gap: 18,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 180,
    backgroundColor: '#E6E9EE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20, 24, 32, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOverlay: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(18, 28, 42, 0.65)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  eventDate: {
    color: '#D0D6E0',
    fontSize: 13,
    marginTop: 2,
  },
  locationPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#182A3A',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7088A0',
    textAlign: 'center',
    lineHeight: 20,
  },
  exploreButton: {
    marginTop: 16,
    backgroundColor: '#F77036',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
