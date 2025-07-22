import LoginForm from '@/components/features/auth/LoginForm';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function TipsterLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">BetLink</h1>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl text-gray-600">Área do Tipster</h2>
            <Badge className="bg-blue-600">Tipster</Badge>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Primeiro acesso?</strong> Use as credenciais enviadas por email e você será solicitado a criar uma nova senha.
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link href="/tipster/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Esqueceu sua senha?
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            É um cliente?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Acesse por aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}