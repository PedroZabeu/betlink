import LoginForm from '@/components/features/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">BetLink</h1>
          <h2 className="text-xl text-gray-600">Área do Cliente</h2>
        </div>
        
        <LoginForm />
        
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Cadastre-se
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Esqueceu sua senha?
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            É um tipster?{' '}
            <Link href="/tipster/login" className="text-blue-600 hover:text-blue-500">
              Acesse por aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}