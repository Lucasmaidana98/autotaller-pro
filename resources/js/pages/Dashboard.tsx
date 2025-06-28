import React from 'react';
import { 
  FileText, 
  Users, 
  Car, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Activity,
  BarChart3,
  Plus,
  ArrowUpRight,
  Calendar
} from 'lucide-react';

const stats = [
  {
    name: 'Ordenes Activas',
    value: '24',
    icon: FileText,
    change: '+12%',
    changeType: 'increase',
    color: 'primary',
  },
  {
    name: 'Clientes Totales',
    value: '1,234',
    icon: Users,
    change: '+5%',
    changeType: 'increase',
    color: 'success',
  },
  {
    name: 'Vehiculos',
    value: '1,567',
    icon: Car,
    change: '+8%',
    changeType: 'increase',
    color: 'warning',
  },
  {
    name: 'Repuestos Bajo Stock',
    value: '12',
    icon: Package,
    change: '-3%',
    changeType: 'decrease',
    color: 'danger',
  },
];

const recentWorkOrders = [
  {
    id: 'WO-2024-001',
    customer: 'Juan Perez',
    vehicle: '2020 Toyota Corolla',
    status: 'in_progress',
    priority: 'high',
    created: '2024-01-15',
    amount: '$1,250',
  },
  {
    id: 'WO-2024-002',
    customer: 'Maria Garcia',
    vehicle: '2019 Honda Civic',
    status: 'pending',
    priority: 'medium',
    created: '2024-01-14',
    amount: '$850',
  },
  {
    id: 'WO-2024-003',
    customer: 'Carlos Rodriguez',
    vehicle: '2021 Ford Focus',
    status: 'completed',
    priority: 'low',
    created: '2024-01-13',
    amount: '$2,100',
  },
];

const alerts = [
  {
    id: 1,
    type: 'warning',
    icon: AlertCircle,
    title: '12 repuestos con stock bajo',
    description: 'Revisar inventario y realizar pedidos',
    time: 'Hace 2 horas',
  },
  {
    id: 2,
    type: 'danger',
    icon: Clock,
    title: '3 ordenes vencidas',
    description: 'Ordenes que superaron el tiempo estimado',
    time: 'Hace 1 hora',
  },
  {
    id: 3,
    type: 'success',
    icon: CheckCircle,
    title: '5 ordenes completadas hoy',
    description: 'Excelente productividad del equipo',
    time: 'Hace 30 min',
  },
  {
    id: 4,
    type: 'info',
    icon: Calendar,
    title: '8 citas para mañana',
    description: 'Revisar calendario de servicios',
    time: 'Hace 15 min',
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
    default:
      return 'status-badge';
  }
};

const getStatColor = (color: string) => {
  switch (color) {
    case 'primary':
      return 'bg-primary-500';
    case 'success':
      return 'bg-success-500';
    case 'warning':
      return 'bg-warning-500';
    case 'danger':
      return 'bg-danger-500';
    default:
      return 'bg-primary-500';
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'warning':
      return 'text-warning-400';
    case 'danger':
      return 'text-danger-400';
    case 'success':
      return 'text-success-400';
    case 'info':
      return 'text-primary-400';
    default:
      return 'text-gray-400';
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-gray-400">
            Vista general del taller automotriz
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn-secondary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reportes
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Orden
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card group hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${getStatColor(stat.color)} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-success-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-danger-400 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-success-400' : 'text-danger-400'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-400 ml-2">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Ingresos del Mes</h3>
            <p className="text-gray-400">Resumen de ingresos y tendencias</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-success-400 mr-2" />
              <span className="text-2xl font-bold text-white">$45,280</span>
            </div>
            <button className="btn-secondary">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-64 bg-dark-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">Grafico de ingresos - Aqui iria Chart.js o similar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Work Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Ordenes Recientes</h3>
              <p className="text-gray-400">Ultimas ordenes de trabajo</p>
            </div>
            <button className="btn-secondary text-sm">
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            {recentWorkOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{order.id}</div>
                    <div className="text-sm text-gray-400">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.vehicle}</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold text-white">{order.amount}</div>
                  <div className="flex space-x-2">
                    <span className={getPriorityBadge(order.priority)}>
                      {order.priority}
                    </span>
                    <span className={getStatusBadge(order.status)}>
                      {order.status === 'in_progress' ? 'En progreso' : 
                       order.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Alertas y Notificaciones</h3>
              <p className="text-gray-400">Elementos que requieren atencion</p>
            </div>
            <div className="w-3 h-3 bg-danger-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                <div className={`flex-shrink-0 ${getAlertColor(alert.type)}`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    {alert.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {alert.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}