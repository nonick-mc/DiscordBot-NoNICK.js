const discord = require('discord.js');

/** @type {import('@djs-tools/interactions').MessageRegister} */
const ping_command = {
  data: {
    name: 'パネルを編集',
    dmPermission: false,
    defaultMemberPermissions: discord.PermissionFlagsBits.ManageRoles | discord.PermissionFlagsBits.ManageMessages,
    type: 'MESSAGE',
  },
  exec: async (interaction) => {
    const message = interaction.targetMessage;
    const panelEmbed = message.embeds[0];
    const components = message.components[0];

    try {
      if (message.author !== interaction.client.user) throw '';
      if (components?.components[0]?.type !== discord.ComponentType.SelectMenu) throw '';
      if (components?.components[0]?.customId !== 'reactionRole') throw '';
    } catch {
      const error = new discord.EmbedBuilder()
				.setAuthor({ name: 'それはリアクションロールパネルではありません！', iconURL: 'https://cdn.discordapp.com/attachments/958791423161954445/1022819275456651294/mark_batsu_illust_899.png' })
				.setColor('Red');
      return interaction.reply({ embeds: [error], ephemeral: true });
    }

    const embed = new discord.EmbedBuilder()
      .setTitle(panelEmbed.title)
      .setDescription(panelEmbed.description)
      .setColor(panelEmbed.color)
      .setImage(panelEmbed.image?.url)
      .setFooter({ text: `${message.id}`, iconURL: 'https://media.discordapp.net/attachments/958791423161954445/1003671818881740891/988439788132646954.png' });

    const button = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setCustomId('reactionRole-editEmbed')
        .setEmoji('988439788132646954')
        .setStyle(discord.ButtonStyle.Secondary),
      new discord.ButtonBuilder()
        .setCustomId('reactionRole-addRole')
        .setLabel('追加')
        .setEmoji('988439798324817930')
        .setStyle(discord.ButtonStyle.Secondary),
			new discord.ButtonBuilder()
				.setCustomId('reactionRole-deleteRole')
				.setLabel('削除')
				.setEmoji('989089271275204608')
				.setStyle(discord.ButtonStyle.Secondary),
			new discord.ButtonBuilder()
				.setCustomId('reactionRole-changeMode')
				.setLabel('単一選択')
				.setStyle(discord.ButtonStyle.Success),
			new discord.ButtonBuilder()
				.setCustomId('reactionRole-editPanel')
				.setLabel('編集')
				.setStyle(discord.ButtonStyle.Primary),
		);

    interaction.reply({ content: '**プレビューモード**\n「編集」ボタンを押すとパネルの編集を終了します。', embeds: [embed], components: [message.components[0], button], ephemeral: true });
  },
};
module.exports = [ ping_command ];