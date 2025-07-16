import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text }) => {

  try {
    await m.react('🔞');
    const imageUrl = 'https://files.catbox.moe/dtfvzc.jpg'; // Cambié la URL al enlace de la imagen
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `
🌐 *\`Menú NSFW\`*
────────────────────────────

*\`Buscadores\`*
╰➤ .xnxxsearch *texto*
╰➤ .xvsearch *texto*
╰➤ .phsearch *texto*
╰➤ .r34 *texto*

*\`Descargas\`*
╰➤ .xnxxdl *ulr*
╰➤ .xvdl *url*
╰➤ .phdl *url*

*\`Gifs\`*
╰➤ .follar *@tag*
╰➤ .coger *@tag*
╰➤ .coger2 *@tag*
╰➤ .penetrar *@tag*
╰➤ .anal *@tag*
╰➤ .sexo *@tag*
╰➤ .violar *@tag*
╰➤ .rusa *@tag*
╰➤ .sixnine *@tag*
╰➤ .pies *@tag*
╰➤ .mamada *@tag*
╰➤ .lickpussy *@tag*
╰➤ .grabboobs *@tag*
╰➤ .suckboobs *@tag*
╰➤ .cum *@tag*
╰➤ .fap *@tag*
╰➤ .manosear *@tag*
╰➤ .lesbianas *@tag*

*\`Contenidos\`*
╰➤ .pack
╰➤ .pack2
╰➤ .pack3
╰➤ .videoxxx
╰➤ .videoxxx2
╰➤ .randomxxx
╰➤ .nsfwloli
╰➤ .nsfwfoot
╰➤ .nsfwass
╰➤ .nsfwbdsm
╰➤ .nsfwcum
╰➤ .nsfwero
╰➤ .nsfwfemdom
╰➤ .nsfwglass
╰➤ .nsfworgy
╰➤ .yuri
╰➤ .yuri2
╰➤ .yaoi
╰➤ .yaoi2
╰➤ .panties
╰➤ .tetas
╰➤ .booty
╰➤ .ecchi
╰➤ .furro
╰➤ .hentai
╰➤ .trapito
╰➤ .imagenlesbians
╰➤ .pene
╰➤ .porno
╰➤ .pechos
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

handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;
handler.fail = null;

export default handler;
