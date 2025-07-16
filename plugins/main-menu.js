import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, text, command }) => {
    try {
        // Definir userId como el ID del usuario que envía el mensaje
        const userId = m.sender;

        let { exp, diamantes, level, role } = global.db.data.users[userId]
        let { min, xp, max } = xpRange(level, global.multiplier)
        let name = await conn.getName(userId) // Usamos userId en lugar de m.sender
        exp = exp || 'Desconocida';
        role = role || 'Aldeano';

        // Aquí obtenemos la mención correcta para WhatsApp
        const taguser = '@' + userId.split('@s.whatsapp.net')[0];

        const _uptime = process.uptime() * 1000;
        const uptime = clockString(_uptime);
        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
        await m.react('🌹')

        // Usamos userId para comprobar si está casado
        const isMarried = userId in global.db.data.marriages;
        const partner = isMarried ? global.db.data.marriages[userId] : null;
        const partnerName = partner ? await conn.getName(partner) : 'Nadie';

        const imageUrl = 'https://files.catbox.moe/dtfvzc.jpg';

        // Ahora usamos userId para mostrar en el menú
        let menu = `
🌐 *\`Menú Principal\`*
────────────────────────────
👤 *Usuario:* ${taguser}
🔰 *Rol:* ${role}
📈 *Nivel:* ${level} (${exp} XP)
💎 *Gemas:* ${diamantes}
⏱️ *Activo:* ${uptime}

🎴 *\`Menús\`* ${xmenus}
╰➤ ${xmenus} ${usedPrefix}menunsfw
╰➤ ${xmenus} ${usedPrefix}menuaudios
╰➤ ${xmenus} ${usedPrefix}menuff
╰➤ ${xmenus} ${usedPrefix}menuowner
╰➤ ${xmenus} ${usedPrefix}menulogos

📊 *\`Infos\`* ${xinfo}
╰➤ ${xinfo} ${usedPrefix}totalf
╰➤ ${xinfo} ${usedPrefix}grupos
╰➤ ${xinfo} ${usedPrefix}sugerir
╰➤ ${xinfo} ${usedPrefix}report
╰➤ ${xinfo} ${usedPrefix}owner
╰➤ ${xinfo} ${usedPrefix}ping
╰➤ ${xinfo} ${usedPrefix}uptime
╰➤ ${xinfo} ${usedPrefix}horario

⚙️ *\`On/Off\`* ${xnable}
╰➤ ${xnable} ${usedPrefix}enable *opción*
╰➤ ${xnable} ${usedPrefix}disable *opción*
╰➤ ${xnable} ${usedPrefix}on *opción*
╰➤ ${xnable} ${usedPrefix}off *opción*

⬇️ *\`Download\`* ${xdownload}
╰➤ ${xdownload} ${usedPrefix}play *texto*
╰➤ ${xdownload} ${usedPrefix}aplay *texto*
╰➤ ${xdownload} ${usedPrefix}aplay2 *texto*
╰➤ ${xdownload} ${usedPrefix}splay *texto*
╰➤ ${xdownload} ${usedPrefix}ytmp4doc *texto*
╰➤ ${xdownload} ${usedPrefix}ytmp3doc *texto*
╰➤ ${xdownload} ${usedPrefix}apk *texto*
╰➤ ${xdownload} ${usedPrefix}aptoide *texto*
╰➤ ${xdownload} ${usedPrefix}modapk *texto*
╰➤ ${xdownload} ${usedPrefix}pinterest *texto*
╰➤ ${xdownload} ${usedPrefix}capcut *url*
╰➤ ${xdownload} ${usedPrefix}pindl *url*
╰➤ ${xdownload} ${usedPrefix}pinvid *url*
╰➤ ${xdownload} ${usedPrefix}ytmp4 *url*
╰➤ ${xdownload} ${usedPrefix}ytmp3 *url*
╰➤ ${xdownload} ${usedPrefix}tiktok *url*
╰➤ ${xdownload} ${usedPrefix}tiktok2 *url*
╰➤ ${xdownload} ${usedPrefix}instagram *url*
╰➤ ${xdownload} ${usedPrefix}facebook *url*
╰➤ ${xdownload} ${usedPrefix}mediafire *url*
╰➤ ${xdownload} ${usedPrefix}mega *url*
╰➤ ${xdownload} ${usedPrefix}playstore *url*
╰➤ ${xdownload} ${usedPrefix}xnxxdl *url*
╰➤ ${xdownload} ${usedPrefix}xvideosdl *url*
╰➤ ${xdownload} ${usedPrefix}pornhubdl *url*

🔎 *\`Search\`* ${xsearch}
╰➤ ${xsearch} ${usedPrefix}scsearch *texto*
╰➤ ${xsearch} ${usedPrefix}ttsearch *texto*
╰➤ ${xsearch} ${usedPrefix}ttsearch2 *texto*
╰➤ ${xsearch} ${usedPrefix}ytsearch *texto*
╰➤ ${xsearch} ${usedPrefix}hpmsearch *texto*
╰➤ ${xsearch} ${usedPrefix}spotifysearch *texto*
╰➤ ${xsearch} ${usedPrefix}githubsearch *texto*
╰➤ ${xsearch} ${usedPrefix}playstoresearch *texto*
╰➤ ${xsearch} ${usedPrefix}xnxxsearch *texto*
╰➤ ${xsearch} ${usedPrefix}xvsearch *texto*
╰➤ ${xsearch} ${usedPrefix}pornhubsearch *texto*
╰➤ ${xsearch} ${usedPrefix}gnula *texto*
╰➤ ${xsearch} ${usedPrefix}mercadolibre *texto*

🤖 *\`IA Bots\`* ${xia}
╰➤ ${xia} ${usedPrefix}luminai *texto*
╰➤ ${xia} ${usedPrefix}chatgpt *texto*
╰➤ ${xia} ${usedPrefix}gemini *texto*
╰➤ ${xia} ${usedPrefix}demo *texto*
╰➤ ${xia} ${usedPrefix}flux *texto*
╰➤ ${xia} ${usedPrefix}toreal *texto*
╰➤ ${xia} ${usedPrefix}toanime *texto*

🗂️ *\`Listas\`* ${xlist}
╰➤ ${xlist} ${usedPrefix}infem4 *hr + p*
╰➤ ${xlist} ${usedPrefix}inmasc4 *hr + p*
╰➤ ${xlist} ${usedPrefix}inmixto4 *hr + p*
╰➤ ${xlist} ${usedPrefix}infem6 *hr + p*
╰➤ ${xlist} ${usedPrefix}inmasc6 *hr + p*
╰➤ ${xlist} ${usedPrefix}inmixto6 *hr + p*
╰➤ ${xlist} ${usedPrefix}v4fem *hr + p*
╰➤ ${xlist} ${usedPrefix}v4masc *hr + p*
╰➤ ${xlist} ${usedPrefix}v4mixto *hr + p*
╰➤ ${xlist} ${usedPrefix}v6fem *hr + p*
╰➤ ${xlist} ${usedPrefix}v6masc *hr + p*
╰➤ ${xlist} ${usedPrefix}v6mixto *hr + p*

📝 *\`Frases\`* ${xfrases}
╰➤ ${xfrases} ${usedPrefix}piropo
╰➤ ${xfrases} ${usedPrefix}consejo
╰➤ ${xfrases} ${usedPrefix}fraseromantica

🔁 *\`Convertidores\`* ${xconverter}
╰➤ ${xconverter} ${usedPrefix}toptt *aud*
╰➤ ${xconverter} ${usedPrefix}toptt *vid*
╰➤ ${xconverter} ${usedPrefix}tomp3 *vid*

🧰 *\`Herramientas\`* ${xtools}
╰➤ ${xtools} ${usedPrefix}clima *texto*
╰➤ ${xtools} ${usedPrefix}readmore *texto*
╰➤ ${xtools} ${usedPrefix}read *texto*
╰➤ ${xtools} ${usedPrefix}fake *texto + user + texto*
╰➤ ${xtools} ${usedPrefix}traducir *idioma + texto*
╰➤ ${xtools} ${usedPrefix}tourl *img / vid / aud*
╰➤ ${xtools} ${usedPrefix}unblur *img*
╰➤ ${xtools} ${usedPrefix}hd *img*
╰➤ ${xtools} ${usedPrefix}remini *img*
╰➤ ${xtools} ${usedPrefix}background *img*
╰➤ ${xtools} ${usedPrefix}whatmusic *aud*
╰➤ ${xtools} ${usedPrefix}whatmusic *vid*
╰➤ ${xtools} ${usedPrefix}flag *país*
╰➤ ${xtools} ${usedPrefix}cfrase *link + texto*
╰➤ ${xtools} ${usedPrefix}inspect *link*
╰➤ ${xtools} ${usedPrefix}inspeccionar *link*
╰➤ ${xtools} ${usedPrefix}tiktokstalk *user*
╰➤ ${xtools} ${usedPrefix}pinstalk *user*
╰➤ ${xtools} ${usedPrefix}reactch
╰➤ ${xtools} ${usedPrefix}nuevafotochannel
╰➤ ${xtools} ${usedPrefix}nosilenciarcanal
╰➤ ${xtools} ${usedPrefix}silenciarcanal
╰➤ ${xtools} ${usedPrefix}seguircanal
╰➤ ${xtools} ${usedPrefix}avisoschannel
╰➤ ${xtools} ${usedPrefix}resiviravisos
╰➤ ${xtools} ${usedPrefix}eliminarfotochannel
╰➤ ${xtools} ${usedPrefix}reactioneschannel
╰➤ ${xtools} ${usedPrefix}reaccioneschannel
╰➤ ${xtools} ${usedPrefix}nuevonombrecanal
╰➤ ${xtools} ${usedPrefix}nuevadescchannel

👥 *\`Grupos\`* ${xgc}
╰➤ ${xgc} ${usedPrefix}add *número*
╰➤ ${xgc} ${usedPrefix}grupo *abrir / cerrar*
╰➤ ${xgc} ${usedPrefix}inactivos *list / kick*
╰➤ ${xgc} ${usedPrefix}grouptime *tiempo*
╰➤ ${xgc} ${usedPrefix}notify *texto*
╰➤ ${xgc} Aviso *texto*
╰➤ ${xgc} Admins *texto*
╰➤ ${xgc} ${usedPrefix}todos *texto*
╰➤ ${xgc} ${usedPrefix}setwelcome *texto*
╰➤ ${xgc} ${usedPrefix}setremove *texto*
╰➤ ${xgc} ${usedPrefix}setbye *texto*
╰➤ ${xgc} ${usedPrefix}groupdesc *texto*
╰➤ ${xgc} ${usedPrefix}promote *@tag*
╰➤ ${xgc} ${usedPrefix}demote *@tag*
╰➤ ${xgc} ${usedPrefix}kick *@tag*
╰➤ ${xgc} ${usedPrefix}mute *@tag*
╰➤ ${xgc} ${usedPrefix}tagnum *prefix*
╰➤ ${xgc} ${usedPrefix}link
╰➤ ${xgc} ${usedPrefix}delete
╰➤ ${xgc} ${usedPrefix}fantasmas

🎛️ *\`Efectos\`* ${xefects}
╰➤ ${xefects} ${usedPrefix}bass *aud*
╰➤ ${xefects} ${usedPrefix}blown *aud*
╰➤ ${xefects} ${usedPrefix}deep *aud*
╰➤ ${xefects} ${usedPrefix}earrape *aud*
╰➤ ${xefects} ${usedPrefix}fast *aud*
╰➤ ${xefects} ${usedPrefix}smooth *aud*
╰➤ ${xefects} ${usedPrefix}tupai *aud*
╰➤ ${xefects} ${usedPrefix}nightcore *aud*
╰➤ ${xefects} ${usedPrefix}reverse *aud*
╰➤ ${xefects} ${usedPrefix}robot *aud*
╰➤ ${xefects} ${usedPrefix}slow *aud*
╰➤ ${xefects} ${usedPrefix}squirrel *aud*
╰➤ ${xefects} ${usedPrefix}chipmunk *aud*
╰➤ ${xefects} ${usedPrefix}reverb *aud*
╰➤ ${xefects} ${usedPrefix}chorus *aud*
╰➤ ${xefects} ${usedPrefix}flanger *aud*
╰➤ ${xefects} ${usedPrefix}distortion *aud*
╰➤ ${xefects} ${usedPrefix}pitch *aud*
╰➤ ${xefects} ${usedPrefix}highpass *aud*
╰➤ ${xefects} ${usedPrefix}lowpass *aud*
╰➤ ${xefects} ${usedPrefix}underwater *aud*

🎉 *\`Fun\`* ${xfun}
╰➤ ${xfun} ${usedPrefix}gay *@tag*
╰➤ ${xfun} ${usedPrefix}lesbiana *@tag*
╰➤ ${xfun} ${usedPrefix}pajero *@tag*
╰➤ ${xfun} ${usedPrefix}pajera *@tag*
╰➤ ${xfun} ${usedPrefix}puto *@tag*
╰➤ ${xfun} ${usedPrefix}puta *@tag*
╰➤ ${xfun} ${usedPrefix}manco *@tag*
╰➤ ${xfun} ${usedPrefix}manca *@tag*
╰➤ ${xfun} ${usedPrefix}rata *@tag*
╰➤ ${xfun} ${usedPrefix}prostituto *@tag*
╰➤ ${xfun} ${usedPrefix}prostituta *@tag*
╰➤ ${xfun} ${usedPrefix}sinpoto *@tag*
╰➤ ${xfun} ${usedPrefix}sintetas *@tag*
╰➤ ${xfun} ${usedPrefix}chipi *@tag*
╰➤ ${xfun} ${usedPrefix}doxear *@tag*
╰➤ ${xfun} ${usedPrefix}declararse *@tag*
╰➤ ${xfun} ${usedPrefix}simi *texto*
╰➤ ${xfun} ${usedPrefix}pregunta *texto*
╰➤ ${xfun} ${usedPrefix}genio *texto*
╰➤ ${xfun} ${usedPrefix}top
╰➤ ${xfun} ${usedPrefix}sorteo
╰➤ ${xfun} ${usedPrefix}piropo
╰➤ ${xfun} ${usedPrefix}chiste
╰➤ ${xfun} ${usedPrefix}facto
╰➤ ${xfun} ${usedPrefix}verdad
╰➤ ${xfun} ${usedPrefix}pareja
╰➤ ${xfun} ${usedPrefix}parejas
╰➤ ${xfun} ${usedPrefix}love
╰➤ ${xfun} ${usedPrefix}personalidad

🎮 *\`Juegos\`* ${xgame}
╰➤ ${xgame} ${usedPrefix}pregunta *texto*
╰➤ ${xgame} ${usedPrefix}ttt *texto*
╰➤ ${xgame} ${usedPrefix}ptt *opción*
╰➤ ${xgame} ${usedPrefix}delttt
╰➤ ${xgame} ${usedPrefix}acertijo
╰➤ ${xgame} ${usedPrefix}trivia

🌸 *\`Anime\`* ${xanime}
╰➤ ${xanime} ${usedPrefix}messi
╰➤ ${xanime} ${usedPrefix}cr7

✒️ *\`Logos\`* ${xlogos}
╰➤ ${xlogos} ${usedPrefix}balogo *texto*
╰➤ ${xlogos} ${usedPrefix}logocorazon *texto*
╰➤ ${xlogos} ${usedPrefix}logochristmas  *texto*
╰➤ ${xlogos} ${usedPrefix}logopareja *texto*
╰➤ ${xlogos} ${usedPrefix}logoglitch *texto*
╰➤ ${xlogos} ${usedPrefix}logosad *texto*
╰➤ ${xlogos} ${usedPrefix}logogaming *texto*
╰➤ ${xlogos} ${usedPrefix}logosolitario *texto*
╰➤ ${xlogos} ${usedPrefix}logodragonball *texto*
╰➤ ${xlogos} ${usedPrefix}logoneon *texto*
╰➤ ${xlogos} ${usedPrefix}logogatito *texto*
╰➤ ${xlogos} ${usedPrefix}logochicagamer *texto*
╰➤ ${xlogos} ${usedPrefix}logonaruto *texto*
╰➤ ${xlogos} ${usedPrefix}logofuturista *texto*
╰➤ ${xlogos} ${usedPrefix}logonube *texto*
╰➤ ${xlogos} ${usedPrefix}logoangel *texto*
╰➤ ${xlogos} ${usedPrefix}logomurcielago *texto*
╰➤ ${xlogos} ${usedPrefix}logocielo *texto*
╰➤ ${xlogos} ${usedPrefix}logograffiti3d *texto*
╰➤ ${xlogos} ${usedPrefix}logomatrix *texto*
╰➤ ${xlogos} ${usedPrefix}logohorror *texto*
╰➤ ${xlogos} ${usedPrefix}logoalas *texto*
╰➤ ${xlogos} ${usedPrefix}logoarmy *texto*
╰➤ ${xlogos} ${usedPrefix}logopubg *texto*
╰➤ ${xlogos} ${usedPrefix}logopubgfem *texto*
╰➤ ${xlogos} ${usedPrefix}logolol *texto*
╰➤ ${xlogos} ${usedPrefix}logoamongus *texto*
╰➤ ${xlogos} ${usedPrefix}logovideopubg *texto*
╰➤ ${xlogos} ${usedPrefix}logovideotiger *texto*
╰➤ ${xlogos} ${usedPrefix}logovideointro *texto*
╰➤ ${xlogos} ${usedPrefix}logovideogaming *texto*
╰➤ ${xlogos} ${usedPrefix}logoguerrero *texto*
╰➤ ${xlogos} ${usedPrefix}logoportadaplayer *texto*
╰➤ ${xlogos} ${usedPrefix}logoportadaff *texto*
╰➤ ${xlogos} ${usedPrefix}logoportadapubg *texto*
╰➤ ${xlogos} ${usedPrefix}logoportadacounter *texto*

🔞 *\`NSFW\`* ${xnsfw}
╰➤ ${xnsfw} ${usedPrefix}violar *@tag*
╰➤ ${xnsfw} ${usedPrefix}follar *@tag*
╰➤ ${xnsfw} ${usedPrefix}anal *@tag*
╰➤ ${xnsfw} ${usedPrefix}coger *@tag*
╰➤ ${xnsfw} ${usedPrefix}coger2 *@tag*
╰➤ ${xnsfw} ${usedPrefix}penetrar *@tag*
╰➤ ${xnsfw} ${usedPrefix}sexo *@tag*
╰➤ ${xnsfw} ${usedPrefix}rusa *@tag*
╰➤ ${xnsfw} ${usedPrefix}sixnine *@tag*
╰➤ ${xnsfw} ${usedPrefix}pies *@tag*
╰➤ ${xnsfw} ${usedPrefix}mamada *@tag*
╰➤ ${xnsfw} ${usedPrefix}lickpussy *@tag*
╰➤ ${xnsfw} ${usedPrefix}grabboobs *@tag*
╰➤ ${xnsfw} ${usedPrefix}suckboobs *@tag*
╰➤ ${xnsfw} ${usedPrefix}cum *@tag*
╰➤ ${xnsfw} ${usedPrefix}fap *@tag*
╰➤ ${xnsfw} ${usedPrefix}manosear *@tag*
╰➤ ${xnsfw} ${usedPrefix}lesbianas *@tag*

🎨 *\`Stickers\`* ${xsticker}
╰➤ ${xsticker} ${usedPrefix}sticker *img*
╰➤ ${xsticker} ${usedPrefix}sticker *vid*
╰➤ ${xsticker} ${usedPrefix}brat *texto*
╰➤ ${xsticker} ${usedPrefix}bratv *texto*
╰➤ ${xsticker} ${usedPrefix}qc *texto*
╰➤ ${xsticker} ${usedPrefix}wm *texto*
╰➤ ${xsticker} ${usedPrefix}dado
╰➤ ${xsticker} ${usedPrefix}scat

💰 *\`RPG\`* ${xrpg}
╰➤ ${xrpg} ${usedPrefix}minar
╰➤ ${xrpg} ${usedPrefix}cofre
╰➤ ${xrpg} ${usedPrefix}slut
╰➤ ${xrpg} ${usedPrefix}nivel
╰➤ ${xrpg} ${usedPrefix}ruleta
╰➤ ${xrpg} ${usedPrefix}robarxp
╰➤ ${xrpg} ${usedPrefix}robardiamantes
╰➤ ${xrpg} ${usedPrefix}depositar
╰➤ ${xrpg} ${usedPrefix}daily
╰➤ ${xrpg} ${usedPrefix}crimen
╰➤ ${xrpg} ${usedPrefix}cartera

📇 *\`Registro\`* ${xreg}
╰➤ ${xreg} ${usedPrefix}perfil
╰➤ ${xreg} ${usedPrefix}reg
╰➤ ${xreg} ${usedPrefix}unreg

🛠️ *\`Owner\`* ${xowner}
╰➤ ${xowner} ${usedPrefix}salir
╰➤ ${xowner} ${usedPrefix}update
╰➤ ${xowner} ${usedPrefix}blocklist
╰➤ ${xowner} ${usedPrefix}grouplist
╰➤ ${xowner} ${usedPrefix}restart
╰➤ ${xowner} ${usedPrefix}join
╰➤ ${xowner} ${usedPrefix}chetar
╰➤ ${xowner} ${usedPrefix}unbanuser
╰➤ ${xowner} ${usedPrefix}banchat
╰➤ ${xowner} ${usedPrefix}unbanchat
╰➤ ${xowner} ${usedPrefix}block
╰➤ ${xowner} ${usedPrefix}unblock
╰➤ ${xowner} ${usedPrefix}creargc
╰➤ ${xowner} ${usedPrefix}getplugin
╰➤ ${xowner} ${usedPrefix}let
╰➤ ${xowner} ${usedPrefix}dsowner
╰➤ ${xowner} ${usedPrefix}autoadmin
> ${club}
`.trim()
        await conn.sendMessage(m.chat, {
            image: { url: imageUrl }, // Enviar siempre la imagen especificada
            caption: menu,
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*✖️ Ocurrió un error al enviar el menú.*\n\n${e}`)
    }
}
handler.help = ['menuff'];
handler.tags = ['main'];
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.fail = null;
export default handler;
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}