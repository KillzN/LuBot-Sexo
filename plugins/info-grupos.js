let handler = async (m, { conn, usedPrefix, command }) => {

   let grupos = `*¡Hola!, te invito a unirte a mis grupos oficiales!*

✑ 𝗚𝗿𝘂𝗽𝗼 𝗱𝗲 𝘃𝗲𝗻𝘁𝗮𝘀
✎${grupo}

✑ 𝗚𝗿𝘂𝗽𝗼 𝗱𝗲 𝗖𝗼𝗺𝗽𝗿𝗮 𝘆 𝗩𝗲𝗻𝘁𝗮𝘀
✎${comu}

✑ 𝗖𝗮𝗻𝗮𝗹 𝗱𝗲 𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗶𝗮𝘀
✎ ${channel}

✑ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺
✎ ${ig}

> ${dev}`

   let img = 'https://files.catbox.moe/dtfvzc.jpg';

   conn.sendMessage(m.chat, { image: { url: img }, caption: grupos }, { quoted: fkontak });
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'shadowgrupos', 'club']

export default handler