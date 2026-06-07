import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Event, SportKey, BucketId } from '../types';
import { BASE, THEME, FONT_FAMILY, SPACING, SPORTS } from '../constants/tokens';
import { BUCKETS, CITIES } from '../constants/data';
import { EventCard } from '../components/EventCard';
import { Chip } from '../components/Chip';
import { ChevronDown, Search, Pin, Plus } from '../components/Icons';

interface HomeScreenProps {
  events: Event[];
  onOpenEvent: (event: Event) => void;
  onCreate: () => void;
}

const SPORT_FILTERS: { key: 'all' | SportKey; label: string }[] = [
  { key: 'all', label: 'Tudo' },
  ...Object.entries(SPORTS).map(([key, val]) => ({ key: key as SportKey, label: val.label })),
];

export function HomeScreen({ events, onOpenEvent, onCreate }: HomeScreenProps) {
  const [cityIndex, setCityIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [sport, setSport] = useState<'all' | SportKey>('all');

  const city = CITIES[cityIndex];

  const filtered = useMemo(() => {
    let result = events.filter((e) => e.city === city);
    if (sport !== 'all') {
      result = result.filter((e) => e.sport === sport);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.neighborhood.toLowerCase().includes(q) ||
          SPORTS[e.sport].label.toLowerCase().includes(q)
      );
    }
    return result;
  }, [events, city, sport, query]);

  const bucketGroups = useMemo(() => {
    return BUCKETS.map((bucket) => ({
      ...bucket,
      events: filtered.filter((e) => e.bucket === bucket.id),
    })).filter((b) => b.events.length > 0);
  }, [filtered]);

  const cycleCity = () => {
    setCityIndex((i) => (i + 1) % CITIES.length);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={cycleCity} style={styles.citySelector} activeOpacity={0.7}>
            <Pin size={16} color={THEME.accent} fill={THEME.accent} />
            <Text style={styles.cityText}>{city.split(',')[0]}</Text>
            <ChevronDown size={14} color={BASE.ink3} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>VC</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Descobrir</Text>
          <Text style={styles.subtitle}>
            Todo esporte da sua cidade, organizado por data.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color={BASE.ink3} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar corrida, pelada, local…"
            placeholderTextColor={BASE.ink3}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Sport Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {SPORT_FILTERS.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              active={sport === f.key}
              onPress={() => setSport(f.key)}
            />
          ))}
        </ScrollView>

        {/* Timeline */}
        {bucketGroups.length > 0 ? (
          <View style={styles.timeline}>
            <View style={styles.timelineRail} />
            {bucketGroups.map((bucket) => (
              <View key={bucket.id} style={styles.bucketSection}>
                <View style={styles.bucketHeader}>
                  <View style={styles.bucketDot} />
                  <Text style={styles.bucketLabel}>{bucket.label}</Text>
                  <Text style={styles.bucketRange}>{bucket.range}</Text>
                  <View style={styles.bucketLine} />
                  <Text style={styles.bucketCount}>{bucket.events.length}</Text>
                </View>
                <View style={styles.bucketCards}>
                  {bucket.events.map((event) => (
                    <View key={event.id} style={styles.cardWrapper}>
                      <View style={styles.cardDot} />
                      <EventCard
                        event={event}
                        onPress={() => onOpenEvent(event)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Pin size={26} color={BASE.ink3} />
            </View>
            <Text style={styles.emptyTitle}>Nada por aqui ainda</Text>
            <Text style={styles.emptyText}>
              Não achamos eventos em {city.split(',')[0]} com esses filtros. Que tal ser quem começa?
            </Text>
            <TouchableOpacity
              onPress={onCreate}
              activeOpacity={0.8}
              style={styles.emptyCta}
            >
              <Plus size={16} color={THEME.onAccent} />
              <Text style={styles.emptyCtaText}>Criar um evento</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 58 : 48,
    paddingHorizontal: SPACING.screenPadding,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cityText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 16,
    color: BASE.ink,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 14,
    color: THEME.onAccent,
  },
  titleSection: {
    paddingTop: 16,
    paddingHorizontal: SPACING.screenPadding,
  },
  mainTitle: {
    fontFamily: FONT_FAMILY.hanken.extraBold,
    fontSize: 33,
    color: BASE.ink,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 14.5,
    color: BASE.ink2,
    marginTop: 7,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE.soft,
    borderRadius: 14,
    height: 46,
    paddingHorizontal: 14,
    marginTop: 16,
    marginHorizontal: SPACING.screenPadding,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 15,
    color: BASE.ink,
  },
  chipsContainer: {
    paddingHorizontal: SPACING.screenPadding,
    paddingTop: 16,
    paddingBottom: 6,
    gap: SPACING.chipGap,
  },
  timeline: {
    paddingLeft: SPACING.screenPadding,
    paddingRight: SPACING.screenPadding,
    paddingTop: 8,
    position: 'relative',
  },
  timelineRail: {
    position: 'absolute',
    left: 22,
    top: 0,
    bottom: 18,
    width: 2,
    backgroundColor: BASE.line2,
  },
  bucketSection: {
    marginTop: 8,
  },
  bucketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  bucketDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: THEME.accent,
  },
  bucketLabel: {
    fontFamily: FONT_FAMILY.hanken.extraBold,
    fontSize: 15,
    color: BASE.ink,
    letterSpacing: -0.2,
  },
  bucketRange: {
    fontFamily: FONT_FAMILY.space.medium,
    fontSize: 11.5,
    color: BASE.ink3,
  },
  bucketLine: {
    flex: 1,
    height: 1,
    backgroundColor: BASE.line2,
  },
  bucketCount: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 12,
    color: BASE.ink3,
  },
  bucketCards: {
    gap: SPACING.cardGap,
    paddingLeft: 18,
    paddingTop: 4,
  },
  cardWrapper: {
    position: 'relative',
  },
  cardDot: {
    position: 'absolute',
    left: -10.5,
    top: 26,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: BASE.bg,
    borderWidth: 2,
    borderColor: THEME.accent,
    zIndex: 1,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: BASE.soft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 18,
    color: BASE.ink,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 14,
    color: BASE.ink2,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: SPACING.buttonRadius,
  },
  emptyCtaText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 15,
    color: THEME.onAccent,
  },
});
