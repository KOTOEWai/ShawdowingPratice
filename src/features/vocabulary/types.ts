export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  synonyms?: string[];
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
    }[];
  }[];
}

export interface SavedWord {
  word: string;
  definition: string;
  phonetic: string;
  addedAt: string;
  // Context sentence from video
  contextSentence?: string;
  lessonId?: string;
  // Spaced Repetition System (SRS)
  intervalDays?: number;
  nextReviewDate?: string;
  reviewCount?: number;
  easeFactor?: number;
  lastReviewedAt?: string;
}

export type PopOverProps = {
  data: DictionaryEntry | null;
  loading: boolean;
  coords: { top: number; left: number };
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  cleanWord: string;
  contextSentence?: string;
};

export type ExternalLinkProps = {
  href: string;
  label?: string;
  color: string;
  children?: React.ReactNode;
};

export type Colors = {
  [key: string]: string;
};
