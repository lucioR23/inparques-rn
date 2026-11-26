import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  iniciarSesion as iniciarSesionAccion,
  cerrarSesion as cerrarSesionAccion,
  limpiarError,
} from '../store/authSlice';


export default function useAuth() {
  const dispatch = useDispatch();
  const { usuario, autenticado, cargando, error } = useSelector((state) => state.auth);

  const iniciarSesion = useCallback(
    async ({ nacionalidad, numero, clave }) => {
      const resultado = await dispatch(
        iniciarSesionAccion({ nacionalidad, numero, clave }),
      );

      if (resultado.meta.requestStatus === 'rejected') {
        return { ok: false, mensaje: resultado.payload || 'No fue posible iniciar sesión.' };
      }
      return { ok: true, usuario: resultado.payload };
    },
    [dispatch],
  );

  const cerrarSesion = useCallback(() => dispatch(cerrarSesionAccion()), [dispatch]);

  const descartarError = useCallback(() => dispatch(limpiarError()), [dispatch]);

  return {
    usuario,
    autenticado,
    cargando,
    error,
    iniciarSesion,
    cerrarSesion,
    descartarError,
  };
}
