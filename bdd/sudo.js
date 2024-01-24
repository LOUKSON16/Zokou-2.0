// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

// Fonction pour créer la table "sudo"
async function createSudoTable() {
  const client = await pool.connect();
  try {
    // Exécutez une requête SQL pour créer la table "sudo" si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS sudo (
        id serial PRIMARY KEY,
        jid text NOT NULL
      );
    `);
    console.log("La table 'sudo' a été créée avec succès.");
  } catch (error) {
    console.error("Yo Loukson 🌀🤘🏻 une erreur est survenue lors de la création de la table 'sudo':", error);
  } finally {
    client.release();
  }
}

// Appelez la méthode pour créer la table "sudo"
createSudoTable();


// Fonction pour vérifier si un groupe est banni
async function issudo(jid) {
    const client = await pool.connect();
    try {
      // Vérifiez si le groupe existe dans la table "banGroup"
      const query = "SELECT EXISTS (SELECT 1 FROM sudo WHERE jid = $1)";
      const values = [jid];
  
      const result = await client.query(query, values);
      return result.rows[0].exists;
    } catch (error) {
      console.error("LOUKSON 🤘🏻 🌀 Erreur lors de la vérification du groupe banni :", error);
      return false;
    } finally {
      client.release();
    }
  }
  
  // Fonction pour supprimer un groupe de la liste des groupes bannis
  async function removeSudoNumber(jid) {
    const client = await pool.connect();
    try {
      // Supprimez le numéro de téléphone de la table "sudo"
      const query = "DELETE FROM sudo WHERE jid = $1";
      const values = [jid];
  
      await client.query(query, values);
      console.log(`Numéro de téléphone ${jid} supprimé de la liste des numéros de téléphone autorisés.`);
    } catch (error) {
      console.error("Yo Yo🌀🤘🏻Erreur lors de la suppression du numéro de téléphone autorisé :", error);
    } finally {
      client.release();
    }
  }

  async function addSudoNumber(jid) {
    const client = await pool.connect();
    try {
      // Insérez le numéro de téléphone dans la table "sudo"
      const query = "INSERT INTO sudo (jid) VALUES ($1)";
      const values = [jid];
  
      await client.query(query, values);
      console.log(`Numéro de téléphone ${jid} ajouté à la liste des numéros de téléphone autorisés.`);
    } catch (error) {
      console.error("man🤘🏻🌀🍜 erreur lors de l'ajout du numéro de téléphone autorisé :", error);
    } finally {
      client.release();
    }
  }

  async function getAllSudoNumbers() {
    const client = await pool.connect();
    try {
      // Sélectionnez tous les numéros de téléphone de la table "sudo"
      const query = "SELECT jid FROM sudo";
      const result = await client.query(query);
  
      // Créez un tableau des numéros de téléphone
      const sudoNumbers = result.rows.map((row) => row.jid);
  
      return sudoNumbers;
    } catch (error) {
      console.error("LOUKSON 🤘🏻 Erreur lors de la récupération des numéros de téléphone autorisés :", error);
      return [];
    } finally {
      client.release();
    }
  }  

     async function isSudoTableNotEmpty() {
    const client = await pool.connect();

    try {
      // Exécutez une requête SQL pour compter le nombre de lignes dans la table "sudo"
      const result = await client.query('SELECT COUNT(*) FROM sudo');

      // Récupérez la valeur du compteur (nombre de lignes)
      const rowCount = parseInt(result.rows[0].count);

      // Si le nombre de lignes est supérieur à zéro, la table n'est pas vide
      return rowCount > 0;
    } catch (error) {
      console.error('Loukson 🤘🏻🍜erreur lors de la vérification de la table "sudo" :', error);
      return false; // En cas d'erreur, considérez la table comme vide
    } finally {
      client.release();
    }
  };
  
  
  
  
  module.exports = {
    issudo,
    addSudoNumber,
    removeSudoNumber,
    getAllSudoNumbers,
    isSudoTableNotEmpty
  };
  
