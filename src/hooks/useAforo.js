import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrarAforo } from '../store/aforoSlice';
import { hoyIso } from '../utils/validaciones';

export default function useAforo() {
  const dispatch = useDispatch();
  const registros = useSelector((state) => state.aforo.registros);

  const registrosDeHoy = useMemo(() => {
    const hoy = hoyIso();
    return registros.filter((r) => r.fecha === hoy);
  }, [registros]);

  const totalPersonasHoy = useMemo(
    () => registrosDeHoy.reduce((total, r) => total + r.totalPersonas, 0),
    [registrosDeHoy],
  );

  const totalVehiculosHoy = useMemo(
    () => registrosDeHoy.reduce((total, r) => total + r.totalVehiculos, 0),
    [registrosDeHoy],
  );

  const registrar = useCallback(
    (registro) => dispatch(registrarAforo(registro)),
    [dispatch],
  );

  const porParque = useCallback(
    (parqueId) => registros.filter((r) => r.parqueId === parqueId),
    [registros],
  );

  return {
    registros,
    registrosDeHoy,
    totalPersonasHoy,
    totalVehiculosHoy,
    registrar,
    porParque,
  };
}
