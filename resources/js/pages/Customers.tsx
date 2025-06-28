import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, MoreVertical, Phone, Mail, User, MapPin } from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'Juan Perez',
    email: 'juan.perez@email.com',
    phone: '+1 234-567-8901',
    address: 'Calle Principal 123, Ciudad',
    vehicleCount: 2,
    totalSpent: 3250.00,
    lastVisit: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 234-567-8902',
    address: 'Avenida Central 456, Ciudad',
    vehicleCount: 1,
    totalSpent: 1850.00,
    lastVisit: '2024-01-14',
    status: 'active',
  },
  {
    id: 3,
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+1 234-567-8903',
    address: 'Boulevard Norte 789, Ciudad',
    vehicleCount: 3,
    totalSpent: 5400.00,
    lastVisit: '2024-01-13',
    status: 'active',
  },
  {
    id: 4,
    name: 'Sofia Lopez',
    email: 'sofia.lopez@email.com',
    phone: '+1 234-567-8904',
    address: 'Calle Sur 321, Ciudad',
    vehicleCount: 1,
    totalSpent: 950.00,
    lastVisit: '2023-12-20',
    status: 'inactive',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'status-badge status-completed';
    case 'inactive':
      return 'status-badge bg-gray-500/20 text-gray-300 border border-gray-500/30';
    default:
      return 'status-badge';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'inactive':
      return 'Inactivo';
    default:
      return status;
  }
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Clientes</h1>
          <p className="mt-2 text-gray-400">
            Gestiona la información de todos los clientes del taller
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Exportar
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Total Clientes
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {customers.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary-500 group-hover:scale-110 transition-transform duration-200">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Clientes Activos
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {customers.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success-500 group-hover:scale-110 transition-transform duration-200">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Ingresos Total
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning-500 group-hover:scale-110 transition-transform duration-200">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                placeholder="Buscar clientes..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
              Estado
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Todos</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
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

      {/* Customers Cards - Mobile First */}
      <div className="block lg:hidden space-y-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="card hover:bg-dark-700 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{customer.name}</h3>
                  <p className="text-gray-400">{customer.email}</p>
                </div>
              </div>
              <span className={getStatusBadge(customer.status)}>
                {formatStatus(customer.status)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Teléfono</p>
                <p className="text-white">{customer.phone}</p>
              </div>
              <div>
                <p className="text-gray-400">Vehículos</p>
                <p className="text-white">{customer.vehicleCount}</p>
              </div>
              <div>
                <p className="text-gray-400">Total gastado</p>
                <p className="text-white font-semibold">${customer.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Última visita</p>
                <p className="text-white">{customer.lastVisit}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-dark-600">
              <div className="text-xs text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {customer.address}
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

      {/* Customers Table - Desktop */}
      <div className="hidden lg:block card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">
            Lista de Clientes ({filteredCustomers.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Vehículos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Gastado
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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-dark-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center mr-4">
                        <User className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{customer.name}</div>
                        <div className="text-xs text-gray-400">Última visita: {customer.lastVisit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="flex items-center mb-1">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      {customer.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {customer.vehicleCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(customer.status)}>
                      {formatStatus(customer.status)}
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
      {filteredCustomers.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No se encontraron clientes</h3>
          <p className="text-gray-400 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button
            onClick={() => {
              setSearchTerm('');
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