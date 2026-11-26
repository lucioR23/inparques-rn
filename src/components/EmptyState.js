import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { colors, spacing } from '../config/theme';


export default function EmptyState({
  icono = 'file-tray-outline',
  titulo,
  mensaje,
  accionTitulo,
  onAccion,
}) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.icono}>
        <Ionicons name={icono} size={30} color={colors.primaryLight} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      {accionTitulo && onAccion ? (
        <View style={styles.accion}>
          <CustomButton title={accionTitulo} onPress={onAccion} variant="outline" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: 'center', paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg },
  icono: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  titulo: { fontSize: 16, fontWeight: '700', color: colors.primary, textAlign: 'center' },
  mensaje: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 19,
  },
  accion: { width: '100%', maxWidth: 240 },
});
