import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, MoreVertical, Package, AlertTriangle, TrendingDown, TrendingUp, Barcode } from 'lucide-react';

const parts = [
  {
    id: 1,
    partNumber: 'BRK001',
    name: 'Pastillas de Freno Delanteras',
    brand: 'Brembo',
    category: 'Frenos',
    price: 89.99,
    cost: 60.00,
    stock: 24,
    minStock: 10,
    location: 'A-1-3',
    supplier: 'AutoParts SA',
    description: 'Pastillas de freno ceramicas para vehiculos compactos',
    status: 'in_stock',
  },
  {
    id: 2,
    partNumber: 'OIL002',
    name: 'Aceite de Motor 5W-30',
    brand: 'Mobil 1',
    category: 'Lubricantes',
    price: 45.50,
    cost: 32.00,
    stock: 5,
    minStock: 15,
    location: 'B-2-1',
    supplier: 'Lubricantes Corp',
    description: 'Aceite sintetico premium para motores a gasolina',
    status: 'low_stock',
  },
  {
    id: 3,
    partNumber: 'FLT003',
    name: 'Filtro de Aire',
    brand: 'Mann',
    category: 'Filtros',
    price: 25.99,
    cost: 18.00,
    stock: 45,
    minStock: 20,
    location: 'C-1-2',
    supplier: 'Filtros Unidos',
    description: 'Filtro de aire de alta eficiencia',
    status: 'in_stock',
  },
  {
    id: 4,
    partNumber: 'SPA004',
    name: 'Bujias Iridium',
    brand: 'NGK',
    category: 'Encendido',
    price: 15.75,
    cost: 10.50,
    stock: 0,
    minStock: 25,
    location: 'D-3-1',
    supplier: 'Electronica Auto',
    description: 'Bujias de iridium de larga duracion',
    status: 'out_of_stock',
  },
  {
    id: 5,
    partNumber: 'TIR005',
    name: 'Neumatico 195/65R15',
    brand: 'Michelin',
    category: 'Neumaticos',
    price: 120.00,
    cost: 85.00,
    stock: 16,
    minStock: 8,
    location: 'E-1-1',
    supplier: 'Neumaticos SA',
    description: 'Neumatico touring de alta calidad',
    status: 'in_stock',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'status-badge status-completed';
    case 'low_stock':
      return 'status-badge priority-high';
    case 'out_of_stock':
      return 'status-badge priority-urgent';
    default:
      return 'status-badge';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'En Stock';
    case 'low_stock':
      return 'Stock Bajo';
    case 'out_of_stock':
      return 'Sin Stock';
    default:
      return status;
  }
};

const getStockStatus = (current: number, min: number) => {
  if (current === 0) return 'out_of_stock';
  if (current <= min) return 'low_stock';
  return 'in_stock';
};

const calculateMargin = (price: number, cost: number) => {
  return ((price - cost) / price * 100).toFixed(1);
};

export default function Parts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || part.category === categoryFilter;
    const matchesStatus = !statusFilter || getStockStatus(part.stock, part.minStock) === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(parts.map(p => p.category))];
  const totalValue = parts.reduce((sum, part) => sum + (part.price * part.stock), 0);
  const lowStockCount = parts.filter(p => getStockStatus(p.stock, p.minStock) === 'low_stock').length;
  const outOfStockCount = parts.filter(p => getStockStatus(p.stock, p.minStock) === 'out_of_stock').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventario de Repuestos</h1>
          <p className="mt-2 text-gray-400">
            Gestiona el inventario de repuestos y accesorios del taller
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <Barcode className="w-4 h-4 mr-2" />
            Escanear
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Repuesto
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Total Repuestos
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {parts.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary-500 group-hover:scale-110 transition-transform duration-200">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-success-400 mr-1" />
            <span className="text-sm font-medium text-success-400">+12%</span>
            <span className="text-sm text-gray-400 ml-2">vs mes anterior</span>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Valor Total
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success-500 group-hover:scale-110 transition-transform duration-200">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-success-400 mr-1" />
            <span className="text-sm font-medium text-success-400">+8%</span>
            <span className="text-sm text-gray-400 ml-2">valor inventario</span>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Stock Bajo
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {lowStockCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning-500 group-hover:scale-110 transition-transform duration-200">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-warning-400 mr-1" />
            <span className="text-sm font-medium text-warning-400">Requiere atención</span>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Sin Stock
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {outOfStockCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-danger-500 group-hover:scale-110 transition-transform duration-200">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <AlertTriangle className="h-4 w-4 text-danger-400 mr-1" />
            <span className="text-sm font-medium text-danger-400">Acción requerida</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
              Buscar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Buscar repuestos..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Categoría
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
              Estado de Stock
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Todos</option>
              <option value="in_stock">En Stock</option>
              <option value="low_stock">Stock Bajo</option>
              <option value="out_of_stock">Sin Stock</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setStatusFilter('');
              }}
              className="btn-secondary w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Parts Cards - Mobile First */}
      <div className="block lg:hidden space-y-4">
        {filteredParts.map((part) => (
          <div key={part.id} className="card hover:bg-dark-700 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{part.name}</h3>
                  <p className="text-gray-400">{part.brand} - {part.partNumber}</p>
                  <p className="text-sm text-gray-500">{part.category}</p>
                </div>
              </div>
              <span className={getStatusBadge(getStockStatus(part.stock, part.minStock))}>
                {formatStatus(getStockStatus(part.stock, part.minStock))}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Precio</p>
                <p className="text-white font-semibold">${part.price}</p>
              </div>
              <div>
                <p className="text-gray-400">Stock</p>
                <p className="text-white">{part.stock} / {part.minStock} min</p>
              </div>
              <div>
                <p className="text-gray-400">Ubicación</p>
                <p className="text-white">{part.location}</p>
              </div>
              <div>
                <p className="text-gray-400">Margen</p>
                <p className="text-white">{calculateMargin(part.price, part.cost)}%</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-dark-600">
              <div className="text-xs text-gray-500">
                Proveedor: {part.supplier}
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parts Table - Desktop */}
      <div className="hidden lg:block card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">
            Inventario de Repuestos ({filteredParts.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Repuesto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-dark-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center mr-4">
                        <Package className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{part.name}</div>
                        <div className="text-xs text-gray-400">{part.brand} - {part.partNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {part.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="font-medium">{part.stock} unidades</div>
                      <div className="text-xs text-gray-500">Mín: {part.minStock}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="font-semibold text-white">${part.price}</div>
                      <div className="text-xs text-gray-500">Margen: {calculateMargin(part.price, part.cost)}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {part.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(getStockStatus(part.stock, part.minStock))}>
                      {formatStatus(getStockStatus(part.stock, part.minStock))}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredParts.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No se encontraron repuestos</h3>
          <p className="text-gray-400 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setStatusFilter('');
            }}
            className="btn-primary"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}