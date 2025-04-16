/**
 * Servidor personalizado para Node.js v18
 * Este arquivo serve como substituto para o server/index.ts
 * quando executado em ambientes com Node.js mais antigo
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

// Configurações
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../dist/public')));
app.use(express.json());

// Definir rotas da API
app.get('/api/buttons', (req, res) => {
  try {
    // Tenta ler os botões de um arquivo de dados
    const dataPath = path.join(__dirname, '../data/buttons.json');
    if (fs.existsSync(dataPath)) {
      const buttons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      res.json(buttons);
    } else {
      // Arquivo não existe, retorna array vazio
      res.json([]);
    }
  } catch (error) {
    console.error('Erro ao buscar botões:', error);
    res.status(500).json({ error: 'Erro ao buscar botões' });
  }
});

app.get('/api/buttons/page/:pageType', (req, res) => {
  try {
    const { pageType } = req.params;
    const dataPath = path.join(__dirname, '../data/buttons.json');
    
    if (fs.existsSync(dataPath)) {
      const buttons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const filteredButtons = buttons.filter(button => button.pageType === pageType);
      res.json(filteredButtons);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Erro ao buscar botões por página:', error);
    res.status(500).json({ error: 'Erro ao buscar botões por página' });
  }
});

app.get('/api/buttons/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataPath = path.join(__dirname, '../data/buttons.json');
    
    if (fs.existsSync(dataPath)) {
      const buttons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const button = buttons.find(b => b.id === id);
      
      if (button) {
        res.json(button);
      } else {
        res.status(404).json({ error: 'Botão não encontrado' });
      }
    } else {
      res.status(404).json({ error: 'Botão não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar botão por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar botão por ID' });
  }
});

app.post('/api/buttons', (req, res) => {
  try {
    const button = req.body;
    const dataPath = path.join(__dirname, '../data/buttons.json');
    const dataDir = path.join(__dirname, '../data');
    
    // Criar diretório se não existir
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    let buttons = [];
    if (fs.existsSync(dataPath)) {
      buttons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
    
    // Gerar ID para o novo botão
    const newId = buttons.length > 0 ? Math.max(...buttons.map(b => b.id)) + 1 : 1;
    const newButton = {
      ...button,
      id: newId,
      createdAt: new Date().toISOString()
    };
    
    buttons.push(newButton);
    fs.writeFileSync(dataPath, JSON.stringify(buttons, null, 2));
    
    res.status(201).json(newButton);
  } catch (error) {
    console.error('Erro ao criar botão:', error);
    res.status(500).json({ error: 'Erro ao criar botão' });
  }
});

app.put('/api/buttons/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const dataPath = path.join(__dirname, '../data/buttons.json');
    
    if (fs.existsSync(dataPath)) {
      let buttons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const index = buttons.findIndex(b => b.id === id);
      
      if (index !== -1) {
        buttons[index] = { ...buttons[index], ...updatedData };
        fs.writeFileSync(dataPath, JSON.stringify(buttons, null, 2));
        res.json(buttons[index]);
      } else {
        res.status(404).json({ error: 'Botão não encontrado' });
      }
    } else {
      res.status(404).json({ error: 'Botão não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar botão:', error);
    res.status(500).json({ error: 'Erro ao atualizar botão' });
  }
});

app.delete('/api/buttons/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataPath = path.join(__dirname, '../data/buttons.json');
    
    if (fs.existsSync(dataPath)) {
      let buttons = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const index = buttons.findIndex(b => b.id === id);
      
      if (index !== -1) {
        buttons.splice(index, 1);
        fs.writeFileSync(dataPath, JSON.stringify(buttons, null, 2));
        res.status(200).json({ message: 'Botão removido com sucesso' });
      } else {
        res.status(404).json({ error: 'Botão não encontrado' });
      }
    } else {
      res.status(404).json({ error: 'Botão não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir botão:', error);
    res.status(500).json({ error: 'Erro ao excluir botão' });
  }
});

// Rota para todas as outras requisições (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});