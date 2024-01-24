"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { NARUTO } = require("../framework/zokou");
NARUTO({ nomCom: "test", reaction: "🤘🏻", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Salut je m\'appelle *Zokou* \n\n ' + 'je suis un bot Whatsapp Multi-appareil ';
    let d = ' developpé par *Djalega++*';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/251500a8a1b062796c273.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="🤘🏻"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *NARUTO* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *🤜🏻𝐋𝚯𝐔𝐊𝐒𝚯𝚴-𝐔𝚭𝐔𝚳𝚫𝐊𝚰🤛🏻 *'
      let varmess=z+d
      var img='https://telegra.ph/file/251500a8a1b062796c273.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
