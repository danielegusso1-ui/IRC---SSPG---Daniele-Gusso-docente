import React from 'react';
import {
  ClipboardList,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Image as ImageIcon,
  MonitorPlay,
  Pencil,
  PlayCircle,
  Star,
  Trash2,
} from 'lucide-react';
import { GradeId, ResourceItem, ResourceType } from '../types/irc';
import { GRADE_THEMES, RESOURCE_TYPE_META } from '../utils/gradeThemes';
import { ResilientImage } from './ResilientImage';

interface ResourceCardProps {
  resource: ResourceItem;
  unitTitle: string;
  gradeId: GradeId;
  teacherMode: boolean;
  isFavorite: boolean;
  onToggleFavorite: (resourceId: string) => void;
  onOpenResource: (resource: ResourceItem) => void;
  onProjectLim: (resource: ResourceItem) => void;
  onToggleStatus: (resourceId: string) => void;
  onEditResource: (resource: ResourceItem) => void;
  onDeleteResource: (resourceId: string) => void;
}

const TYPE_ICONS: Record<ResourceType, React.ComponentType<{ className?: string }>> = {
  document: FileText,
  activity: ClipboardList,
  image: ImageIcon,
  video: PlayCircle,
  link: ExternalLink,
};

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  unitTitle,
  gradeId,
  teacherMode,
  isFavorite,
  onToggleFavorite,
  onOpenResource,
  onProjectLim,
  onToggleStatus,
  onEditResource,
  onDeleteResource,
}) => {
  const theme = GRADE_THEMES[gradeId];
  const meta = RESOURCE_TYPE_META[resource.type];
  const TypeIcon = TYPE_ICONS[resource.type];
  const isDraft = resource.status === 'draft';

  const handlePrimaryClick = () => {
    if (resource.type === 'link' && resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }
    onOpenResource(resource);
  };

  return (
    <article
      className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
        isDraft
          ? 'border-amber-300 bg-amber-50/20'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Image preview thumbnail when resource is an image */}
      {resource.type === 'image' && (
        <button
          type="button"
          onClick={() => onOpenResource(resource)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900"
          aria-label={`Apri immagine: ${resource.title}`}
        >
          <ResilientImage
            src={resource.imageUrl}
            alt={resource.title}
            fallbackLabel={resource.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 text-white text-xs font-medium">
            <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Apri opera</span>
          </span>
        </button>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Clean unboxed metadata header + favorite star */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 min-w-0">
            <TypeIcon className={`w-4 h-4 shrink-0 ${theme.accentText}`} aria-hidden="true" />
            <span className={`font-semibold truncate ${theme.accentText}`}>
              {meta.shortLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{unitTitle}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isDraft && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-[11px] shrink-0">
                <EyeOff className="w-3 h-3" aria-hidden="true" />
                BOZZA
              </span>
            )}
            <button
              type="button"
              onClick={() => onToggleFavorite(resource.id)}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? `Rimuovi ${resource.title} dai preferiti` : `Aggiungi ${resource.title} ai preferiti`}
              title={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isFavorite
                  ? 'bg-amber-50 text-amber-500 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
              }`}
            >
              <Star
                className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-900 mt-2.5 leading-snug">
          {resource.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
          {resource.description}
        </p>

        {resource.durationOrMeta && (
          <p className="mt-3 text-xs text-slate-400 font-medium">
            {resource.durationOrMeta}
          </p>
        )}

        {/* Primary & LIM actions */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePrimaryClick}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${theme.accentBg} ${theme.accentBgHover} ${theme.ringFocus}`}
          >
            <TypeIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{meta.actionLabel}</span>
          </button>

          {meta.supportsLim && (
            <button
              type="button"
              onClick={() => onProjectLim(resource)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              title="Proietta questo contenuto a tutto schermo sulla LIM"
            >
              <MonitorPlay className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Proietta su LIM</span>
            </button>
          )}
        </div>

        {/* Teacher Mode direct controls */}
        {teacherMode && (
          <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => onToggleStatus(resource.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isDraft
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              {isDraft ? (
                <>
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pubblica</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Metti in Bozza</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onEditResource(resource)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium cursor-pointer whitespace-nowrap"
              >
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Modifica</span>
              </button>
              <button
                type="button"
                onClick={() => onDeleteResource(resource.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 font-medium cursor-pointer whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Elimina</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
