import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cargarParques,
  alternarEstadoParque,
  actualizarParque,
} from '../store/parquesSlice';


export default function useParques() {
  const dispatch = useDispatch();
  const parques = useSelector((state) => state.parques.listaDeParques);
  const cargando = useSelector((state) => state.parques.cargando);

  const abiertos = useMemo(
    () => parques.filter((p) => p.estadoOperativo === 'Abierto'),
    [parques],
  );

  const obtenerPorId = useCallback(
    (id) => parques.find((p) => p.id === id) || null,
    [parques],
  );

  const alternarEstado = useCallback(
    (id) => dispatch(alternarEstadoParque(id)),
    [dispatch],
  );

  const actualizar = useCallback(
    (id, cambios) => dispatch(actualizarParque({ id, cambios })),
    [dispatch],
  );

  const recargar = useCallback(() => dispatch(cargarParques()), [dispatch]);

  return { parques, abiertos, cargando, obtenerPorId, alternarEstado, actualizar, recargar };
}
