import { ChatInput } from '@akki256/discord-interaction';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  PermissionFlagsBits,
} from 'discord.js';

export default new ChatInput(
  {
    name: 'setting',
    description: 'BOTの設定を変更します',
    dmPermission: false,
    defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
  },
  (interaction) => {
    if (!interaction.inGuild()) return;

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('BOTの設定はダッシュボードに移動しました')
          .setDescription(
            '`v5.0`から、NoNICK.jsの設定は[**Webダッシュボード**](https://dashboard.nonick-js.com)で行えるようになりました！ このコマンドは次回のバージョンで削除され、使用できなくなります。',
          )
          .setColor(Colors.Blurple),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().setComponents([
          new ButtonBuilder()
            .setLabel('ダッシュボード')
            .setURL('https://dashboard.nonick-js.com')
            .setStyle(ButtonStyle.Link),
        ]),
      ],
      ephemeral: true,
    });
  },
);