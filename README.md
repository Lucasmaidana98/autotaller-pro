# AutoTaller Pro - Sistema de Gesti�n de Taller Automotriz

![Laravel](https://img.shields.io/badge/Laravel-12.x-red?style=flat-square&logo=laravel)
![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-teal?style=flat-square&logo=tailwindcss)

Un sistema completo de gesti�n para talleres automotrices desarrollado con las mejores pr�cticas de desarrollo senior, incluyendo Laravel como backend, React con TypeScript como frontend, y m�ltiples caracter�sticas avanzadas.

## =� Caracter�sticas Principales

### =� Gesti�n de �rdenes de Trabajo
- **Sistema completo de �rdenes** con estados (pendiente, en progreso, esperando repuestos, esperando aprobaci�n, completado, cancelado)
- **Prioridades configurables** (baja, media, alta, urgente)
- **Asignaci�n de mec�nicos** y seguimiento de horas trabajadas
- **Gesti�n de repuestos** por orden de trabajo
- **Costos autom�ticos** (mano de obra + repuestos)
- **N�meros de orden autom�ticos** con formato WO-YYYY-####
- **Historial completo** de cambios y estados

### =e Gesti�n de Clientes
- **Perfiles completos** con informaci�n personal y de contacto
- **Historial de veh�culos** asociados
- **Historial de �rdenes** de trabajo
- **Documentos** (CI, RUC, etc.)
- **Estados** activo/inactivo

### =� Gesti�n de Veh�culos
- **Informaci�n detallada** (marca, modelo, a�o, patente, VIN)
- **Tipos** (auto, moto, cami�n, van)
- **Historial de kilometraje**
- **Notas t�cnicas** y observaciones
- **Relaci�n con cliente** propietario

### =' Gesti�n de Mec�nicos
- **Perfiles profesionales** con especialidades
- **Tarifas por hora** personalizadas
- **A�os de experiencia**
- **Estados** (activo, inactivo, de licencia)
- **Asignaci�n** a m�ltiples �rdenes de trabajo

### =� Gesti�n de Inventario
- **Control de stock** con alertas de stock bajo
- **Precios de costo y venta** con c�lculo de margen
- **Categor�as** y marcas
- **Ubicaci�n** en almac�n
- **Proveedor** y n�mero de parte
- **Estados** (disponible, sin stock, descontinuado)

### =� Sistema de Citas
- **Calendario interactivo** para agendamiento
- **Asignaci�n de mec�nicos**
- **Tipos de servicio** configurables
- **Estados** (programada, confirmada, en progreso, completada, cancelada, no asisti�)
- **Duraci�n estimada** y notas

## =� Stack Tecnol�gico

### Backend (Laravel 12.x)
- **Laravel Framework** con las �ltimas caracter�sticas
- **Eloquent ORM** con relaciones complejas
- **API RESTful** completa con recursos
- **Autenticaci�n** Laravel Sanctum
- **Autorizaci�n** con Policies y Gates
- **Validaci�n** con Form Requests
- **Eventos y Listeners** para notificaciones
- **Jobs y Queues** para tareas pesadas
- **Cache** con tags para optimizaci�n
- **Service Layer** para l�gica de negocio

### Frontend (React 18.x + TypeScript)
- **React 18** con funciones hooks
- **TypeScript** para tipado est�tico
- **React Router** para navegaci�n SPA
- **Zustand** para gesti�n de estado global
- **TanStack Query** para gesti�n de datos del servidor
- **Axios** para llamadas HTTP
- **Tailwind CSS** para estilos responsivos
- **Lucide React** para iconograf�a
- **Vite** como bundler r�pido

### Base de Datos
- **SQLite** (desarrollo) / **PostgreSQL** (producci�n)
- **Migraciones** versionadas
- **Seeders** para datos de prueba
- **�ndices** optimizados
- **Relaciones** for�neas con integridad

## <� Arquitectura del Sistema

### Patrones de Dise�o Implementados
- **MVC** (Model-View-Controller)
- **Service Layer** para l�gica de negocio compleja
- **Event-Driven Architecture** para desacoplamiento
- **Factory Pattern** para creaci�n de objetos
- **Observer Pattern** para notificaciones

### Caracter�sticas Avanzadas de Laravel
- **Custom Middleware** para validaciones espec�ficas
- **Model Observers** para acciones autom�ticas
- **Custom Validation Rules** para reglas de negocio
- **Resource Collections** para transformaci�n de datos
- **API Versioning** para compatibilidad
- **Rate Limiting** para protecci�n de API
- **CORS** configurado para desarrollo

### Caracter�sticas Avanzadas de React
- **Custom Hooks** para l�gica reutilizable
- **Context API** + Zustand para estado global
- **Error Boundaries** para manejo de errores
- **Lazy Loading** para optimizaci�n
- **Memoization** para performance
- **TypeScript Interfaces** para type safety

## =� Instalaci�n y Configuraci�n

### Requisitos Previos
```bash
- PHP 8.2+
- Composer 2.x
- Node.js 18+
- NPM/Yarn
- SQLite/PostgreSQL
- Git
```

### Instalaci�n Paso a Paso

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

La aplicaci�n estar� disponible en `http://localhost:8000`

## =� API Documentation

### Endpoints Principales

#### Autenticaci�n
```
POST /api/v1/login
POST /api/v1/register
POST /api/v1/logout
GET  /api/v1/user
```

#### �rdenes de Trabajo
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
- Veh�culos: `/api/v1/vehicles`
- Mec�nicos: `/api/v1/mechanics`
- Repuestos: `/api/v1/parts`
- Citas: `/api/v1/appointments`

## = Seguridad y Performance

### Seguridad
- **Autenticaci�n JWT** con Laravel Sanctum
- **Autorizaci�n granular** con roles y permisos
- **CSRF Protection** habilitado
- **Input Sanitization** en todos los formularios
- **SQL Injection** prevenido con Eloquent
- **XSS Protection** con validaci�n y escape

### Performance
- **Database Indexing** en columnas clave
- **Eager Loading** para prevenir N+1 queries
- **Query Optimization** con scopes y builders
- **Caching Strategy** con tags y TTL
- **Frontend Code Splitting** con Vite

## =� Aspectos T�cnicos Destacados

### Backend Senior Features
- **Service Layer Pattern** para l�gica compleja
- **Event-Driven Architecture** con eventos y listeners
- **Repository Pattern** (opcional, implementable)
- **Custom Form Requests** con validaciones avanzadas
- **API Resources** para transformaci�n de datos
- **Policies** para autorizaci�n granular
- **Observer Pattern** en modelos Eloquent
- **Queue Jobs** para tareas pesadas
- **Cache Tags** para invalidaci�n inteligente
- **Database Transactions** para operaciones complejas

### Frontend Senior Features
- **TypeScript** strict mode para type safety
- **Custom Hooks** para l�gica reutilizable
- **State Management** con Zustand
- **Error Boundaries** para manejo robusto de errores
- **React Query** para cache de datos del servidor
- **Compound Components** para reutilizaci�n
- **Higher-Order Components** cuando necesario
- **Code Splitting** y lazy loading
- **Performance Optimization** con React.memo
- **Accessibility** (ARIA, semantic HTML)

### Database Design
- **Normalized Schema** hasta 3NF
- **Foreign Key Constraints** para integridad
- **Indexes** optimizados para queries frecuentes
- **Soft Deletes** para auditor�a
- **Timestamps** autom�ticos
- **JSON Columns** para datos flexibles
- **Enum Constraints** para valores v�lidos

## > Contribuci�n

1. **Fork** el repositorio
2. **Crear** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

## =� Licencia

Este proyecto est� licenciado bajo la [MIT License](LICENSE).

## =h=� Autor

**Lucas Maidana**
- GitHub: [@lmaidana63](https://github.com/lmaidana63)
- LinkedIn: [Lucas Maidana](https://linkedin.com/in/lucas-maidana)
- Email: lucasmaidana.dev@gmail.com

---

**AutoTaller Pro** - Sistema de gesti�n moderno para talleres automotrices desarrollado con pr�cticas de desarrollo senior.