// Type definitions for BetLink application
// Will be expanded as features are implemented

export type UserRole = 'Master' | 'Admin' | 'Tipster' | 'Cliente';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: Profile;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  phone?: string;
  telegram_username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Channel {
  id: string;
  tipster_id: string;
  name: string;
  description?: string;
  price: number;
  max_subscribers: number;
  current_subscribers: number;
  telegram_channel_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  channel_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'payment_failed';
  price: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface ChannelRequest {
  id: string;
  tipster_id: string;
  name: string;
  description: string;
  justification: string;
  proposed_price: number;
  status: 'pending' | 'approved' | 'rejected';
  admin_feedback?: string;
  created_at: string;
  updated_at: string;
}