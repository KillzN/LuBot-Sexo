const handler = async (m, { args, conn, usedPrefix }) => {
    const tipo = (args[0] || '').toLowerCase();
    const salaId = args[1];

    if (!tipo) return conn.reply(m.chat, '*☁️ Especifica si eres "jugador", "suplente" o "eliminarme".*', m);
    if (!['jugador', 'suplente', 'eliminarme'].includes(tipo))
        return conn.reply(m.chat, '*☁️ Tipo inválido. Usa "jugador", "suplente" o "eliminarme".*', m);
    if (!salaId) return conn.reply(m.chat, '*☁️ Debes proporcionar el ID de la sala.*', m);
    if (!global.vsData || !(salaId in global.vsData))
        return conn.reply(m.chat, '*✖️ Sala no encontrada o expirada.*', m);

    const sala = global.vsData[salaId];
    const maxJugadores = sala.titulo.includes('6VS6') ? 6 : 4;
    const maxSuplentes = 2;

    if (tipo === 'eliminarme') {
        const estaba = sala.jugadores.includes(m.sender) || sala.suplentes.includes(m.sender);
        sala.jugadores = sala.jugadores.filter(u => u !== m.sender);
        sala.suplentes = sala.suplentes.filter(u => u !== m.sender);
        const mensaje = estaba ? '*✅ Has sido eliminado de la sala.*' : '*⚠️ No estabas anotado en la sala.*';
        return conn.reply(m.chat, mensaje, m);
    }

    const yaJugador = sala.jugadores.includes(m.sender);
    const yaSuplente = sala.suplentes.includes(m.sender);

    if (tipo === 'jugador' && yaJugador)
        return conn.reply(m.chat, '*☁️ Ya estás registrado como jugador.*', m);
    if (tipo === 'suplente' && yaSuplente)
        return conn.reply(m.chat, '*☁️ Ya estás registrado como suplente.*', m);

    // Quitar de ambas listas antes de agregar
    sala.jugadores = sala.jugadores.filter(u => u !== m.sender);
    sala.suplentes = sala.suplentes.filter(u => u !== m.sender);

    if (tipo === 'jugador') {
        if (sala.jugadores.length >= maxJugadores)
            return conn.reply(m.chat, '*⚠️ Lista de jugadores llena.*', m);
        sala.jugadores.push(m.sender);
    } else {
        if (sala.suplentes.length >= maxSuplentes)
            return conn.reply(m.chat, '*⚠️ Lista de suplentes llena.*', m);
        sala.suplentes.push(m.sender);
    }

    const jugadoresText = sala.jugadores.map((u, i) => {
        const icono = sala.icons1[i] || `${i + 1}.`;
        return `${icono}˚ @${u.split('@')[0]}`;
    }).join('\n');

    const suplentesText = sala.suplentes.map((u, i) => {
        const icono = sala.icons2[i] || '🌿';
        return `${icono}˚ @${u.split('@')[0]}`;
    }).join('\n');

    const mensajeActualizado = `ꆬꆬ       ݂    *${sala.titulo}*    🌹֟፝  

  ത *𝖬𝗈𝖽𝖺𝗅𝗂𝖽𝖺𝖽:* ${sala.modalidad}
  ത *𝖧𝗈𝗋𝖺:* ${sala.horasEnPais.PE} 🇵🇪 ${sala.horasEnPais.AR} 🇦🇷

ㅤㅤㅤ࿙࿚ㅤׅㅤ࿙࿚࿙࿚ㅤׅㅤ࿙࿚

߳𑁍̵ ֕︵۪۪۪۪᷼ ּ \`𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌:\` ׅ░ׅ

${jugadoresText}

      ꛁ⵿ֹ𐑼᪲ ۪ \`𝖲𝗎𝗉𝗅𝖾𝗇𝗍𝖾𝗌:\` ֹ̼ ׅ ❜𝆬 ᨩ̼

${suplentesText}`;

    conn.sendMessage(m.chat, {
        text: mensajeActualizado,
        mentions: [...sala.jugadores, ...sala.suplentes],
        footer: 'Toca el botón para anotarte o eliminarte',
        buttons: [
            {
                buttonId: `${usedPrefix}anotarme jugador ${salaId}`,
                buttonText: { displayText: 'Jugador' },
                type: 1
            },
            {
                buttonId: `${usedPrefix}anotarme suplente ${salaId}`,
                buttonText: { displayText: 'Suplente' },
                type: 1
            },
            {
                buttonId: `${usedPrefix}anotarme eliminarme ${salaId}`,
                buttonText: { displayText: 'Eliminarme' },
                type: 1
            }
        ],
        viewOnce: true
    }, { quoted: m });
};

handler.command = /^anotarme$/i;
export default handler;
