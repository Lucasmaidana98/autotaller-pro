import React from 'react';
import { 
  FileText, 
  Users, 
  Car, 
  Package, 
  TrendingUp, 
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const stats = [
  {
    name: 'Órdenes Activas',
    value: '24',
    icon: FileText,
    change: '+12%',
    changeType: 'increase',
  },
  {
    name: 'Clientes Totales',
    value: '1,234',
    icon: Users,
    change: '+5%',
    changeType: 'increase',
  },
  {
    name: 'Vehículos',
    value: '1,567',
    icon: Car,
    change: '+8%',
    changeType: 'increase',
  },
  {
    name: 'Repuestos Bajo Stock',
    value: '12',
    icon: Package,
    change: '-3%',
    changeType: 'decrease',
  },
];

const recentWorkOrders = [
  {
    id: 'WO-2024-001',
    customer: 'Juan Pérez',
    vehicle: '2020 Toyota Corolla',
    status: 'in_progress',
    priority: 'high',
    created: '2024-01-15',
  },
  {
    id: 'WO-2024-002',
    customer: 'María García',
    vehicle: '2019 Honda Civic',
    status: 'pending',
    priority: 'medium',
    created: '2024-01-14',
  },
  {
    id: 'WO-2024-003',
    customer: 'Carlos Rodríguez',
    vehicle: '2021 Ford Focus',
    status: 'completed',
    priority: 'low',
    created: '2024-01-13',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vista general del taller automotriz
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Work Orders */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Órdenes de Trabajo Recientes
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Últimas órdenes de trabajo creadas
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentWorkOrders.map((order) => (
                <li key={order.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer} - {order.vehicle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                          order.priority
                        )}`}
                      >
                        {order.priority}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Alertas y Notificaciones
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Elementos que requieren atención
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      12 repuestos con stock bajo
                    </p>
                    <p className="text-sm text-gray-500">
                      Revisar inventario y realizar pedidos
                    </p>
                  </div>
                </div>
              </li>
              <li className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      3 órdenes vencidas
                    </p>
                    <p className="text-sm text-gray-500">
                      Órdenes que superaron el tiempo estimado
                    </p>
                  </div>
                </div>
              </li>
              <li className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      5 órdenes completadas hoy
                    </p>
                    <p className="text-sm text-gray-500">
                      Excelente productividad del equipo
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}