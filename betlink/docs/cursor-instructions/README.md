# Cursor Instructions Directory

Este diretório contém instruções específicas para operações de database que devem ser executadas no **Cursor IDE** usando o MCP do Supabase.

## 🎯 Propósito

Quando Claude Code precisa de operações no Supabase (criar tabelas, inserir dados, modificar schema), ele cria documentos de instrução neste diretório ao invés de tentar executar as operações diretamente.

## 📋 Template de Documento

```markdown
# Cursor Instructions: [Feature Name] - Database Operations

## 🎯 Objective
[Descrição clara do que precisa ser feito no banco]

## 📋 Cursor Commands
Abra o Cursor IDE e use estes comandos exatos com @supabase:

```
@supabase [Prompt exato para o Cursor]
```

## 🔍 Verification
[Como verificar se as operações funcionaram]
- Verificar na tabela X se tem Y registros
- Testar query: SELECT * FROM tabela;

## ➡️ Next Steps
[O que Claude Code fará após esta operação estar completa]
```

## 🔄 Workflow

1. **Claude Code** identifica necessidade de operação Supabase
2. **Claude Code** cria arquivo `feature-X-Y-database-ops.md`
3. **Claude Code** notifica humano: "Database operations needed"
4. **Humano** executa comandos no Cursor IDE
5. **Humano** confirma conclusão
6. **Claude Code** continua desenvolvimento da feature

## ✅ Benefícios

- ✅ Operações database confiáveis via Cursor MCP
- ✅ Instruções versionadas no git
- ✅ Sem tokens sensíveis no ambiente Claude Code
- ✅ Ciclo de desenvolvimento mais rápido

## 📁 Organização de Arquivos

```
docs/cursor-instructions/
├── README.md                    # Este arquivo
├── feature-1-2-database-ops.md  # Exemplo (Feature 1.2)
├── feature-1-3-database-ops.md  # Feature 1.3 database operations
└── ...                         # Outras features conforme necessário
```