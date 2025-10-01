import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Card } from '../../../components/ui';
import { useAuthMock } from '../../../hooks';
import { USER_ROLES, UserRole } from '../../../config/roles';
import { trackEvent, trackLogin } from '../../../utils/analytics';
import { t } from '../../../i18n';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthMock();

  // Demo credentials
  const DEMO_CREDENTIALS = {
    admin: { password: 'password', role: USER_ROLES.ADMIN },
    worker: { password: 'password', role: USER_ROLES.WORKER },
    supervisor: { password: 'password', role: USER_ROLES.SUPERVISOR },
    safety: { password: 'password', role: USER_ROLES.SAFETY_OFFICER },
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    trackEvent('login_attempt', { username });

    try {
      // Check demo credentials
      const credentials = DEMO_CREDENTIALS[username.toLowerCase() as keyof typeof DEMO_CREDENTIALS];
      
      if (credentials && credentials.password === password) {
        const success = await login(credentials.role);
        
        if (success) {
          trackLogin('username_password', credentials.role);
          // Navigate to Main screen after successful login
          navigation.navigate('Main');
        } else {
          Alert.alert('Login Failed', 'Please try again');
        }
      } else {
        Alert.alert('Invalid Credentials', 'Please check your username and password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    Alert.alert('Coming Soon', 'Signup functionality will be available in the next version');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="construct" size={48} color="#FF6B35" />
            <Text style={styles.appName}>MineLy</Text>
          </View>
          <Text style={styles.tagline}>Making Mining Safer, One Day at a Time</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>

        <Card style={styles.loginCard}>
          <Text style={styles.sectionTitle}>Sign In</Text>
          <Text style={styles.sectionSubtitle}>
            Enter your credentials to access your safety dashboard
          </Text>

          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.passwordContainer}>
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.passwordInput}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <Button
            title={isLoading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            disabled={isLoading || !username.trim() || !password.trim()}
            style={styles.loginButton}
          />

          <TouchableOpacity onPress={navigateToSignup} style={styles.signupLink}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.demoNotice}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>admin / password (Admin)</Text>
            <Text style={styles.demoText}>worker / password (Worker)</Text>
            <Text style={styles.demoText}>supervisor / password (Supervisor)</Text>
            <Text style={styles.demoText}>safety / password (Safety Officer)</Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Developed for Indian Mining Safety Compliance
          </Text>
          <Text style={styles.versionText}>Version 1.0.0 - Phase 1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 48,
    marginRight: 12,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  loginCard: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  roleOptions: {
    gap: 12,
    marginBottom: 20,
  },
  roleButton: {
    paddingVertical: 16,
  },
  selectedRole: {
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  roleButtonText: {
    fontSize: 16,
  },
  roleDescription: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  roleDescriptionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 40,
    zIndex: 1,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 16,
  },
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupTextBold: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  demoNotice: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  demoTitle: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: 4,
  },
  demoText: {
    fontSize: 11,
    color: '#1976D2',
    marginBottom: 2,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: '#CCC',
    textAlign: 'center',
  },
});
