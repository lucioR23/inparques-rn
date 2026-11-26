import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from './Badge';
import { colors, radius, sombra, spacing } from '../config/theme';
import { isoAFecha } from '../utils/validaciones';

const TONOS = {
  Aprobada: 'success',
  Pendiente: 'warning',
  Cancelada: 'danger',
};

export default function ReservaCard({ reserva, onCancelar }) {
  const cancelada = reserva.estado === 'Cancelada';

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <Text style={styles.parque} numberOfLines={1}>
          {reserva.parque}
        </Text>
        <Badge label={reserva.estado} tone={TONOS[reserva.estado] || 'neutral'} />
      </View>

      <View style={styles.fila}>
        <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
        <Text style={styles.detalle}>{isoAFecha(reserva.fecha)}</Text>
        <Ionicons name="people-outline" size={14} color={colors.textMuted} />
        <Text style={styles.detalle}>{reserva.personas} personas</Text>
      </View>

      <Text style={styles.motivo}>{reserva.motivo}</Text>

      {!cancelada && onCancelar ? (
        <TouchableOpacity
          style={styles.cancelar}
          onPress={() => onCancelar(reserva)}
          accessibilityRole="button"
        >
          <Ionicons name="close-circle-outline" size={15} color={colors.danger} />
          <Text style={styles.cancelarTexto}>Cancelar solicitud</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...sombra.tarjeta,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  parque: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.primary },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.sm,
  },
  detalle: { fontSize: 12, color: colors.textMuted, marginRight: spacing.sm },
  motivo: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  cancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  cancelarTexto: { fontSize: 12, fontWeight: '700', color: colors.danger },
});
