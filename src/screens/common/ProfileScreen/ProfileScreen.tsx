import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input } from '../../../components/ui';
import { useAuthMock } from '../../../hooks';
import { trackScreenView, trackUserAction } from '../../../utils/analytics';
import { i18n, Language } from '../../../i18n';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout, switchRole } = useAuthMock();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(i18n.getCurrentLanguage());
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    trackScreenView('Profile');
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    i18n.setLanguage(language);
    trackUserAction('language_changed', language);
    Alert.alert('Language Updated', `Language changed to ${language.toUpperCase()}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            trackUserAction('logout');
            await logout();
          },
        },
      ]
    );
  };

  const handleSwitchRole = () => {
    Alert.alert(
      'Switch Role',
      'This is a demo feature. In production, role switching would require proper authentication.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Worker',
          onPress: () => switchRole('worker'),
        },
        {
          text: 'Supervisor',
          onPress: () => switchRole('supervisor'),
        },
        {
          text: 'Safety Officer',
          onPress: () => switchRole('safety_officer'),
        },
        {
          text: 'Admin',
          onPress: () => switchRole('admin'),
        },
      ]
    );
  };

  const languages = i18n.getAvailableLanguages();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
      {/* User Info */}
      <Card style={styles.userCard}>
        <View style={styles.userHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userRole}>{user?.role?.replace('_', ' ').toUpperCase()}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        
        <View style={styles.userDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Department:</Text>
            <Text style={styles.detailValue}>{user?.department}</Text>
          </View>
          {user?.shift && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Shift:</Text>
              <Text style={styles.detailValue}>{user.shift}</Text>
            </View>
          )}
          {user?.team && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Team:</Text>
              <Text style={styles.detailValue}>{user.team}</Text>
            </View>
          )}
          {user?.certifications && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Certifications:</Text>
              <Text style={styles.detailValue}>{user.certifications.join(', ')}</Text>
            </View>
          )}
        </View>
      </Card>

      {/* Language Selection */}
      <Card style={styles.languageCard}>
        <Text style={styles.sectionTitle}>Language / भाषा / భాష / மொழி</Text>
        <Text style={styles.sectionSubtitle}>
          Select your preferred language for the app interface
        </Text>
        
        <View style={styles.languageOptions}>
          {languages.map((language) => (
            <Button
              key={language.code}
              title={`${language.nativeName} (${language.name})`}
              onPress={() => handleLanguageChange(language.code)}
              variant={selectedLanguage === language.code ? 'primary' : 'secondary'}
              style={styles.languageButton}
            />
          ))}
        </View>
      </Card>

      {/* App Settings */}
      <Card style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingsList}>
          <Button
            title="🔔 Notification Settings"
            onPress={() => trackUserAction('notification_settings')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title="🔒 Privacy Settings"
            onPress={() => trackUserAction('privacy_settings')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title="📱 App Preferences"
            onPress={() => trackUserAction('app_preferences')}
            variant="secondary"
            style={styles.settingButton}
          />
          <Button
            title="❓ Help & Support"
            onPress={() => trackUserAction('help_support')}
            variant="secondary"
            style={styles.settingButton}
          />
        </View>
      </Card>

      {/* Demo Features */}
      <Card style={styles.demoCard}>
        <Text style={styles.sectionTitle}>Demo Features</Text>
        <Text style={styles.demoDescription}>
          These features are available in demo mode for testing purposes
        </Text>
        
        <View style={styles.demoActions}>
          <Button
            title="🔄 Switch Role"
            onPress={handleSwitchRole}
            variant="secondary"
            style={styles.demoButton}
          />
          <Button
            title="📊 View Analytics Data"
            onPress={() => {
              trackUserAction('view_demo_analytics');
              Alert.alert('Demo Analytics', 'Analytics data is mocked for demonstration');
            }}
            variant="secondary"
            style={styles.demoButton}
          />
        </View>
      </Card>

      {/* App Info */}
      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>App Information</Text>
        
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>1.0.0 - Phase 1</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build:</Text>
            <Text style={styles.infoValue}>Frontend Only</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Framework:</Text>
            <Text style={styles.infoValue}>React Native + Expo</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target:</Text>
            <Text style={styles.infoValue}>Indian Mining Safety</Text>
          </View>
        </View>
      </Card>

      {/* Logout */}
      <Card style={styles.logoutCard}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
        />
      </Card>
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
  userCard: {
    margin: 16,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  userRole: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
    marginTop: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  languageCard: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  languageOptions: {
    gap: 8,
  },
  languageButton: {
    justifyContent: 'flex-start',
  },
  settingsCard: {
    margin: 16,
  },
  settingsList: {
    gap: 8,
  },
  settingButton: {
    justifyContent: 'flex-start',
  },
  demoCard: {
    margin: 16,
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  demoDescription: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  demoActions: {
    gap: 8,
  },
  demoButton: {
    justifyContent: 'flex-start',
  },
  infoCard: {
    margin: 16,
  },
  infoList: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  logoutCard: {
    margin: 16,
    marginBottom: 32,
  },
  logoutButton: {
    paddingVertical: 16,
  },
});
