import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { EventMateLogo } from '@/components/EventMateLogo';
import { useEvents } from '@/context/EventContext';
import { CATEGORIES } from '@/data/dummyEvents';
import { EventItem } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const { events, favorites, toggleFavorite } = useEvents();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (item: EventItem) => {
    // Pengiriman data antar halaman via route parameters (padanan putExtra / Bundle)
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
        {/* Top Search & Filter Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#7E98B0" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search...."
              placeholderTextColor="#7E98B0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity style={styles.filterButton} activeOpacity={0.75}>
            <Feather name="sliders" size={20} color="#1E354D" />
          </TouchableOpacity>
        </View>

        {/* Heading & Logo Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Find Events</Text>
            <Text style={styles.headerSubtitle}>Near You</Text>
          </View>
          <View style={styles.logoBadge}>
            <EventMateLogo size={62} showText={false} />
          </View>
        </View>

        {/* Categories Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Event Cards List */}
        <View style={styles.eventsList}>
          {filteredEvents.map((item: EventItem) => {
            const isFav = favorites.includes(item.id);

            return (
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
                  {/* Top-Right Favorite Button */}
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => toggleFavorite(item.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={isFav ? 'heart' : 'heart-outline'}
                      size={20}
                      color={isFav ? '#F77036' : '#FFFFFF'}
                    />
                  </TouchableOpacity>

                  {/* Bottom Glass Card Overlay */}
                  <View style={styles.overlayPill}>
                    <View style={styles.overlayTextContainer}>
                      <Text style={styles.eventTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.eventDate}>{item.date}</Text>
                    </View>

                    <View style={styles.locationPinIcon}>
                      <Ionicons name="location-sharp" size={24} color="#FFFFFF" />
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}

          {filteredEvents.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color="#A0B0C0" />
              <Text style={styles.emptyText}>Tidak ada acara yang cocok</Text>
            </View>
          )}
        </View>
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
    paddingTop: 12,
    paddingBottom: 120, // Accommodate floating tab bar
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: '#1E354D',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#1E354D',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#182A3A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#182A3A',
    marginTop: -4,
  },
  logoBadge: {
    paddingTop: 4,
  },
  categoryScroll: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 18,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#1E354D',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillActive: {
    backgroundColor: '#1E354D',
    borderColor: '#1E354D',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E354D',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  eventsList: {
    gap: 20,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 240,
    backgroundColor: '#E6E9EE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  heartButton: {
    alignSelf: 'flex-end',
    margin: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayPill: {
    backgroundColor: 'rgba(18, 28, 42, 0.78)',
    borderRadius: 20,
    margin: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  overlayTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  eventDate: {
    color: '#D0D6E0',
    fontSize: 13,
    marginTop: 3,
  },
  locationPinIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    color: '#7088A0',
    fontSize: 15,
  },
});
