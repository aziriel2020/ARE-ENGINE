/**
 * Mock Vocal DNA profiles for TEST_MODE and seed data.
 */

import type { VocalDNA } from '@/lib/schemas/vocal-dna';

const NOW = new Date().toISOString();

export const MOCK_DNA_JCAY: VocalDNA = {
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

export const MOCK_DNA_DEFAULT: VocalDNA = {
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

export const MOCK_DNA_PROFILES = [MOCK_DNA_JCAY, MOCK_DNA_DEFAULT];
