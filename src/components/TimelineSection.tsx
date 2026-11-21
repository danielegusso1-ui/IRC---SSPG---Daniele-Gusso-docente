import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  MonitorPlay,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { GradeId, TimelineEvent } from '../types/irc';
import { GRADE_THEMES } from '../utils/gradeThemes';
import { ResilientImage } from './ResilientImage';

interface TimelineSectionProps {
  gradeId: GradeId;
  events: TimelineEvent[];
  teacherMode: boolean;
  onProjectEvent: (event: TimelineEvent) => void;
  onToggleStatus: (eventId: string) => void;
  onEditEvent: (event: TimelineEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  onAddNewEvent: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  gradeId,
  events,
  teacherMode,
  onProjectEvent,
  onToggleStatus,
  onEditEvent,
  onDeleteEvent,
  onAddNewEvent,
}) => {
  const theme = GRADE_THEMES[gradeId];
  const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id ?? null);

  const sortedEvents = [...events].sort((a, b) => a.order - b.order);

  return (
    <section aria-label="Linea del Tempo interattiva" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className={`text-xs font-semibold ${theme.accentText}`}>
            Percorso cronologico · {theme.label}
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Linea del Tempo Interattiva
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Esplora le tappe storiche principali in ordine cronologico oppure proietta ogni scheda sulla LIM.
          </p>
        </div>

        {teacherMode && (
          <button
            type="button"
            onClick={onAddNewEvent}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer ${theme.accentBg} ${theme.accentBgHover}`}
          >
            <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Nuova tappa storica</span>
          </button>
        )}
      </div>

      {sortedEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
          Nessun evento cronologico pubblicato per questa classe.
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 space-y-5">
          {/* Vertical timeline rail */}
          <div
            className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 bg-slate-200"
            aria-hidden="true"
          />

          {sortedEvents.map((event, index) => {
            const isExpanded = expandedId === event.id;
            const isDraft = event.status === 'draft';

            return (
              <article
                key={event.id}
                className={`relative bg-white rounded-2xl border transition-all ${
                  isDraft
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Chronological marker */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-6 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white tabular-nums ${theme.accentBg}`}
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    {event.imageUrl && (
                      <button
                        type="button"
                        onClick={() => onProjectEvent(event)}
                        className="w-full md:w-48 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                        aria-label={`Proietta immagine di ${event.title}`}
                      >
                        <ResilientImage
                          src={event.imageUrl}
                          alt={event.title}
                          fallbackLabel={event.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </button>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className={`inline-flex items-center gap-1.5 font-mono font-semibold tabular-nums ${theme.accentText}`}>
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            {event.yearLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-slate-600">{event.era}</span>
                        </div>

                        {isDraft && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-[11px]">
                            <EyeOff className="w-3 h-3" aria-hidden="true" />
                            BOZZA
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                        {event.title}
                      </h3>

                      <p
                        className={`mt-2 text-sm sm:text-base text-slate-600 leading-relaxed ${
                          isExpanded ? '' : 'line-clamp-2'
                        }`}
                      >
                        {event.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : event.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer whitespace-nowrap"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Riduci dettaglio</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Leggi scheda completa</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onProjectEvent(event)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-semibold text-white cursor-pointer whitespace-nowrap ${theme.accentBg} ${theme.accentBgHover}`}
                        >
                          <MonitorPlay className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Proietta su LIM</span>
                        </button>

                        {teacherMode && (
                          <div className="flex items-center gap-1.5 ml-auto">
                            <button
                              type="button"
                              onClick={() => onToggleStatus(event.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap ${
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
                                  <span>Bozza</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => onEditEvent(event)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                            >
                              <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Modifica</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteEvent(event.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-50 cursor-pointer whitespace-nowrap"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Elimina</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
