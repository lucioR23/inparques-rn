import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, sombra, spacing } from '../config/theme';

export default function QuickActionCard({ icono, titulo, detalle, color, onPress }) {
  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={titulo}
    >
      <View style={[styles.icono, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icono} size={22} color={color} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.detalle}>{detalle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 118,
    ...sombra.tarjeta,
  },
  icono: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  titulo: { fontSize: 13, fontWeight: '700', color: colors.text },
  detalle: { fontSize: 11, color: colors.textMuted, marginTop: 2, lineHeight: 15 },
});
