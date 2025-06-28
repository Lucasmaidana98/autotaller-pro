import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, MoreVertical, Calendar, User, Wrench } from 'lucide-react';

const workOrders = [
  {
    id: 'WO-2024-001',
    customer: 'Juan Perez',
    vehicle: '2020 Toyota Corolla',
    status: 'in_progress',
    priority: 'high',
    total: 1250.00,
    mechanic: 'Carlos Mendez',
    created: '2024-01-15',
    estimated: '2024-01-17',
  },
  {
    id: 'WO-2024-002',
    customer: 'Maria Garcia',
    vehicle: '2019 Honda Civic',
    status: 'pending',
    priority: 'medium',
    total: 850.00,
    mechanic: 'Luis Rodriguez',
    created: '2024-01-14',
    estimated: '2024-01-16',
  },
  {
    id: 'WO-2024-003',
    customer: 'Carlos Rodriguez',
    vehicle: '2021 Ford Focus',
    status: 'completed',
    priority: 'low',
    total: 2100.00,
    mechanic: 'Ana Martinez',
    created: '2024-01-13',
    estimated: '2024-01-15',
  },
  {
    id: 'WO-2024-004',
    customer: 'Sofia Lopez',
    vehicle: '2018 Nissan Altima',
    status: 'waiting_parts',
    priority: 'urgent',
    total: 3200.00,
    mechanic: 'Pedro Gonzalez',
    created: '2024-01-12',
    estimated: '2024-01-18',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return 'status-badge status-completed';
    case 'in_progress':
      return 'status-badge status-in-progress';
    case 'pending':
      return 'status-badge status-pending';
    case 'waiting_parts':
      return 'status-badge bg-orange-500/20 text-orange-300 border border-orange-500/30';
    default:
      return 'status-badge';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'status-badge priority-high';
    case 'medium':
      return 'status-badge priority-medium';
    case 'low':
      return 'status-badge priority-low';
    case 'urgent':
      return 'status-badge priority-urgent';
    default:
      return 'status-badge';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'in_progress':
      return 'En Progreso';
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'waiting_parts':
      return 'Esperando Repuestos';
    default:
      return status;
  }
};

const formatPriority = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'Alta';
    case 'medium':
      return 'Media';
    case 'low':
      return 'Baja';
    case 'urgent':
      return 'Urgente';
    default:
      return priority;
  }
};

export default function WorkOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPriority = !priorityFilter || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Ordenes de Trabajo</h1>
          <p className="mt-2 text-gray-400">
            Gestiona todas las ordenes de trabajo del taller
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Calendario
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Orden
          </button>
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
                placeholder="Buscar ordenes, clientes..."
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
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="waiting_parts">Esperando Repuestos</option>
              <option value="completed">Completado</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
              Prioridad
            </label>
            <select
              id="priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setPriorityFilter('');
              }}
              className="btn-secondary w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Work Orders Cards - Mobile First */}
      <div className="block lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card hover:bg-dark-700 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white text-lg">{order.id}</h3>
                <p className="text-gray-400">{order.customer}</p>
                <p className="text-sm text-gray-500">{order.vehicle}</p>
              </div>
              <div className="flex space-x-2">
                <span className={getPriorityBadge(order.priority)}>
                  {formatPriority(order.priority)}
                </span>
                <span className={getStatusBadge(order.status)}>
                  {formatStatus(order.status)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Mecanico</p>
                <p className="text-white">{order.mechanic}</p>
              </div>
              <div>
                <p className="text-gray-400">Total</p>
                <p className="text-white font-semibold">${order.total.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-dark-600">
              <div className="text-xs text-gray-500">
                Creado: {order.created}
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

      {/* Work Orders Table - Desktop */}
      <div className="hidden lg:block card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">
            Lista de Ordenes ({filteredOrders.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Vehiculo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mecanico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-dark-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{order.id}</div>
                    <div className="text-xs text-gray-400">{order.created}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-primary-400" />
                      </div>
                      <div className="text-sm text-gray-300">{order.customer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.vehicle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-warning-500/20 rounded-full flex items-center justify-center mr-3">
                        <Wrench className="w-4 h-4 text-warning-400" />
                      </div>
                      <div className="text-sm text-gray-300">{order.mechanic}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(order.status)}>
                      {formatStatus(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPriorityBadge(order.priority)}>
                      {formatPriority(order.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    ${order.total.toLocaleString()}
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
      {filteredOrders.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No se encontraron ordenes</h3>
          <p className="text-gray-400 mb-6">Intenta ajustar los filtros de busqueda</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setPriorityFilter('');
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