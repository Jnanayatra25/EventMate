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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { EventMateLogo } from '@/components/EventMateLogo';
import { useEvents } from '@/context/EventContext';
import { CATEGORIES } from '@/data/dummyEvents';

export default function EventListScreen() {
  const router = useRouter();
  const { events, favorites, toggleFavorite } = useEvents();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = events.filter((e) => {
    const matchesCategory =
      selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <Text style={styles.headerTitle}>Event List</Text>
            <Text style={styles.headerSubtitle}>Jadwal & Agenda</Text>
          </View>
          <View style={styles.logoBadge}>
            <EventMateLogo size={62} showText={false} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#7E98B0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari agenda acara..."
            placeholderTextColor="#7E98B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#7E98B0" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Chips */}
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
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
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

        {/* List of Events */}
        <View style={styles.eventsList}>
          {filteredEvents.map((item) => {
            const isFav = favorites.includes(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.eventCard}
                activeOpacity={0.88}
                onPress={() => handleOpenDetail(item)}
              >
                <Image source={{ uri: item.imageUri }} style={styles.eventImage} />

                <View style={styles.eventDetails}>
                  <View style={styles.cardHeader}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{item.category}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(item.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={22}
                        color={isFav ? '#F77036' : '#8CA0B2'}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={14} color="#F77036" />
                    <Text style={styles.metaText}>{item.date}</Text>
                  </View>

                  <View style={styles.metaRow}>
                    <Ionicons name="location-outline" size={14} color="#7E98B0" />
                    <Text style={styles.metaText} numberOfLines={1}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredEvents.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color="#A0B0C0" />
              <Text style={styles.emptyText}>Tidak ada acara yang ditemukan</Text>
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
    paddingTop: 16,
    paddingBottom: 120, // Tab bar padding
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#182A3A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7088A0',
    marginTop: 2,
  },
  logoBadge: {
    paddingTop: 4,
  },
  searchBar: {
    height: 48,
    backgroundColor: '#F1F4F8',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E7ED',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#182A3A',
  },
  categoryScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#1E354D',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B6074',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  eventsList: {
    gap: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ECEFF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    gap: 14,
  },
  eventImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: '#E2E6EC',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: 'rgba(247, 112, 54, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: '#F77036',
    fontSize: 11,
    fontWeight: '700',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#182A3A',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    color: '#657B8F',
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
    gap: 12,
  },
  emptyText: {
    color: '#7088A0',
    fontSize: 15,
  },
});
