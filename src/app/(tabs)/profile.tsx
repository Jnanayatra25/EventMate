import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { EventMateLogo } from '@/components/EventMateLogo';
import { useAuth } from '@/context/AuthContext';
import { useEvents } from '@/context/EventContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { events, favorites } = useEvents();

  const handleLogout = () => {
    Alert.alert('Konfirmasi Keluar', 'Apakah Anda yakin ingin keluar dari EventMate?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/sign-in');
        },
      },
    ]);
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
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.logoBadge}>
            <EventMateLogo size={62} showText={false} />
          </View>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <Image
            source={{
              uri:
                user?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Ahmad Faiz'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'ahmad.faiz@example.com'}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{events.length}</Text>
            <Text style={styles.statLabel}>Total Event</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorit</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Akun & Pengaturan</Text>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconWrapper}>
              <Ionicons name="person-outline" size={20} color="#182A3A" />
            </View>
            <Text style={styles.menuText}>Edit Profil</Text>
            <Feather name="chevron-right" size={20} color="#A0B0C0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconWrapper}>
              <Ionicons name="notifications-outline" size={20} color="#182A3A" />
            </View>
            <Text style={styles.menuText}>Notifikasi</Text>
            <Feather name="chevron-right" size={20} color="#A0B0C0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconWrapper}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#182A3A" />
            </View>
            <Text style={styles.menuText}>Privasi & Keamanan</Text>
            <Feather name="chevron-right" size={20} color="#A0B0C0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconWrapper}>
              <Ionicons name="help-circle-outline" size={20} color="#182A3A" />
            </View>
            <Text style={styles.menuText}>Bantuan & Dukungan</Text>
            <Feather name="chevron-right" size={20} color="#A0B0C0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconWrapper, styles.logoutIconWrapper]}>
              <Ionicons name="log-out-outline" size={20} color="#E53935" />
            </View>
            <Text style={styles.logoutText}>Keluar</Text>
            <Feather name="chevron-right" size={20} color="#E53935" />
          </TouchableOpacity>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6FA',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E6EBF2',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#D0D8E2',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#182A3A',
  },
  userEmail: {
    fontSize: 14,
    color: '#7088A0',
    marginTop: 4,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1E354D',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 13,
    color: '#B0C2D4',
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuContainer: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#182A3A',
    marginBottom: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFD',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EDF1F7',
  },
  menuIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EBF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#182A3A',
    flex: 1,
  },
  logoutItem: {
    borderColor: 'rgba(229, 57, 53, 0.2)',
    backgroundColor: 'rgba(229, 57, 53, 0.04)',
    marginTop: 10,
  },
  logoutIconWrapper: {
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E53935',
    flex: 1,
  },
});
