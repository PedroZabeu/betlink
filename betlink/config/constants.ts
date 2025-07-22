// Application constants and configuration
// Will be expanded as features are implemented

export const APP_NAME = 'BetLink';

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TIPSTER_LOGIN: '/tipster/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  MEUS_CANAIS: '/meus-canais',
  
  // Future routes
  CHANNELS: '/canais',
  CHANNEL_DETAIL: '/canal/[id]',
  BLOG: '/blog',
} as const;

export const ROLES = {
  MASTER: 'Master',
  ADMIN: 'Admin',
  TIPSTER: 'Tipster',
  CLIENTE: 'Cliente',
} as const;

export const ROLE_COLORS = {
  [ROLES.MASTER]: 'bg-purple-600',
  [ROLES.ADMIN]: 'bg-red-600',
  [ROLES.TIPSTER]: 'bg-blue-600',
  [ROLES.CLIENTE]: 'bg-green-600',
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
  PAYMENT_FAILED: 'payment_failed',
} as const;

export const CHANNEL_REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const PAYMENT_GRACE_PERIOD_DAYS = 3;
export const WAITING_LIST_RESPONSE_HOURS = 24;