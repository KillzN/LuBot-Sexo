const handler = async (m, { conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('*🍝 Ya eres administrador del grupo.*');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react(done)
    m.reply(`*${xowner} Listo, ya te di el poder, ahora eres administrador del grupo! :3*`);
    let nn = conn.getName(m.sender);
    //conn.reply('543704518876@s.whatsapp.net', `☕ *${nn}* se dio Auto Admin en:\n> ${groupMetadata.subject}.`, m, );
  } catch {
    m.reply('*✖️ Ocurrio un error.*');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.mods = true;
handler.group = true;
handler.botAdmin = true;
export default handler;