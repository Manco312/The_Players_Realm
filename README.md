# 🎮 The Players Realm

Aplicación web fullstack para la gestión y visualización de videojuegos, estudios y reseñas. Incluye autenticación con JWT, panel de estadísticas con gráficas interactivas y mapa mundial de estudios.

---

## 🚀 Tecnologías utilizadas

### Frontend
* **Vue 3** – Framework principal
* **TypeScript** – Tipado estático
* **Vite** – Bundler y servidor de desarrollo
* **Pinia** – Manejo de estado (solo sesión de autenticación)
* **Axios** – Cliente HTTP para consumir la API
* **Vue Router** – Navegación y guards por rol
* **Tailwind CSS** – Estilos
* **Chart.js** – Gráficas estadísticas
* **Leaflet** – Mapa interactivo
* **ESLint / Prettier** – Calidad de código

### Backend
* **NestJS** – Framework Node.js
* **TypeORM** – ORM para base de datos
* **SQLite (better-sqlite3)** – Base de datos
* **JWT + Passport** – Autenticación con tokens
* **bcrypt** – Hash de contraseñas
* **class-validator** – Validación de DTOs

---

## 📦 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Manco312/The_Players_Realm.git
cd The_Players_Realm
```

### 2. Backend

```bash
cd backend
npm install
npm run start:dev
```

El servidor queda disponible en `http://localhost:3000`.

> Al iniciar por primera vez, la base de datos SQLite se crea automáticamente y se puebla con datos de prueba.

### 3. Frontend

Crear el archivo `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## 🔑 Credenciales de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@realm.com | admin123 |
| Usuario | player1@realm.com | player123 |
| Usuario | player2@realm.com | player123 |

---

## 📁 Estructura del proyecto

```
theplayersrealm/
│
├── frontend/
│   ├── public/               # Archivos estáticos públicos
│   └── src/
│       ├── api/              # Instancia de Axios con interceptor JWT
│       ├── assets/           # Recursos estáticos (CSS, imágenes)
│       ├── components/       # Componentes reutilizables de Vue
│       ├── constants/        # Constantes globales (países, códigos ISO)
│       ├── dtos/             # Data Transfer Objects (tipos de creación/edición)
│       ├── interfaces/       # Interfaces TypeScript
│       ├── router/           # Configuración de rutas y guards por rol
│       ├── services/         # Llamadas a la API REST con Axios
│       ├── stores/           # Pinia (solo estado de autenticación)
│       ├── types/            # Tipos auxiliares (ChartData, UserRole)
│       ├── utils/            # Utilidades del mapa
│       ├── views/            # Vistas principales de la aplicación
│       ├── App.vue           # Componente raíz con layout
│       ├── main.ts           # Punto de entrada
│       └── PiniaConfig.ts    # Inicialización de Pinia
│
└── backend/
    └── src/
        ├── auth/             # Login, estrategia JWT, guards
        ├── users/            # Módulo de usuarios
        ├── studios/          # Módulo de estudios
        ├── videogames/       # Módulo de videojuegos
        ├── reviews/          # Módulo de reseñas
        └── main.ts           # Bootstrap de NestJS
```

---

## 🌐 API Endpoints

### Auth
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión, retorna JWT | No |
| GET | `/api/auth/me` | Obtener usuario autenticado | JWT |

### Users
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/api/users` | Listar usuarios | JWT |
| GET | `/api/users/:id` | Obtener usuario por ID | JWT |

### Studios
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/api/studios` | Listar estudios | No |
| GET | `/api/studios/:id` | Obtener estudio por ID | No |
| POST | `/api/studios` | Crear estudio | Admin |
| PATCH | `/api/studios/:id` | Editar estudio | Admin |
| DELETE | `/api/studios/:id` | Eliminar estudio | Admin |

### Videogames
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/api/videogames` | Listar videojuegos | No |
| GET | `/api/videogames/:id` | Obtener videojuego por ID | No |
| POST | `/api/videogames` | Crear videojuego | Admin |
| PATCH | `/api/videogames/:id` | Editar videojuego | Admin |
| DELETE | `/api/videogames/:id` | Eliminar videojuego | Admin |

### Reviews
| Método | Ruta | Descripción | Auth requerida |
|---|---|---|---|
| GET | `/api/reviews` | Listar todas las reseñas | JWT |
| GET | `/api/reviews?videogameId=X` | Reseñas de un videojuego | JWT |
| POST | `/api/reviews` | Crear reseña | JWT |
| DELETE | `/api/reviews/:id` | Eliminar reseña | JWT |

---

## 🔐 Flujo de autenticación

1. El usuario inicia sesión con su email y contraseña (`POST /api/auth/login`).
2. El backend valida las credenciales y retorna un token JWT.
3. El frontend guarda el token en `localStorage`.
4. Axios adjunta automáticamente el token en el header `Authorization: Bearer <token>` en cada petición (interceptor en `src/api/axiosInstance.ts`).
5. Al recargar la página, el token es validado contra `GET /api/auth/me` para restaurar la sesión sin necesidad de volver a iniciar sesión.

---

## ✨ Funcionalidades

* Login con sesión persistente (JWT)
* Rutas protegidas por autenticación y por rol (Admin / Usuario)
* Listado, creación, edición y eliminación de videojuegos y estudios (solo Admin)
* Detalle de videojuego con reseñas y usuarios
* Creación de reseñas con calificación de 1 a 5 estrellas
* Dashboard con gráficas de ventas, géneros, años de lanzamiento y distribución de ratings
* Mapa interactivo mundial con la distribución geográfica de los estudios

---

## 👨‍💻 Autores

Proyecto desarrollado por **Luciana Hoyos, Juan Pablo Padilla y Santiago Manco**.
