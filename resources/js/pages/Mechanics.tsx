import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, MoreVertical, Wrench, Phone, Mail, Calendar, Star, Award, Clock } from 'lucide-react';

const mechanics = [
  {
    id: 1,
    name: 'Carlos Mendez',
    email: 'carlos.mendez@autotaller.com',
    phone: '+1 234-567-8901',
    specialization: 'Motor y Transmisión',
    experience: 8,
    certification: 'ASE Master Technician',
    shift: 'morning',
    rating: 4.8,
    activeOrders: 3,
    completedOrders: 125,
    hireDate: '2020-03-15',
    status: 'active',
    avatar: null,
  },
  {
    id: 2,
    name: 'Luis Rodriguez',
    email: 'luis.rodriguez@autotaller.com',
    phone: '+1 234-567-8902',
    specialization: 'Sistemas Eléctricos',
    experience: 5,
    certification: 'Electrical Systems Specialist',
    shift: 'afternoon',
    rating: 4.6,
    activeOrders: 2,
    completedOrders: 89,
    hireDate: '2021-07-10',
    status: 'active',
    avatar: null,
  },
  {
    id: 3,
    name: 'Ana Martinez',
    email: 'ana.martinez@autotaller.com',
    phone: '+1 234-567-8903',
    specialization: 'Frenos y Suspensión',
    experience: 12,
    certification: 'Brake & Suspension Expert',
    shift: 'morning',
    rating: 4.9,
    activeOrders: 4,
    completedOrders: 287,
    hireDate: '2018-01-20',
    status: 'active',
    avatar: null,
  },
  {
    id: 4,
    name: 'Pedro Gonzalez',
    email: 'pedro.gonzalez@autotaller.com',
    phone: '+1 234-567-8904',
    specialization: 'Aire Acondicionado',
    experience: 6,
    certification: 'HVAC Certified',
    shift: 'evening',
    rating: 4.4,
    activeOrders: 1,
    completedOrders: 156,
    hireDate: '2019-11-05',
    status: 'busy',
    avatar: null,
  },
  {
    id: 5,
    name: 'Sofia Ramirez',
    email: 'sofia.ramirez@autotaller.com',
    phone: '+1 234-567-8905',
    specialization: 'Diagnóstico Automotriz',
    experience: 10,
    certification: 'Advanced Diagnostics',
    shift: 'morning',
    rating: 4.7,
    activeOrders: 0,
    completedOrders: 203,
    hireDate: '2019-05-12',
    status: 'vacation',
    avatar: null,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'status-badge status-completed';
    case 'busy':
      return 'status-badge status-in-progress';
    case 'vacation':
      return 'status-badge bg-purple-500/20 text-purple-300 border border-purple-500/30';
    case 'inactive':
      return 'status-badge bg-gray-500/20 text-gray-300 border border-gray-500/30';
    default:
      return 'status-badge';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'Disponible';
    case 'busy':
      return 'Ocupado';
    case 'vacation':
      return 'Vacaciones';
    case 'inactive':
      return 'Inactivo';
    default:
      return status;
  }
};

const getShiftBadge = (shift: string) => {
  switch (shift) {
    case 'morning':
      return 'status-badge bg-blue-500/20 text-blue-300 border border-blue-500/30';
    case 'afternoon':
      return 'status-badge bg-orange-500/20 text-orange-300 border border-orange-500/30';
    case 'evening':
      return 'status-badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    default:
      return 'status-badge';
  }
};

const formatShift = (shift: string) => {
  switch (shift) {
    case 'morning':
      return 'Mañana';
    case 'afternoon':
      return 'Tarde';
    case 'evening':
      return 'Noche';
    default:
      return shift;
  }
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function Mechanics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');

  const filteredMechanics = mechanics.filter(mechanic => {
    const matchesSearch = mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mechanic.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mechanic.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || mechanic.status === statusFilter;
    const matchesShift = !shiftFilter || mechanic.shift === shiftFilter;
    
    return matchesSearch && matchesStatus && matchesShift;
  });

  const totalExperience = mechanics.reduce((sum, mech) => sum + mech.experience, 0);
  const averageRating = mechanics.reduce((sum, mech) => sum + mech.rating, 0) / mechanics.length;
  const activeMechanics = mechanics.filter(m => m.status === 'active').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Equipo de Mecánicos</h1>
          <p className="mt-2 text-gray-400">
            Gestiona el personal técnico y sus especialidades
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Horarios
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Mecánico
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Total Mecánicos
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {mechanics.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary-500 group-hover:scale-110 transition-transform duration-200">
              <Wrench className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Disponibles
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {activeMechanics}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success-500 group-hover:scale-110 transition-transform duration-200">
              <Wrench className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Experiencia Total
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {totalExperience} años
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning-500 group-hover:scale-110 transition-transform duration-200">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Rating Promedio
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500 group-hover:scale-110 transition-transform duration-200">
              <Star className="h-6 w-6 text-white" />
            </div>
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
                placeholder="Buscar mecánicos..."
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
              <option value="active">Disponible</option>
              <option value="busy">Ocupado</option>
              <option value="vacation">Vacaciones</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div>
            <label htmlFor="shift" className="block text-sm font-medium text-gray-300 mb-2">
              Turno
            </label>
            <select
              id="shift"
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Todos los turnos</option>
              <option value="morning">Mañana</option>
              <option value="afternoon">Tarde</option>
              <option value="evening">Noche</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setShiftFilter('');
              }}
              className="btn-secondary w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Mechanics Cards - Mobile First */}
      <div className="block lg:hidden space-y-4">
        {filteredMechanics.map((mechanic) => (
          <div key={mechanic.id} className="card hover:bg-dark-700 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-400 font-semibold text-sm">
                    {getInitials(mechanic.name)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{mechanic.name}</h3>
                  <p className="text-gray-400">{mechanic.specialization}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={getStatusBadge(mechanic.status)}>
                      {formatStatus(mechanic.status)}
                    </span>
                    <span className={getShiftBadge(mechanic.shift)}>
                      {formatShift(mechanic.shift)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{mechanic.rating}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Experiencia</p>
                <p className="text-white">{mechanic.experience} años</p>
              </div>
              <div>
                <p className="text-gray-400">Órdenes Activas</p>
                <p className="text-white">{mechanic.activeOrders}</p>
              </div>
              <div>
                <p className="text-gray-400">Completadas</p>
                <p className="text-white">{mechanic.completedOrders}</p>
              </div>
              <div>
                <p className="text-gray-400">Desde</p>
                <p className="text-white">{mechanic.hireDate}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-dark-600">
              <div className="text-xs text-gray-500">
                {mechanic.certification}
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

      {/* Mechanics Table - Desktop */}
      <div className="hidden lg:block card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">
            Equipo de Mecánicos ({filteredMechanics.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mecánico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Especialización
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Turno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredMechanics.map((mechanic) => (
                <tr key={mechanic.id} className="hover:bg-dark-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-primary-400 font-semibold text-sm">
                          {getInitials(mechanic.name)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{mechanic.name}</div>
                        <div className="text-xs text-gray-400">{mechanic.experience} años exp.</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="flex items-center mb-1">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="truncate max-w-32">{mechanic.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {mechanic.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="font-medium">{mechanic.specialization}</div>
                      <div className="text-xs text-gray-500">{mechanic.certification}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{mechanic.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {mechanic.activeOrders} activas • {mechanic.completedOrders} completadas
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(mechanic.status)}>
                      {formatStatus(mechanic.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getShiftBadge(mechanic.shift)}>
                      {formatShift(mechanic.shift)}
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
      {filteredMechanics.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No se encontraron mecánicos</h3>
          <p className="text-gray-400 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setShiftFilter('');
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