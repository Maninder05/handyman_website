"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  jobAlerts: boolean;
  messageAlerts: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;
}

interface SettingsContextType {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'es' | 'fr' | 'de';
  timezone: string;
  notifications: NotificationSettings;
  privacySettings: PrivacySettings;
  twoFactorEnabled: boolean;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (lang: 'en' | 'es' | 'fr' | 'de') => void;
  setTimezone: (tz: string) => void;
  updateNotifications: (notifications: NotificationSettings) => void;
  updatePrivacySettings: (privacy: PrivacySettings) => void;
  setTwoFactorEnabled: (enabled: boolean) => void;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'auto'>('light');
  const [language, setLanguageState] = useState<'en' | 'es' | 'fr' | 'de'>('en');
  const [timezone, setTimezoneState] = useState('UTC');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    jobAlerts: true,
    messageAlerts: true,
  });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
  });
  const [twoFactorEnabled, setTwoFactorEnabledState] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto';
      const savedLanguage = localStorage.getItem('language') as 'en' | 'es' | 'fr' | 'de';
      const savedTimezone = localStorage.getItem('timezone');
      
      if (savedTheme) setThemeState(savedTheme);
      if (savedLanguage) setLanguageState(savedLanguage);
      if (savedTimezone) setTimezoneState(savedTimezone);

      refreshSettings();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.remove('dark');
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }
  }, [theme]);

  const refreshSettings = async () => {
    try {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:8000/api/settings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.theme) setThemeState(data.theme);
        if (data.language) setLanguageState(data.language);
        if (data.timezone) setTimezoneState(data.timezone);
        if (data.notifications) setNotifications(data.notifications);
        if (data.privacySettings) setPrivacySettings(data.privacySettings);
        if (data.twoFactorEnabled !== undefined) setTwoFactorEnabledState(data.twoFactorEnabled);
        
        localStorage.setItem('theme', data.theme || 'light');
        localStorage.setItem('language', data.language || 'en');
        localStorage.setItem('timezone', data.timezone || 'UTC');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  const setLanguage = (lang: 'en' | 'es' | 'fr' | 'de') => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const setTimezone = (tz: string) => {
    setTimezoneState(tz);
    if (typeof window !== 'undefined') {
      localStorage.setItem('timezone', tz);
    }
  };

  const updateNotifications = (newNotifications: NotificationSettings) => {
    setNotifications(newNotifications);
  };

  const updatePrivacySettings = (newPrivacy: PrivacySettings) => {
    setPrivacySettings(newPrivacy);
  };

  const setTwoFactorEnabled = (enabled: boolean) => {
    setTwoFactorEnabledState(enabled);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        timezone,
        notifications,
        privacySettings,
        twoFactorEnabled,
        setTheme,
        setLanguage,
        setTimezone,
        updateNotifications,
        updatePrivacySettings,
        setTwoFactorEnabled,
        refreshSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}