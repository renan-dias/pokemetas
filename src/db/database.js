// db/database.js
import * as SQLite from 'expo-sqlite';

// Abre ou cria o banco de dados
const db = SQLite.openDatabaseSync('pixelpet.db');

// Função para inicializar o banco e criar a tabela se não existir
const setupDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        minutes INTEGER NOT NULL,
        completed INTEGER DEFAULT 0
      );
    `);
    console.log('Tabela "goals" configurada com sucesso.');
  } catch (error) {
    console.log('Erro ao criar tabela "goals":', error);
  }
};

// Funções para interagir com o banco
const fetchGoals = (callback) => {
  try {
    const result = db.getAllSync('SELECT * FROM goals ORDER BY id DESC;');
    callback(result);
  } catch (error) {
    console.log('Erro ao buscar goals:', error);
    callback([]);
  }
};

const addGoal = (title, minutes, callback) => {
  try {
    const result = db.runSync('INSERT INTO goals (title, minutes) VALUES (?, ?);', [title, minutes]);
    callback(result.lastInsertRowId);
  } catch (error) {
    console.log('Erro ao adicionar goal:', error);
  }
};

const setGoalCompleted = (id, callback) => {
  try {
    db.runSync('UPDATE goals SET completed = 1 WHERE id = ?;', [id]);
    callback();
  } catch (error) {
    console.log('Erro ao completar goal:', error);
  }
};

export { setupDatabase, fetchGoals, addGoal, setGoalCompleted };

