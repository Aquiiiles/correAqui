import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Event } from '../types';
import { BASE, THEME, FONT_FAMILY, SPACING, SHADOWS, sportColors } from '../constants/tokens';
import { Cover } from './Cover';
import { SportTag } from './SportTag';
import { AvatarStack } from './AvatarStack';
import { Pin, Clock, Check } from './Icons';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const isFree = event.price === 'Grátis';
  const spotsLeft = event.spots ? event.spots - event.going : undefined;
  const showSpotsWarning = spotsLeft !== undefined && spotsLeft <= 6;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      <View style={styles.coverWrapper}>
        <Cover
          sport={event.sport}
          height={event.featured ? 132 : 116}
        />
        <View style={styles.coverOverlay}>
          <SportTag sport={event.sport} />
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>
              {event.day} · {event.date}
            </Text>
          </View>
        </View>
        {event.mine && (
          <View style={styles.mineBadge}>
            <Check size={12} color={THEME.onAccent} />
            <Text style={styles.mineText}>Seu evento</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.metaRow}>
          <Pin size={12} color={BASE.ink3} />
          <Text style={styles.metaText}>{event.neighborhood}</Text>
          <Text style={styles.separator}>·</Text>
          <Clock size={12} color={BASE.ink3} />
          <Text style={styles.metaText}>{event.time}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <AvatarStack
            people={event.people}
            count={event.going}
            unit={event.unit}
          />
          <View style={styles.footerRight}>
            {showSpotsWarning && (
              <Text style={styles.spotsText}>{spotsLeft} vagas</Text>
            )}
            <View
              style={[
                styles.priceBadge,
                {
                  backgroundColor: isFree
                    ? sportColors('pelada').cover
                    : BASE.soft,
                },
              ]}
            >
              <Text
                style={[
                  styles.priceText,
                  {
                    color: isFree
                      ? sportColors('pelada').ink
                      : BASE.ink,
                  },
                ]}
              >
                {event.price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE.surface,
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    borderColor: BASE.line2,
    ...SHADOWS.card,
  },
  coverWrapper: {
    padding: 8,
    position: 'relative',
  },
  coverOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateBadge: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dateBadgeText: {
    fontFamily: FONT_FAMILY.space.semiBold,
    fontSize: 12,
    color: BASE.ink,
  },
  mineBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: THEME.accent,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mineText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 11,
    color: THEME.onAccent,
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 4,
  },
  title: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 17,
    color: BASE.ink,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },
  metaText: {
    fontFamily: FONT_FAMILY.hanken.medium,
    fontSize: 13,
    color: BASE.ink2,
  },
  separator: {
    color: BASE.ink3,
    opacity: 0.4,
  },
  divider: {
    height: 1,
    backgroundColor: BASE.line2,
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spotsText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 11.5,
    color: THEME.accent,
  },
  priceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
  },
  priceText: {
    fontFamily: FONT_FAMILY.space.semiBold,
    fontSize: 13,
  },
});
