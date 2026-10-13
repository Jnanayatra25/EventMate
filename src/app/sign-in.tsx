import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { EventMateLogo } from '@/components/EventMateLogo';
import { useAuth } from '@/context/AuthContext';

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    setErrorMessage('');
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Masukkan email yang valid');
      return;
    }
    if (!password) {
      setErrorMessage('Password tidak boleh kosong');
      return;
    }

    login(email.trim());
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header Navigation */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace('/');
                }
              }}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="chevron-back" size={24} color="#162736" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/sign-up')}
              style={styles.signUpLink}
            >
              <Text style={styles.signUpLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Top Brand Logo Area */}
          <View style={styles.logoSection}>
            <EventMateLogo size={70} showText={true} />
          </View>

          {/* Bottom Dark Sheet Container */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Sign In</Text>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color="#FF6B6B" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#6F88A0"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrorMessage('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#6F88A0"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrorMessage('');
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#6F88A0"
                />
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Text style={styles.submitButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Divider "Or" */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialRow}>
              {/* Google Button */}
              <TouchableOpacity
                style={styles.socialCircle}
                activeOpacity={0.8}
                onPress={() => {
                  login('google.user@example.com', 'Pengguna Google');
                  router.replace('/(tabs)/home');
                }}
              >
                <Svg width="22" height="22" viewBox="0 0 24 24">
                  <Path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <Path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <Path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <Path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </Svg>
              </TouchableOpacity>

              {/* Facebook Button */}
              <TouchableOpacity
                style={styles.socialCircle}
                activeOpacity={0.8}
                onPress={() => {
                  login('fb.user@example.com', 'Pengguna Facebook');
                  router.replace('/(tabs)/home');
                }}
              >
                <FontAwesome name="facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  backButton: {
    padding: 6,
  },
  signUpLink: {
    padding: 6,
  },
  signUpLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#162736',
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: '#1B354F',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    minHeight: 460,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 14,
    gap: 8,
  },
  errorText: {
    color: '#FF8585',
    fontSize: 13,
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 28,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    height: '100%',
  },
  eyeIcon: {
    padding: 6,
  },
  submitButton: {
    backgroundColor: '#F77036',
    borderRadius: 28,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#F77036',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 26,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    color: '#8CA0B2',
    paddingHorizontal: 14,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingBottom: 10,
  },
  socialCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
