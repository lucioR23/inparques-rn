import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cargarReservas,
  crearReserva,
  cancelarReserva,
} from '../store/reservasSlice';

export default function useReservas() {
  const dispatch = useDispatch();
  const reservas = useSelector((state) => state.reservas.listaDeReservas);

  const pendientes = useMemo(
    () => reservas.filter((r) => r.estado === 'Pendiente'),
    [reservas],
  );

  const activas = useMemo(
    () => reservas.filter((r) => r.estado !== 'Cancelada'),
    [reservas],
  );

  const crear = useCallback((reserva) => dispatch(crearReserva(reserva)), [dispatch]);

  const cancelar = useCallback((id) => dispatch(cancelarReserva(id)), [dispatch]);

  const recargar = useCallback(() => dispatch(cargarReservas()), [dispatch]);

  const porParque = useCallback(
    (parqueId) => reservas.filter((r) => r.parqueId === parqueId),
    [reservas],
  );

  return { reservas, pendientes, activas, crear, cancelar, recargar, porParque };
}
