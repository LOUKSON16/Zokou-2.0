const { NARUTO } = require("../framework/NARUTO");
const fancy = require("../commandes/style");

NARUTO({ nomCom: "fancy", categorie: "Fun", reaction: "🤘🏻" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.join('');
    const text = arg.slice(1).join(" ");

    try {
        if (id === undefined || text === undefined) {
            return await repondre(`\nLoukson Exemple : ${prefixe}fancy 10 NARUTO-MD\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('Zokou-md', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return await repondre(fancy.apply(selectedStyle, text));
        } else {
            return await repondre('_Yo Loukson 🤘🏻🌀Style introuvable _');
        }
    } catch (error) {
        console.error(error);
        return await repondre('_𝐋𝚯𝐔𝐊𝐒𝚯𝚴 🌀🤘🏻Une erreur s\'est produite :(_');
    }
});
