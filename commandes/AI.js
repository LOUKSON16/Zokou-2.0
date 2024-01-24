const { NARUTO } = require('../framework/NARUTO');
const traduire = require("../framework/traduction") ;
const axios = require('axios');





NARUTO({nomCom:"bot",reaction:"😎",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("oui je LOUKSON NARUTO-MD vous ecoute.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'fr' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Yo LOUKSON man🤘🏻🍜🌀Erreur lors de la traduction en français :', error);
      repondre('Yo LOUKSON man🤘🏻🍜🌀Erreur lors de la traduction en français');
    });
})
.catch(error => {
  console.error('Erreur lors de la requête à BrainShop :', error);
  repondre('Yo LOUKSON man🤘🏻🍜🌀Erreur lors de la requête à BrainShop');
});

  }catch(e){ repondre("oupsaa une erreur : "+e)}
    
  
  });  
  


NARUTO({ nomCom: "dalle", reaction: "😎", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Yo LOUKSON man🤘🏻🍜🌀Veuillez entrer les informations nécessaires pour générer l'image.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
    const image = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/photoleap?q=${image}`);
    
    const data = response.data;
    let caption = '*Propulsé par NARUTO-MD*';
    
    if (data.status && data.owner && data.data) {
      // Utiliser les données retournées par le service
      const imageUrl = data.data;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
    } else {
      repondre("Yo LOUKSON man🤘🏻🍜🌀Erreur lors de la génération de l'image");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, Yo LOUKSON man🤘🏻🍜🌀une erreur est survenue lors du traitement de votre demande.");
  }
});

zokou({ nomCom: "gpt", reaction: "😎", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Yo 🤘🏻🌀Veuillez poser une questions.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
    const question = arg.join(' ');
    const response = await axios.get(`https://vihangayt.me/tools/chatgpt4?q=${question}`);
    
    const data = response.data;
    if (data) {
      repondre(data.data);
    } else {
      repondre("Yo LOUKSON man🤘🏻🍜🌀Erreur lors de la génération de la reponse");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, Yo LOUKSON man🤘🏻🍜🌀 une erreur est survenue lors du traitement de votre demande.");
  }
});
