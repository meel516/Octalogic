import { Dayjs } from 'dayjs';

export interface VehicleType {
  id: number;
  name: string;
  wheelCount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: number;
  model: string;
  make: string;
  year: number;
  color: string;
  licensePlate: string;
  dailyRate: number;
  available: boolean;
  vehicleTypeId: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  VehicleType?: VehicleType;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  wheels: number | null;
  vehicleTypeId: number | null;
  vehicleId: number | null;
  selectedVehicle?: Vehicle;
  dateRange: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
}

export interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  vehicleId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  message: string;
  booking: Booking;
  vehicle: Vehicle;
  rentalDuration: number;
}