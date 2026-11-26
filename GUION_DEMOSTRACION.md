# Guion de demostración — Unidad 3 (Adapters)

Recorrido sugerido para la presentación (10–15 minutos). Cada paso indica qué
mostrar y qué requisito de la evaluación queda evidenciado.

---

## 1. Presentación del proyecto (1 min)

- **Propósito:** sistema móvil para la gestión de los parques nacionales y
  recreacionales del estado Lara (Inparques Lara).
- **Funcionalidades:** inicio de sesión simulado, consulta de parques, registro
  de aforo diario, prestaciones de servicio, catálogo de servicios, ubicaciones
  y perfil con cierre de sesión.
- **Aclaratoria:** la información se guarda en Redux Toolkit como base de datos
  simulada; no hay backend ni persistencia al cerrar la app.

---

## 2. Inicio de sesión y validaciones (2 min)

1. Abrir la app: se muestra el login.
2. Pulsar **Iniciar sesión** con los campos vacíos → aparecen los mensajes de
   error y **no se envía** el formulario.
3. Escribir una cédula de 3 dígitos → error de longitud mínima.
4. Escribir una cédula válida con una contraseña incorrecta → mensaje
   "La contraseña no coincide…".
5. Tocar una credencial de demostración (por ejemplo **V-12345678**) y entrar.

**Se evidencia:** `useForm`, `Controller`, `formState.errors`, validaciones de
obligatoriedad/formato/longitud, `handleSubmit` bloqueando envíos inválidos,
`useAuth`, `createAsyncThunk` y estado global de autenticación.

---

## 3. Pantalla principal y estado global (2 min)

1. En **Inicio**, señalar el saludo con el usuario autenticado, la fecha y los
   contadores: parques, visitantes de hoy y vehículos de hoy.
2. Mostrar que esos contadores provienen de distintas slices (`auth`,
   `parques`, `aforo`, `reservas`).
3. Tocar una tarjeta de parque → se abre el detalle enviando `parqueId`.

**Se evidencia:** pantalla principal, `useSelector`, Custom Hooks, navegación
programática con parámetros.

---

## 4. Navegación (1 min)

1. Recorrer las pestañas: **Inicio, Parques, Reservas, Mapa, Perfil**.
2. En Parques, usar el buscador y los filtros (Todos / Abiertos / Cerrados).
3. Abrir un parque y volver con la flecha del encabezado.
4. Desde el detalle, pulsar **Registrar aforo del parque** → el formulario
   llega con el parque preseleccionado.
5. Desde el detalle, pulsar **Solicitar prestación de servicio** → cambia de
   pestaña y abre el formulario con el parque preseleccionado.

**Se evidencia:** Stack + Bottom Tabs, navegación anidada, envío y recepción de
parámetros, navegación programática.

---

## 5. Aforo y validaciones numéricas (3 min)

1. En **Registrar aforo**, dejar todos los contadores en 0 y enviar → error
   "Registra al menos una persona".
2. Escribir una fecha futura → error de fecha no futura.
3. Escribir un teléfono con formato inválido → error de formato.
4. Escribir un correo inválido → error de correo.
5. Completar correctamente: adultos 120, niños 30, discapacitados 2, motos 5,
   carros 12, buses 1, responsable y cédula válidos, teléfono `0414-1234567`.
6. Enviar → mensaje de éxito; el registro aparece en **Registros de hoy**.
7. Volver a **Inicio** y mostrar que el contador de visitantes y vehículos
   aumentó. Abrir **Perfil** y mostrar el mismo dato.

**Se evidencia:** formulario completo, validaciones específicas (rangos,
cédula, teléfono, correo, fecha), `handleSubmit`, `reset`, `useAforo` y
actualización del estado global visible desde tres pantallas.

---

## 6. Prestaciones de servicio (2 min)

1. Ir a **Reservas** → se ven las solicitudes de demostración con su estado.
2. Crear una nueva: elegir parque, fecha futura, 8 personas, teléfono, correo y
   un motivo de al menos 10 caracteres.
3. Intentar enviar con una fecha pasada y con 0 personas → errores.
4. Enviar correctamente → la solicitud aparece como **Pendiente**.
5. Cancelar una solicitud y confirmar → cambia a **Cancelada**.
6. Volver a **Inicio**: el contador de pendientes se actualiza.

**Se evidencia:** segundo formulario, `Controller`, validaciones, acciones de
Redux (crear/cancelar), `useReservas`, comunicación entre pantallas.

---

## 7. Servicios y estado global (1 min)

1. Desde Inicio o desde el detalle del parque, abrir **Servicios**.
2. Mostrar el catálogo con precios y clasificación.
3. Registrar un servicio nuevo; intentar con un nombre ya existente → mensaje
   de error del `createAsyncThunk`.
4. Registrarlo con un nombre nuevo → aparece al inicio de la lista.

**Se evidencia:** `createAsyncThunk`, validación de reglas de negocio,
`useDispatch`/`useSelector`, `reset` del formulario.

---

## 8. Mapa y perfil (1 min)

1. En **Mapa**, buscar un parque y pulsar **Abrir en mapas** (abre la app de
   mapas del teléfono con las coordenadas).
2. En **Perfil**, mostrar los datos del usuario y el resumen del estado global.
3. Pulsar **Cerrar sesión** → regresa al login automáticamente (stack
   condicional).

**Se evidencia:** navegación, `Linking`, perfil, cierre de sesión y regreso al
flujo de autenticación.

---

## 9. Código y organización (1 min)

Abrir el proyecto y mostrar:

- `src/store/` → `configureStore`, cinco `createSlice`, estado inicial, acciones.
- `src/hooks/` → cuatro Custom Hooks con nombre `use…` y reglas de Hooks.
- `src/components/` → componentes reutilizables que reciben `props`.
- `src/routes/` → stack raíz y pestañas con stacks anidados.
- `src/utils/validaciones.js` → reglas compartidas.
- `src/config/theme.js` → estilos centralizados con `StyleSheet`.

---

## Preguntas frecuentes del jurado

**¿Dónde se usa `Controller` y `control`?**
En todos los formularios: login, aforo, nueva reserva y servicios. Incluso los
selectores de opciones (`OptionChips`) se integran con `Controller`.

**¿Cómo se impide el envío de información inválida?**
`handleSubmit` solo ejecuta `onSubmit` cuando no existen errores; además las
reglas `validate` de cada campo devuelven mensajes específicos.

**¿Qué pasa si cierro la aplicación?**
La información se pierde: la evaluación no exige persistencia. Redux funciona
como almacenamiento temporal durante la ejecución.

**¿Por qué las credenciales están en el código?**
Porque la autenticación es simulada y con datos ficticios, tal como permite la
evaluación. Redux no es un sistema de autenticación seguro.
