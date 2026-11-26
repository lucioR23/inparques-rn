import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ReservaCard from '../components/ReservaCard';
import CustomButton from '../components/CustomButton';
import EmptyState from '../components/EmptyState';
import useReservas from '../hooks/useReservas';
import { colors, radius, spacing } from '../config/theme';
import { isoAFecha } from '../utils/validaciones';

export default function ReservasScreen({ navigation }) {
  const { reservas, pendientes, activas, cancelar } = useReservas();

  const confirmarCancelacion = (reserva) => {
    Alert.alert(
      'Cancelar solicitud',
      `¿Deseas cancelar la reserva de ${reserva.parque} para el ${isoAFecha(
        reserva.fecha,
      )}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => cancelar(reserva.id),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      <View style={styles.resumen}>
        <View style={styles.resumenDato}>
          <Ionicons name="calendar-outline" size={18} color={colors.primary} />
          <Text style={styles.resumenNum}>{activas.length}</Text>
          <Text style={styles.resumenLabel}>activas</Text>
        </View>
        <View style={styles.divisor} />
        <View style={styles.resumenDato}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.resumenNum}>{pendientes.length}</Text>
          <Text style={styles.resumenLabel}>pendientes</Text>
        </View>
      </View>

      <CustomButton
        title="Nueva solicitud de prestación"
        onPress={() => navigation.navigate('NuevaReserva')}
      />

      <Text style={styles.tituloSeccion}>Solicitudes registradas</Text>

      {reservas.length === 0 ? (
        <EmptyState
          icono="calendar-outline"
          titulo="Sin solicitudes"
          mensaje="Registra una nueva prestación de servicio para verla aquí."
          accionTitulo="Crear solicitud"
          onAccion={() => navigation.navigate('NuevaReserva')}
        />
      ) : (
        reservas.map((reserva) => (
          <ReservaCard
            key={reserva.id}
            reserva={reserva}
            onCancelar={confirmarCancelacion}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  resumen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  resumenDato: { flex: 1, alignItems: 'center' },
  resumenNum: { fontSize: 20, fontWeight: '800', color: colors.primary },
  resumenLabel: { fontSize: 10, color: colors.primaryLight },
  divisor: { width: 1, height: 32, backgroundColor: '#B7E4C7' },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
});
