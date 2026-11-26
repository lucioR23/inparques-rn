import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Badge from '../components/Badge';
import CustomButton from '../components/CustomButton';
import EmptyState from '../components/EmptyState';
import useParques from '../hooks/useParques';
import { colors, radius, sombra, spacing } from '../config/theme';

function Dato({ icono, etiqueta, valor }) {
  return (
    <View style={styles.dato}>
      <Ionicons name={icono} size={16} color={colors.primaryLight} />
      <Text style={styles.datoEtiqueta}>{etiqueta}</Text>
      <Text style={styles.datoValor}>{valor}</Text>
    </View>
  );
}

export default function ParksDetailScreen({ route, navigation }) {
  const { parqueId } = route.params || {};
  const { obtenerPorId, alternarEstado } = useParques();
  const parque = obtenerPorId(parqueId);

  useLayoutEffect(() => {
    if (parque) {
      navigation.setOptions({ title: parque.nombre });
    }
  }, [navigation, parque]);

  if (!parque) {
    return (
      <EmptyState
        icono="alert-circle-outline"
        titulo="Parque no encontrado"
        mensaje="El parque solicitado no existe en el estado global."
        accionTitulo="Volver al listado"
        onAccion={() => navigation.goBack()}
      />
    );
  }

  const abierto = parque.estadoOperativo === 'Abierto';

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      <View style={styles.encabezado}>
        <Badge
          label={parque.estadoOperativo}
          tone={abierto ? 'success' : 'danger'}
        />
        <Text style={styles.tipo}>{parque.tipo}</Text>
        <Text style={styles.nombre}>{parque.nombre}</Text>
        <Text style={styles.descripcion}>{parque.descripcion}</Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Información general</Text>
        <Dato icono="location-outline" etiqueta="Ciudad" valor={parque.ciudad} />
        <Dato icono="resize-outline" etiqueta="Superficie" valor={`${parque.hectareas} ha`} />
        <Dato icono="partly-sunny-outline" etiqueta="Clima" valor={parque.clima} />
        <Dato
          icono="flame-outline"
          etiqueta="Riesgo de incendio"
          valor={parque.riesgoIncendio}
        />
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Capacidad permitida</Text>
        <View style={styles.capacidades}>
          <View style={styles.capacidad}>
            <Ionicons name="people" size={20} color={colors.primaryLight} />
            <Text style={styles.capacidadNum}>{parque.maxPersonas}</Text>
            <Text style={styles.capacidadLabel}>personas</Text>
          </View>
          <View style={styles.capacidad}>
            <Ionicons name="car" size={20} color={colors.primaryLight} />
            <Text style={styles.capacidadNum}>{parque.maxVehiculos}</Text>
            <Text style={styles.capacidadLabel}>vehículos</Text>
          </View>
        </View>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.tituloTarjeta}>Áreas internas</Text>
        <View style={styles.areas}>
          {parque.areas.map((area) => (
            <Badge key={area} label={area} tone="neutral" />
          ))}
        </View>
      </View>

      <CustomButton
        title="Registrar aforo del parque"
        onPress={() => navigation.navigate('Aforo', { parqueId: parque.id })}
      />
      <CustomButton
        title="Solicitar prestación de servicio"
        variant="outline"
        onPress={() =>
          navigation.navigate('ReservasTab', {
            screen: 'NuevaReserva',
            params: { parqueId: parque.id },
          })
        }
      />
      <CustomButton
        title={abierto ? 'Marcar como cerrado' : 'Marcar como abierto'}
        variant="secundario"
        onPress={() => alternarEstado(parque.id)}
      />
      <CustomButton
        title="Ver catálogo de servicios"
        variant="outline"
        onPress={() => navigation.navigate('Servicios')}
      />

      <Text style={styles.nota}>
        El cambio de estado y el aforo se guardan en Redux y se reflejan en el
        listado y en el panel principal.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  encabezado: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  tipo: {
    color: colors.accentSoft,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: spacing.sm,
    textTransform: 'uppercase',
  },
  nombre: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  descripcion: {
    color: '#D8F3DC',
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  tarjeta: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...sombra.tarjeta,
  },
  tituloTarjeta: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  dato: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 5 },
  datoEtiqueta: { flex: 1, fontSize: 12, color: colors.textMuted },
  datoValor: { fontSize: 12, fontWeight: '700', color: colors.text },
  capacidades: { flexDirection: 'row', gap: spacing.lg },
  capacidad: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  capacidadNum: { fontSize: 20, fontWeight: '800', color: colors.primary, marginTop: 2 },
  capacidadLabel: { fontSize: 11, color: colors.primaryLight },
  areas: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  nota: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 16,
  },
});
