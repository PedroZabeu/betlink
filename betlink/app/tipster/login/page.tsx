import LoginForm from '@/components/features/auth/LoginForm'

export default function TipsterLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Login para Tipsters
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Acesse seu painel de tipster
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm loginType="tipster" />
        
        {/* Back to client login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Cliente regular?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Faça login aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}