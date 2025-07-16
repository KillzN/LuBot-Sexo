import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text }) => {

  try {
    await m.react('🌴');
    const imageUrl = 'https://files.catbox.moe/dtfvzc.jpg'; // Cambié la URL al enlace de la imagen
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `
🌐 *\`Menú Logos\`*
────────────────────────────

\`Comandos\`${xlogos}
╰➤ ${xlogos}ᰍ ${usedPrefix}balogo *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logocorazon *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logochristmas  *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logopareja *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoglitch *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logosad *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logogaming *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logosolitario *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logodragonball *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoneon *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logogatito *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logochicagamer *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logonaruto *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logofuturista *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logonube *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoangel *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logomurcielago *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logocielo *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logograffiti3d *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logomatrix *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logohorror **txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoalas *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoarmy *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logopubg *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logopubgfem *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logolol *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoamongus *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logovideopubg *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logovideotiger *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logovideointro *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logovideogaming *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoguerrero *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoportadaplayer *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoportadaff *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoportadapubg *txt*
╰➤ ${xlogos}ᰍ ${usedPrefix}logoportadacounter *txt*
> ${club}
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },  // Cambié "video" por "image"
      caption: str,
      mentions: [m.sender],
    }, { quoted: fkontak });

  } catch (e) {
    conn.reply(m.chat, `*❌ Error al enviar el menú.*\n${e}`, m);
  }
};

handler.command = /^(menulogos|menu2)$/i;
handler.fail = null;

export default handler;
