import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'switch' | 'arrow' | 'info';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('English');

  const settings: SettingItem[] = [
    {
      id: 'language',
      title: 'Language',
      subtitle: language,
      icon: 'globe',
      type: 'arrow',
      onPress: () => {
        // Language selection logic
        setLanguage(language === 'English' ? 'Türkçe' : 'English');
      },
    },
    {
      id: 'theme',
      title: 'Theme',
      subtitle: isDark ? 'Dark' : 'Light',
      icon: isDark ? 'moon.fill' : 'sun.max.fill',
      type: 'arrow',
      onPress: () => {
        // Theme toggle logic would go here
      },
    },
    {
      id: 'notifications',
      title: 'Push Notifications',
      subtitle: 'Receive push notifications',
      icon: 'bell.fill',
      type: 'switch',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      id: 'email',
      title: 'Email Notifications',
      subtitle: 'Receive email updates',
      icon: 'envelope.fill',
      type: 'switch',
      value: emailNotifications,
      onToggle: setEmailNotifications,
    },
    {
      id: 'privacy',
      title: 'Privacy',
      subtitle: 'Manage your privacy settings',
      icon: 'lock.fill',
      type: 'arrow',
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App version 1.0.0',
      icon: 'info.circle.fill',
      type: 'info',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatarContainer, { backgroundColor: isDark ? '#2a2a2a' : '#e5e5e5' }]}>
            <IconSymbol name="person.fill" size={48} color={isDark ? Colors.dark.icon : Colors.light.icon} />
          </View>
          <View
            style={[
              styles.editIconBadge,
              {
                backgroundColor: '#0a7ea4',
                borderColor: isDark ? Colors.dark.background : Colors.light.background,
              },
            ]}>
            <IconSymbol name="photo.fill" size={20} color="#ffffff" />
          </View>
        </View>
        <ThemedText type="title" style={styles.profileName}>
          John Doe
        </ThemedText>
        <ThemedText style={styles.profileEmail}>john.doe@example.com</ThemedText>
      </View>

      {/* Settings List */}
      <View style={styles.settingsContainer}>
        {settings.map((setting, index) => (
          <TouchableOpacity
            key={setting.id}
            onPress={setting.onPress}
            disabled={setting.type === 'switch' || setting.type === 'info'}
            style={[
              styles.settingItem,
              { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' },
              index === 0 && styles.settingItemFirst,
              index === settings.length - 1 && styles.settingItemLast,
            ]}>
            <View style={[styles.settingIconContainer, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]}>
              <IconSymbol
                name={setting.icon as any}
                size={20}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
            </View>
            <View style={styles.settingContent}>
              <ThemedText type="defaultSemiBold" style={styles.settingTitle}>
                {setting.title}
              </ThemedText>
              {setting.subtitle && (
                <ThemedText style={styles.settingSubtitle}>{setting.subtitle}</ThemedText>
              )}
            </View>
            {setting.type === 'switch' && (
              <Switch
                value={setting.value}
                onValueChange={setting.onToggle}
                trackColor={{ false: '#767577', true: '#0a7ea4' }}
                thumbColor={setting.value ? '#fff' : '#f4f3f4'}
              />
            )}
            {setting.type === 'arrow' && (
              <IconSymbol
                name="chevron.right"
                size={16}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]}>
          <IconSymbol name="arrow.right.square.fill" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  profileName: {
    marginBottom: 4,
  },
  profileEmail: {
    opacity: 0.6,
    fontSize: 14,
  },
  settingsContainer: {
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  settingItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  settingItemLast: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomWidth: 0,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});

