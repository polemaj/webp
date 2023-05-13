let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {
    if (!event) return await conn.sendButton(m.chat, `contoh:
${usedPrefix + command} welcome @user
${usedPrefix + command} bye @user
${usedPrefix + command} promote @user
${usedPrefix + command} demote @user`.trim(), wm, null, [['Welcome', '#simulate welcome'], ['Bye', '#simulate bye']])
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let part = who.length ? who : [m.sender]
    let act = false
    m.reply(`Simulating ${event}...`)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            act = 'add'
            break
        case 'bye':
        case 'leave':
        case 'remove':
            act = 'remove'
            break
        case 'promote':
            act = 'promote'
            break
        case 'demote':
            act = 'demote'
            break
/*        case 'delete':
            deleted = m
            break
*/
        default:
            throw `List Event: welcome, bye, delete, promote, demote`
    }
    if (act) return conn.onParticipantsUpdate({
        id: m.chat,
        participants: part,
        action: act
    })
//    return conn.onDelete(m)
}
handler.help = ['simulate <event> <@mention>']
handler.tags = ['owner']

handler.command = /^simulate$/i
handler.owner = true
module.exports = handler