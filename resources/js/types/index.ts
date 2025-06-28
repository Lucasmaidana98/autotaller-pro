export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  document_type?: string;
  document_number?: string;
  birth_date?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: number;
  customer_id: number;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  color?: string;
  type: 'car' | 'motorcycle' | 'truck' | 'van';
  mileage?: number;
  engine_type?: string;
  notes?: string;
  status: 'active' | 'inactive';
  customer?: Customer;
  created_at: string;
  updated_at: string;
}

export interface Mechanic {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  specialties: string[];
  hourly_rate: number;
  hire_date: string;
  experience_years: number;
  status: 'active' | 'inactive' | 'on_leave';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Part {
  id: number;
  name: string;
  part_number: string;
  description?: string;
  category: string;
  brand?: string;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  min_stock_level: number;
  supplier?: string;
  location?: string;
  status: 'available' | 'out_of_stock' | 'discontinued';
  created_at: string;
  updated_at: string;
}

export interface WorkOrder {
  id: number;
  order_number: string;
  customer_id: number;
  vehicle_id: number;
  assigned_mechanic_id?: number;
  problem_description: string;
  diagnosis?: string;
  work_performed?: string;
  labor_cost: number;
  parts_cost: number;
  total_cost: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'waiting_parts' | 'waiting_approval' | 'completed' | 'cancelled';
  started_at?: string;
  completed_at?: string;
  estimated_completion?: string;
  estimated_hours?: number;
  customer_notes?: string;
  internal_notes?: string;
  images?: string[];
  customer?: Customer;
  vehicle?: Vehicle;
  assigned_mechanic?: Mechanic;
  parts?: Part[];
  mechanics?: Mechanic[];
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  customer_id: number;
  vehicle_id: number;
  mechanic_id?: number;
  scheduled_at: string;
  duration_minutes: number;
  service_type: string;
  description?: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  confirmed_at?: string;
  started_at?: string;
  completed_at?: string;
  customer?: Customer;
  vehicle?: Vehicle;
  mechanic?: Mechanic;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}