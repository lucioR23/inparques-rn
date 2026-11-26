import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import ParkCard from '../components/ParkCard';
import CustomInput from '../components/CustomInput';
import OptionChips from '../components/OptionChips';
import EmptyState from '../components/EmptyState';
import useParques from '../hooks/useParques';
import { cargarParques } from '../store/parquesSlice';
import { colors, spacing } from '../config/theme';

const FILTROS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Abiertos', value: 'abiertos' },
  { label: 'Cerrados', value: 'cerrados' },
];

export default function ParksScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { parques } = useParques();

  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    dispatch(cargarParques());
  }, [dispatch]);

  const parquesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return parques.filter((parque) => {
      const coincideTexto =
        !texto ||
        parque.nombre.toLowerCase().includes(texto) ||
        parque.ciudad.toLowerCase().includes(texto);

      const coincideEstado =
        filtro === 'todos' ||
        (filtro === 'abiertos' && parque.estadoOperativo === 'Abierto') ||
        (filtro === 'cerrados' && parque.estadoOperativo === 'Cerrado');

      return coincideTexto && coincideEstado;
    });
  }, [parques, busqueda, filtro]);

  return (
    <FlatList
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      data={parquesFiltrados}
      keyExtractor={(parque) => parque.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View>
          <CustomInput
            label="Buscar parque"
            placeholder="Nombre o ciudad"
            value={busqueda}
            onChange={setBusqueda}
            returnKeyType="search"
          />

          <OptionChips
            label="Estado operativo"
            options={FILTROS}
            value={filtro}
            onChange={setFiltro}
          />

          <Text style={styles.contador}>
            {parquesFiltrados.length} de {parques.length} parques
          </Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          icono="leaf-outline"
          titulo="Sin resultados"
          mensaje="No hay parques que coincidan con la búsqueda o el filtro seleccionado."
        />
      }
      renderItem={({ item }) => (
        <ParkCard
          item={item}
          onPress={() =>
            navigation.navigate('ParqueDetalle', { parqueId: item.id })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  contador: { fontSize: 11, color: colors.textMuted, marginBottom: spacing.md },
});
