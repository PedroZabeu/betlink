/**
 * Authentication error handling and mapping
 * Feature 1.4: Basic Authentication
 */

/**
 * Type for authentication errors
 */
export interface AuthError {
  message?: string;
  code?: string;
  status?: number;
  details?: string;
}

/**
 * Maps Supabase auth errors to user-friendly Portuguese messages
 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Authentication errors
  'Invalid login credentials': 'Email ou senha incorretos',
  'Invalid email or password': 'Email ou senha incorretos',
  'User not found': 'Email ou senha incorretos', // Don't reveal user existence
  'Invalid password': 'Email ou senha incorretos',
  
  // Email confirmation
  'Email not confirmed': 'Por favor, confirme seu email primeiro',
  'Email link is invalid or has expired': 'Link de confirmação inválido ou expirado',
  
  // Rate limiting
  'Too many requests': 'Muitas tentativas. Aguarde 15 minutos',
  'Email rate limit exceeded': 'Muitos emails enviados. Aguarde antes de tentar novamente',
  
  // Account status
  'Account locked': 'Conta temporariamente bloqueada por segurança',
  'User account has been locked': 'Sua conta foi bloqueada. Entre em contato com o suporte',
  
  // Network and server errors
  'Network error': 'Erro de conexão. Verifique sua internet',
  'Server error': 'Erro no servidor. Tente novamente',
  'Service unavailable': 'Serviço temporariamente indisponível',
  
  // Session errors
  'Session expired': 'Sua sessão expirou. Faça login novamente',
  'Invalid refresh token': 'Sessão inválida. Faça login novamente',
  'No valid session': 'Nenhuma sessão ativa encontrada',
  
  // Generic fallback
  'An error occurred': 'Erro inesperado. Tente novamente',
  'Unknown error': 'Erro desconhecido. Entre em contato com o suporte'
};

/**
 * Profile-specific error messages
 */
export const PROFILE_ERROR_MESSAGES: Record<string, string> = {
  // Profile validation
  'Profile not found': 'Perfil não encontrado. Entre em contato com o suporte',
  'Incomplete profile': 'Complete seu perfil antes de continuar',
  'Invalid phone format': 'Telefone inválido. Use (11) 99999-9999',
  'Invalid telegram username': 'Username do Telegram inválido (5-32 caracteres, apenas letras, números e _)',
  'Telegram username taken': 'Este username do Telegram já está em uso',
  
  // Role errors
  'Invalid role': 'Tipo de usuário inválido',
  'Access denied': 'Acesso negado. Você não tem permissão para esta área',
  'Wrong login area': 'Use a área de login correta para seu tipo de usuário',
  
  // Status errors
  'Account suspended': 'Sua conta está suspensa. Entre em contato com o suporte',
  'Account pending': 'Sua conta está pendente de aprovação',
  'Account blocked': 'Sua conta foi bloqueada. Entre em contato com o suporte'
};

/**
 * Validation error messages
 */
export const VALIDATION_ERROR_MESSAGES = {
  email: {
    required: 'Email é obrigatório',
    invalid: 'Email inválido',
    taken: 'Este email já está cadastrado'
  },
  password: {
    required: 'Senha é obrigatória',
    tooShort: 'Senha deve ter no mínimo 8 caracteres',
    tooWeak: 'Senha muito fraca. Use maiúsculas, minúsculas, números e caracteres especiais',
    mismatch: 'As senhas não coincidem',
    common: 'Esta senha é muito comum. Escolha uma mais segura'
  },
  phone: {
    required: 'Telefone é obrigatório',
    invalid: 'Telefone inválido. Use o formato (11) 99999-9999'
  },
  telegram: {
    required: 'Username do Telegram é obrigatório',
    invalid: 'Username inválido. Use apenas letras, números e underscore',
    tooShort: 'Username deve ter no mínimo 5 caracteres',
    tooLong: 'Username deve ter no máximo 32 caracteres',
    hasAt: 'Não inclua @ no username'
  }
};

/**
 * Maps Supabase error codes to user messages
 */
export function mapAuthError(error: AuthError | Error | unknown): string {
  console.error('[Auth Error]', {
    message: (error as AuthError)?.message,
    code: (error as AuthError)?.code,
    status: (error as AuthError)?.status,
    timestamp: new Date().toISOString()
  });

  // Check for specific error messages first
  if ((error as AuthError)?.message && AUTH_ERROR_MESSAGES[(error as AuthError).message!]) {
    return AUTH_ERROR_MESSAGES[(error as AuthError).message!];
  }
  
  // Check for error codes
  if ((error as AuthError)?.code) {
    switch ((error as AuthError).code) {
      case 'invalid_credentials':
        return AUTH_ERROR_MESSAGES['Invalid login credentials'];
      case 'email_not_confirmed':
        return AUTH_ERROR_MESSAGES['Email not confirmed'];
      case 'too_many_requests':
        return AUTH_ERROR_MESSAGES['Too many requests'];
      case 'user_not_found':
        return AUTH_ERROR_MESSAGES['User not found'];
      default:
        console.warn('[Auth Error] Unmapped error code:', (error as AuthError).code);
    }
  }
  
  // Check for network errors
  if ((error as AuthError)?.message?.toLowerCase().includes('network')) {
    return AUTH_ERROR_MESSAGES['Network error'];
  }
  
  if ((error as AuthError)?.message?.toLowerCase().includes('fetch')) {
    return AUTH_ERROR_MESSAGES['Network error'];
  }
  
  // Default fallback
  return AUTH_ERROR_MESSAGES['Unknown error'];
}

export function getAuthErrorMessage(errorMessage: string): string {
  // Map Supabase error messages to user-friendly Portuguese messages
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Email ou senha incorretos',
    'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada',
    'Too many requests': 'Muitas tentativas. Tente novamente em alguns minutos',
    'User not found': 'Usuário não encontrado',
    'Account is locked': 'Conta bloqueada. Tente novamente em 15 minutos',
    'Password is too weak': 'Senha muito fraca',
    'Email already registered': 'Email já cadastrado',
    'Invalid email': 'Email inválido',
    'Missing email': 'Email é obrigatório',
    'Missing password': 'Senha é obrigatória',
  }

  // Check for exact matches first
  if (errorMap[errorMessage]) {
    return errorMap[errorMessage]
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }

  // Default error message
  return 'Erro ao fazer login. Verifique suas credenciais e tente novamente'
}

/**
 * Creates a standardized error response
 */
export interface AuthErrorResponse {
  error: string;
  field?: string;
  code?: string;
}

/**
 * Creates an error response object
 */
export function createAuthError(
  message: string, 
  field?: string, 
  code?: string
): AuthErrorResponse {
  const response: AuthErrorResponse = { error: message };
  
  if (field) response.field = field;
  if (code) response.code = code;
  
  console.error('[Auth] Error created:', response);
  
  return response;
}

/**
 * Logs authentication events for debugging
 */
export function logAuthEvent(event: {
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'account_locked' | 'session_refresh';
  userId?: string;
  email?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}) {
  const logEntry = {
    ...event,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  };
  
  if (event.type === 'failed_login' || event.type === 'account_locked') {
    console.error('[AuthAudit]', logEntry);
  } else {
    console.log('[AuthAudit]', logEntry);
  }
  
  // In production, this would send to a logging service
  // For now, just console logging with structured format
}