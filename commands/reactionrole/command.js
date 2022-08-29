// eslint-disable-next-line no-unused-vars
const discord = require('discord.js');

/** @type {import('@djs-tools/interactions').ChatInputRegister} */
const ping_command = {
    data: {
        name: 'reactionrole',
        description: 'リアクションロールパネルを作成します',
        dmPermission: false,
        defaultMemberPermissions: discord.PermissionFlagsBits.ManageRoles | discord.PermissionFlagsBits.ManageMessages,
        type: 'CHAT_INPUT',
    },
    exec: async (interaction) => {
        const modal = new discord.ModalBuilder()
            .setCustomId('createReactionRolePanel')
            .setTitle('パネルの作成')
            .addComponents(
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('title')
                        .setLabel('タイトル')
                        .setMaxLength(1000)
                        .setStyle(discord.TextInputStyle.Short),
                ),
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('description')
                        .setLabel('説明')
                        .setMaxLength(4000)
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setRequired(false),
                ),
                new discord.ActionRowBuilder().addComponents(
                    new discord.TextInputBuilder()
                        .setCustomId('image')
                        .setLabel('画像URL')
                        .setPlaceholder('http(s):// から始まるURLのみ対応しています。')
                        .setMaxLength(1000)
                        .setStyle(discord.TextInputStyle.Short)
                        .setRequired(false),
                ),
            );
        interaction.showModal(modal);
    },
};
module.exports = [ ping_command ];