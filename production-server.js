#!/usr/bin/env node

/**
 * Script para iniciar o servidor em produção com Node.js v18 e ES Modules
 * Use: node production-server.js
 */

// Usando módulos ES para compatibilidade com "type": "module" no package.json
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Obter __dirname equivalente em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurações
const PORT = process.env.PORT || 5000;
process.env.NODE_ENV = 'production';

// Função para executar comandos
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Executando: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`Saída de erro: ${stderr}`);
      }
      console.log(`Saída: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Função principal para iniciar o servidor
async function startServer() {
  try {
    console.log('Iniciando o servidor em modo de produção...');
    
    // Verificar e criar diretórios se necessário
    const distDir = join(__dirname, 'dist');
    const publicDir = join(distDir, 'public');
    
    if (!existsSync(distDir)) {
      mkdirSync(distDir);
    }
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir);
    }
    
    // Instalar dependências se necessário
    if (!existsSync(join(__dirname, 'node_modules'))) {
      console.log('Instalando dependências...');
      await runCommand('npm install --production');
    }
    
    // Construir o projeto
    console.log('Construindo o projeto...');
    await runCommand('npm run build');
    
    // Iniciar o servidor
    console.log('Iniciando o servidor...');
    await runCommand('NODE_ENV=production node dist/index.js');
    
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Iniciar
startServer();