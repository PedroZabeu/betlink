import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Badge className="bg-purple-600 hover:bg-purple-700">Master</Badge>
          <Badge className="bg-red-600 hover:bg-red-700">Admin</Badge>
        </div>
        <p className="text-gray-600">
          Gerencie todos os aspectos da plataforma BetLink
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gerenciar Tipsters */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Gerenciar Tipsters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Adicione, edite ou remova tipsters da plataforma.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>- Criar novos tipsters</p>
              <p>- Gerenciar permissões</p>
              <p>- Visualizar performance</p>
            </div>
          </CardContent>
        </Card>

        {/* Aprovar Canais */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Aprovar Canais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Revise e aprove solicitações de novos canais.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>- Solicitações pendentes</p>
              <p>- Histórico de aprovações</p>
              <p>- Configurar canais Telegram</p>
            </div>
          </CardContent>
        </Card>

        {/* Gerenciar Clientes */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Gerenciar Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Visualize e gerencie todos os clientes cadastrados.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>- Lista de clientes</p>
              <p>- Status de assinaturas</p>
              <p>- Histórico de pagamentos</p>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard de Métricas */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Dashboard de Métricas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Acompanhe o desempenho geral da plataforma.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>- Receita total</p>
              <p>- Número de usuários</p>
              <p>- Taxa de crescimento</p>
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Configurações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Configure parâmetros gerais do sistema.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>- Integrações de pagamento</p>
              <p>- Configurações do Telegram</p>
              <p>- Parâmetros de segurança</p>
            </div>
          </CardContent>
        </Card>

        {/* Logs de Atividade */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Logs de Atividade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Monitore todas as atividades do sistema.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>- Ações de usuários</p>
              <p>- Eventos do sistema</p>
              <p>- Logs de segurança</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          Esta página é acessível apenas para usuários com roles{" "}
          <Badge variant="outline" className="mx-1">Master</Badge> e{" "}
          <Badge variant="outline" className="mx-1">Admin</Badge>
        </p>
      </div>
    </div>
  );
}