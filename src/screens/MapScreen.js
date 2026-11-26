import React, { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Badge from '../components/Badge';
import CustomInput from '../components/CustomInput';
import EmptyState from '../components/EmptyState';
import useParques from '../hooks/useParques';
import { colors, radius, sombra, spacing } from '../config/theme';

export default function MapScreen() {
  const { parques } = useParques();
  const [busqueda, setBusqueda] = useState('');

  const parquesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return parques;

    return parques.filter(
      (parque) =>
        parque.nombre.toLowerCase().includes(texto) ||
        parque.ciudad.toLowerCase().includes(texto),
    );
  }, [parques, busqueda]);

  const abrirMapa = async (parque) => {
    const { lat, lng } = parque.coordenadas;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('No disponible', 'No se pudo abrir la aplicación de mapas.');
    }
  };

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.intro}>
        Ubicaciones de los parques registrados. Toca "Abrir en mapas" para ver el
        punto exacto en tu aplicación de mapas.
      </Text>

      <CustomInput
        label="Buscar ubicación"
        placeholder="Nombre del parque o ciudad"
        value={busqueda}
        onChange={setBusqueda}
        returnKeyType="search"
      />

      {parquesFiltrados.length === 0 ? (
        <EmptyState
          icono="map-outline"
          titulo="Sin ubicaciones"
          mensaje="No hay parques que coincidan con la búsqueda."
        />
      ) : (
        parquesFiltrados.map((parque) => (
          <View key={parque.id} style={styles.tarjeta}>
            <View style={styles.encabezado}>
              <View style={styles.icono}>
                <Ionicons name="location" size={18} color={colors.primary} />
              </View>
              <View style={styles.textos}>
                <Text style={styles.nombre}>{parque.nombre}</Text>
                <Text style={styles.ciudad}>{parque.ciudad}</Text>
              </View>
              <Badge
                label={parque.estadoOperativo}
                tone={parque.estadoOperativo === 'Abierto' ? 'success' : 'danger'}
              />
            </View>

            <Text style={styles.coordenadas}>
              Lat {parque.coordenadas.lat.toFixed(4)} · Lng{' '}
              {parque.coordenadas.lng.toFixed(4)}
            </Text>

            <TouchableOpacity
              style={styles.botonMapa}
              onPress={() => abrirMapa(parque)}
              accessibilityRole="button"
            >
              <Ionicons name="navigate-outline" size={16} color={colors.primaryLight} />
              <Text style={styles.botonTexto}>Abrir en mapas</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  intro: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  tarjeta: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...sombra.tarjeta,
  },
  encabezado: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  icono: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: { flex: 1 },
  nombre: { fontSize: 14, fontWeight: '700', color: colors.text },
  ciudad: { fontSize: 11, color: colors.textMuted },
  coordenadas: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontVariant: ['tabular-nums'],
  },
  botonMapa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  botonTexto: { fontSize: 12, fontWeight: '700', color: colors.primaryLight },
});
