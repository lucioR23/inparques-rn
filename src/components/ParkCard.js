import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from './Badge';
import { colors, radius, sombra, spacing } from '../config/theme';


export default function ParkCard({ item, onPress }) {
  const abierto = item.estadoOperativo === 'Abierto';

  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={() => onPress?.(item)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${item.nombre}`}
    >
      <View style={styles.encabezado}>
        <Badge
          label={item.estadoOperativo}
          tone={abierto ? 'success' : 'danger'}
        />
        <Text style={styles.tipo}>{item.tipo}</Text>
      </View>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.fila}>
        <Ionicons name="location-outline" size={14} color={colors.textMuted} />
        <Text style={styles.ubicacion}>
          {item.ciudad} · {item.hectareas} ha
        </Text>
      </View>

      <View style={styles.capacidad}>
        <View style={styles.dato}>
          <Ionicons name="people-outline" size={15} color={colors.primaryLight} />
          <Text style={styles.datoTexto}>{item.maxPersonas} personas</Text>
        </View>
        <View style={styles.dato}>
          <Ionicons name="car-outline" size={15} color={colors.primaryLight} />
          <Text style={styles.datoTexto}>{item.maxVehiculos} vehículos</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  encabezado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tipo: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.4 },
  nombre: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.sm,
  },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ubicacion: { fontSize: 12, color: colors.textMuted },
  capacidad: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  dato: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  datoTexto: { fontSize: 12, color: colors.text, fontWeight: '600' },
});
