/**
 * Role-based redirect logic
 * Feature 1.4: Basic Authentication
 */

import { UserRole } from '@/types';

/**
 * Maps user roles to their default redirect paths
 */
export const ROLE_REDIRECTS: Record<UserRole, string> = {
  'Master': '/admin',
  'Admin': '/admin',
  'Tipster': '/meus-canais',
  'Cliente': '/dashboard'
};

/**
 * Maps login types to allowed roles
 */
export const LOGIN_TYPE_ROLES = {
  admin: ['Master', 'Admin'] as UserRole[],
  tipster: ['Tipster'] as UserRole[],
  client: ['Cliente'] as UserRole[]
};

/**
 * Gets the redirect path for a given role
 */
export function getRedirectPath(role: UserRole): string {
  console.log('[Redirects] Getting redirect path for role:', role);
  
  const path = ROLE_REDIRECTS[role];
  
  if (!path) {
    console.error('[Redirects] No redirect path found for role:', role);
    return '/'; // Fallback to home
  }
  
  console.log('[Redirects] Redirecting to:', path);
  return path;
}

/**
 * Validates if a role can access a specific login type
 */
export function canAccessLoginType(
  role: UserRole, 
  loginType: 'admin' | 'tipster' | 'client'
): boolean {
  const allowedRoles = LOGIN_TYPE_ROLES[loginType];
  const canAccess = allowedRoles.includes(role);
  
  if (!canAccess) {
    console.error('[Redirects] Access denied:', {
      role,
      loginType,
      allowedRoles
    });
  }
  
  return canAccess;
}

/**
 * Gets the appropriate login URL based on role
 */
export function getLoginUrl(role?: UserRole): string {
  if (!role) return '/login';
  
  switch (role) {
    case 'Master':
    case 'Admin':
      return '/login'; // Admins use main login
    case 'Tipster':
      return '/tipster/login';
    case 'Cliente':
      return '/login';
    default:
      return '/login';
  }
}

/**
 * Protected routes configuration
 */
export const PROTECTED_ROUTES = {
  '/admin': ['Master', 'Admin'] as UserRole[],
  '/meus-canais': ['Tipster'] as UserRole[],
  '/dashboard': ['Cliente'] as UserRole[],
};

/**
 * Checks if a path requires authentication
 */
export function isProtectedRoute(path: string): boolean {
  return Object.keys(PROTECTED_ROUTES).some(route => 
    path.startsWith(route)
  );
}

/**
 * Checks if a role can access a specific path
 */
export function canAccessPath(role: UserRole, path: string): boolean {
  // Find the matching protected route
  const protectedRoute = Object.entries(PROTECTED_ROUTES).find(
    ([route]) => path.startsWith(route)
  );
  
  if (!protectedRoute) {
    // Not a protected route, anyone can access
    return true;
  }
  
  const [route, allowedRoles] = protectedRoute;
  const canAccess = allowedRoles.includes(role);
  
  if (!canAccess) {
    console.warn('[Redirects] Access denied to path:', {
      role,
      path,
      allowedRoles
    });
  }
  
  return canAccess;
}

/**
 * Gets error message for access denied scenarios
 */
export function getAccessDeniedMessage(
  role: UserRole, 
  attemptedPath: string
): string {
  if (attemptedPath.startsWith('/admin')) {
    return 'Acesso negado. Área administrativa.';
  }
  
  if (attemptedPath.startsWith('/meus-canais')) {
    return 'Acesso negado. Área exclusiva para tipsters.';
  }
  
  if (attemptedPath.startsWith('/dashboard')) {
    return 'Acesso negado. Área exclusiva para clientes.';
  }
  
  return 'Acesso negado. Você não tem permissão para acessar esta página.';
}

/**
 * Handles redirect after login with return URL
 */
export function getPostLoginRedirect(
  role: UserRole, 
  returnUrl?: string | null
): string {
  // If there's a return URL and the user can access it, use it
  if (returnUrl && canAccessPath(role, returnUrl)) {
    console.log('[Redirects] Using return URL:', returnUrl);
    return returnUrl;
  }
  
  // Otherwise, use the default redirect for the role
  return getRedirectPath(role);
}