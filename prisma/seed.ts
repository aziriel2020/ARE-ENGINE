/**
 * Prisma seed script — populates the dev database with realistic test data.
 * Run via: npm run db:seed
 *
 * Creates:
 *   - 1 PRO user (JCAY)
 *   - 2 VocalDNA profiles (JCAY Main + Default)
 *   - 3 complete blueprints with quality reports
 *   - 1 UsageRecord for current month
 *   - 1 ApiKey
 *   - 3 AuditLog entries
 */

import { PrismaClient } from '@prisma/client';
import { createHash } from 'node:crypto';

const prisma = new PrismaClient();

// ── helpers ──────────────────────────────────────────────────────────────────

function getPeriod(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function hashKey(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

function buildQualityReport(
  blueprintId: string,
  baseScore: number,
): object {
  const LAW_NAMES: Record<number, string> = {
    1: 'Authenticity of Voice',
    2: 'Lexical Precision',
    3: 'Emotional Resonance',
    4: 'Rhythmic Consistency',
    5: 'Thematic Coherence',
    6: 'Structural Integrity',
    7: 'Cultural Authenticity',
    8: 'Sonic Alignment',
    9: 'Narrative Arc',
    10: 'Hook Memorability',
    11: 'DNA Fidelity',
    12: 'Vocabulary Tier Match',
    13: 'Slang Density',
    14: 'Metaphor Quality',
    15: 'Banned Word Compliance',
    16: 'Signature Expression Use',
    17: 'Language Mix Adherence',
    18: 'Emotional Intensity Range',
    19: 'Anger Expression Style',
    20: 'Joy Expression Style',
    21: 'Flow Pattern',
    22: 'Syllabic Density',
    23: 'Rhyme Scheme',
    24: 'Core Theme Presence',
    25: 'Symbol Recurrence',
    26: 'Avoided Topic Compliance',
    27: 'Influence Echoes',
    28: 'Anti-Influence Avoidance',
  };

  const laws = Array.from({ length: 28 }, (_, i) => {
    const lawId = i + 1;
    const variance = ((lawId * 13) % 22) - 11;
    const score = Math.max(0, Math.min(100, baseScore + variance));
    const passed = score >= 60;
    return {
      lawId,
      lawName: LAW_NAMES[lawId],
      score,
      passed,
      reasoning: passed
        ? `Complies with ${LAW_NAMES[lawId]}. Clear alignment with DNA profile.`
        : `${LAW_NAMES[lawId]} needs revision. Section diverges from requirements.`,
      ...(passed ? {} : { failedExcerpt: '...excerpt requiring revision...' }),
    };
  });

  const passedLaws = laws.filter((l) => l.passed).length;
  const failedLaws = 28 - passedLaws;

  // Weighted aggregate (laws 1-4 have weight 3, 5-10 weight 2, rest weight 1)
  const WEIGHTS: Record<number, number> = {
    1: 3, 2: 3, 3: 3, 4: 3,
    5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2,
  };
  let weightedSum = 0;
  let totalWeight = 0;
  for (const l of laws) {
    const w = WEIGHTS[l.lawId] ?? 1;
    weightedSum += l.score * w;
    totalWeight += w;
  }
  const aggregateScore = Math.round(weightedSum / totalWeight);

  const grade =
    aggregateScore >= 95 ? 'S' :
    aggregateScore >= 85 ? 'A' :
    aggregateScore >= 70 ? 'B' :
    aggregateScore >= 60 ? 'C' : 'F';

  return {
    blueprintId,
    aggregateScore,
    passedLaws,
    failedLaws,
    grade,
    laws,
    regenerationTargets: laws.filter((l) => !l.passed).map((l) => l.lawId),
  };
}

// ── seed data ─────────────────────────────────────────────────────────────────

const USER_ID = 'user_2abc123def456gh';
const NOW = new Date().toISOString();

const DNA_JCAY = {
  version: 1,
  createdAt: NOW,
  updatedAt: NOW,
  artistName: 'JCAY',
  lexical: {
    vocabularyTier: 'street',
    avgSentenceLength: 8,
    slangDensity: 0.45,
    metaphorFrequency: 'dense',
    bannedWords: ['amazing', 'beautiful', 'wonderful', 'incredible', 'journey', 'love story'],
    signatureExpressions: ["c'est la rue", 'on fold pas', 'les vrais savent'],
    languageMix: { fr: 0.75, en: 0.2, ar: 0.05 },
  },
  emotional: {
    primaryAxis: 'defiant',
    secondaryAxis: 'melancholic',
    intensityRange: [6, 9],
    vulnerabilityThreshold: 0.25,
    angerExpression: 'cold',
    joyExpression: 'dark-humor',
  },
  rhythmic: {
    defaultFlow: 'syncopated',
    bpm_range: [85, 115],
    syllableDensity: 'dense',
    pausePattern: 'dramatic-silence',
    rhymeScheme: 'internal-dominant',
    enjambment: true,
  },
  thematic: {
    coreThemes: ['loyalty', 'urban survival', 'betrayal', 'ambition', 'solitude'],
    recurringSymbols: ['the block', 'cold night', 'phone calls', 'cash', 'silence'],
    avoidedTopics: ['politics', 'religion', 'romantic love (direct)'],
    narrativeMode: 'first-person-confessional',
    temporalOrientation: 'present-tense',
  },
  sonic: {
    primaryGenres: ['rap français', 'trap'],
    subGenres: ['drill', 'afrotrap'],
    instrumentalAffinities: ['808 sub-bass', 'hi-hat rolls', 'dark piano', 'string hits'],
    productionEra: 'modern-clean',
    vocalTexture: 'raw-unprocessed',
  },
  structural: {
    preferredStructure: 'verse-chorus-verse',
    avgVerseLines: 16,
    chorusStyle: 'hook-driven',
    bridgeFrequency: 'sometimes',
    outroStyle: 'abrupt',
    songLengthPreference: 'standard-3min',
  },
  influences: {
    directInfluences: [
      { artist: 'SCH', dimension: 'lyrics', weight: 0.4 },
      { artist: 'Freeze Corleone', dimension: 'attitude', weight: 0.35 },
      { artist: 'Central Cee', dimension: 'flow', weight: 0.25 },
    ],
    antiInfluences: ['Gims', 'Jul'],
    culturalRoots: ['banlieue-parisienne', 'cité-ghetto', 'street-code'],
  },
};

const DNA_DEFAULT = {
  version: 1,
  createdAt: NOW,
  updatedAt: NOW,
  artistName: 'Default Artist',
  lexical: {
    vocabularyTier: 'mixed',
    avgSentenceLength: 10,
    slangDensity: 0.2,
    metaphorFrequency: 'moderate',
    bannedWords: ['amazing', 'literally', 'basically'],
    signatureExpressions: [],
    languageMix: { en: 1.0 },
  },
  emotional: {
    primaryAxis: 'introspective',
    intensityRange: [4, 7],
    vulnerabilityThreshold: 0.5,
    angerExpression: 'suppressed',
    joyExpression: 'restrained',
  },
  rhythmic: {
    defaultFlow: 'on-beat',
    bpm_range: [90, 130],
    syllableDensity: 'moderate',
    pausePattern: 'breath-natural',
    rhymeScheme: 'AABB',
    enjambment: false,
  },
  thematic: {
    coreThemes: ['self-discovery', 'relationships', 'growth'],
    recurringSymbols: ['light', 'time', 'distance'],
    avoidedTopics: [],
    narrativeMode: 'first-person-confessional',
    temporalOrientation: 'nostalgic',
  },
  sonic: {
    primaryGenres: ['pop', 'r&b'],
    subGenres: ['alternative'],
    instrumentalAffinities: ['acoustic guitar', 'piano', 'soft synths'],
    productionEra: 'modern-clean',
    vocalTexture: 'layered-harmonies',
  },
  structural: {
    preferredStructure: 'verse-chorus-verse',
    avgVerseLines: 8,
    chorusStyle: 'melodic',
    bridgeFrequency: 'sometimes',
    outroStyle: 'fade',
    songLengthPreference: 'standard-3min',
  },
  influences: {
    directInfluences: [
      { artist: 'Frank Ocean', dimension: 'lyrics', weight: 0.4 },
      { artist: 'Billie Eilish', dimension: 'attitude', weight: 0.3 },
    ],
    antiInfluences: [],
    culturalRoots: ['contemporary-western'],
  },
};

const BLUEPRINTS = [
  {
    id: 'bp_seed_001',
    title: 'Nuits Froides',
    userPrompt: 'Write a cold, defiant track about loyalty tested by success',
    intent: {
      genre: 'rap français',
      mood: ['cold', 'defiant', 'nostalgic'],
      theme: 'loyalty tested by success and distance',
      narrativeArc: 'first-person reflection on a friend who changed after making it',
      targetLength: 'standard-3min',
      specificConstraints: ['no romanticised emotions', 'street vocabulary', 'internal rhyme'],
    },
    content: `[VERSE 1]
Téléphone éteint depuis trois jours, personne a rappelé
T'as changé d'étage, t'as changé d'haleine, t'as oublié
Les soirs où on comptait les étoiles depuis le parking du bas
Maintenant t'as un chauffeur, une assistante — tu réponds pas

J'ai gardé tes affaires dans un carton sous le couloir
Tu récupères jamais — c'est moi ou c'est toi qui a tort?
Le bloc t'a vu grandir, le bloc t'a vu partir
On fold pas, même quand l'argent commence à sourire

[CHORUS]
Nuits froides, mains vides
Les vrais savent qui reste quand le bruit se vide
T'es devenu quelqu'un — félicitations
Moi j'suis resté moi — c'est ma seule ambition

[VERSE 2]
J'ai lu l'interview, t'as mentionné personne
C'est logique — ceux qui comptent, on les efface ou on les donne
À ceux qui peuvent te servir, te propulser, te vendre
Le reste c'est du passé — du poids qu'il faut suspendre

Mais le poids c'est moi, c'est les soirs de novembre
Où t'appelais à 3h, t'avais peur, tu trembles
Je répondais — maintenant la ligne est froide
On fold pas, mais toi t'as plié sans qu'on l'voide`,
    productionNotes: `Tempo: 92 BPM
Key: F minor
Production: Dark piano loop, 808 sub, hi-hat rolls
Vocal delivery: Controlled, cold — no emotion shows on the surface
Mix: Heavy low end, wide stereo on chorus hook`,
    sunoPrompt: `[rap français], [92 BPM], [F minor], [cold, defiant, introspective], [raw vocals], [dark piano, 808, hi-hat rolls], [modern trap]`,
    modelUsed: 'gemini-2.5-pro-preview-05-06',
    inputTokens: 82000,
    outputTokens: 2800,
    cachedTokens: 80000,
    totalCostUsd: 0.072,
    baseScore: 88,
    grade: 'A' as const,
    createdAt: new Date(Date.now() - 2 * 86400_000),
  },
  {
    id: 'bp_seed_002',
    title: 'Le Prix du Silence',
    userPrompt: 'Introspective track about the cost of keeping secrets for people you love',
    intent: {
      genre: 'rap français',
      mood: ['melancholic', 'introspective', 'intimate'],
      theme: 'protecting loved ones by staying silent about personal pain',
      narrativeArc: 'slow revelation of sacrifice — what was hidden and why',
      targetLength: 'standard-3min',
      specificConstraints: ['whispered delivery', 'lo-fi production', 'sparse imagery'],
    },
    content: `[VERSE 1]
J'ai gardé des choses que t'aurais pas aimé savoir
Des nuits où j'ai failli — mais j'ai tenu pour toi
T'as jamais demandé ce que mes silences cachaient
Parce que t'avais peur de la réponse — on s'est protégés

La vérité coûte plus cher que le mensonge doux
J'ai payé le prix — mes yeux creux, ma gorge flou
Tu m'as jamais vu pleurer — c'est voulu
Ce que tu vois c'est la surface — le reste c'est perdu

[CHORUS]
Le prix du silence c'est lourd à porter seul
Mais c'est plus léger que te voir derrière un voile de deuil
J'tai protégé de moi — c'est tout ce que j'pouvais
Te dire l'vrai m'aurait tout coûté

[VERSE 2]
Il y a des nuits où j'aurais tout balancé
Mais tu dormais et ta respiration m'a calmé
T'es la seule chose stable dans ce que j'traverse
Je vais pas contaminer ça — même si ça se reverse`,
    productionNotes: `Tempo: 78 BPM
Key: D minor
Production: Lo-fi piano, sparse percussion, ambient textures
Vocal delivery: Whispered in verses, slightly warmer on chorus
Mix: Intimate — mono-heavy, close-mic feel`,
    sunoPrompt: `[rap français], [78 BPM], [D minor], [introspective, melancholic, confessional], [whispered vocals], [lo-fi piano, sparse drums, ambient]`,
    modelUsed: 'gemini-2.5-pro-preview-05-06',
    inputTokens: 82000,
    outputTokens: 2600,
    cachedTokens: 80000,
    totalCostUsd: 0.068,
    baseScore: 91,
    grade: 'A' as const,
    createdAt: new Date(Date.now() - 5 * 86400_000),
  },
  {
    id: 'bp_seed_003',
    title: 'Bloc Code',
    userPrompt: 'Hard trap track about the street code — loyalty, silence, survival',
    intent: {
      genre: 'drill',
      mood: ['hard', 'cold', 'defiant'],
      theme: 'unwritten rules of street loyalty and survival code',
      narrativeArc: 'declarative — no arc, just affirmation of values',
      targetLength: 'standard-3min',
      specificConstraints: ['drill pattern', 'no sentimentality', 'block terminology'],
    },
    content: `[VERSE 1]
Bloc code: on parle pas, on regarde
On sait qui fait quoi — y'a pas de témoins, y'a que des gardes
La rue a ses règles, la rue a sa foi
T'es dedans ou dehors — il y a pas de entre-soi

J'ai grandi dans les couloirs où la lumière coupait à minuit
Où les seules conversations c'était les klakons dans la nuit
T'as pas vécu ça — alors juge pas ce que j'suis
J'suis le produit de ce que le système a détruit

[CHORUS]
Bloc code — on fold pas
Bloc code — on parle pas
Les vrais savent — les autres s'imaginent
On tient ou on tombe — c'est la discipline

[BRIDGE]
Ceux qui nous regardent de loin voient des numéros
Ceux qui sont là-dedans voient des frères, des mots
Que personne comprend sauf ceux qui vivent sous le même toit
Le bloc code c'est notre langue — notre loi`,
    productionNotes: `Tempo: 140 BPM (drill pattern)
Key: G minor
Production: UK drill hi-hats, sliding 808, dark orchestral stabs
Vocal delivery: Hard, clipped — no vibrato, no warmth
Mix: Punchy low-mid, aggressive transients`,
    sunoPrompt: `[rap français], [140 BPM], [G minor], [hard, cold, defiant], [clipped raw vocals], [UK drill, 808, orchestral stabs]`,
    modelUsed: 'gemini-2.5-flash-preview-04-17',
    inputTokens: 12000,
    outputTokens: 2200,
    cachedTokens: 0,
    totalCostUsd: 0.009,
    baseScore: 74,
    grade: 'B' as const,
    createdAt: new Date(Date.now() - 8 * 86400_000),
  },
];

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding ARE-E database...\n');

  // ── 1. User ──
  const user = await prisma.user.upsert({
    where: { id: USER_ID },
    update: {},
    create: {
      id: USER_ID,
      email: 'jcay@are-engine.dev',
      plan: 'PRO',
    },
  });
  console.log(`✓ User: ${user.email} (${user.plan})`);

  // ── 2. Vocal DNA Profiles ──
  const dnaJcay = await prisma.vocalDNAProfile.upsert({
    where: { userId_name_version: { userId: USER_ID, name: 'JCAY Main', version: 1 } },
    update: {},
    create: {
      userId: USER_ID,
      name: 'JCAY Main',
      version: 1,
      isDefault: true,
      dna: DNA_JCAY,
    },
  });
  console.log(`✓ VocalDNA: ${dnaJcay.name} (id: ${dnaJcay.id})`);

  const dnaDefault = await prisma.vocalDNAProfile.upsert({
    where: { userId_name_version: { userId: USER_ID, name: 'Default Artist', version: 1 } },
    update: {},
    create: {
      userId: USER_ID,
      name: 'Default Artist',
      version: 1,
      isDefault: false,
      dna: DNA_DEFAULT,
    },
  });
  console.log(`✓ VocalDNA: ${dnaDefault.name} (id: ${dnaDefault.id})`);

  // ── 3. Blueprints ──
  for (const bp of BLUEPRINTS) {
    const qualityReport = buildQualityReport(bp.id, bp.baseScore);

    await prisma.blueprint.upsert({
      where: { id: bp.id },
      update: {},
      create: {
        id: bp.id,
        userId: USER_ID,
        dnaProfileId: dnaJcay.id,
        title: bp.title,
        userPrompt: bp.userPrompt,
        intent: bp.intent,
        content: bp.content,
        productionNotes: bp.productionNotes,
        sunoPrompt: bp.sunoPrompt,
        status: 'COMPLETE',
        grade: bp.grade,
        qualityReport,
        modelUsed: bp.modelUsed,
        inputTokens: bp.inputTokens,
        outputTokens: bp.outputTokens,
        cachedTokens: bp.cachedTokens,
        totalCostUsd: bp.totalCostUsd,
        createdAt: bp.createdAt,
      },
    });
    console.log(`✓ Blueprint: "${bp.title}" (grade: ${bp.grade})`);
  }

  // ── 4. Usage Record (current month) ──
  const period = getPeriod();
  const usage = await prisma.usageRecord.upsert({
    where: { userId_period: { userId: USER_ID, period } },
    update: {},
    create: {
      userId: USER_ID,
      period,
      generationsUsed: 3,
      generationsLimit: 200,
      tokensConsumed: 176000,
      costUsd: 0.149,
    },
  });
  console.log(`✓ UsageRecord: ${usage.period} (${usage.generationsUsed}/${usage.generationsLimit} gens)`);

  // ── 5. API Key ──
  const RAW_KEY = 'are_k_seed_devkey_do_not_use_in_prod';
  const keyHash = hashKey(RAW_KEY);
  const keyPrefix = 'are_k_se';

  await prisma.apiKey.upsert({
    where: { keyHash },
    update: {},
    create: {
      userId: USER_ID,
      name: 'Dev Seed Key',
      keyHash,
      keyPrefix,
      permissions: JSON.stringify(['generate', 'blueprints:read', 'dna:read']),
    },
  });
  console.log(`✓ ApiKey: "${keyPrefix}..." (Dev Seed Key)`);

  // ── 6. Audit Logs ──
  const auditEntries = [
    { action: 'blueprint.created', metadata: { blueprintId: 'bp_seed_001', title: 'Nuits Froides' } },
    { action: 'blueprint.created', metadata: { blueprintId: 'bp_seed_002', title: 'Le Prix du Silence' } },
    { action: 'dna.created', metadata: { profileId: dnaJcay.id, name: 'JCAY Main' } },
  ];

  for (const entry of auditEntries) {
    await prisma.auditLog.create({
      data: { userId: USER_ID, action: entry.action, metadata: entry.metadata },
    });
  }
  console.log(`✓ AuditLogs: ${auditEntries.length} entries`);

  console.log('\n✅ Seed complete.\n');
  console.log('  User ID :', USER_ID);
  console.log('  Email   :', 'jcay@are-engine.dev');
  console.log('  Plan    :', 'PRO');
  console.log('  DNA     :', `${dnaJcay.id} (JCAY Main)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
