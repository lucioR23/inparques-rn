# Inparques Lara — Aplicación móvil (React Native)

Versión móvil del proyecto sociotecnológico **Inparques Lara** (gestión de los
parques nacionales y recreacionales del estado Lara), desarrollada para el
**Entregable de la Unidad 3: Adapters** (20 pts / 20 %).

La aplicación permite iniciar sesión, consultar parques, registrar el aforo
diario de visitantes y vehículos, solicitar prestaciones de servicio, consultar
el catálogo de servicios y ver las ubicaciones de los parques. Toda la
información vive en el **estado global de Redux Toolkit** (base de datos
simulada, sin backend), tal como permite la evaluación.

---

## Datos del equipo

- Luciano Cozzi — C.I. 30.796.896
- Jhonger Barroeta — C.I. 31.544.822
- Antony Rodriguez — C.I. 30.803.004
- Sección: **IN3113**

---

## 1. Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| React Native + Expo | Aplicación móvil con componentes funcionales |
| React Navigation 7 | Stack raíz condicional + Bottom Tabs + stacks anidados |
| Redux Toolkit | `configureStore`, `createSlice`, `createAsyncThunk`, `useSelector`, `useDispatch` |
| React Hook Form | `useForm`, `Controller`, `handleSubmit`, `formState.errors` |
| Custom Hooks | `useAuth`, `useParques`, `useAforo`, `useReservas` |
| StyleSheet | Estilos centralizados en `src/config/theme.js` |

---

## 2. Instalación y ejecución

```bash
cd inparques_rn
npm install
npx expo start
```

Luego escanea el código QR con **Expo Go** o pulsa `a` para abrir el emulador
de Android.

Para demostrar sin teléfono, en el navegador:

```bash
npm run web
```

> Requiere **Node.js 22+** y **Expo SDK 56**.

### Ejecutar en Expo Snack

1. Entra a [snack.expo.dev](https://snack.expo.dev) y crea un proyecto nuevo.
2. Verifica que el selector de SDK (abajo a la derecha) esté en **56**.
3. Importa la carpeta del proyecto o pega los archivos, incluido el
   `package.json` actualizado.
4. Snack instala las dependencias del `package.json`. Si alguna aparece como
   faltante, agrégala desde el panel de dependencias con la misma versión.
5. Espera a que termine la instalación y recarga la vista previa.

> Snack no es adecuado para proyectos grandes: para la demostración final se
> recomienda ejecutar la app localmente (web o Expo Go).

---

## 3. Credenciales de demostración

La pantalla de login muestra las credenciales y permite completar el formulario
con un toque. También puedes escribirlas:

| Cédula | Contraseña | Rol |
|---|---|---|
| V-12345678 | `Inparques2026` | Administrador |
| V-23456789 | `Operador2026` | Operador |
| V-34567890 | `Auditor2026` | Auditor |

> Son datos ficticios: Redux no es un sistema de autenticación seguro y aquí se
> usa únicamente con fines académicos.

---

## 4. Estructura del proyecto

```
inparques_rn/
├── App.js                       # Provider + SafeArea + AppNavigator
├── app.json                     # Configuración de Expo
├── babel.config.js
├── assets/                      # Logos del proyecto
└── src/
    ├── components/              # Componentes reutilizables
    │   ├── Badge.js
    │   ├── CustomButton.js
    │   ├── CustomInput.js
    │   ├── EmptyState.js
    │   ├── OptionChips.js
    │   ├── ParkCard.js
    │   ├── QuickActionCard.js
    │   ├── ReservaCard.js
    │   └── ServiceCard.js
    ├── config/
    │   └── theme.js             # Colores, espacios, radios y sombras
    ├── hooks/                   # Custom Hooks
    │   ├── useAforo.js
    │   ├── useAuth.js
    │   ├── useParques.js
    │   └── useReservas.js
    ├── routes/
    │   ├── AppNavigator.js      # Stack raíz (login / app autenticada)
    │   └── TabsNavigator.js     # Bottom Tabs + stacks anidados
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── HomeScreen.js
    │   ├── ParksScreen.js
    │   ├── ParksDetailScreen.js
    │   ├── AforoScreen.js
    │   ├── ServicesScreen.js
    │   ├── ReservasScreen.js
    │   ├── NuevaReservaScreen.js
    │   ├── MapScreen.js
    │   └── ProfileScreen.js
    ├── store/
    │   ├── store.js
    │   ├── authSlice.js
    │   ├── parquesSlice.js
    │   ├── serviciosSlice.js
    │   ├── reservasSlice.js
    │   └── aforoSlice.js
    └── utils/
        └── validaciones.js      # Regex, fechas, montos y formatos
```

---

## 5. Correspondencia con los criterios de la evaluación

### Parte A — Pantallas

| Requisito | Dónde se cumple |
|---|---|
| Pantalla principal con estado global | `HomeScreen`: saludo del usuario, contadores de parques, aforo del día y reservas pendientes desde Redux |
| Componentes personalizados y reutilizables | 9 componentes en `src/components` (botones, inputs, chips, tarjetas, badges, estados vacíos) |
| Acceso a las funcionalidades | Accesos rápidos y tarjetas con navegación programática |
| Pantallas de formulario | `LoginScreen`, `AforoScreen`, `NuevaReservaScreen`, `ServicesScreen` |

### Parte B — Navegación

| Requisito | Dónde se cumple |
|---|---|
| React Navigation | `NavigationContainer` en `AppNavigator` |
| Stack / Tabs combinados | Stack raíz + Bottom Tabs + un stack por pestaña |
| Navegación programática | Accesos rápidos del Inicio, botones de detalle y perfil |
| Parámetros entre pantallas | `ParquesLista → ParqueDetalle` (`parqueId`), `ParqueDetalle → Aforo` (`parqueId`), `ParqueDetalle → NuevaReserva` (`parqueId`) |
| Pantallas conectadas | Login → panel; cierre de sesión regresa al login (stack condicional) |

### Parte C — React Hook Form

| Requisito | Dónde se cumple |
|---|---|
| `useForm` | Los cuatro formularios |
| `Controller` + `control` | Todos los campos, incluidos los chips de selección |
| `handleSubmit` | Envío bloqueado si hay errores |
| `formState.errors` | Mensajes bajo cada campo |
| Validaciones | Obligatorios, longitudes mín./máx., formato de cédula, teléfono, correo, fechas reales/no futuras, rangos numéricos |
| Datos inválidos | `handleSubmit` no ejecuta el envío hasta que el formulario sea válido |

### Parte D — Redux Toolkit

| Requisito | Dónde se cumple |
|---|---|
| `configureStore` | `src/store/store.js` |
| `Provider` | `App.js` |
| `createSlice` | `auth`, `parques`, `servicios`, `reservas`, `aforo` |
| Estado inicial | Cada slice define su base simulada |
| Acciones y reducers | Login/logout, alta de reservas, registro de aforo, cambio de estado de parques, alta de servicios |
| `useSelector` | En pantallas y en los Custom Hooks |
| `useDispatch` | En pantallas y Custom Hooks |
| Acceso desde varias pantallas | El aforo se registra en Aforo y se ve en Inicio y Perfil; las reservas se crean en NuevaReserva y se ven en Reservas, Inicio y Perfil |

### Parte E — Custom Hooks

| Hook | Responsabilidad | Se usa en |
|---|---|---|
| `useAuth` | Login/logout y sesión | `LoginScreen`, `ProfileScreen`, `HomeScreen`, `AppNavigator` |
| `useParques` | Consulta y actualización de parques | `HomeScreen`, `ParksScreen`, `ParksDetailScreen`, `MapScreen`, `AforoScreen`, `NuevaReservaScreen`, `ProfileScreen` |
| `useAforo` | Registro y totales de aforo | `AforoScreen`, `HomeScreen`, `ProfileScreen` |
| `useReservas` | Alta, cancelación y contadores de reservas | `ReservasScreen`, `NuevaReservaScreen`, `HomeScreen`, `ProfileScreen` |

### Parte F — Requerimientos generales

- Componentes funcionales y Hooks en toda la aplicación.
- Más de tres componentes personalizados y reutilizables.
- Comunicación por `props` (`ParkCard`, `ServiceCard`, `ReservaCard`, `QuickActionCard`, `Badge`, `EmptyState`).
- Estilos con `StyleSheet` centralizados en un tema.
- Separación de responsabilidades: `components`, `screens`, `store`, `hooks`, `routes`, `config`, `utils`.
- `package.json` funcional con todas las dependencias.

---

## 6. Guion de demostración

El archivo [`GUION_DEMOSTRACION.md`](./GUION_DEMOSTRACION.md) contiene un
recorrido paso a paso, alineado con lo que solicita la evaluación.
