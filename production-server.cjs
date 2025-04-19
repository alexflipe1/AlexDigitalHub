#!/usr/bin/env node

/**
 * Script para iniciar o servidor em produção com Node.js v18
 * Use: node production-server.cjs
 */

// Usando módulos CommonJS para compatibilidade com Node.js v18
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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
    const distDir = path.join(__dirname, 'dist');
    const publicDir = path.join(distDir, 'public');
    
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
    }
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    // Instalar dependências se necessário
    if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
      console.log('Instalando dependências...');
      await runCommand('npm install --production');
    }
    
    // Construir o projeto - sem usar import.meta.dirname
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