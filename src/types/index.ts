export interface ServiceConfiguration {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  startingPrice: number;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  whatsIncluded: string[];
  configurations: ServiceConfiguration[];
  details?: string[];
  commonFaults?: string[];
  brands?: string[];
  icon?: string;
}

export interface EquipmentItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  repairPoints: string[];
  specs: { label: string; value: string }[];
}

export interface SymptomRule {
  id: string;
  equipment: string;
  symptom: string;
  likelyCause: string;
  recommendedAction: string;
  severity: 'Immediate' | 'Moderate' | 'Routine';
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  equipmentType: string;
  brandModel: string;
  issueDescription: string;
  contactMethod: 'phone' | 'whatsapp' | 'email';
  urgency: 'standard' | 'express';
  serviceId?: string;
  serviceTitle?: string;
  selectedConfigurations?: string[];
  totalAmount?: number;
  advanceAmount?: number;
  address?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
}
