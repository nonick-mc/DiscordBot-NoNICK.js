const discord = require('discord.js');

/**
* @callback InteractionCallback
* @param {discord.MessageContextMenuInteraction} interaction
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
    data: { name: 'reactionrole', description: '新しいリアクションロールパネルを作成', descriptionLocalizations: { 'en-US': 'Create a new reaction role panel' }, type: 'CHAT_INPUT' },
    /** @type {InteractionCallback} */
    exec: async (client, interaction, Configs, language) => {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            const embed = new discord.MessageEmbed()
                .setDescription(language('REACTION_PERMISSION_ERROR'))
                .setColor('RED');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const modal = new discord.Modal()
            .setCustomId('reactionRoleSetting')
            .setTitle(language('REACTION_MODAL_TITLE'))
            .addComponents(
                new discord.MessageActionRow().addComponents(
                    new discord.TextInputComponent()
                        .setCustomId('title')
                        .setLabel(language('REACTION_MODAL_LABEL_1'))
                        .setMaxLength(1000)
                        .setStyle('SHORT')
                        .setRequired(true),
                ),
                new discord.MessageActionRow().addComponents(
                    new discord.TextInputComponent()
                        .setCustomId('description')
                        .setLabel(language('REACTION_MODAL_LABEL_2'))
                        .setPlaceholder('')
                        .setMaxLength(4000)
                        .setStyle('PARAGRAPH')
                        .setRequired(true),
                ),
                new discord.MessageActionRow().addComponents(
                    new discord.TextInputComponent()
                        .setCustomId('image')
                        .setLabel(language('REACTION_MODAL_LABEL_3'))
                        .setPlaceholder(language('REACTION_MODAL_PLACEHOLDER_3'))
                        .setMaxLength(500)
                        .setStyle('SHORT'),
                ),
            );
        interaction.showModal(modal);
    },
};