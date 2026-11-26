import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Badge from './Badge';
import { colors, radius, sombra, spacing } from '../config/theme';
import { formatearMonto } from '../utils/validaciones';


export default function ServiceCard({ item }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>{item.nombre}</Text>
        <Badge
          label={item.clasificacion}
          tone={item.clasificacion === 'Grupal' ? 'info' : 'neutral'}
        />
      </View>

      <Text style={styles.descripcion}>{item.descripcion}</Text>

      <View style={styles.pie}>
        <Text style={styles.precio}>{formatearMonto(item.precio)}</Text>
        <Text style={styles.cobro}>{item.tipoCobro}</Text>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  titulo: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  descripcion: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  pie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  precio: { fontSize: 14, fontWeight: '700', color: colors.primaryLight },
  cobro: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
});
