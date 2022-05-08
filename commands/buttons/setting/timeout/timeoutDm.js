const fs = require('fs');
const discord = require('discord.js');
const setting_module = require('../../../../modules/setting');

/**
* @callback InteractionCallback
* @param {discord.MessageContextMenuInteraction} interaction
* @param {...any} [args]
* @returns {void}
*/
/**
* @typedef ContextMenuData
* @prop {string} customid
* @prop {'BUTTON'|'SELECT_MENU'} type
*/

module.exports = {
    /**@type {discord.ApplicationCommandData|ContextMenuData} */
    data: {customid: 'setting-timeoutDm', type: 'BUTTON'},
    /**@type {InteractionCallback} */
    exec: async (interaction, client) => {
        const { timeoutDm } = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
        const embed = interaction.message.embeds[0];
        const select = interaction.message.components[0];
        const button = interaction.message.components[1];

        if (timeoutDm) {
            setting_module.change_setting("timeoutDm", false);
            embed.spliceFields(1, 1, {name: 'DM警告機能', value: discord.Formatters.formatEmoji('758380151238033419')+' 無効化中', inline:true});
            button.components[1].setLabel('OFF');
            button.components[1].setStyle('DANGER');
        } else if (!timeoutDm) {
            setting_module.change_setting("timeoutDm", true);
            embed.spliceFields(1, 1, {name: 'DM警告機能', value: discord.Formatters.formatEmoji('758380151544217670')+' 有効化中', inline:true});
            button.components[1].setLabel('ON');
            button.components[1].setStyle('SUCCESS');
        }
        interaction.update({embeds: [embed], components: [select, button], ephemeral:true});
    }
}