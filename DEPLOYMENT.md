# Guia de Implantação

Este documento fornece instruções para implantar o site em um servidor usando Node.js.

## Requisitos do Sistema

- Node.js v18+ (recomendado v20+)
- NPM v8+ (ou Yarn)
- Servidor Linux (recomendado Ubuntu 20.04+)

## Opções de Implantação

Existem duas opções de implantação dependendo da versão do Node.js disponível no seu servidor:

### Opção 1: Implantação com Node.js v20+ (Recomendado)

Se você puder atualizar para o Node.js v20+, este é o método mais simples:

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd site-alex
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie a versão de produção:
   ```bash
   npm run build
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

### Opção 2: Implantação com Node.js v18

Se você precisa usar o Node.js v18, use os scripts de compatibilidade incluídos:

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd site-alex
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o script de compatibilidade:
   ```bash
   node run-node18.js
   ```

Este script usará uma versão alternativa do servidor compatível com o Node.js v18.

## Executando como Serviço (PM2)

Para manter o servidor em execução continuamente, recomendamos o uso do PM2:

1. Instale o PM2 globalmente:
   ```bash
   npm install -g pm2
   ```

2. Inicie o aplicativo com PM2:

   Para Node.js v20+:
   ```bash
   pm2 start npm --name "site-alex" -- start
   ```

   Para Node.js v18:
   ```bash
   pm2 start run-node18.js --name "site-alex"
   ```

3. Configure para iniciar automaticamente:
   ```bash
   pm2 startup
   pm2 save
   ```

## Arquivo de Dados

O aplicativo usa armazenamento baseado em arquivos para os botões personalizados. Os dados são armazenados em:

```
data/buttons.json
```

Certifique-se de que este diretório tenha permissões de leitura/escrita adequadas para o usuário que executa o Node.js.

## Senhas do Sistema

O sistema utiliza duas senhas codificadas para acesso a áreas protegidas:

1. Página de Administração (*/admin*): `admin123`
2. Página Alex (*/alex*): `8390`

Estas senhas estão definidas nos arquivos:
- `client/src/pages/Login.tsx` (para Admin)
- `client/src/pages/AlexLogin.tsx` (para Alex)

Você pode modificar estas senhas alterando os valores nestas constantes nos arquivos indicados.

## Resolução de Problemas

Se você encontrar problemas durante a implantação:

1. Verifique os logs do servidor
2. Certifique-se de que a porta 5000 está disponível
3. Verifique se os diretórios `data` e `dist` foram criados corretamente
4. Verifique permissões de arquivo para o diretório do projeto