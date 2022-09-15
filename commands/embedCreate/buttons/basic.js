// eslint-disable-next-line no-unused-vars
const discord = require('discord.js');

/** @type {import('@djs-tools/interactions').ButtonRegister} */
const ping_command = {
    data: {
        customId: 'embed-basic',
        type: 'BUTTON',
    },
    exec: async (interaction) => {
        const embed = interaction.message.embeds[0];

        const modal = new discord.ModalBuilder()
            .setCustomId('embed-basicModal')
            .setTitle('タイトル・説明・色')
            .addComponents(
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('title')
                        .setLabel('タイトル')
                        .setMaxLength(1000)
                        .setValue(embed.title)
                        .setStyle(discord.TextInputStyle.Short),
                ),
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('url')
                        .setLabel('タイトルURL')
                        .setMaxLength(1000)
                        .setValue(embed.url || '')
                        .setStyle(discord.TextInputStyle.Short)
                        .setRequired(false),
                ),
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('description')
                        .setLabel('説明')
                        .setMaxLength(4000)
                        .setValue(embed.description || '')
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setRequired(false),
                ),
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('color')
                        .setLabel('カラーコード')
                        .setMaxLength(7)
                        .setPlaceholder('#ffffff')
                        .setValue(embed.hexColor || '')
                        .setStyle(discord.TextInputStyle.Short),
                ),
            );

    interaction.showModal(modal);
    },
};
module.exports = [ ping_command ];