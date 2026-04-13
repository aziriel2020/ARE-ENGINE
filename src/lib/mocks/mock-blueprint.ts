/**
 * Mock blueprint data for TEST_MODE and seed data.
 * 3 sample blueprints with realistic quality reports.
 */

import { LAWS, calcAggregateScore, scoreToGrade } from '@/lib/constants/laws';
import type { QualityReport, LawScore } from '@/lib/schemas/blueprint';

function buildMockReport(blueprintId: string, baseScore: number): QualityReport {
  const laws: LawScore[] = LAWS.map((law) => {
    const variance = ((law.id * 13) % 22) - 11;
    const score = Math.max(0, Math.min(100, baseScore + variance));
    return {
      lawId: law.id,
      lawName: law.name,
      score,
      passed: score >= 60,
      reasoning:
        score >= 60
          ? `Complies with ${law.name}. The text demonstrates clear alignment.`
          : `${law.name} needs revision. Specific section diverges from requirements.`,
      failedExcerpt: score < 60 ? '...problematic excerpt...' : undefined,
    };
  });

  const aggregateScore = calcAggregateScore(
    laws.map((l) => ({ lawId: l.lawId, score: l.score }))
  );

  return {
    blueprintId,
    aggregateScore,
    passedLaws: laws.filter((l) => l.passed).length,
    failedLaws: laws.filter((l) => !l.passed).length,
    grade: scoreToGrade(aggregateScore),
    laws,
    regenerationTargets: laws.filter((l) => !l.passed).map((l) => l.lawId),
  };
}

export interface MockBlueprint {
  id: string;
  title: string;
  userPrompt: string;
  content: string;
  productionNotes: string;
  sunoPrompt: string;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  totalCostUsd: number;
  qualityReport: QualityReport;
}

export const MOCK_BLUEPRINT_1: MockBlueprint = {
  id: 'bp_mock_001',
  title: 'Nuits Froides',
  userPrompt: 'Write a cold, defiant track about loyalty tested by success',
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
  sunoPrompt: `[rap français], [92 BPM], [F minor], [cold, defiant, introspective], [raw vocals], [dark piano, 808, hi-hat rolls], [modern trap], [verse] Téléphone éteint depuis trois jours [chorus] Nuits froides, mains vides`,
  modelUsed: 'gemini-2.5-pro-preview-05-06',
  inputTokens: 82_000,
  outputTokens: 2_800,
  cachedTokens: 80_000,
  totalCostUsd: 0.072,
  qualityReport: buildMockReport('bp_mock_001', 88),
};

export const MOCK_BLUEPRINT_2: MockBlueprint = {
  id: 'bp_mock_002',
  title: 'Le Prix du Silence',
  userPrompt: 'Introspective track about the cost of keeping secrets for people you love',
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
  sunoPrompt: `[rap français], [78 BPM], [D minor], [introspective, melancholic, confessional], [whispered vocals], [lo-fi piano, sparse drums, ambient], [lo-fi textured], [verse] J'ai gardé des choses [chorus] Le prix du silence`,
  modelUsed: 'gemini-2.5-pro-preview-05-06',
  inputTokens: 82_000,
  outputTokens: 2_600,
  cachedTokens: 80_000,
  totalCostUsd: 0.068,
  qualityReport: buildMockReport('bp_mock_002', 91),
};

export const MOCK_BLUEPRINT_3: MockBlueprint = {
  id: 'bp_mock_003',
  title: 'Bloc Code',
  userPrompt: 'Hard trap track about the street code — loyalty, silence, survival',
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
  sunoPrompt: `[rap français], [140 BPM], [G minor], [hard, cold, defiant], [clipped raw vocals], [UK drill, 808, orchestral stabs], [modern drill], [verse] Bloc code on parle pas [chorus] Bloc code on fold pas`,
  modelUsed: 'gemini-2.5-flash-preview-04-17',
  inputTokens: 12_000,
  outputTokens: 2_200,
  cachedTokens: 0,
  totalCostUsd: 0.009,
  qualityReport: buildMockReport('bp_mock_003', 74),
};

export const MOCK_BLUEPRINTS = [
  MOCK_BLUEPRINT_1,
  MOCK_BLUEPRINT_2,
  MOCK_BLUEPRINT_3,
];
