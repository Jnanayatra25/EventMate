import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventMateLogo } from '@/components/EventMateLogo';

export default function SplashScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* Centered Brand Area */}
        <View style={styles.brandContainer}>
          <EventMateLogo size={120} showText={true} />
          <Text style={styles.tagline}>Find Events Near You</Text>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8A6044',
    marginTop: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#F77036',
    paddingVertical: 14,
    paddingHorizontal: 42,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F77036',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
