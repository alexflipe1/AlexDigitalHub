#!/usr/bin/env node

/**
 * Script simplificado para execução do servidor em Node.js v18
 * 
 * Uso:
 * 1. Certifique-se que o Node.js v18+ está instalado
 * 2. Execute: node run-node18.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configurações
const PORT = process.env.PORT || 5000;
const SERVER_FILE = path.join(__dirname, 'server/custom-server.js');
const DATA_DIR = path.join(__dirname, 'data');

// Preparar ambiente
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Preparar arquivo de dados de botões se não existir
const BUTTONS_FILE = path.join(DATA_DIR, 'buttons.json');
if (!fs.existsSync(BUTTONS_FILE)) {
  // Criar arquivo de botões vazio
  fs.writeFileSync(BUTTONS_FILE, JSON.stringify([], null, 2));
}

// Iniciar o servidor
console.log(`Iniciando servidor na porta ${PORT}...`);
const server = spawn('node', [SERVER_FILE], {
  env: { ...process.env, PORT },
  stdio: 'inherit'
});

server.on('close', (code) => {
  console.log(`Servidor finalizado com código ${code}`);
});

// Manipular sinais para encerramento limpo
process.on('SIGINT', () => {
  console.log('Encerrando servidor...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Encerrando servidor...');
  server.kill('SIGTERM');
});