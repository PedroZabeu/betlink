import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MeusCanaisPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Meus Canais - Tipster
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Gerencie seus canais e dicas
          </p>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ✅ Login realizado com sucesso!
            </h2>
            <p className="text-gray-600">
              Este é o painel do tipster. Funcionalidades serão implementadas nas próximas features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}