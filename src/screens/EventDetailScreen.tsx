import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Event } from '../types';
import { BASE, THEME, FONT_FAMILY, SPACING, SHADOWS, sportColors } from '../constants/tokens';
import { Cover } from '../components/Cover';
import { SportTag } from '../components/SportTag';
import { AvatarStack } from '../components/AvatarStack';
import { Back, Share, Bookmark, Pin, Check } from '../components/Icons';

interface EventDetailScreenProps {
  event: Event;
  onBack: () => void;
}

export function EventDetailScreen({ event, onBack }: EventDetailScreenProps) {
  const [going, setGoing] = useState(false);
  const [saved, setSaved] = useState(false);

  const isFree = event.price === 'Grátis';
  const spotsLeft = event.spots ? event.spots - event.going : undefined;
  const percentage = event.spots ? (event.going / event.spots) * 100 : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Cover sport={event.sport} height={252} rounded={false} big />
          {/* Top Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity onPress={onBack} style={styles.glassBtn} activeOpacity={0.8}>
              <Back size={22} color={BASE.ink} />
            </TouchableOpacity>
            <View style={styles.topRight}>
              <TouchableOpacity style={styles.glassBtn} activeOpacity={0.8}>
                <Share size={20} color={BASE.ink} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.glassBtn}
                activeOpacity={0.8}
                onPress={() => setSaved(!saved)}
              >
                <Bookmark
                  size={20}
                  color={saved ? THEME.accent : BASE.ink}
                  fill={saved ? THEME.accent : undefined}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Sport Tag */}
          <View style={styles.heroTag}>
            <SportTag sport={event.sport} solid />
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.title}>{event.title}</Text>

          {/* Host */}
          <View style={styles.hostRow}>
            <View style={styles.hostAvatar}>
              <Text style={styles.hostAvatarText}>{event.hostInitial}</Text>
            </View>
            <Text style={styles.hostText}>
              por <Text style={styles.hostName}>{event.host}</Text>
            </Text>
          </View>

          {/* Date Card */}
          <View style={styles.dateCard}>
            <View style={styles.dateBlock}>
              <Text style={styles.dateDay}>{event.day.toUpperCase()}</Text>
              <Text style={styles.dateNum}>{event.date.split(' ')[0]}</Text>
              <Text style={styles.dateMonth}>{event.date.split(' ')[1]?.toUpperCase()}</Text>
            </View>
            <View style={styles.dateDivider} />
            <View style={styles.dateInfo}>
              <Text style={styles.dateInfoMain}>
                {event.day}, {event.date} · {event.time}
              </Text>
              <Text style={styles.dateInfoMeta}>{event.meta}</Text>
            </View>
            <Text style={styles.agendaLink}>+ Agenda</Text>
          </View>

          {/* Facts */}
          <View style={styles.factsRow}>
            <View style={styles.factCard}>
              <Text style={styles.factLabel}>FORMATO</Text>
              <Text style={styles.factValue}>{event.meta.split('·')[0]?.trim()}</Text>
            </View>
            <View style={styles.factCard}>
              <Text style={styles.factLabel}>NÍVEL</Text>
              <Text style={styles.factValue}>{event.level}</Text>
            </View>
            <View style={styles.factCard}>
              <Text style={styles.factLabel}>VALOR</Text>
              <Text style={styles.factValue}>{event.price}</Text>
            </View>
          </View>

          {/* Where */}
          <Text style={styles.sectionTitle}>ONDE</Text>
          <View style={styles.whereRow}>
            <Pin size={16} color={THEME.accent} />
            <Text style={styles.whereNeighborhood}>{event.neighborhood}</Text>
            <Text style={styles.whereCity}> · {event.city}</Text>
          </View>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>mapa do local · toque para abrir</Text>
          </View>

          {/* Who */}
          <Text style={styles.sectionTitle}>QUEM VAI</Text>
          <AvatarStack people={event.people} count={event.going} size={32} unit={event.unit} />
          {event.spots && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min(percentage, 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {spotsLeft! > 0
                  ? `${spotsLeft} vagas restantes`
                  : 'Lotado — entre na lista de espera'}
              </Text>
            </View>
          )}

          {/* About */}
          <Text style={styles.sectionTitle}>SOBRE</Text>
          <Text style={styles.blurb}>{event.blurb}</Text>

          {/* Host Card */}
          <Text style={styles.sectionTitle}>ORGANIZAÇÃO</Text>
          <View style={styles.hostCard}>
            <View style={styles.hostCardAvatar}>
              <Text style={styles.hostCardAvatarText}>{event.hostInitial}</Text>
            </View>
            <View style={styles.hostCardInfo}>
              <Text style={styles.hostCardName}>{event.host}</Text>
              <Text style={styles.hostCardSub}>Organizador · 4,9 ★</Text>
            </View>
            <Text style={styles.hostCardLink}>Ver perfil</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.ctaBar}>
        <View style={styles.ctaPriceSection}>
          <Text style={styles.ctaPrice}>{event.price}</Text>
          <Text style={styles.ctaPriceSub}>por pessoa</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            going && styles.ctaButtonConfirmed,
          ]}
          activeOpacity={0.8}
          onPress={() => setGoing(!going)}
        >
          {going && <Check size={18} color={THEME.accent} />}
          <Text
            style={[
              styles.ctaButtonText,
              going && styles.ctaButtonTextConfirmed,
            ]}
          >
            {going ? 'Você vai!' : 'Confirmar presença'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  hero: {
    position: 'relative',
  },
  topControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRight: {
    flexDirection: 'row',
    gap: 9,
  },
  glassBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.glass,
  },
  heroTag: {
    position: 'absolute',
    left: 18,
    bottom: 18,
  },
  body: {
    backgroundColor: BASE.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -22,
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  title: {
    fontFamily: FONT_FAMILY.hanken.extraBold,
    fontSize: 26,
    color: BASE.ink,
    letterSpacing: -0.6,
    lineHeight: 29,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  hostAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: THEME.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostAvatarText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 11,
    color: THEME.tintInk,
  },
  hostText: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 14,
    color: BASE.ink2,
  },
  hostName: {
    fontFamily: FONT_FAMILY.hanken.bold,
    color: BASE.ink,
  },
  dateCard: {
    borderWidth: 1,
    borderColor: BASE.line,
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateBlock: {
    alignItems: 'center',
  },
  dateDay: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 11,
    color: THEME.accent,
  },
  dateNum: {
    fontFamily: FONT_FAMILY.space.bold,
    fontSize: 22,
    color: BASE.ink,
  },
  dateMonth: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 11,
    color: BASE.ink3,
  },
  dateDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: BASE.line2,
  },
  dateInfo: {
    flex: 1,
  },
  dateInfoMain: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 15,
    color: BASE.ink,
  },
  dateInfoMeta: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 13,
    color: BASE.ink2,
    marginTop: 2,
  },
  agendaLink: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 12.5,
    color: THEME.accent,
  },
  factsRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 12,
  },
  factCard: {
    flex: 1,
    backgroundColor: BASE.soft,
    borderRadius: 14,
    padding: 12,
  },
  factLabel: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 11,
    color: BASE.ink3,
    letterSpacing: 0.3,
  },
  factValue: {
    fontFamily: FONT_FAMILY.space.semiBold,
    fontSize: 15,
    color: BASE.ink,
    marginTop: 5,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.hanken.extraBold,
    fontSize: 13,
    color: BASE.ink,
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 12,
  },
  whereRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  whereNeighborhood: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 15,
    color: BASE.ink,
  },
  whereCity: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 14,
    color: BASE.ink3,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: BASE.soft,
    borderRadius: 14,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 13,
    color: BASE.ink3,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 7,
    backgroundColor: BASE.soft,
    borderRadius: 9,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: THEME.accent,
    borderRadius: 9,
  },
  progressText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 12,
    color: BASE.ink2,
    marginTop: 6,
  },
  blurb: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 14.5,
    color: BASE.ink2,
    lineHeight: 23,
  },
  hostCard: {
    borderWidth: 1,
    borderColor: BASE.line,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  hostCardAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostCardAvatarText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 16,
    color: THEME.tintInk,
  },
  hostCardInfo: {
    flex: 1,
  },
  hostCardName: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 15,
    color: BASE.ink,
  },
  hostCardSub: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 13,
    color: BASE.ink3,
    marginTop: 2,
  },
  hostCardLink: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 13,
    color: THEME.accent,
  },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: BASE.line2,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 26 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ctaPriceSection: {},
  ctaPrice: {
    fontFamily: FONT_FAMILY.space.bold,
    fontSize: 19,
    color: BASE.ink,
  },
  ctaPriceSub: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 11.5,
    color: BASE.ink3,
  },
  ctaButton: {
    flex: 1,
    height: SPACING.ctaHeight,
    backgroundColor: THEME.accent,
    borderRadius: SPACING.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    ...SHADOWS.cta,
  },
  ctaButtonConfirmed: {
    backgroundColor: BASE.surface,
    borderWidth: 2,
    borderColor: THEME.accent,
    shadowOpacity: 0,
    elevation: 0,
  },
  ctaButtonText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 16,
    color: THEME.onAccent,
  },
  ctaButtonTextConfirmed: {
    color: THEME.accent,
  },
});
