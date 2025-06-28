import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Users,
  Car,
  Package,
  Wrench,
  Calendar,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Moon,
  Sun,
} from 'lucide-react';
import { clsx } from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Ordenes de Trabajo', href: '/work-orders', icon: FileText },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Vehiculos', href: '/vehicles', icon: Car },
  { name: 'Repuestos', href: '/parts', icon: Package },
  { name: 'Mecanicos', href: '/mechanics', icon: Wrench },
  { name: 'Citas', href: '/appointments', icon: Calendar },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Mobile sidebar overlay */}
      <div className={clsx(
        'fixed inset-0 z-40 lg:hidden transition-opacity duration-300',
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-dark-900/80" onClick={() => setSidebarOpen(false)} />
      </div>

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-72 bg-dark-800 border-r border-dark-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">AutoTaller Pro</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 lg:hidden transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={clsx(
                      'sidebar-item',
                      isActive ? 'active' : ''
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-dark-700/50">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Administrador</p>
              <p className="text-xs text-gray-400">admin@autotaller.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="bg-dark-800 border-b border-dark-700 shadow-lg-dark">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 lg:hidden transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Search */}
              <div className="max-w-lg w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="input-field pl-10 w-full sm:w-80"
                    placeholder="Buscar ordenes, clientes, vehiculos..."
                  />
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
                title={isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
                </button>
              </div>

              {/* Settings */}
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
                <Settings className="h-5 w-5" />
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">Admin</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl-dark border border-dark-700 py-1 z-50">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700">
                      <User className="w-4 h-4 mr-3" />
                      Mi Perfil
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700">
                      <Settings className="w-4 h-4 mr-3" />
                      Configuracion
                    </Link>
                    <hr className="my-1 border-dark-600" />
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-dark-700">
                      <LogOut className="w-4 h-4 mr-3" />
                      Cerrar Sesion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}