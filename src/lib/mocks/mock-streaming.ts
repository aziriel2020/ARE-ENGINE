/**
 * Mock SSE streaming data for TEST_MODE.
 * Simulates realistic streaming delays and section-by-section output.
 */

import type { DecomposedIntent } from '@/lib/schemas/blueprint';

export interface MockStreamChunk {
  section: string;
  content: string;
  delayMs: number;
}

export const MOCK_INTENT: DecomposedIntent = {
  genre: 'rap français',
  mood: ['defiant', 'melancholic'],
  theme: 'Loyalty fractures under the weight of success and distance',
  narrativeArc:
    'Opens with a cold observation → builds into confrontation → resolves in quiet resignation',
  targetLength: 'standard-3min',
  specificConstraints: [],
  dnaOverrides: {},
};

export const MOCK_FULL_BLUEPRINT = `[VERSE 1]
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
On fold pas, mais toi t'as plié sans qu'on l'voide

[CHORUS]
Nuits froides, mains vides
Les vrais savent qui reste quand le bruit se vide
T'es devenu quelqu'un — félicitations
Moi j'suis resté moi — c'est ma seule ambition

[OUTRO]
Le carton est toujours là
Je l'déplace pas — j'sais pas pourquoi
Peut-être que j'attends encore
Ou peut-être que c'est juste comme ça

[PRODUCTION NOTES]
Tempo: 92 BPM
Key: F minor
Production: Dark piano loop, 808 sub-bass, syncopated hi-hat rolls
Vocal delivery: Controlled, cold — emotion stays below the surface
Mix: Heavy low end, slight reverb on chorus hook only

[SUNO PROMPT]
[rap français], [92 BPM], [F minor], [cold, defiant, introspective, late night], [raw unprocessed vocals, close-mic], [dark piano loop, 808 sub, hi-hat rolls, sparse percussion], [modern trap, clean production], [verse] Téléphone éteint depuis trois jours [chorus] Nuits froides mains vides [verse] J'ai lu l'interview [chorus] Nuits froides mains vides [outro] Le carton est toujours là`;

// Build the stream chunks with realistic delays
// Each chunk simulates ~20-50 chars being streamed at a time
function buildStreamChunks(): MockStreamChunk[] {
  const chunks: MockStreamChunk[] = [];

  const sections: Array<{ section: string; lines: string[] }> = [
    {
      section: 'verse_1',
      lines: [
        '[VERSE 1]\n',
        "Téléphone éteint depuis trois jours, personne a rappelé\n",
        "T'as changé d'étage, t'as changé d'haleine, t'as oublié\n",
        'Les soirs où on comptait les étoiles depuis le parking du bas\n',
        "Maintenant t'as un chauffeur, une assistante — tu réponds pas\n\n",
        "J'ai gardé tes affaires dans un carton sous le couloir\n",
        "Tu récupères jamais — c'est moi ou c'est toi qui a tort?\n",
        "Le bloc t'a vu grandir, le bloc t'a vu partir\n",
        "On fold pas, même quand l'argent commence à sourire\n\n",
      ],
    },
    {
      section: 'chorus',
      lines: [
        '[CHORUS]\n',
        'Nuits froides, mains vides\n',
        'Les vrais savent qui reste quand le bruit se vide\n',
        "T'es devenu quelqu'un — félicitations\n",
        "Moi j'suis resté moi — c'est ma seule ambition\n\n",
      ],
    },
    {
      section: 'verse_2',
      lines: [
        '[VERSE 2]\n',
        "J'ai lu l'interview, t'as mentionné personne\n",
        "C'est logique — ceux qui comptent, on les efface ou on les donne\n",
        'À ceux qui peuvent te servir, te propulser, te vendre\n',
        "Le reste c'est du passé — du poids qu'il faut suspendre\n\n",
      ],
    },
    {
      section: 'outro',
      lines: [
        '[OUTRO]\n',
        'Le carton est toujours là\n',
        "Je l'déplace pas — j'sais pas pourquoi\n",
        "Peut-être que j'attends encore\n",
        "Ou peut-être que c'est juste comme ça\n\n",
      ],
    },
    {
      section: 'production_notes',
      lines: [
        '[PRODUCTION NOTES]\n',
        'Tempo: 92 BPM\n',
        'Key: F minor\n',
        'Production: Dark piano loop, 808 sub-bass, syncopated hi-hat rolls\n\n',
      ],
    },
    {
      section: 'suno_prompt',
      lines: [
        '[SUNO PROMPT]\n',
        '[rap français], [92 BPM], [F minor], [cold, defiant, introspective]\n',
      ],
    },
  ];

  for (const { section, lines } of sections) {
    for (const line of lines) {
      chunks.push({
        section,
        content: line,
        delayMs: 60 + Math.floor(Math.random() * 80),
      });
    }
  }

  return chunks;
}

export const MOCK_BLUEPRINT_STREAM = buildStreamChunks();
