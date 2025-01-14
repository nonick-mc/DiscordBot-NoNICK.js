import type { GuildFeature, UserFlagsString } from 'discord.js';

export const white = {
  addMark: '988439798324817930',
  boost: '896591259886567434',
  channel: '966588719635267624',
  id: '1005688192818761748',
  message: '966596708458983484',
  moderator: '969148338597412884',
  member: '1005688190931320922',
  pencil: '988439788132646954',
  removeMark: '989089271275204608',
  role2: '1053347359695835146',
  role: '966719258430160986',
  schedule: '1014603109001085019',
  timeOut: '1016740772340576306',
  image: '1018167020824576132',
  download: '1018760839743950909',
  link: '1065688873281265674',
  reply: '971069195343249458',
  addLink: '1066923392172818502',
  addSelectRole: '1066923389245202453',
  addButtonRole: '1066923387563290784',
  setting: '966588719635263539',
  home: '971389898076598322',
} as const;

export const gray = {
  member: '1064889710843002991',
  text: '1064889722796773376',
  link: '1064889715863601192',
  edit: '1064889719680401460',
  channel: '1064889714139746304',
  schedule: '966773928620064841',
} as const;

export const blurple = {
  member: '1064891793642098708',
  text: '1064891791385571359',
  admin: '1064924738960490546',
} as const;

export const space = '1064892783804043344';

export const userFlag: Partial<Record<UserFlagsString, string>> = {
  Staff: '966753508739121222',
  Partner: '966753508860768357',
  CertifiedModerator: '959536411894243378',
  Hypesquad: '966753508961439745',
  HypeSquadOnlineHouse1: '966753508843978872',
  HypeSquadOnlineHouse2: '966753508927889479',
  HypeSquadOnlineHouse3: '966753508776890459',
  BugHunterLevel1: '966753508848205925',
  BugHunterLevel2: '966753508755898410',
  ActiveDeveloper: '1040345950318768218',
  VerifiedDeveloper: '966753508705583174',
  PremiumEarlySupporter: '966753508751736892',
};

export const guildFeatures: Partial<Record<GuildFeature, string>> = {
  PARTNERED: '982512900432351262',
  VERIFIED: '982512902042955806',
  DISCOVERABLE: '1087358252691496960',
};

const colorEmojis = { white, gray, blurple };
type ColorEmojis = typeof colorEmojis;
export type Emojis<
  T extends ColorEmojis[keyof ColorEmojis] = ColorEmojis[keyof ColorEmojis],
> = T extends Record<infer P, string> ? P : never;
type HasColor<
  E extends Emojis,
  C extends keyof ColorEmojis,
> = ColorEmojis[C] extends {
  [x in E]: string;
}
  ? C
  : never;
export type EmojiColors<E extends Emojis> =
  | HasColor<E, 'white'>
  | HasColor<E, 'gray'>
  | HasColor<E, 'blurple'>;

export function getColorEmoji<E extends Emojis>(
  emoji: E,
  color: EmojiColors<E>,
) {
  return colorEmojis[color][emoji as keyof (typeof colorEmojis)[typeof color]];
}
