# Arquitectura Técnica - AutoTaller Pro

## 📋 Resumen Ejecutivo

AutoTaller Pro es un sistema de gestión de talleres automotrices construido con arquitectura moderna de separación frontend/backend, utilizando Laravel 12.x como API backend y React 18.x con TypeScript como SPA frontend.

## 🏗️ Arquitectura General

### Separación de Responsabilidades

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend SPA  │    │   Backend API   │    │   Database      │
│                 │    │                 │    │                 │
│   React 18.x    │◄──►│   Laravel 12.x  │◄──►│   SQLite/Pgsql  │
│   TypeScript    │    │   PHP 8.2+      │    │                 │
│   Vite          │    │   Sanctum Auth  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Flujo de Datos

```
User Interaction → React Components → Zustand Store → API Service → Laravel Controller → Service Layer → Eloquent Model → Database
```

## 🔧 Backend Architecture (Laravel)

### Estructura de Directorios

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── API/
│   │   │   ├── CustomerController.php
│   │   │   ├── VehicleController.php
│   │   │   ├── WorkOrderController.php
│   │   │   └── ...
│   │   └── AuthController.php
│   ├── Requests/
│   │   ├── StoreCustomerRequest.php
│   │   ├── UpdateCustomerRequest.php
│   │   └── ...
│   ├── Resources/
│   │   ├── CustomerResource.php
│   │   ├── WorkOrderResource.php
│   │   └── ...
│   └── Middleware/
├── Models/
│   ├── Customer.php
│   ├── Vehicle.php
│   ├── WorkOrder.php
│   └── ...
├── Services/
│   ├── WorkOrderService.php
│   └── ...
├── Events/
│   ├── WorkOrderStatusChanged.php
│   └── ...
├── Listeners/
│   ├── SendWorkOrderNotification.php
│   └── ...
└── Policies/
    ├── WorkOrderPolicy.php
    └── ...
```

### Patrones Implementados

#### 1. Service Layer Pattern
```php
class WorkOrderService
{
    public function create(array $data): WorkOrder
    {
        DB::beginTransaction();
        try {
            $workOrder = WorkOrder::create($data);
            $this->addParts($workOrder, $data['parts'] ?? []);
            $this->calculateTotalCost($workOrder);
            DB::commit();
            return $workOrder;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
```

#### 2. Event-Driven Architecture
```php
// Event
class WorkOrderStatusChanged
{
    public function __construct(
        public WorkOrder $workOrder,
        public string $oldStatus
    ) {}
}

// Listener
class SendWorkOrderNotification
{
    public function handle(WorkOrderStatusChanged $event): void
    {
        // Send notification logic
    }
}
```

#### 3. Policy-Based Authorization
```php
class WorkOrderPolicy
{
    public function view(User $user, WorkOrder $workOrder): bool
    {
        return $user->can('view work orders') || 
               $workOrder->customer_id === $user->customer_id;
    }
}
```

### API Design Principles

#### RESTful Endpoints
```
GET    /api/v1/work-orders           # List with pagination
POST   /api/v1/work-orders           # Create new
GET    /api/v1/work-orders/{id}      # Show specific
PUT    /api/v1/work-orders/{id}      # Update
DELETE /api/v1/work-orders/{id}      # Delete
POST   /api/v1/work-orders/{id}/status # Custom action
```

#### Consistent Response Format
```json
{
  "data": {
    "id": 1,
    "order_number": "WO-2024-001",
    "customer": {
      "id": 1,
      "first_name": "Juan",
      "last_name": "Pérez"
    }
  },
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 100
  }
}
```

## ⚛️ Frontend Architecture (React)

### Estructura de Directorios

```
resources/js/
├── components/
│   ├── Layout.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   └── forms/
│       ├── CustomerForm.tsx
│       └── WorkOrderForm.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── WorkOrders.tsx
│   ├── Customers.tsx
│   └── ...
├── hooks/
│   ├── useWorkOrders.ts
│   ├── useCustomers.ts
│   └── useAuth.ts
├── services/
│   ├── api.ts
│   ├── workOrderService.ts
│   └── authService.ts
├── store/
│   ├── useAuthStore.ts
│   ├── useWorkOrderStore.ts
│   └── ...
├── types/
│   ├── index.ts
│   └── api.ts
└── utils/
    ├── formatters.ts
    ├── validators.ts
    └── constants.ts
```

### Estado Global con Zustand

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

### Custom Hooks para Lógica Reutilizable

```typescript
export function useWorkOrders(filters?: WorkOrderFilters) {
  return useQuery({
    queryKey: ['workOrders', filters],
    queryFn: () => workOrderService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateWorkOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workOrderService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] });
    },
  });
}
```

### TypeScript Interfaces

```typescript
export interface WorkOrder {
  id: number;
  order_number: string;
  customer_id: number;
  vehicle_id: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  total_cost: number;
  customer?: Customer;
  vehicle?: Vehicle;
  created_at: string;
  updated_at: string;
}
```

## 🗄️ Database Architecture

### Esquema de Relaciones

```sql
customers (1) ──── (N) vehicles
    │                   │
    │                   │
    └── (1) ──── (N) work_orders ──── (N) vehicles
                      │
                      ├── (N) ──── (N) parts (work_order_parts)
                      └── (N) ──── (N) mechanics (work_order_mechanics)

mechanics (1) ──── (N) appointments ──── (1) customers
                                    └── (1) vehicles
```

### Migraciones Avanzadas

```php
Schema::create('work_orders', function (Blueprint $table) {
    $table->id();
    $table->string('order_number')->unique();
    $table->foreignId('customer_id')->constrained()->onDelete('cascade');
    $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
    $table->foreignId('assigned_mechanic_id')->nullable()
          ->constrained('mechanics')->onDelete('set null');
    $table->text('problem_description');
    $table->decimal('total_cost', 10, 2)->default(0);
    $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled']);
    $table->enum('priority', ['low', 'medium', 'high', 'urgent']);
    $table->json('images')->nullable();
    $table->timestamps();
    
    $table->index(['status', 'priority']);
    $table->index('customer_id');
    $table->index('assigned_mechanic_id');
});
```

### Modelos Eloquent con Relaciones

```php
class WorkOrder extends Model
{
    protected $casts = [
        'images' => 'array',
        'total_cost' => 'decimal:2',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function parts(): BelongsToMany
    {
        return $this->belongsToMany(Part::class, 'work_order_parts')
                    ->withPivot(['quantity', 'unit_price', 'total_price'])
                    ->withTimestamps();
    }

    // Auto-generate order number
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($workOrder) {
            if (!$workOrder->order_number) {
                $year = date('Y');
                $count = static::whereYear('created_at', $year)->count() + 1;
                $workOrder->order_number = "WO-{$year}-" . str_pad($count, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
```

## 🔐 Seguridad

### Autenticación con Sanctum

```php
// Login
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    $user = Auth::user();
    $token = $user->createToken('auth-token')->plainTextToken;

    return response()->json([
        'user' => new UserResource($user),
        'token' => $token,
    ]);
}
```

### Autorización con Policies

```php
class WorkOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('permission:view work orders')->only(['index', 'show']);
        $this->middleware('permission:create work orders')->only('store');
        $this->middleware('permission:edit work orders')->only('update');
    }

    public function show(WorkOrder $workOrder)
    {
        $this->authorize('view', $workOrder);
        return new WorkOrderResource($workOrder->load(['customer', 'vehicle']));
    }
}
```

### Validación Robusta

```php
class StoreWorkOrderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'problem_description' => 'required|string|max:1000',
            'priority' => 'required|in:low,medium,high,urgent',
            'estimated_hours' => 'nullable|integer|min:1|max:100',
            'parts' => 'nullable|array',
            'parts.*.part_id' => 'required_with:parts|exists:parts,id',
            'parts.*.quantity' => 'required_with:parts|integer|min:1',
        ];
    }

    public function authorize(): bool
    {
        return $this->user()->can('create work orders');
    }
}
```

## 🚀 Performance Optimization

### Backend Optimizations

#### Query Optimization
```php
// Eager Loading to prevent N+1
$workOrders = WorkOrder::with(['customer', 'vehicle', 'assignedMechanic'])
    ->where('status', 'in_progress')
    ->get();

// Query Scopes
class WorkOrder extends Model
{
    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeHighPriority($query)
    {
        return $query->where('priority', 'high');
    }
}
```

#### Caching Strategy
```php
public function index(Request $request)
{
    $cacheKey = 'work_orders_' . md5(serialize($request->all()));
    
    $workOrders = Cache::tags(['work_orders'])
        ->remember($cacheKey, 300, function () use ($request) {
            return WorkOrder::with(['customer', 'vehicle'])
                ->when($request->status, fn($q) => $q->where('status', $request->status))
                ->paginate(15);
        });
    
    return WorkOrderResource::collection($workOrders);
}

// Cache invalidation
public function update(WorkOrder $workOrder, UpdateWorkOrderRequest $request)
{
    $workOrder->update($request->validated());
    Cache::tags(['work_orders'])->flush();
    return new WorkOrderResource($workOrder);
}
```

### Frontend Optimizations

#### Code Splitting
```typescript
// Lazy loading pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const WorkOrders = lazy(() => import('@/pages/WorkOrders'));

// Route-based splitting
<Route 
  path="/work-orders" 
  element={
    <Suspense fallback={<Loading />}>
      <WorkOrders />
    </Suspense>
  } 
/>
```

#### React Query Optimizations
```typescript
// Prefetching
function useWorkOrdersWithPrefetch() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['workOrders'],
    queryFn: workOrderService.getAll,
    onSuccess: (data) => {
      // Prefetch individual work orders
      data.forEach(workOrder => {
        queryClient.setQueryData(['workOrders', workOrder.id], workOrder);
      });
    },
  });
}

// Background refetching
export function useWorkOrders() {
  return useQuery({
    queryKey: ['workOrders'],
    queryFn: workOrderService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
}
```

## 📊 Monitoreo y Logging

### Logging Estructurado
```php
Log::info('Work order created', [
    'work_order_id' => $workOrder->id,
    'customer_id' => $workOrder->customer_id,
    'user_id' => auth()->id(),
    'ip_address' => request()->ip(),
]);

Log::warning('Low stock alert', [
    'part_id' => $part->id,
    'current_stock' => $part->stock_quantity,
    'min_level' => $part->min_stock_level,
]);
```

### Error Handling
```typescript
// Frontend error boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## 🧪 Testing Strategy

### Backend Testing
```php
class WorkOrderControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_work_order()
    {
        $user = User::factory()->create();
        $customer = Customer::factory()->create();
        $vehicle = Vehicle::factory()->create(['customer_id' => $customer->id]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/work-orders', [
                'customer_id' => $customer->id,
                'vehicle_id' => $vehicle->id,
                'problem_description' => 'Engine noise',
                'priority' => 'medium',
            ]);

        $response->assertStatus(201)
                ->assertJsonStructure(['data' => ['id', 'order_number']]);
    }
}
```

### Frontend Testing
```typescript
// Unit test with React Testing Library
import { render, screen } from '@testing-library/react';
import { WorkOrderCard } from '@/components/WorkOrderCard';

test('displays work order information', () => {
  const workOrder = {
    id: 1,
    order_number: 'WO-2024-001',
    customer: { first_name: 'Juan', last_name: 'Pérez' },
    status: 'in_progress',
  };

  render(<WorkOrderCard workOrder={workOrder} />);
  
  expect(screen.getByText('WO-2024-001')).toBeInTheDocument();
  expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  expect(screen.getByText('En Progreso')).toBeInTheDocument();
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.2'
        
    - name: Install dependencies
      run: composer install
      
    - name: Run tests
      run: php artisan test
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install frontend dependencies
      run: npm install
      
    - name: Build frontend
      run: npm run build
      
    - name: Run frontend tests
      run: npm test
```

Esta arquitectura técnica proporciona una base sólida, escalable y mantenible para el sistema AutoTaller Pro, siguiendo las mejores prácticas de desarrollo senior tanto en backend como frontend.