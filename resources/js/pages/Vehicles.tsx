import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, MoreVertical, Car, Calendar, User, Wrench } from 'lucide-react';

const vehicles = [
  {
    id: 1,
    licensePlate: 'ABC-123',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    color: 'Blanco',
    owner: 'Juan Perez',
    vin: '1HGCM82633A123456',
    engine: '1.8L 4-Cyl',
    transmission: 'CVT',
    mileage: 45000,
    lastService: '2024-01-15',
    nextService: '2024-07-15',
    status: 'active',
  },
  {
    id: 2,
    licensePlate: 'XYZ-789',
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    color: 'Negro',
    owner: 'Maria Garcia',
    vin: '1HGCM82633A789012',
    engine: '2.0L 4-Cyl',
    transmission: 'Manual',
    mileage: 52000,
    lastService: '2024-01-14',
    nextService: '2024-07-14',
    status: 'active',
  },
  {
    id: 3,
    licensePlate: 'DEF-456',
    brand: 'Ford',
    model: 'Focus',
    year: 2021,
    color: 'Azul',
    owner: 'Carlos Rodriguez',
    vin: '1FADP3F28EL345678',
    engine: '2.0L 4-Cyl Turbo',
    transmission: 'Automatica',
    mileage: 28000,
    lastService: '2024-01-13',
    nextService: '2024-07-13',
    status: 'active',
  },
  {
    id: 4,
    licensePlate: 'GHI-999',
    brand: 'Nissan',
    model: 'Altima',
    year: 2018,
    color: 'Rojo',
    owner: 'Sofia Lopez',
    vin: '1N4AL3AP4JN901234',
    engine: '2.5L 4-Cyl',
    transmission: 'CVT',
    mileage: 68000,
    lastService: '2024-01-12',
    nextService: '2024-07-12',
    status: 'maintenance',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'status-badge status-completed';
    case 'maintenance':
      return 'status-badge status-in-progress';
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
    case 'maintenance':
      return 'En Mantenimiento';
    case 'inactive':
      return 'Inactivo';
    default:
      return status;
  }
};

const getServiceStatus = (nextService: string) => {
  const today = new Date();
  const serviceDate = new Date(nextService);
  const daysDiff = Math.ceil((serviceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  if (daysDiff < 0) return 'overdue';
  if (daysDiff <= 30) return 'due-soon';
  return 'ok';
};

const getServiceBadge = (status: string) => {
  switch (status) {
    case 'overdue':
      return 'status-badge priority-urgent';
    case 'due-soon':
      return 'status-badge priority-high';
    case 'ok':
      return 'status-badge status-completed';
    default:
      return 'status-badge';
  }
};

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || vehicle.status === statusFilter;
    const matchesBrand = !brandFilter || vehicle.brand === brandFilter;
    
    return matchesSearch && matchesStatus && matchesBrand;
  });

  const brands = [...new Set(vehicles.map(v => v.brand))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vehículos</h1>
          <p className="mt-2 text-gray-400">
            Gestiona todos los vehículos registrados en el taller
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Servicios
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Vehículo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Total Vehículos
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {vehicles.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary-500 group-hover:scale-110 transition-transform duration-200">
              <Car className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Activos
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {vehicles.filter(v => v.status === 'active').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success-500 group-hover:scale-110 transition-transform duration-200">
              <Car className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                En Mantenimiento
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-warning-500 group-hover:scale-110 transition-transform duration-200">
              <Wrench className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="card group hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Servicios Vencidos
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {vehicles.filter(v => getServiceStatus(v.nextService) === 'overdue').length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-danger-500 group-hover:scale-110 transition-transform duration-200">
              <Calendar className="h-6 w-6 text-white" />
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
                placeholder="Buscar vehículos..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-2">
              Marca
            </label>
            <select
              id="brand"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="input-field"
            >
              <option value="">Todas las marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
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
              <option value="maintenance">En Mantenimiento</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setBrandFilter('');
              }}
              className="btn-secondary w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Vehicles Cards - Mobile First */}
      <div className="block lg:hidden space-y-4">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="card hover:bg-dark-700 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{vehicle.licensePlate}</h3>
                  <p className="text-gray-400">{vehicle.brand} {vehicle.model} {vehicle.year}</p>
                  <p className="text-sm text-gray-500">{vehicle.owner}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className={getStatusBadge(vehicle.status)}>
                  {formatStatus(vehicle.status)}
                </span>
                <span className={getServiceBadge(getServiceStatus(vehicle.nextService))}>
                  Servicio
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Color</p>
                <p className="text-white">{vehicle.color}</p>
              </div>
              <div>
                <p className="text-gray-400">Kilometraje</p>
                <p className="text-white">{vehicle.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-gray-400">Motor</p>
                <p className="text-white">{vehicle.engine}</p>
              </div>
              <div>
                <p className="text-gray-400">Próximo servicio</p>
                <p className="text-white">{vehicle.nextService}</p>
              </div>
            </div>
            <div className="flex justify-end items-center mt-4 pt-4 border-t border-dark-600">
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

      {/* Vehicles Table - Desktop */}
      <div className="hidden lg:block card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">
            Lista de Vehículos ({filteredVehicles.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Propietario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Detalles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Kilometraje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-dark-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center mr-4">
                        <Car className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{vehicle.licensePlate}</div>
                        <div className="text-xs text-gray-400">{vehicle.brand} {vehicle.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-warning-500/20 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-warning-400" />
                      </div>
                      <div className="text-sm text-gray-300">{vehicle.owner}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div>{vehicle.year} • {vehicle.color}</div>
                    <div className="text-xs text-gray-500">{vehicle.engine}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {vehicle.mileage.toLocaleString()} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(vehicle.status)}>
                      {formatStatus(vehicle.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={getServiceBadge(getServiceStatus(vehicle.nextService))}>
                        {getServiceStatus(vehicle.nextService) === 'overdue' ? 'Vencido' :
                         getServiceStatus(vehicle.nextService) === 'due-soon' ? 'Próximo' : 'Al día'}
                      </span>
                      <div className="text-xs text-gray-500">{vehicle.nextService}</div>
                    </div>
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
      {filteredVehicles.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No se encontraron vehículos</h3>
          <p className="text-gray-400 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setBrandFilter('');
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