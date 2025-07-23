import LoginForm from '@/components/features/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Área do Cliente
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Acesse sua conta BetLink
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm loginType="client" />
        
        {/* Quick access links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Você é um tipster?{' '}
            <a href="/tipster/login" className="text-blue-600 hover:underline">
              Clique aqui para fazer login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}