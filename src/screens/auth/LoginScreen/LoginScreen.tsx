import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Button, Input, Card } from '../../../components/ui';
import { useAuthMock } from '../../../hooks';
import { USER_ROLES, UserRole } from '../../../config/roles';
import { trackEvent, trackLogin } from '../../../utils/analytics';
import { t } from '../../../i18n';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(USER_ROLES.WORKER);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthMock();

  const handleLogin = async () => {
    setIsLoading(true);
    trackEvent('login_attempt', { role: selectedRole });

    try {
      const success = await login(selectedRole);
      
      if (success) {
        trackLogin('role_selection', selectedRole);
        // Navigation will be handled by the auth state change
      } else {
        Alert.alert('Login Failed', 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: USER_ROLES.WORKER,
      label: 'Mine Worker',
      description: 'Underground operations, equipment handling',
      icon: '⛏️',
    },
    {
      value: USER_ROLES.SUPERVISOR,
      label: 'Supervisor',
      description: 'Team management, work coordination',
      icon: '👷‍♂️',
    },
    {
      value: USER_ROLES.SAFETY_OFFICER,
      label: 'Safety Officer',
      description: 'Safety compliance, incident management',
      icon: '🦺',
    },
    {
      value: USER_ROLES.ADMIN,
      label: 'Administrator',
      description: 'System management, analytics',
      icon: '👨‍💼',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>⛏️</Text>
          <Text style={styles.appName}>MineLy</Text>
        </View>
        <Text style={styles.tagline}>Making Mining Safer, One Day at a Time</Text>
        <Text style={styles.subtitle}>{t('auth.welcome')}</Text>
      </View>

      <Card style={styles.loginCard}>
        <Text style={styles.sectionTitle}>{t('auth.selectRole')}</Text>
        <Text style={styles.sectionSubtitle}>
          Choose your role to access personalized safety features
        </Text>

        <View style={styles.roleOptions}>
          {roleOptions.map((option) => (
            <Button
              key={option.value}
              title={`${option.icon} ${option.label}`}
              onPress={() => setSelectedRole(option.value)}
              variant={selectedRole === option.value ? 'primary' : 'secondary'}
              style={[
                styles.roleButton,
                selectedRole === option.value && styles.selectedRole
              ]}
              textStyle={styles.roleButtonText}
            />
          ))}
        </View>

        {selectedRole && (
          <View style={styles.roleDescription}>
            <Text style={styles.roleDescriptionText}>
              {roleOptions.find(r => r.value === selectedRole)?.description}
            </Text>
          </View>
        )}

        <Button
          title={isLoading ? t('common.loading') : t('auth.login')}
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.loginButton}
        />

        <View style={styles.demoNotice}>
          <Text style={styles.demoText}>
            🚀 Demo Mode: All roles available for testing
          </Text>
        </View>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Developed for Indian Mining Safety Compliance
        </Text>
        <Text style={styles.versionText}>Version 1.0.0 - Phase 1</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
  loginButton: {
    marginTop: 8,
    paddingVertical: 16,
  },
  demoNotice: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  demoText: {
    fontSize: 12,
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '500',
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
