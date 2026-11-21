import { FavoritesState, PortalData } from '../types/irc';
import { INITIAL_PORTAL_DATA } from '../data/initialData';

const STORAGE_KEY = 'portale_irc_data_v1';
const TEACHER_MODE_KEY = 'portale_irc_teacher_mode_v1';
const FAVORITES_KEY = 'portale_irc_favorites_v1';

export function loadFavorites(): FavoritesState {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return { unitIds: [], resourceIds: [] };
    const parsed = JSON.parse(raw) as Partial<FavoritesState>;
    return {
      unitIds: Array.isArray(parsed.unitIds) ? parsed.unitIds.filter((id) => typeof id === 'string') : [],
      resourceIds: Array.isArray(parsed.resourceIds) ? parsed.resourceIds.filter((id) => typeof id === 'string') : [],
    };
  } catch {
    return { unitIds: [], resourceIds: [] };
  }
}

export function saveFavorites(favorites: FavoritesState): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore storage errors
  }
}

export function loadPortalData(): PortalData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PORTAL_DATA;
    const parsed = JSON.parse(raw) as Partial<PortalData>;
    if (
      !Array.isArray(parsed.units) ||
      !Array.isArray(parsed.resources) ||
      !Array.isArray(parsed.timelineEvents) ||
      !Array.isArray(parsed.quizzes) ||
      !Array.isArray(parsed.glossary)
    ) {
      return INITIAL_PORTAL_DATA;
    }
    return {
      units: parsed.units,
      resources: parsed.resources,
      timelineEvents: parsed.timelineEvents,
      quizzes: parsed.quizzes,
      glossary: parsed.glossary,
    };
  } catch {
    return INITIAL_PORTAL_DATA;
  }
}

export function savePortalData(data: PortalData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota errors cleanly
  }
}

export function loadTeacherMode(): boolean {
  try {
    return localStorage.getItem(TEACHER_MODE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveTeacherMode(active: boolean): void {
  try {
    localStorage.setItem(TEACHER_MODE_KEY, active ? 'true' : 'false');
  } catch {
    // Ignore storage errors
  }
}

export function exportPortalDataJson(data: PortalData): void {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'Portale IRC – Religione Cattolica',
    version: 1,
    data,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const datePart = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `backup-portale-irc-${datePart}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseImportedBackupJson(rawText: string): PortalData | null {
  try {
    const parsed = JSON.parse(rawText);
    const candidate = parsed?.data ? parsed.data : parsed;
    if (
      candidate &&
      Array.isArray(candidate.units) &&
      Array.isArray(candidate.resources) &&
      Array.isArray(candidate.timelineEvents) &&
      Array.isArray(candidate.quizzes) &&
      Array.isArray(candidate.glossary)
    ) {
      return candidate as PortalData;
    }
    return null;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let videoId = '';
    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.replace('/', '');
    } else if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.replace('/embed/', '');
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
    }
    if (!videoId || !/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
      return null;
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  } catch {
    return null;
  }
}

export function createId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
