import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';

export default function WorkOrders() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Órdenes de Trabajo</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona todas las órdenes de trabajo del taller
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <Plus className="inline h-4 w-4 mr-2" />
            Nueva Orden
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Buscar
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Buscar órdenes..."
                />
              </div>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Prioridad
              </label>
              <select
                id="priority"
                name="priority"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
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
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Lista de Órdenes
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Placeholder data */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    WO-2024-001
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Juan Pérez
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2020 Toyota Corolla
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      En Progreso
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Alta
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $1,250.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-primary-600 hover:text-primary-900 mr-4">
                      Ver
                    </a>
                    <a href="#" className="text-primary-600 hover:text-primary-900">
                      Editar
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}