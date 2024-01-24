// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();


const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
const dbUrl = s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" ;
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

async function createUsersRankTable() {
  const client = await pool.connect();

  try {
    // Créez la table users_rank si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS users_rank (
        id SERIAL PRIMARY KEY,
        jid VARCHAR(255) UNIQUE,
        xp INTEGER DEFAULT 0,
        messages INTEGER DEFAULT 0
      );
    `);
  } catch (error) {
    console.error('Yo man LOUKSON 🌀 Erreur lors de la création de la table users_rank:', error);
  } finally {
    client.release();
  }
}

async function ajouterOuMettreAJourUserData(jid) {
  const client = await pool.connect();

  try {
    // Vérifiez si le JID existe déjà dans la table 'users_rank'
    const result = await client.query('SELECT * FROM users_rank WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le JID existe, mettez à jour XP (+10) et messages (+1)
      await client.query('UPDATE users_rank SET xp = xp + 10, messages = messages + 1 WHERE jid = $1', [jid]);
    } else {
      // Si le JID n'existe pas, ajoutez-le avec XP = 10 et messages = 1
      await client.query('INSERT INTO users_rank (jid, xp, messages) VALUES ($1, $2, $3)', [jid, 10, 1]);
    }

  } catch (error) {
    console.error('Yo Yo LOUKSON🌀🌀Erreur lors de la mise à jour des données de l\'utilisateur:', error);
  } finally {
    client.release();
  }
};

async function getMessagesAndXPByJID(jid) {
  const client = await pool.connect();

  try {
    // Sélectionnez le nombre de messages et d'XP pour le JID donné
    const query = 'SELECT messages, xp FROM users_rank WHERE jid = $1';
    const result = await client.query(query, [jid]);

    if (result.rows.length > 0) {
      // Retournez les valeurs de messages et d'XP
      const { messages, xp } = result.rows[0];
      return { messages, xp };
    } else {
      // Si le JID n'existe pas, renvoyez des valeurs par défaut (0 messages et 0 XP)
      return { messages: 0, xp: 0 };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
    return { messages: 0, xp: 0 }; // En cas d'erreur, renvoyez des valeurs par défaut
  } finally {
    client.release();
  }
}

async function getBottom10Users() {
  const client = await pool.connect();

  try {
    // Sélectionnez les 10 premiers utilisateurs classés par XP de manière ascendante (du plus bas au plus élevé)
    const query = 'SELECT jid, xp , messages FROM users_rank ORDER BY xp DESC LIMIT 10';
    const result = await client.query(query);

    // Retournez le tableau des utilisateurs
    return result.rows;
  } catch (error) {
    console.error('Yo Yo LOUKSON 🤘🏻🌀Erreur lors de la récupération du bottom 10 des utilisateurs:', error);
    return []; // En cas d'erreur, renvoyez un tableau vide
  } finally {
    client.release();
  }
}



// Exécutez la fonction de création de la table lors de l'initialisation
createUsersRankTable();

module.exports = {
  ajouterOuMettreAJourUserData,
  getMessagesAndXPByJID,
  getBottom10Users,
};
