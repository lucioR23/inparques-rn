import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Badge from '../components/Badge';
import CustomButton from '../components/CustomButton';
import useAuth from '../hooks/useAuth';
import useReservas from '../hooks/useReservas';
import useAforo from '../hooks/useAforo';
import useParques from '../hooks/useParques';
import { colors, radius, sombra, spacing } from '../config/theme';
import { iniciales } from '../utils/validaciones';

function Fila({ icono, etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Ionicons name={icono} size={16} color={colors.primaryLight} />
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { usuario, cerrarSesion } = useAuth();
  const { reservas, pendientes } = useReservas();
  const { totalPersonasHoy } = useAforo();
  const { parques } = useParques();

  const confirmarSalida = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Deseas salir del sistema? La información simulada permanecerá en memoria hasta cerrar la aplicación.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', style: 'destructive', onPress: cerrarSesion },
      ],
    );
  };

  if (!usuario) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.vacioTexto}>No hay una sesión activa.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      <View style={styles.encabezado}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{iniciales(usuario.nombre)}</Text>
        </View>
        <Text style={styles.nombre}>{usuario.nombre}</Text>
        <Badge label={usuario.rol} tone="success" />
        <Text style={styles.parque}>{usuario.parque}</Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Datos de la cuenta</Text>
        <Fila icono="card-outline" etiqueta="Cédula" valor={usuario.cedula} />
        <Fila icono="mail-outline" etiqueta="Correo" valor={usuario.correo} />
        <Fila icono="call-outline" etiqueta="Teléfono" valor={usuario.telefono} />
        <Fila icono="leaf-outline" etiqueta="Parque asignado" valor={usuario.parque} />
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Resumen del estado global</Text>
        <View style={styles.estadisticas}>
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{parques.length}</Text>
            <Text style={styles.estadisticaLabel}>Parques</Text>
          </View>
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{reservas.length}</Text>
            <Text style={styles.estadisticaLabel}>Reservas</Text>
          </View>
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{pendientes.length}</Text>
            <Text style={styles.estadisticaLabel}>Pendientes</Text>
          </View>
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{totalPersonasHoy}</Text>
            <Text style={styles.estadisticaLabel}>Aforo hoy</Text>
          </View>
        </View>
      </View>

      <View style={styles.nota}>
        <Ionicons name="information-circle-outline" size={16} color={colors.info} />
        <Text style={styles.notaTexto}>
          Sesión simulada con credenciales ficticias. Redux no es un sistema de
          autenticación seguro; su uso aquí es académico.
        </Text>
      </View>

      <CustomButton title="Cerrar sesión" variant="peligro" onPress={confirmarSalida} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  encabezado: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarTexto: { fontSize: 24, fontWeight: '800', color: colors.primaryDark },
  nombre: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  parque: { color: colors.accentSoft, fontSize: 12, marginTop: spacing.sm },
  tarjeta: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...sombra.tarjeta,
  },
  tituloTarjeta: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: spacing.sm,
  },
  fila: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 5 },
  etiqueta: { flex: 1, fontSize: 12, color: colors.textMuted },
  valor: { fontSize: 12, fontWeight: '700', color: colors.text, maxWidth: '55%', textAlign: 'right' },
  estadisticas: { flexDirection: 'row', justifyContent: 'space-between' },
  estadistica: { alignItems: 'center', flex: 1 },
  estadisticaNum: { fontSize: 19, fontWeight: '800', color: colors.primary },
  estadisticaLabel: { fontSize: 10, color: colors.textMuted, textAlign: 'center' },
  nota: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.infoSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  notaTexto: { flex: 1, fontSize: 11, color: colors.text, lineHeight: 16 },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  vacioTexto: { fontSize: 14, color: colors.textMuted },
});
