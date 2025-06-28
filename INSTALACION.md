# Guía de Instalación - AutoTaller Pro

## Problemas Comunes y Soluciones

### ⚠️ Frontend sin estilos o página en blanco

Si al acceder a `http://localhost:8000` ves la página sin estilos o en blanco:

#### Solución 1: Modo Desarrollo (Recomendado)
```bash
# Terminal 1 - Servidor Laravel
php artisan serve

# Terminal 2 - Servidor Vite (MANTENER CORRIENDO)
npm run dev
```

#### Solución 2: Modo Producción
```bash
# Compilar assets para producción
npm run build

# Iniciar servidor Laravel
php artisan serve
```

### 🔧 Problemas de Compilación

Si hay errores de TypeScript o React:

```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Compilar nuevamente
npm run build
```

### 📦 Dependencias faltantes

Si hay errores de módulos no encontrados:

```bash
# Instalar dependencias PHP
composer install --no-dev --optimize-autoloader

# Instalar dependencias Node.js
npm ci

# Verificar versiones
php --version  # Debe ser 8.2+
node --version # Debe ser 18+
npm --version  # Debe ser 8+
```

## Instalación Paso a Paso Detallada

### 1. Preparar el Entorno

```bash
# Verificar requisitos
php --version    # >= 8.2
composer --version
node --version   # >= 18
npm --version
```

### 2. Clonar y Configurar

```bash
# Clonar repositorio
git clone https://github.com/Lucasmaidana98/autotaller-pro.git
cd autotaller-pro

# Hacer ejecutable artisan (Linux/Mac)
chmod +x artisan
```

### 3. Instalar Dependencias

```bash
# Backend
composer install

# Frontend
npm install
```

### 4. Configurar Entorno

```bash
# Copiar configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Configurar base de datos (SQLite por defecto)
# El archivo database.sqlite se crea automáticamente
```

### 5. Base de Datos

```bash
# Ejecutar migraciones
php artisan migrate

# (Opcional) Ejecutar seeders para datos de prueba
php artisan db:seed
```

### 6. Compilar Frontend

```bash
# Para desarrollo (recomendado)
npm run dev

# O para producción
npm run build
```

### 7. Iniciar Servidores

```bash
# Servidor Laravel
php artisan serve

# Si usas npm run dev, también ejecuta en otra terminal:
npm run dev
```

## Configuración Adicional

### PostgreSQL (Opcional)

Si prefieres usar PostgreSQL en lugar de SQLite:

```bash
# Crear base de datos
createdb autotaller_pro

# Configurar en .env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=autotaller_pro
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

### Optimización para Producción

```bash
# Cachear configuraciones
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimizar autoloader
composer install --optimize-autoloader --no-dev

# Compilar assets optimizados
npm run build
```

## Scripts Útiles

### Reiniciar Completamente

```bash
# Limpiar todo
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Recompilar
npm run build
php artisan config:cache
```

### Verificar Estado

```bash
# Ver rutas
php artisan route:list

# Verificar configuración
php artisan config:show database

# Estado de migraciones
php artisan migrate:status
```

## URLs de Acceso

- **Aplicación Principal:** http://localhost:8000
- **API Base:** http://localhost:8000/api/v1
- **Vite Dev Server:** http://localhost:5173 (solo con npm run dev)

## Estructura de Archivos Importante

```
autotaller-pro/
├── app/                    # Lógica de aplicación Laravel
├── database/              # Migraciones y seeders
├── public/                # Assets públicos compilados
├── resources/
│   ├── css/app.css       # Estilos Tailwind
│   ├── js/app.tsx        # Aplicación React principal
│   └── views/app.blade.php # Template principal
├── routes/
│   ├── api.php           # Rutas API
│   └── web.php           # Rutas web
├── .env                  # Configuración de entorno
├── package.json          # Dependencias Node.js
└── composer.json         # Dependencias PHP
```

## Solución de Problemas Específicos

### Error: "Vite manifest not found"
```bash
npm run build
```

### Error: "Class not found"
```bash
composer dump-autoload
```

### Error: "Permission denied"
```bash
# Linux/Mac
sudo chown -R $USER:$USER storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

### Error: "SQLSTATE[HY000] [14] unable to open database file"
```bash
# Crear directorio database si no existe
mkdir -p database
touch database/database.sqlite
chmod 664 database/database.sqlite
```

## Contacto

Si tienes problemas con la instalación:
- Revisar los logs en `storage/logs/laravel.log`
- Verificar la consola del navegador para errores JavaScript
- Crear un issue en GitHub: https://github.com/Lucasmaidana98/autotaller-pro/issues