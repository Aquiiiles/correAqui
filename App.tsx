import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Animated, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
} from '@expo-google-fonts/hanken-grotesk';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

import { Event, Screen } from './src/types';
import { INITIAL_EVENTS, CITIES } from './src/constants/data';
import { BASE, THEME, FONT_FAMILY } from './src/constants/tokens';
import { HomeScreen } from './src/screens/HomeScreen';
import { EventDetailScreen } from './src/screens/EventDetailScreen';
import { CreateEventScreen, CreateEventData } from './src/screens/CreateEventScreen';
import { TabBar } from './src/components/TabBar';

export default function App() {
  const [fontsLoaded] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    HankenGrotesk_800ExtraBold,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const [screen, setScreen] = useState<Screen>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const handleOpenEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setScreen('detail');
  }, []);

  const handleBack = useCallback(() => {
    setScreen('home');
    setSelectedEvent(null);
  }, []);

  const handleCreate = useCallback(() => {
    setScreen('create');
  }, []);

  const handleCancelCreate = useCallback(() => {
    setScreen('home');
  }, []);

  const handlePublish = useCallback(
    (data: CreateEventData) => {
      const newEvent: Event = {
        id: `e${Date.now()}`,
        sport: data.sport,
        bucket: 'soon',
        title: data.title,
        day: 'Hoje',
        date: data.date || 'em breve',
        time: data.time || 'a definir',
        neighborhood: data.local,
        city: CITIES[0],
        meta: data.meta || '',
        level: data.level,
        price: data.free ? 'Grátis' : data.price ? `R$ ${data.price}` : 'Grátis',
        going: 1,
        spots: data.spots ? parseInt(data.spots, 10) : undefined,
        host: 'Você',
        hostInitial: 'V',
        mine: true,
        people: ['VC'],
        blurb: data.blurb || '',
      };
      setEvents((prev) => [newEvent, ...prev]);
      setScreen('home');
      showToast('Evento publicado! Já está na timeline.');
    },
    [showToast]
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>CorreAqui</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {screen === 'home' && (
        <HomeScreen
          events={events}
          onOpenEvent={handleOpenEvent}
          onCreate={handleCreate}
        />
      )}

      {screen === 'detail' && selectedEvent && (
        <EventDetailScreen event={selectedEvent} onBack={handleBack} />
      )}

      {screen === 'create' && (
        <CreateEventScreen
          onCancel={handleCancelCreate}
          onPublish={handlePublish}
        />
      )}

      {screen === 'home' && (
        <TabBar
          active="home"
          onNavigate={(s) => setScreen(s)}
          onCreate={handleCreate}
        />
      )}

      {/* Toast */}
      {toast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ {toast}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE.bg,
  },
  loading: {
    flex: 1,
    backgroundColor: BASE.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 28,
    fontWeight: '800',
    color: BASE.ink,
  },
  toast: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 58 : 42,
    left: 16,
    right: 16,
    backgroundColor: THEME.accent,
    borderRadius: 14,
    padding: 13,
    paddingHorizontal: 16,
    zIndex: 80,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  toastText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 14,
    color: THEME.onAccent,
  },
});
