const discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const discord_player = require('discord-player');

/**
* @callback InteractionCallback
* @param {discord.ButtonInteraction} interaction
* @param {...any} [args]
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'|'MODAL'} type
*/

module.exports = {
    /** @type {discord.ApplicationCommandData|ContextMenuData} */
    data: { customid: 'music-pause', type: 'BUTTON' },
    /** @type {InteractionCallback} */
    exec: async (interaction, client, Configs, player) => {
        /** @type {discord_player.Queue} */
        const queue = player.getQueue(interaction.guildId);
        const content = interaction.message.content;
        const button = interaction.message.components[0];
        if (!queue) {
            const embed = new discord.MessageEmbed()
                .setDescription('❌ 現在キューはありません!')
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        if (!interaction.member.voice.channelId) {
            const embed = new discord.MessageEmbed()
                .setDescription('❌ ボイスチャンネルに参加してください!')
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            const embed = new discord.MessageEmbed()
                .setDescription('❌ 現在再生中のボイスチャンネルに参加してください!')
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        queue.setPaused(queue.connection.paused ? false : true);
        interaction.update({ content: content, components: [button] });
        // eslint-disable-next-line no-empty-function
        await queue.metadata.channel.send(`${queue.connection.paused ? '⏸️' : '▶️' }音楽を**${queue.connection.paused ? '一時停止' : '再生' }**しました`).catch(() => {});
    },
};