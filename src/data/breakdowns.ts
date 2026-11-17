export type PartRole = 'meaning' | 'sound' | 'both' | 'picture' | 'mark'

export type CharPart = {
  /** Traditional (or shared) glyph for this piece */
  glyph: string
  /** Simplified form when it differs */
  simplified?: string
  role: PartRole
  /** Short gloss, e.g. "speech" */
  gloss: string
}

export type Breakdown = {
  traditional: string
  parts: CharPart[]
  /** One-line mnemonic for how the pieces work together */
  story: string
}

const roleLabel: Record<PartRole, string> = {
  meaning: 'meaning',
  sound: 'sound',
  both: 'meaning + sound',
  picture: 'picture',
  mark: 'mark',
}

export function roleText(role: PartRole) {
  return roleLabel[role]
}

/**
 * Component breakdowns keyed by traditional character.
 * Learner-facing notes (practical mnemonics), not full paleography.
 */
export const breakdowns: Record<string, Breakdown> = {
  // —— identical compounds worth unpacking ——
  好: {
    traditional: '好',
    parts: [
      { glyph: '女', role: 'meaning', gloss: 'woman' },
      { glyph: '子', role: 'meaning', gloss: 'child' },
    ],
    story: 'Woman + child — a classic picture of “good.”',
  },
  你: {
    traditional: '你',
    parts: [
      { glyph: '亻', role: 'meaning', gloss: 'person' },
      { glyph: '尔', simplified: '尔', role: 'sound', gloss: 'you (old)' },
    ],
    story: 'Person radical + sound cue — the “you” person.',
  },
  他: {
    traditional: '他',
    parts: [
      { glyph: '亻', role: 'meaning', gloss: 'person' },
      { glyph: '也', role: 'sound', gloss: 'also' },
    ],
    story: 'Person + 也 sound — “he.”',
  },
  她: {
    traditional: '她',
    parts: [
      { glyph: '女', role: 'meaning', gloss: 'woman' },
      { glyph: '也', role: 'sound', gloss: 'also' },
    ],
    story: 'Woman + 也 sound — “she.”',
  },
  看: {
    traditional: '看',
    parts: [
      { glyph: '手', role: 'picture', gloss: 'hand' },
      { glyph: '目', role: 'meaning', gloss: 'eye' },
    ],
    story: 'Hand shading the eye — to look.',
  },
  吃: {
    traditional: '吃',
    parts: [
      { glyph: '口', role: 'meaning', gloss: 'mouth' },
      { glyph: '乞', role: 'sound', gloss: 'beg' },
    ],
    story: 'Mouth + sound — eat.',
  },
  喝: {
    traditional: '喝',
    parts: [
      { glyph: '口', role: 'meaning', gloss: 'mouth' },
      { glyph: '曷', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Mouth + sound — drink.',
  },
  茶: {
    traditional: '茶',
    parts: [
      { glyph: '艹', role: 'meaning', gloss: 'plant' },
      { glyph: '人', role: 'picture', gloss: 'person' },
      { glyph: '木', role: 'meaning', gloss: 'tree' },
    ],
    story: 'Plant over a person by a tree — tea.',
  },
  明: {
    traditional: '明',
    parts: [
      { glyph: '日', role: 'meaning', gloss: 'sun' },
      { glyph: '月', role: 'meaning', gloss: 'moon' },
    ],
    story: 'Sun + moon — bright / next day (明天).',
  },

  // —— divergent HSK 1 set ——
  們: {
    traditional: '們',
    parts: [
      { glyph: '亻', role: 'meaning', gloss: 'person' },
      { glyph: '門', simplified: '门', role: 'sound', gloss: 'gate' },
    ],
    story: 'Person + gate sound — marks plural (我們, 你們).',
  },
  嗎: {
    traditional: '嗎',
    parts: [
      { glyph: '口', role: 'meaning', gloss: 'mouth' },
      { glyph: '馬', simplified: '马', role: 'sound', gloss: 'horse' },
    ],
    story: 'Mouth + horse sound — yes/no question particle.',
  },
  媽: {
    traditional: '媽',
    parts: [
      { glyph: '女', role: 'meaning', gloss: 'woman' },
      { glyph: '馬', simplified: '马', role: 'sound', gloss: 'horse' },
    ],
    story: 'Woman + horse sound — mom.',
  },
  問: {
    traditional: '問',
    parts: [
      { glyph: '門', simplified: '门', role: 'sound', gloss: 'gate' },
      { glyph: '口', role: 'meaning', gloss: 'mouth' },
    ],
    story: 'Mouth at the gate — to ask.',
  },
  間: {
    traditional: '間',
    parts: [
      { glyph: '門', simplified: '门', role: 'meaning', gloss: 'gate' },
      { glyph: '日', role: 'meaning', gloss: 'sun' },
    ],
    story: 'Sun through a gate — space between / a room.',
  },
  門: {
    traditional: '門',
    parts: [{ glyph: '門', simplified: '门', role: 'picture', gloss: 'two door leaves' }],
    story: 'A picture of swinging doors — gate / door.',
  },
  說: {
    traditional: '說',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '兌', role: 'sound', gloss: 'exchange' },
    ],
    story: 'Speech radical + sound — to speak.',
  },
  話: {
    traditional: '話',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '舌', role: 'both', gloss: 'tongue' },
    ],
    story: 'Speech + tongue — words / speech.',
  },
  語: {
    traditional: '語',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '吾', role: 'sound', gloss: 'I (old)' },
    ],
    story: 'Speech + 吾 sound — language.',
  },
  請: {
    traditional: '請',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '青', role: 'sound', gloss: 'green / blue' },
    ],
    story: 'Speech + 青 sound — please / invite.',
  },
  謝: {
    traditional: '謝',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '射', role: 'sound', gloss: 'shoot' },
    ],
    story: 'Speech + 射 sound — thank.',
  },
  認: {
    traditional: '認',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '忍', role: 'sound', gloss: 'endure' },
    ],
    story: 'Speech + 忍 sound — recognize.',
  },
  識: {
    traditional: '識',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '戠', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Speech + sound — know / knowledge (認識).',
  },
  讀: {
    traditional: '讀',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '賣', simplified: '卖', role: 'sound', gloss: 'sell' },
    ],
    story: 'Speech + 賣 sound — read.',
  },
  寫: {
    traditional: '寫',
    parts: [
      { glyph: '宀', role: 'meaning', gloss: 'roof' },
      { glyph: '舄', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Under a roof + sound — write (寫字).',
  },
  聽: {
    traditional: '聽',
    parts: [
      { glyph: '耳', role: 'meaning', gloss: 'ear' },
      { glyph: '王', role: 'sound', gloss: 'sound cue (phonetic)' },
      { glyph: '⺩', role: 'mark', gloss: 'inner lattice' },
    ],
    story: 'Ear is the meaning core — listen / hear. Simplified 听 is 口 + 斤.',
  },
  見: {
    traditional: '見',
    parts: [
      { glyph: '目', role: 'meaning', gloss: 'eye' },
      { glyph: '儿', role: 'picture', gloss: 'legs' },
    ],
    story: 'Eye on legs — to see.',
  },
  現: {
    traditional: '現',
    parts: [
      { glyph: '王', role: 'meaning', gloss: 'jade / king' },
      { glyph: '見', simplified: '见', role: 'sound', gloss: 'see' },
    ],
    story: 'Jade + see sound — appear / now (現在).',
  },
  覺: {
    traditional: '覺',
    parts: [
      { glyph: '𦥯', role: 'sound', gloss: 'sound cue' },
      { glyph: '見', simplified: '见', role: 'meaning', gloss: 'see' },
    ],
    story: 'See at the bottom — feel / sleep (睡覺).',
  },
  學: {
    traditional: '學',
    parts: [
      { glyph: '𦥯', role: 'picture', gloss: 'hands & rods' },
      { glyph: '冖', role: 'picture', gloss: 'cover' },
      { glyph: '子', role: 'meaning', gloss: 'child' },
    ],
    story: 'Child under a teaching cover — study / learn.',
  },
  習: {
    traditional: '習',
    parts: [
      { glyph: '羽', role: 'meaning', gloss: 'feathers' },
      { glyph: '白', role: 'sound', gloss: 'white' },
    ],
    story: 'Wings practicing — practice / review (學習).',
  },
  國: {
    traditional: '國',
    parts: [
      { glyph: '囗', role: 'meaning', gloss: 'enclosure' },
      { glyph: '或', role: 'sound', gloss: 'or / territory' },
    ],
    story: 'Boundary around a territory mark — country.',
  },
  這: {
    traditional: '這',
    parts: [
      { glyph: '辶', role: 'meaning', gloss: 'walk' },
      { glyph: '言', role: 'sound', gloss: 'speech' },
    ],
    story: 'Walk + speech sound — this (pointing nearby).',
  },
  來: {
    traditional: '來',
    parts: [{ glyph: '來', simplified: '来', role: 'picture', gloss: 'wheat stalks' }],
    story: 'Old picture of grain, borrowed for “come.”',
  },
  還: {
    traditional: '還',
    parts: [
      { glyph: '辶', role: 'meaning', gloss: 'walk' },
      { glyph: '睘', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Walk radical + sound — still / return.',
  },
  過: {
    traditional: '過',
    parts: [
      { glyph: '辶', role: 'meaning', gloss: 'walk' },
      { glyph: '咼', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Walk + sound — pass / experience (aspect 過).',
  },
  沒: {
    traditional: '沒',
    parts: [
      { glyph: '氵', role: 'meaning', gloss: 'water' },
      { glyph: '殳', role: 'sound', gloss: 'weapon / sound' },
    ],
    story: 'Water + sound — sink → “not have” (沒有).',
  },
  會: {
    traditional: '會',
    parts: [
      { glyph: '亼', role: 'picture', gloss: 'gather' },
      { glyph: '曰', role: 'meaning', gloss: 'say' },
    ],
    story: 'People gathering to speak — can / meeting.',
  },
  開: {
    traditional: '開',
    parts: [
      { glyph: '門', simplified: '门', role: 'meaning', gloss: 'gate' },
      { glyph: '开', role: 'picture', gloss: 'two hands / bar' },
    ],
    story: 'Hands lifting the door bar — open.',
  },
  關: {
    traditional: '關',
    parts: [
      { glyph: '門', simplified: '门', role: 'meaning', gloss: 'gate' },
      { glyph: '𢇇', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Gate + sound — close / relate (關係).',
  },
  對: {
    traditional: '對',
    parts: [
      { glyph: '丵', role: 'picture', gloss: 'cluster' },
      { glyph: '寸', role: 'mark', gloss: 'measure / hand' },
    ],
    story: 'Facing pair with a hand mark — correct / toward.',
  },
  個: {
    traditional: '個',
    parts: [
      { glyph: '亻', role: 'meaning', gloss: 'person' },
      { glyph: '固', role: 'sound', gloss: 'solid' },
    ],
    story: 'Person + 固 sound — general measure word.',
  },
  點: {
    traditional: '點',
    parts: [
      { glyph: '黑', role: 'meaning', gloss: 'black' },
      { glyph: '占', role: 'sound', gloss: 'occupy' },
    ],
    story: 'Black mark + sound — a dot / o’clock.',
  },
  鐘: {
    traditional: '鐘',
    parts: [
      { glyph: '金', simplified: '钅', role: 'meaning', gloss: 'metal' },
      { glyph: '童', role: 'sound', gloss: 'child' },
    ],
    story: 'Metal + 童 sound — clock / hour.',
  },
  錢: {
    traditional: '錢',
    parts: [
      { glyph: '金', simplified: '钅', role: 'meaning', gloss: 'metal' },
      { glyph: '戔', role: 'sound', gloss: 'small / sound' },
    ],
    story: 'Metal + sound — money.',
  },
  買: {
    traditional: '買',
    parts: [
      { glyph: '罒', role: 'picture', gloss: 'net' },
      { glyph: '貝', simplified: '贝', role: 'meaning', gloss: 'shell / money' },
    ],
    story: 'Net over cowrie shells — buy.',
  },
  賣: {
    traditional: '賣',
    parts: [
      { glyph: '士', role: 'mark', gloss: 'top mark' },
      { glyph: '買', simplified: '买', role: 'both', gloss: 'buy' },
    ],
    story: 'Built on 買 — sell (the other side of trade).',
  },
  塊: {
    traditional: '塊',
    parts: [
      { glyph: '土', role: 'meaning', gloss: 'earth' },
      { glyph: '鬼', role: 'sound', gloss: 'ghost' },
    ],
    story: 'Earth + sound — lump / yuan measure.',
  },
  飯: {
    traditional: '飯',
    parts: [
      { glyph: '飠', simplified: '饣', role: 'meaning', gloss: 'food' },
      { glyph: '反', role: 'sound', gloss: 'turn' },
    ],
    story: 'Food + 反 sound — meal / rice.',
  },
  館: {
    traditional: '館',
    parts: [
      { glyph: '飠', simplified: '饣', role: 'meaning', gloss: 'food' },
      { glyph: '官', role: 'sound', gloss: 'official' },
    ],
    story: 'Food + 官 sound — hall / restaurant (飯館).',
  },
  車: {
    traditional: '車',
    parts: [{ glyph: '車', simplified: '车', role: 'picture', gloss: 'axle & wheels' }],
    story: 'Top-down cart with axle — vehicle.',
  },
  飛: {
    traditional: '飛',
    parts: [{ glyph: '飛', simplified: '飞', role: 'picture', gloss: 'wings rising' }],
    story: 'Wings lifting up — fly.',
  },
  機: {
    traditional: '機',
    parts: [
      { glyph: '木', role: 'meaning', gloss: 'wood' },
      { glyph: '幾', simplified: '几', role: 'sound', gloss: 'how many' },
    ],
    story: 'Wood + 幾 sound — machine (飛機).',
  },
  電: {
    traditional: '電',
    parts: [
      { glyph: '雨', role: 'meaning', gloss: 'rain' },
      { glyph: '申', role: 'sound', gloss: 'extend' },
    ],
    story: 'Rain + flash — lightning → electricity.',
  },
  腦: {
    traditional: '腦',
    parts: [
      { glyph: '月', role: 'meaning', gloss: 'flesh (meat radical)' },
      { glyph: '囟', role: 'both', gloss: 'fontanel / head' },
    ],
    story: 'Flesh + head mark — brain (電腦).',
  },
  視: {
    traditional: '視',
    parts: [
      { glyph: '示', role: 'meaning', gloss: 'show / altar' },
      { glyph: '見', simplified: '见', role: 'both', gloss: 'see' },
    ],
    story: 'Show + see — vision (電視).',
  },
  歡: {
    traditional: '歡',
    parts: [
      { glyph: '雚', role: 'sound', gloss: 'heron / sound' },
      { glyph: '欠', role: 'meaning', gloss: 'yawn / breath' },
    ],
    story: 'Breath/emotion + sound — joy (喜歡).',
  },
  愛: {
    traditional: '愛',
    parts: [
      { glyph: '爫', role: 'picture', gloss: 'hand from above' },
      { glyph: '冖', role: 'picture', gloss: 'cover' },
      { glyph: '心', role: 'meaning', gloss: 'heart' },
      { glyph: '夂', role: 'mark', gloss: 'walk slowly' },
    ],
    story: 'Heart in the middle — love. Simplified 爱 hides the 心.',
  },
  熱: {
    traditional: '熱',
    parts: [
      { glyph: '埶', role: 'sound', gloss: 'art / sound' },
      { glyph: '灬', role: 'meaning', gloss: 'fire' },
    ],
    story: 'Fire at the bottom — hot.',
  },
  氣: {
    traditional: '氣',
    parts: [
      { glyph: '气', role: 'meaning', gloss: 'vapor' },
      { glyph: '米', role: 'meaning', gloss: 'rice' },
    ],
    story: 'Steam rising from rice — air / energy (天氣).',
  },
  東: {
    traditional: '東',
    parts: [
      { glyph: '木', role: 'picture', gloss: 'tree' },
      { glyph: '日', role: 'picture', gloss: 'sun' },
    ],
    story: 'Sun in the trees — east (sunrise side).',
  },
  裡: {
    traditional: '裡',
    parts: [
      { glyph: '衤', role: 'meaning', gloss: 'clothing' },
      { glyph: '里', role: 'both', gloss: 'village / inside' },
    ],
    story: 'Clothing + 里 — lining → inside.',
  },
  後: {
    traditional: '後',
    parts: [
      { glyph: '彳', role: 'meaning', gloss: 'step' },
      { glyph: '幺', role: 'picture', gloss: 'small thread' },
      { glyph: '夂', role: 'mark', gloss: 'follow' },
    ],
    story: 'Steps following behind — after / behind.',
  },
  為: {
    traditional: '為',
    parts: [{ glyph: '為', simplified: '为', role: 'picture', gloss: 'hand leading elephant (old)' }],
    story: 'Old “do / act” graph — for / as / to be.',
  },
  麼: {
    traditional: '麼',
    parts: [
      { glyph: '麻', role: 'sound', gloss: 'hemp' },
      { glyph: '幺', role: 'meaning', gloss: 'tiny' },
    ],
    story: 'Tiny mark + sound — suffix in 什麼 / 怎麼.',
  },
  幾: {
    traditional: '幾',
    parts: [
      { glyph: '𢆶', role: 'picture', gloss: 'small threads' },
      { glyph: '戍', role: 'mark', gloss: 'guard mark' },
    ],
    story: 'Small bits — how many / a few.',
  },
  誰: {
    traditional: '誰',
    parts: [
      { glyph: '言', simplified: '讠', role: 'meaning', gloss: 'speech' },
      { glyph: '隹', role: 'sound', gloss: 'short-tailed bird' },
    ],
    story: 'Speech + bird sound — who.',
  },
  號: {
    traditional: '號',
    parts: [
      { glyph: '号', role: 'sound', gloss: 'cry out' },
      { glyph: '虎', role: 'meaning', gloss: 'tiger' },
    ],
    story: 'Tiger + cry — number / call sign.',
  },
  歲: {
    traditional: '歲',
    parts: [
      { glyph: '止', role: 'picture', gloss: 'foot' },
      { glyph: '戌', role: 'sound', gloss: 'earthly branch' },
    ],
    story: 'Years marching on — years of age.',
  },
  從: {
    traditional: '從',
    parts: [
      { glyph: '彳', role: 'meaning', gloss: 'step' },
      { glyph: '从', role: 'both', gloss: 'two people' },
    ],
    story: 'People walking together — from / follow.',
  },
  給: {
    traditional: '給',
    parts: [
      { glyph: '糹', simplified: '纟', role: 'meaning', gloss: 'silk / thread' },
      { glyph: '合', role: 'sound', gloss: 'join' },
    ],
    story: 'Thread + 合 sound — give / for.',
  },
  醫: {
    traditional: '醫',
    parts: [
      { glyph: '殹', role: 'sound', gloss: 'sound cue' },
      { glyph: '酉', role: 'meaning', gloss: 'wine jar' },
    ],
    story: 'Medicine jar at the bottom — medicine / doctor.',
  },
  漢: {
    traditional: '漢',
    parts: [
      { glyph: '氵', role: 'meaning', gloss: 'water' },
      { glyph: '𦰩', role: 'sound', gloss: 'sound cue' },
    ],
    story: 'Water + sound — Han river → Chinese (漢語).',
  },
  貓: {
    traditional: '貓',
    parts: [
      { glyph: '豸', role: 'meaning', gloss: 'beast' },
      { glyph: '苗', role: 'sound', gloss: 'sprout' },
    ],
    story: 'Beast + 苗 sound — cat.',
  },
  長: {
    traditional: '長',
    parts: [{ glyph: '長', simplified: '长', role: 'picture', gloss: 'long hair / elder' }],
    story: 'Person with long hair — long / grow / elder.',
  },
  時: {
    traditional: '時',
    parts: [
      { glyph: '日', role: 'meaning', gloss: 'sun' },
      { glyph: '寺', role: 'sound', gloss: 'temple' },
    ],
    story: 'Sun + 寺 sound — time.',
  },
  我: {
    traditional: '我',
    parts: [
      { glyph: '手', role: 'picture', gloss: 'hand' },
      { glyph: '戈', role: 'picture', gloss: 'dagger-axe' },
    ],
    story: 'Hand + weapon — old “I” (holding arms).',
  },
  是: {
    traditional: '是',
    parts: [
      { glyph: '日', role: 'meaning', gloss: 'sun' },
      { glyph: '正', role: 'both', gloss: 'straight / correct' },
    ],
    story: 'Sun over straight — to be / yes.',
  },
  有: {
    traditional: '有',
    parts: [
      { glyph: '𠂇', role: 'picture', gloss: 'hand' },
      { glyph: '月', role: 'meaning', gloss: 'meat / moon' },
    ],
    story: 'Hand holding meat — to have.',
  },
}

export function getBreakdown(traditional: string): Breakdown | undefined {
  return breakdowns[traditional]
}
