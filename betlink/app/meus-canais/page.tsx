import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MeusCanaisPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Meus Canais</h1>
          <Badge className="bg-blue-600 hover:bg-blue-700">Tipster</Badge>
        </div>
        <p className="text-gray-600">
          Gerencie seus canais de tips e acompanhe o desempenho
        </p>
      </div>

      {/* Action Button */}
      <div className="mb-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Solicitar Novo Canal
        </button>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exemplo de Canal 1 */}
        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-green-600">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Canal Premium</CardTitle>
              <Badge className="bg-green-600">Ativo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Assinantes</p>
                <p className="text-2xl font-bold">45/50</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Receita Mensal</p>
                <p className="text-xl font-semibold text-green-600">R$ 4.500</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ROI Médio</p>
                <p className="text-lg font-medium">+12.5%</p>
              </div>
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 py-2 rounded transition-colors text-sm">
                Gerenciar Canal
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Exemplo de Canal 2 */}
        <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-yellow-600">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Tips Básicos</CardTitle>
              <Badge className="bg-yellow-600">Lista de Espera</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Assinantes</p>
                <p className="text-2xl font-bold">100/100</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Receita Mensal</p>
                <p className="text-xl font-semibold text-green-600">R$ 5.000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fila de Espera</p>
                <p className="text-lg font-medium">12 pessoas</p>
              </div>
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 py-2 rounded transition-colors text-sm">
                Gerenciar Canal
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Card para Solicitar Novo Canal */}
        <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
            <div className="text-2xl mb-4">+</div>
            <h3 className="font-semibold text-lg mb-2">Criar Novo Canal</h3>
            <p className="text-sm text-gray-600 mb-4">
              Expanda seu alcance criando um novo canal de tips
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
              Solicitar Agora
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Summary */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total de Canais</p>
            <p className="text-2xl font-bold text-blue-600">2</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total de Assinantes</p>
            <p className="text-2xl font-bold text-green-600">145</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Receita Total</p>
            <p className="text-2xl font-bold text-purple-600">R$ 9.500</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">ROI Médio Geral</p>
            <p className="text-2xl font-bold text-yellow-600">+15.2%</p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          Esta página é acessível apenas para usuários com role{" "}
          <Badge variant="outline" className="mx-1">Tipster</Badge>
        </p>
      </div>
    </div>
  );
}