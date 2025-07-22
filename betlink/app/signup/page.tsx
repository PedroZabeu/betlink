import SignUpForm from '@/components/features/auth/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">BetLink</h1>
          <h2 className="text-xl text-gray-600">Criar Conta de Cliente</h2>
        </div>
        
        <SignUpForm />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Faça login
            </Link>
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-500">
          <p className="font-semibold mb-1">Nota:</p>
          <p>Contas de tipster são criadas apenas por administradores. Se você é um tipster interessado em participar da plataforma, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  );
}