export const REGEX = {
  soloDigitos: /^\d+$/,
  correo: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
  telefono: /^0(4\d{2}|2\d{2})-?\d{7}$/,
  fecha: /^(\d{2})\/(\d{2})\/(\d{4})$/,
  nombre: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/,
};

export const normalizarCedula = (nacionalidad, numero) =>
  `${nacionalidad}-${String(numero ?? '').replace(/\D/g, '')}`;

export const soloNumeros = (texto = '') => String(texto).replace(/[^\d]/g, '');

export const formatearFechaInput = (texto = '') => {
  const digitos = soloNumeros(texto).slice(0, 8);
  return [digitos.slice(0, 2), digitos.slice(2, 4), digitos.slice(4, 8)]
    .filter(Boolean)
    .join('/');
};

const parsearFecha = (valor) => {
  const coincidencia = REGEX.fecha.exec(String(valor ?? '').trim());
  if (!coincidencia) return null;

  const [, dia, mes, anio] = coincidencia.map(Number);
  const fecha = new Date(anio, mes - 1, dia);

  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes - 1 ||
    fecha.getDate() !== dia
  ) {
    return null;
  }
  return fecha;
};

export const fechaValida = (
  valor,
  { permitirPasada = true, permitirFutura = true } = {},
) => {
  const fecha = parsearFecha(valor);
  if (!fecha) return false;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (!permitirPasada && fecha < hoy) return false;
  if (!permitirFutura && fecha > hoy) return false;
  return true;
};

export const aIso = (fecha) => {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
};

export const fechaAIso = (valor) => {
  const fecha = parsearFecha(valor);
  return fecha ? aIso(fecha) : null;
};

export const isoAFecha = (iso) => {
  const [anio, mes, dia] = String(iso ?? '').split('-');
  if (!anio || !mes || !dia) return String(iso ?? '');
  return `${dia}/${mes}/${anio}`;
};

export const hoyIso = () => aIso(new Date());

export const hoyLegible = () =>
  new Date().toLocaleDateString('es-VE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const esEnteroEnRango = (valor, min, max) => {
  if (valor === '' || valor === null || valor === undefined) return false;
  const numero = Number(valor);
  return Number.isInteger(numero) && numero >= min && numero <= max;
};

export const formatearMonto = (valor) => {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return 'Bs. 0,00';

  const [entero, decimales] = numero.toFixed(2).split('.');
  const enteroConPuntos = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Bs. ${enteroConPuntos},${decimales}`;
};

export const iniciales = (nombre = '') =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');
