import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { BASE, THEME, FONT_FAMILY, SHADOWS } from '../constants/tokens';
import { Compass, MapIcon, Plus, Bookmark, User } from './Icons';
import { Screen } from '../types';

interface TabBarProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  onCreate: () => void;
}

export function TabBar({ active, onNavigate, onCreate }: TabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <TabItem
          icon={<Compass size={24} color={active === 'home' ? THEME.accent : BASE.ink3} />}
          label="Descobrir"
          active={active === 'home'}
          onPress={() => onNavigate('home')}
        />
        <TabItem
          icon={<MapIcon size={24} color={BASE.ink3} />}
          label="Mapa"
          active={false}
          onPress={() => {}}
        />

        <TouchableOpacity onPress={onCreate} activeOpacity={0.8} style={styles.createBtn}>
          <Plus size={22} color={THEME.onAccent} />
        </TouchableOpacity>

        <TabItem
          icon={<Bookmark size={24} color={BASE.ink3} />}
          label="Salvos"
          active={false}
          onPress={() => {}}
        />
        <TabItem
          icon={<User size={24} color={BASE.ink3} />}
          label="Perfil"
          active={false}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem} activeOpacity={0.7}>
      {icon}
      <Text style={[styles.tabLabel, active && { color: THEME.accent }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: BASE.line2,
    paddingBottom: Platform.OS === 'ios' ? 26 : 12,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    flex: 1,
  },
  tabLabel: {
    fontFamily: FONT_FAMILY.hanken.medium,
    fontSize: 10.5,
    color: BASE.ink3,
  },
  createBtn: {
    backgroundColor: THEME.accent,
    width: 52,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.cta,
  },
});
