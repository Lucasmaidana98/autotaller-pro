# AutoTaller Pro - Sistema de Gestion de Taller Automotriz

![Laravel](https://img.shields.io/badge/Laravel-12.x-red?style=flat-square&logo=laravel)
![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-teal?style=flat-square&logo=tailwindcss)

Un sistema completo de gestion para talleres automotrices desarrollado con las mejores practicas de desarrollo senior, incluyendo Laravel como backend, React con TypeScript como frontend, y multiples caracteristicas avanzadas.

## 🚀 Caracteristicas Principales

### 📋 Gestion de Ordenes de Trabajo
- **Sistema completo de ordenes** con estados (pendiente, en progreso, esperando repuestos, esperando aprobacion, completado, cancelado)
- **Prioridades configurables** (baja, media, alta, urgente)
- **Asignacion de mecanicos** y seguimiento de horas trabajadas
- **Gestion de repuestos** por orden de trabajo
- **Costos automaticos** (mano de obra + repuestos)
- **Numeros de orden automaticos** con formato WO-YYYY-####
- **Historial completo** de cambios y estados

### 👥 Gestion de Clientes
- **Perfiles completos** con informacion personal y de contacto
- **Historial de vehiculos** asociados
- **Historial de ordenes** de trabajo
- **Documentos** (CI, RUC, etc.)
- **Estados** activo/inactivo

### 🚗 Gestion de Vehiculos
- **Informacion detallada** (marca, modelo, año, patente, VIN)
- **Tipos** (auto, moto, camion, van)
- **Historial de kilometraje**
- **Notas tecnicas** y observaciones
- **Relacion con cliente** propietario

### 🔧 Gestion de Mecanicos
- **Perfiles profesionales** con especialidades
- **Tarifas por hora** personalizadas
- **Años de experiencia**
- **Estados** (activo, inactivo, de licencia)
- **Asignacion** a multiples ordenes de trabajo

### 📦 Gestion de Inventario
- **Control de stock** con alertas de stock bajo
- **Precios de costo y venta** con calculo de margen
- **Categorias** y marcas
- **Ubicacion** en almacen
- **Proveedor** y numero de parte
- **Estados** (disponible, sin stock, descontinuado)

### 📅 Sistema de Citas
- **Calendario interactivo** para agendamiento
- **Asignacion de mecanicos**
- **Tipos de servicio** configurables
- **Estados** (programada, confirmada, en progreso, completada, cancelada, no asistio)
- **Duracion estimada** y notas

## 🛠️ Stack Tecnologico

### Backend (Laravel 12.x)
- **Laravel Framework** con las ultimas caracteristicas
- **Eloquent ORM** con relaciones complejas
- **API RESTful** completa con recursos
- **Autenticacion** Laravel Sanctum
- **Autorizacion** con Policies y Gates
- **Validacion** con Form Requests
- **Eventos y Listeners** para notificaciones
- **Jobs y Queues** para tareas pesadas
- **Cache** con tags para optimizacion
- **Service Layer** para logica de negocio

### Frontend (React 18.x + TypeScript)
- **React 18** con funciones hooks
- **TypeScript** para tipado estatico
- **React Router** para navegacion SPA
- **Zustand** para gestion de estado global
- **TanStack Query** para gestion de datos del servidor
- **Axios** para llamadas HTTP
- **Tailwind CSS** para estilos responsivos
- **Lucide React** para iconografia
- **Vite** como bundler rapido

### Base de Datos
- **SQLite** (desarrollo) / **PostgreSQL** (produccion)
- **Migraciones** versionadas
- **Seeders** para datos de prueba
- **Indices** optimizados
- **Relaciones** foraneas con integridad

## 🏗️ Arquitectura del Sistema

### Patrones de Diseño Implementados
- **MVC** (Model-View-Controller)
- **Service Layer** para logica de negocio compleja
- **Event-Driven Architecture** para desacoplamiento
- **Factory Pattern** para creacion de objetos
- **Observer Pattern** para notificaciones

### Caracteristicas Avanzadas de Laravel
- **Custom Middleware** para validaciones especificas
- **Model Observers** para acciones automaticas
- **Custom Validation Rules** para reglas de negocio
- **Resource Collections** para transformacion de datos
- **API Versioning** para compatibilidad
- **Rate Limiting** para proteccion de API
- **CORS** configurado para desarrollo

### Caracteristicas Avanzadas de React
- **Custom Hooks** para logica reutilizable
- **Context API** + Zustand para estado global
- **Error Boundaries** para manejo de errores
- **Lazy Loading** para optimizacion
- **Memoization** para performance
- **TypeScript Interfaces** para type safety

## 🚀 Instalacion y Configuracion

### Requisitos Previos
```bash
- PHP 8.2+
- Composer 2.x
- Node.js 18+
- NPM/Yarn
- SQLite/PostgreSQL
- Git
```

### Instalacion Paso a Paso

1. **Clonar el repositorio**
```bash
git clone https://github.com/Lucasmaidana98/autotaller-pro.git
cd autotaller-pro
```

2. **Instalar dependencias PHP**
```bash
composer install
```

3. **Instalar dependencias Node.js**
```bash
npm install
```

4. **Configurar variables de entorno**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configurar base de datos en .env**
```env
DB_CONNECTION=sqlite
# O para PostgreSQL:
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=autotaller_pro
# DB_USERNAME=postgres
# DB_PASSWORD=tu_password
```

6. **Ejecutar migraciones**
```bash
php artisan migrate
```

7. **Compilar assets del frontend**
```bash
npm run build
# Para desarrollo con hot reload:
npm run dev
```

8. **Iniciar servidor de desarrollo**
```bash
php artisan serve
```

La aplicacion estara disponible en `http://localhost:8000`

## 📚 API Documentation

### Endpoints Principales

#### Autenticacion
```
POST /api/v1/login
POST /api/v1/register
POST /api/v1/logout
GET  /api/v1/user
```

#### Ordenes de Trabajo
```
GET    /api/v1/work-orders
POST   /api/v1/work-orders
GET    /api/v1/work-orders/{id}
PUT    /api/v1/work-orders/{id}
DELETE /api/v1/work-orders/{id}
POST   /api/v1/work-orders/{id}/status
POST   /api/v1/work-orders/{id}/parts
GET    /api/v1/work-orders-statistics
```

#### Otros Recursos
- Clientes: `/api/v1/customers`
- Vehiculos: `/api/v1/vehicles`
- Mecanicos: `/api/v1/mechanics`
- Repuestos: `/api/v1/parts`
- Citas: `/api/v1/appointments`

## 🔐 Seguridad y Performance

### Seguridad
- **Autenticacion JWT** con Laravel Sanctum
- **Autorizacion granular** con roles y permisos
- **CSRF Protection** habilitado
- **Input Sanitization** en todos los formularios
- **SQL Injection** prevenido con Eloquent
- **XSS Protection** con validacion y escape

### Performance
- **Database Indexing** en columnas clave
- **Eager Loading** para prevenir N+1 queries
- **Query Optimization** con scopes y builders
- **Caching Strategy** con tags y TTL
- **Frontend Code Splitting** con Vite

## 📈 Aspectos Tecnicos Destacados

### Backend Senior Features
- **Service Layer Pattern** para logica compleja
- **Event-Driven Architecture** con eventos y listeners
- **Repository Pattern** (opcional, implementable)
- **Custom Form Requests** con validaciones avanzadas
- **API Resources** para transformacion de datos
- **Policies** para autorizacion granular
- **Observer Pattern** en modelos Eloquent
- **Queue Jobs** para tareas pesadas
- **Cache Tags** para invalidacion inteligente
- **Database Transactions** para operaciones complejas

### Frontend Senior Features
- **TypeScript** strict mode para type safety
- **Custom Hooks** para logica reutilizable
- **State Management** con Zustand
- **Error Boundaries** para manejo robusto de errores
- **React Query** para cache de datos del servidor
- **Compound Components** para reutilizacion
- **Higher-Order Components** cuando necesario
- **Code Splitting** y lazy loading
- **Performance Optimization** con React.memo
- **Accessibility** (ARIA, semantic HTML)

### Database Design
- **Normalized Schema** hasta 3NF
- **Foreign Key Constraints** para integridad
- **Indexes** optimizados para queries frecuentes
- **Soft Deletes** para auditoria
- **Timestamps** automaticos
- **JSON Columns** para datos flexibles
- **Enum Constraints** para valores validos

## 🤝 Contribucion

1. **Fork** el repositorio
2. **Crear** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

## 📝 Licencia

Este proyecto esta licenciado bajo la [MIT License](LICENSE).

## 👨‍💻 Autor

**Lucas Maidana**
- GitHub: [@Lucasmaidana98](https://github.com/Lucasmaidana98)
- LinkedIn: [Lucas Maidana](https://linkedin.com/in/lucas-maidana)
- Email: lucasmaidana.dev@gmail.com

---

**AutoTaller Pro** - Sistema de gestion moderno para talleres automotrices desarrollado con practicas de desarrollo senior.