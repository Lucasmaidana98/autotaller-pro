# AutoTaller Pro - Sistema de Gestión de Taller Automotriz

![Laravel](https://img.shields.io/badge/Laravel-12.x-red?style=flat-square&logo=laravel)
![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-teal?style=flat-square&logo=tailwindcss)

Un sistema completo de gestión para talleres automotrices desarrollado con las mejores prácticas de desarrollo senior, incluyendo Laravel como backend, React con TypeScript como frontend, y múltiples características avanzadas.

## =€ Características Principales

### =Ë Gestión de Órdenes de Trabajo
- **Sistema completo de órdenes** con estados (pendiente, en progreso, esperando repuestos, esperando aprobación, completado, cancelado)
- **Prioridades configurables** (baja, media, alta, urgente)
- **Asignación de mecánicos** y seguimiento de horas trabajadas
- **Gestión de repuestos** por orden de trabajo
- **Costos automáticos** (mano de obra + repuestos)
- **Números de orden automáticos** con formato WO-YYYY-####
- **Historial completo** de cambios y estados

### =e Gestión de Clientes
- **Perfiles completos** con información personal y de contacto
- **Historial de vehículos** asociados
- **Historial de órdenes** de trabajo
- **Documentos** (CI, RUC, etc.)
- **Estados** activo/inactivo

### =— Gestión de Vehículos
- **Información detallada** (marca, modelo, año, patente, VIN)
- **Tipos** (auto, moto, camión, van)
- **Historial de kilometraje**
- **Notas técnicas** y observaciones
- **Relación con cliente** propietario

### =' Gestión de Mecánicos
- **Perfiles profesionales** con especialidades
- **Tarifas por hora** personalizadas
- **Años de experiencia**
- **Estados** (activo, inactivo, de licencia)
- **Asignación** a múltiples órdenes de trabajo

### =æ Gestión de Inventario
- **Control de stock** con alertas de stock bajo
- **Precios de costo y venta** con cálculo de margen
- **Categorías** y marcas
- **Ubicación** en almacén
- **Proveedor** y número de parte
- **Estados** (disponible, sin stock, descontinuado)

### =Å Sistema de Citas
- **Calendario interactivo** para agendamiento
- **Asignación de mecánicos**
- **Tipos de servicio** configurables
- **Estados** (programada, confirmada, en progreso, completada, cancelada, no asistió)
- **Duración estimada** y notas

## =à Stack Tecnológico

### Backend (Laravel 12.x)
- **Laravel Framework** con las últimas características
- **Eloquent ORM** con relaciones complejas
- **API RESTful** completa con recursos
- **Autenticación** Laravel Sanctum
- **Autorización** con Policies y Gates
- **Validación** con Form Requests
- **Eventos y Listeners** para notificaciones
- **Jobs y Queues** para tareas pesadas
- **Cache** con tags para optimización
- **Service Layer** para lógica de negocio

### Frontend (React 18.x + TypeScript)
- **React 18** con funciones hooks
- **TypeScript** para tipado estático
- **React Router** para navegación SPA
- **Zustand** para gestión de estado global
- **TanStack Query** para gestión de datos del servidor
- **Axios** para llamadas HTTP
- **Tailwind CSS** para estilos responsivos
- **Lucide React** para iconografía
- **Vite** como bundler rápido

### Base de Datos
- **SQLite** (desarrollo) / **PostgreSQL** (producción)
- **Migraciones** versionadas
- **Seeders** para datos de prueba
- **Índices** optimizados
- **Relaciones** foráneas con integridad

## <× Arquitectura del Sistema

### Patrones de Diseño Implementados
- **MVC** (Model-View-Controller)
- **Service Layer** para lógica de negocio compleja
- **Event-Driven Architecture** para desacoplamiento
- **Factory Pattern** para creación de objetos
- **Observer Pattern** para notificaciones

### Características Avanzadas de Laravel
- **Custom Middleware** para validaciones específicas
- **Model Observers** para acciones automáticas
- **Custom Validation Rules** para reglas de negocio
- **Resource Collections** para transformación de datos
- **API Versioning** para compatibilidad
- **Rate Limiting** para protección de API
- **CORS** configurado para desarrollo

### Características Avanzadas de React
- **Custom Hooks** para lógica reutilizable
- **Context API** + Zustand para estado global
- **Error Boundaries** para manejo de errores
- **Lazy Loading** para optimización
- **Memoization** para performance
- **TypeScript Interfaces** para type safety

## =€ Instalación y Configuración

### Requisitos Previos
```bash
- PHP 8.2+
- Composer 2.x
- Node.js 18+
- NPM/Yarn
- SQLite/PostgreSQL
- Git
```

### Instalación Paso a Paso

1. **Clonar el repositorio**
```bash
git clone https://github.com/lmaidana63/autotaller-pro.git
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
```

8. **Iniciar servidor de desarrollo**
```bash
php artisan serve
```

La aplicación estará disponible en `http://localhost:8000`

## =Ú API Documentation

### Endpoints Principales

#### Autenticación
```
POST /api/v1/login
POST /api/v1/register
POST /api/v1/logout
GET  /api/v1/user
```

#### Órdenes de Trabajo
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
- Vehículos: `/api/v1/vehicles`
- Mecánicos: `/api/v1/mechanics`
- Repuestos: `/api/v1/parts`
- Citas: `/api/v1/appointments`

## = Seguridad y Performance

### Seguridad
- **Autenticación JWT** con Laravel Sanctum
- **Autorización granular** con roles y permisos
- **CSRF Protection** habilitado
- **Input Sanitization** en todos los formularios
- **SQL Injection** prevenido con Eloquent
- **XSS Protection** con validación y escape

### Performance
- **Database Indexing** en columnas clave
- **Eager Loading** para prevenir N+1 queries
- **Query Optimization** con scopes y builders
- **Caching Strategy** con tags y TTL
- **Frontend Code Splitting** con Vite

## =È Aspectos Técnicos Destacados

### Backend Senior Features
- **Service Layer Pattern** para lógica compleja
- **Event-Driven Architecture** con eventos y listeners
- **Repository Pattern** (opcional, implementable)
- **Custom Form Requests** con validaciones avanzadas
- **API Resources** para transformación de datos
- **Policies** para autorización granular
- **Observer Pattern** en modelos Eloquent
- **Queue Jobs** para tareas pesadas
- **Cache Tags** para invalidación inteligente
- **Database Transactions** para operaciones complejas

### Frontend Senior Features
- **TypeScript** strict mode para type safety
- **Custom Hooks** para lógica reutilizable
- **State Management** con Zustand
- **Error Boundaries** para manejo robusto de errores
- **React Query** para cache de datos del servidor
- **Compound Components** para reutilización
- **Higher-Order Components** cuando necesario
- **Code Splitting** y lazy loading
- **Performance Optimization** con React.memo
- **Accessibility** (ARIA, semantic HTML)

### Database Design
- **Normalized Schema** hasta 3NF
- **Foreign Key Constraints** para integridad
- **Indexes** optimizados para queries frecuentes
- **Soft Deletes** para auditoría
- **Timestamps** automáticos
- **JSON Columns** para datos flexibles
- **Enum Constraints** para valores válidos

## > Contribución

1. **Fork** el repositorio
2. **Crear** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

## =Ý Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

## =h=» Autor

**Lucas Maidana**
- GitHub: [@lmaidana63](https://github.com/lmaidana63)
- LinkedIn: [Lucas Maidana](https://linkedin.com/in/lucas-maidana)
- Email: lucasmaidana.dev@gmail.com

---

**AutoTaller Pro** - Sistema de gestión moderno para talleres automotrices desarrollado con prácticas de desarrollo senior.