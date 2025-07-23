"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateEmail, validatePassword } from '@/lib/auth/validation';
import { signIn } from '@/app/actions/auth';

interface LoginFormProps {
  loginType?: 'client' | 'tipster' | 'admin';
}

/**
 * Login form component with full validation
 * Feature 1.4: Basic Authentication
 */
export default function LoginForm({ loginType = 'client' }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  console.log('[LoginForm] Rendered with type:', loginType);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      // For testing with simple passwords
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    
    console.log('[LoginForm] Validation result:', { isValid, errors: newErrors });
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('[LoginForm] Form submitted:', { email: formData.email, loginType });
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validateForm()) {
      console.log('[LoginForm] Validation failed');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('[LoginForm] Calling signIn action...');
      const result = await signIn(formData.email, formData.password, loginType);
      
      console.log('[LoginForm] SignIn successful:', result);
      
      // Show success message briefly
      setErrors({ success: 'Login realizado com sucesso! Redirecionando...' });
      
      // Redirect after a short delay
      setTimeout(() => {
        console.log('[LoginForm] Redirecting to:', result.redirect);
        router.push(result.redirect);
      }, 1000);
      
    } catch (error: any) {
      console.error('[LoginForm] Login error:', error);
      
      // Show error message
      setErrors({ 
        submit: error.message || 'Erro ao fazer login. Tente novamente.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFormTitle = () => {
    switch (loginType) {
      case 'admin':
        return 'Login Administrativo';
      case 'tipster':
        return 'Login para Tipsters';
      default:
        return 'Entrar na sua conta';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {getFormTitle()}
      </h2>
      
      {/* Success message */}
      {errors.success && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertDescription className="text-green-700">
            {errors.success}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Error message */}
      {errors.submit && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{errors.submit}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              // Clear error on change
              if (errors.email) {
                setErrors({ ...errors, email: '' });
              }
            }}
            disabled={isLoading}
            className={errors.email ? 'border-red-500' : ''}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        {/* Password field */}
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              // Clear error on change
              if (errors.password) {
                setErrors({ ...errors, password: '' });
              }
            }}
            disabled={isLoading}
            className={errors.password ? 'border-red-500' : ''}
            required
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        {/* Remember me checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              disabled={isLoading}
              className="rounded border-gray-300"
            />
            <span>Lembrar-me</span>
          </label>
          
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        
        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
      
      {/* Sign up link - only for client login */}
      {loginType === 'client' && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </div>
      )}
      
      {/* Development info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
          <p className="font-semibold">Modo de desenvolvimento</p>
          <p>Tipo de login: {loginType}</p>
          <p>Use as credenciais de teste da homepage</p>
        </div>
      )}
    </div>
  );
}