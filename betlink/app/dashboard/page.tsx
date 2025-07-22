import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Meu Dashboard</h1>
          <Badge className="bg-green-600 hover:bg-green-700">Cliente</Badge>
        </div>
        <p className="text-gray-600">
          Acompanhe suas assinaturas e resultados dos seus tipsters
        </p>
      </div>

      {/* Active Subscriptions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Minhas Assinaturas Ativas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Subscription Card 1 */}
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Canal Premium</CardTitle>
                <Badge className="bg-green-600">Ativa</Badge>
              </div>
              <p className="text-sm text-gray-500">por João Tipster</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Valor Mensal</span>
                  <span className="font-semibold">R$ 99,90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Próximo Pagamento</span>
                  <span className="text-sm">15/08/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI do Mês</span>
                  <span className="text-green-600 font-semibold">+18.5%</span>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                  Acessar Canal no Telegram
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card 2 */}
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Tips Básicos</CardTitle>
                <Badge className="bg-green-600">Ativa</Badge>
              </div>
              <p className="text-sm text-gray-500">por João Tipster</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Valor Mensal</span>
                  <span className="font-semibold">R$ 49,90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Próximo Pagamento</span>
                  <span className="text-sm">20/08/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI do Mês</span>
                  <span className="text-green-600 font-semibold">+12.3%</span>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                  Acessar Canal no Telegram
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Browse More Channels Card */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300 bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
              <div className="text-2xl mb-4">+</div>
              <h3 className="font-semibold text-lg mb-2">Explorar Mais Canais</h3>
              <p className="text-sm text-gray-600 mb-4">
                Descubra novos tipsters e melhore seus resultados
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm">
                Ver Canais Disponíveis
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Resumo de Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Assinaturas Ativas</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">ROI Total do Mês</p>
              <p className="text-2xl font-bold text-green-600">+15.4%</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Investimento Mensal</p>
              <p className="text-2xl font-bold text-purple-600">R$ 149,80</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Tips Recebidas</p>
              <p className="text-2xl font-bold text-yellow-600">47</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg mb-2">$</p>
              <p className="font-medium">Gerenciar Pagamentos</p>
              <p className="text-sm text-gray-600">Atualizar cartões e boletos</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg mb-2">%</p>
              <p className="font-medium">Histórico Detalhado</p>
              <p className="text-sm text-gray-600">Ver todas as suas apostas</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg mb-2">#</p>
              <p className="font-medium">Configurações</p>
              <p className="text-sm text-gray-600">Preferências e notificações</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          Esta página é acessível apenas para usuários com role{" "}
          <Badge variant="outline" className="mx-1">Cliente</Badge>
        </p>
      </div>
    </div>
  );
}