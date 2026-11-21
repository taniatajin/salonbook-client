export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number; // minutes
  image: string;
  status: "active" | "inactive";
  createdAt?: string;
};

export type Customer = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  isBlocked: boolean;
  createdAt?: string;
  appointmentCount?: number;
};

export type Appointment = {
  _id: string;
  serviceId: string;
  customerId: string;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string;
  message: string;
  servicePrice: number;
  paymentStatus: "unpaid" | "paid";
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  service?: Service;
  customer?: Pick<Customer, "_id" | "name" | "email" | "image" | "phone">;
};

export type Transaction = {
  _id: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: "paid" | "failed";
  createdAt: string;
  appointment?: Appointment;
  service?: Service;
  customer?: Pick<Customer, "_id" | "name" | "email" | "image" | "phone">;
};

export type CustomerStats = {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
};

export type AdminStats = {
  totalCustomers: number;
  activeServices: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  successfulPayments: number;
};