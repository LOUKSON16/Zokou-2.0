const {zokou} = require("../framework/zokou");
const conf = require("../set");
const {getMessagesAndXPByJID,getBottom10Users} = require("../bdd/level");


function get_level_exp(xp) {
    const levelThresholds = [
        { level: 1, xpThreshold: 50 },
        { level: 2, xpThreshold: 100 },
        { level: 3, xpThreshold: 200 },
        { level: 4, xpThreshold: 400 },
        { level: 5, xpThreshold: 700 },
        { level: 6, xpThreshold: 1000 },
        { level: 7, xpThreshold: 1500 },
        { level: 8, xpThreshold: 2000},
        { level: 9, xpThreshold: 2500},
        { level: 10, xpThreshold: 3000},
        { level: 11, xpThreshold: 3500},
        { level: 12, xpThreshold: 45000},
        { level: 13, xpThreshold: 5500},
        { level: 14, xpThreshold: 6500},
        { level: 15, xpThreshold: 7500},
        { level: 16, xpThreshold: 9000},
        { level: 17, xpThreshold: 10500},
        { level: 18, xpThreshold: 12000},
        { level: 19, xpThreshold: 13500},
        { level: 20, xpThreshold: 15000},
        { level: 21, xpThreshold: 17000},
        { level: 22, xpThreshold: 19000},
        { level: 23, xpThreshold: 21000},
        { level: 24, xpThreshold: 23000},
        { level: 25, xpThreshold: 25500},
        { level: 26, xpThreshold: 27000},
        { level: 27, xpThreshold: 29500},
        { level: 28, xpThreshold: 32000},
        { level: 29, xpThreshold: 34500},
        { level: 30, xpThreshold: 38500},
        { level: 31, xpThreshold: 42500},
        { level: 32, xpThreshold: 46500},
        { level: 33, xpThreshold: 50500},
        { level: 34, xpThreshold: 54500},
        { level: 35, xpThreshold: 59000},
        { level: 36, xpThreshold: 63500},
        { level: 37, xpThreshold: 68000},
        { level: 38, xpThreshold: 72500},
        { level: 39, xpThreshold: 77000},
        { level: 40, xpThreshold: 82000},
        { level: 41, xpThreshold: 87000},
        { level: 42, xpThreshold: 92000},
        { level: 43, xpThreshold: 97000},
        { level: 44, xpThreshold: 102000},
        { level: 45, xpThreshold: 107500},
        { level: 46, xpThreshold: 113000},
        { level: 47, xpThreshold: 118500},
        { level: 48, xpThreshold: 124000},
        { level: 49, xpThreshold: 129500},
        { level: 'Zk-Hermit Ricoudo', xpThreshold: 2000000}
    ];

    let level = 0;
    let exp = xp;
    let xplimit = levelThresholds[level].xpThreshold;

    for (let i = 0; i < levelThresholds.length; i++) {
        if (xp >= levelThresholds[i].xpThreshold) {
            level = levelThresholds[i].level;
            xplimit = levelThresholds[i + 1]?.xpThreshold || 'No-limit';
            exp = xp - levelThresholds[i].xpThreshold;
        } else {
            break;
        }
    }

    return {
        level: level,
        xplimit: xplimit,
        exp: exp
    };
}

module.exports = {
   get_level_exp,
} ;

zokou( {
  nomCom : "rang",
 categorie : "Fun",
   }, 
   async(dest,zk, commandeOptions)=> {
  
    const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu , mybotpic} = commandeOptions ;

  if (msgRepondu) {
      
       try {
          
        let rank = await getMessagesAndXPByJID(auteurMsgRepondu) ;

        const data = await get_level_exp(rank.xp)
         let ppuser ;
    
         
         try {
              ppuser = await zk.profilePictureUrl(auteurMsgRepondu , 'image') ;
         } catch {
            ppuser = mybotpic()
         } ;
    
    
         let role ;
    
         if (data.level < 5) {
            role = 'Nouveau né(e)'
         } else if (data.level >= 5 || data.level < 10) {
            role = 'aspirant(e)-Ninja'
         } else if ( data.level >= 10 || data.level < 15 ) {
            role = 'Ninja-genin'
         } else if ( data.level >= 15 || data.level < 20 ) {
            role = 'Ninja-chunin'
         } else if ( data.level >= 20 || data.level < 25 ) {
            role = 'Ninja-jonin'
         } else if ( data.level >= 25 || data.level < 30 ) {
            role = 'ANBU'
         } else if ( data.level >= 30 || data.level < 35 ) {
            role = 'ninja d\'expception'
         } else if ( data.level >= 35 || data.level < 40 ) {
            role = 'kage'
         } else if ( data.level >= 40 || data.level < 45 ) {
            role = 'Hermit seinin'
         } else if ( data.level >= 45 || data.level < 50 ) {
            role = 'Otsusuki'
         } else {
            role = 'Hermit Ricoudo'
         }
    
    
         let msg = `
┏━🤜🏻━┛ ZK-Rang ┗━🤛🏻━┓
         
    *Nom :* @${auteurMsgRepondu.split("@")[0]}
    
    *Level :* ${data.level}
    
    *EXP :* ${data.exp}/${data.xplimit}
    
    *Role :* ${role}

    *Messages :* ${rank.messages}
    
   ┕━🤘🏻━┑  ┍━🤘🏻━┙`
    
     zk.sendMessage( 
        dest,
        {
            image : {url : ppuser},
            caption : msg,
            mentions : [auteurMsgRepondu]
        },
        {quoted : ms}
      )


       } catch (error) {
         repondre(error)
       }
  }   else {


      try {
        
        let jid = auteurMessage ;
          
        let rang = await getMessagesAndXPByJID(jid) ;

        const data =  get_level_exp(rang.xp)
         let ppuser ;
    
         
         try {
              ppuser = await zk.profilePictureUrl(jid, 'image') ;
         } catch {
            ppuser = mybotpic()
         } ;
    
    
         let role ;
    
         if (data.level < 5) {
            role = 'Nouveau né(e)'
         } else if (data.level >= 5 || data.level < 10) {
            role = 'aspirant(e)-Ninja'
         } else if ( data.level >= 10 || data.level < 15 ) {
            role = 'Ninja-genin'
         } else if ( data.level >= 15 || data.level < 20 ) {
            role = 'Ninja-chunin'
         } else if ( data.level >= 20 || data.level < 25 ) {
            role = 'Ninja-jonin'
         } else if ( data.level >= 25 || data.level < 30 ) {
            role = 'ANBU'
         } else if ( data.level >= 30 || data.level < 35 ) {
            role = 'ninja d\'expception'
         } else if ( data.level >= 35 || data.level < 40 ) {
            role = 'kage'
         } else if ( data.level >= 40 || data.level < 45 ) {
            role = 'Hermit seinin'
         } else if ( data.level >= 45 || data.level < 50 ) {
            role = 'Otsusuki'
         } else {
            role = 'Hermit Ricoudo'
         }
    
    
         let msg = `
┏━🤜🏻━┛ ZK-Rang ┗━🤛🏻━┓
     
  *Nom :* ${nomAuteurMessage}

  *Level :* ${data.level}

  *EXP :* ${data.exp}/${data.xplimit}

  *Role :* ${role}

  *Messages :* ${rang.messages}

   ┕━🤘🏻━┑  ┍━🤘🏻━┙`
    
     zk.sendMessage( 
        dest,
        {
            image : {url : ppuser},
            caption : msg
        },
        {quoted : ms}
      )

      } catch (error) {
         repondre(error)
      }

    } 


}) ;

zokou( {
  nomCom : "toprang",
 categorie : "Fun",
   }, 
   async(dest,zk, commandeOptions)=> {
  
    const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu , mybotpic} = commandeOptions ;


       let msg = `┏🤜🏻━┛ ZK-top-rang ┗━🤛🏻┓\n\n
       
      let topRanks = await getBottom10Users() ;
        let mention = [] ;
        for (const rank of topRanks ) {

             const data = await get_level_exp(rank.xp) ;

             let role ;
    
         if (data.level < 5) {
            role = 'Nouveau né(e)'
         } else if (data.level >= 5 || data.level < 10) {
            role = 'aspirant(e)-Ninja'
         } else if ( data.level >= 10 || data.level < 15 ) {
            role = 'Ninja-genin'
         } else if ( data.level >= 15 || data.level < 20 ) {
            role = 'Ninja-chunin'
         } else if ( data.level >= 20 || data.level < 25 ) {
            role = 'Ninja-jonin'
         } else if ( data.level >= 25 || data.level < 30 ) {
            role = 'ANBU'
         } else if ( data.level >= 30 || data.level < 35 ) {
            role = 'ninja d\'expception'
         } else if ( data.level >= 35 || data.level < 40 ) {
            role = 'kage'
         } else if ( data.level >= 40 || data.level < 45 ) {
            role = 'Hermit seinin'
         } else if ( data.level >= 45 || data.level < 50 ) {
            role = 'Otsusuki'
         } else {
            role = 'Hermit Ricoudo'
         }
            msg += `-----------------------
            
 *Nom :* @${rank.jid.split("@")[0]}
*Level :* ${data.level}
*Role :* ${role}\n` ;

        mention.push(rank.jid) ;
        }

       zk.sendMessage(dest,
                      {
                        image : { url : mybotpic() },
                        caption : msg,
                        mentions : mention
                      },
                      {quoted : ms})
       

   })


   
    
