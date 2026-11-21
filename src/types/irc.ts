export type GradeId = '1' | '2' | '3';

export type ResourceType = 'document' | 'activity' | 'image' | 'video' | 'link';

export type PublishStatus = 'published' | 'draft';

export interface ThematicUnit {
  id: string;
  gradeId: GradeId;
  title: string;
  description: string;
  order: number;
  status: PublishStatus;
}

export interface ResourceItem {
  id: string;
  gradeId: GradeId;
  unitId: string;
  type: ResourceType;
  title: string;
  description: string;
  content: string;
  url?: string;
  imageUrl?: string;
  caption?: string;
  durationOrMeta?: string;
  status: PublishStatus;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  gradeId: GradeId;
  era: string;
  yearLabel: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: PublishStatus;
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UnitQuiz {
  id: string;
  gradeId: GradeId;
  unitId: string;
  title: string;
  questions: QuizQuestion[];
  status: PublishStatus;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  category: string;
  definition: string;
  exampleOrOrigin?: string;
}

export interface PortalData {
  units: ThematicUnit[];
  resources: ResourceItem[];
  timelineEvents: TimelineEvent[];
  quizzes: UnitQuiz[];
  glossary: GlossaryEntry[];
}

export interface FavoritesState {
  unitIds: string[];
  resourceIds: string[];
}

export type LimContent =
  | { kind: 'resource'; resource: ResourceItem; unitTitle: string; gradeLabel: string }
  | { kind: 'timeline'; event: TimelineEvent; gradeLabel: string };
