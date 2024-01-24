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

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

// Vous pouvez maintenant utiliser 'pool' pour interagir avec votre base de données PostgreSQL.
const creerTableBanUser = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banUser (
        jid text PRIMARY KEY
      );
    `);
    console.log("Yo Yo man 🌀🍜La table 'banUser' a été créée avec succès.");
  } catch (e) {
    console.error("Yo bro🍜🌀Loukson le génie du mal une erreur est survenue lors de la création de la table 'banUser':", e);
  }
};

// Appelez la méthode pour créer la table "banUser"
creerTableBanUser();



// Fonction pour ajouter un utilisateur à la liste des bannis
async function addUserToBanList(jid) {
  const client = await pool.connect();
  try {
    // Insérez l'utilisateur dans la table "banUser"
    const query = "INSERT INTO banUser (jid) VALUES ($1)";
    const values = [jid];

    await client.query(query, values);
    console.log(`JID ${jid} Yo bro man à été ajouté à la liste des bannis.`);
  } catch (error) {
    console.error("Yo Yo LOUKSON 🌀🍜 Erreur lors de l'ajout de l'utilisateur banni :", error);
  } finally {
    client.release();
  }
}



// Fonction pour vérifier si un utilisateur est banni
async function isUserBanned(jid) {
  const client = await pool.connect();
  try {
    // Vérifiez si l'utilisateur existe dans la table "banUser"
    const query = "SELECT EXISTS (SELECT 1 FROM banUser WHERE jid = $1)";
    const values = [jid];

    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Yo 🤘🏻Yo🌀LOUKSON🍜 erreur lors de la vérification de l'utilisateur banni :", error);
    return false;
  } finally {
    client.release();
  }
}

// Fonction pour supprimer un utilisateur de la liste des bannis
async function removeUserFromBanList(jid) {
  const client = await pool.connect();
  try {
    // Supprimez l'utilisateur de la table "banUser"
    const query = "DELETE FROM banUser WHERE jid = $1";
    const values = [jid];

    await client.query(query, values);
    console.log(`JID ${jid} Yo Yo 🌀🍜supprimé de la liste des bannis.`);
  } catch (error) {
    console.error("Yo Yo 🍜🌀 man Erreur lors de la suppression de l'utilisateur banni :", error);
  } finally {
    client.release();
  }
}

module.exports = {
  addUserToBanList,
  isUserBanned,
  removeUserFromBanList,
};
