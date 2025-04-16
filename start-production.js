// Este é um script personalizado para iniciar o servidor em produção
// Compatível com Node.js v18
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

// Definir NODE_ENV como produção
process.env.NODE_ENV = 'production';

// Iniciar o servidor
console.log('Iniciando o servidor em modo de produção...');

// Verificar se o diretório dist/public existe, se não, criar
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}
if (!fs.existsSync(path.join(__dirname, 'dist/public'))) {
  fs.mkdirSync(path.join(__dirname, 'dist/public'));
}

// Executar o servidor
const server = spawn('node', ['--require=tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

server.on('close', (code) => {
  console.log(`O servidor foi encerrado com código: ${code}`);
});