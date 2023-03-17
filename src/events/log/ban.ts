import { AuditLogEvent, Colors, EmbedBuilder, Events, formatEmoji, User } from 'discord.js';
import { BlurpleEmojies, GrayEmojies } from '../../module/emojies';
import { DiscordEventBuilder } from '../../module/events';
import { isBlocked } from '../../module/functions';
import { getServerSetting } from '../../module/mongo/middleware';

const banLog = new DiscordEventBuilder({
  type: Events.GuildAuditLogEntryCreate,
  execute: async (auditLog, guild) => {
    if (isBlocked(guild)) return;
    if (![AuditLogEvent.MemberBanAdd, AuditLogEvent.MemberBanRemove].includes(auditLog.action) || !(auditLog.target instanceof User)) return;

    const setting = await getServerSetting(guild.id, 'log');
    if (!setting?.ban.enable || !setting?.ban.channel) return;

    const channel = await guild.channels.fetch(setting.ban.channel).catch(() => null);
    const executor = await auditLog.executor?.fetch();

    if (!channel?.isTextBased()) return;

    if (auditLog.action === AuditLogEvent.MemberBanAdd)
      channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('`🔨` BAN')
            .setDescription([
              `${formatEmoji(GrayEmojies.member)} **対象者:** ${auditLog.target} [\`${auditLog.target.id}\`]`,
              '',
              `${formatEmoji(BlurpleEmojies.member)} **実行者:** ${executor} [\`${executor?.tag}\`]`,
              `${formatEmoji(BlurpleEmojies.text)} **理由:** ${auditLog.reason ?? '理由が入力されていません'}`,
            ].join('\n'))
            .setColor(Colors.Red)
            .setThumbnail(auditLog.target.displayAvatarURL())
            .setTimestamp(),
        ],
      }).catch(() => { });

    else if (auditLog.action === AuditLogEvent.MemberBanRemove)
      channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('`🔨` BAN解除')
            .setDescription([
              `${formatEmoji(GrayEmojies.member)} **対象者:** ${auditLog.target} [\`${auditLog.target.tag}\`]`,
              '',
              `${formatEmoji(BlurpleEmojies.member)} **実行者:** ${executor} [\`${executor?.tag}\`]`,
              `${formatEmoji(BlurpleEmojies.text)} **理由:** ${auditLog.reason ?? '理由が入力されていません'}`,
            ].join('\n'))
            .setColor(Colors.Blue)
            .setThumbnail(auditLog.target.displayAvatarURL())
            .setTimestamp(),
        ],
      }).catch(() => { });
  },
});

module.exports = [banLog];