export type Pattern = {
  id: string
  traditional: string
  simplified: string
  name: string
  tip: string
  examples: { simplified: string; traditional: string; pinyin: string; meaning: string }[]
}

/** Reversible component patterns useful at HSK 1 (Taiwan traditional). */
export const patterns: Pattern[] = [
  {
    id: 'men',
    traditional: '門',
    simplified: '门',
    name: 'Door radical',
    tip: 'Anything built around 门 in simplified usually restores to 門.',
    examples: [
      { simplified: '门', traditional: '門', pinyin: 'mén', meaning: 'door' },
      { simplified: '问', traditional: '問', pinyin: 'wèn', meaning: 'ask' },
      { simplified: '间', traditional: '間', pinyin: 'jiān', meaning: 'between / measure for rooms' },
      { simplified: '们', traditional: '們', pinyin: 'men', meaning: 'plural marker' },
    ],
  },
  {
    id: 'yan',
    traditional: '言',
    simplified: '讠',
    name: 'Speech radical',
    tip: 'The speech radical shrinks to 讠 on the left. Flip it back to 言 for traditional.',
    examples: [
      { simplified: '说', traditional: '說', pinyin: 'shuō', meaning: 'speak' },
      { simplified: '话', traditional: '話', pinyin: 'huà', meaning: 'speech / words' },
      { simplified: '语', traditional: '語', pinyin: 'yǔ', meaning: 'language' },
      { simplified: '请', traditional: '請', pinyin: 'qǐng', meaning: 'please / invite' },
      { simplified: '谢', traditional: '謝', pinyin: 'xiè', meaning: 'thank' },
      { simplified: '认', traditional: '認', pinyin: 'rèn', meaning: 'recognize' },
    ],
  },
  {
    id: 'jian',
    traditional: '見',
    simplified: '见',
    name: 'See radical',
    tip: '见 almost always expands to 見 — including in compounds like 现 and 觉.',
    examples: [
      { simplified: '见', traditional: '見', pinyin: 'jiàn', meaning: 'see' },
      { simplified: '现', traditional: '現', pinyin: 'xiàn', meaning: 'appear / now' },
      { simplified: '觉', traditional: '覺', pinyin: 'jué / jiào', meaning: 'feel / sleep' },
    ],
  },
  {
    id: 'bei',
    traditional: '貝',
    simplified: '贝',
    name: 'Shell / money radical',
    tip: '贝 → 貝. Money and value characters often carry this component.',
    examples: [
      { simplified: '买', traditional: '買', pinyin: 'mǎi', meaning: 'buy' },
      { simplified: '贵', traditional: '貴', pinyin: 'guì', meaning: 'expensive' },
    ],
  },
  {
    id: 'che',
    traditional: '車',
    simplified: '车',
    name: 'Vehicle radical',
    tip: '车 restores to 車. Same shape family as many transport words.',
    examples: [
      { simplified: '车', traditional: '車', pinyin: 'chē', meaning: 'vehicle' },
    ],
  },
  {
    id: 'jin',
    traditional: '金',
    simplified: '钅',
    name: 'Metal radical',
    tip: 'Left-side 钅 is condensed 金. Traditional puts the fuller metal form back.',
    examples: [
      { simplified: '钱', traditional: '錢', pinyin: 'qián', meaning: 'money' },
      { simplified: '钟', traditional: '鐘', pinyin: 'zhōng', meaning: 'clock / hour' },
    ],
  },
  {
    id: 'shi',
    traditional: '食',
    simplified: '饣',
    name: 'Food radical',
    tip: '饣 on the left → 飠 / 食 family. Food and restaurant words use this.',
    examples: [
      { simplified: '饭', traditional: '飯', pinyin: 'fàn', meaning: 'meal / rice' },
      { simplified: '馆', traditional: '館', pinyin: 'guǎn', meaning: 'establishment' },
    ],
  },
  {
    id: 'ma',
    traditional: '馬',
    simplified: '马',
    name: 'Horse radical',
    tip: '马 → 馬. Particles and kinship words built on it follow the same swap.',
    examples: [
      { simplified: '吗', traditional: '嗎', pinyin: 'ma', meaning: 'question particle' },
      { simplified: '妈', traditional: '媽', pinyin: 'mā', meaning: 'mom' },
    ],
  },
  {
    id: 'chang',
    traditional: '長',
    simplified: '长',
    name: 'Long',
    tip: '长 expands to 長. Memorize this pair; it shows up early and often.',
    examples: [
      { simplified: '长', traditional: '長', pinyin: 'cháng / zhǎng', meaning: 'long / grow' },
    ],
  },
]
