import React, { useEffect, useState } from 'react';
import { Calendar, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { LimContent } from '../types/irc';
import { ResilientImage } from './ResilientImage';

interface LimProjectionModalProps {
  content: LimContent | null;
  onExit: () => void;
}

export const LimProjectionModal: React.FC<LimProjectionModalProps> = ({ content, onExit }) => {
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('large');

  useEffect(() => {
    if (!content) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [content, onExit]);

  if (!content) return null;

  const textSizeClass =
    fontScale === 'normal'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontScale === 'large'
      ? 'text-xl sm:text-2xl leading-relaxed'
      : 'text-2xl sm:text-3xl leading-relaxed';

  const headingSizeClass =
    fontScale === 'normal'
      ? 'text-2xl sm:text-4xl'
      : fontScale === 'large'
      ? 'text-3xl sm:text-5xl'
      : 'text-4xl sm:text-6xl';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Modalità Proiezione LIM"
    >
      {/* Top LIM Control Bar */}
      <div className="px-5 sm:px-8 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4 shrink-0">
        <div className="min-w-0">
          <div className="text-xs sm:text-sm font-semibold text-emerald-400">
            Proiezione LIM · {content.gradeLabel}
            {content.kind === 'resource' ? ` · ${content.unitTitle}` : ' · Linea del Tempo'}
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              type="button"
              onClick={() => setFontScale(fontScale === 'xlarge' ? 'large' : 'normal')}
              disabled={fontScale === 'normal'}
              aria-label="Riduci dimensione testo"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" aria-hidden="true" />
              <span>A-</span>
            </button>
            <button
              type="button"
              onClick={() => setFontScale(fontScale === 'normal' ? 'large' : 'xlarge')}
              disabled={fontScale === 'xlarge'}
              aria-label="Ingrandisci dimensione testo"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" aria-hidden="true" />
              <span>A+</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Minimize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Esci da LIM</span>
          </button>
        </div>
      </div>

      {/* Main LIM Stage */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-20 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {content.kind === 'resource' && content.resource.type === 'image' && (
            <div className="space-y-6">
              <h2 className={`font-display font-bold text-white tracking-tight ${headingSizeClass}`}>
                {content.resource.title}
              </h2>
              <div className="rounded-2xl overflow-hidden bg-black border border-slate-800 max-h-[68vh] flex items-center justify-center">
                <ResilientImage
                  src={content.resource.imageUrl}
                  alt={content.resource.title}
                  fallbackLabel={content.resource.title}
                  className="w-full max-h-[68vh] object-contain"
                />
              </div>
              <p className={`text-slate-200 max-w-4xl ${textSizeClass}`}>
                {content.resource.caption || content.resource.description}
              </p>
            </div>
          )}

          {content.kind === 'resource' && content.resource.type !== 'image' && (
            <div className="space-y-6">
              <h2 className={`font-display font-bold text-white tracking-tight ${headingSizeClass}`}>
                {content.resource.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 border-b border-slate-800 pb-5">
                {content.resource.description}
              </p>
              <div
                className={`whitespace-pre-wrap text-slate-100 tracking-wide ${textSizeClass}`}
              >
                {content.resource.content}
              </div>
            </div>
          )}

          {content.kind === 'timeline' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className={content.event.imageUrl ? 'lg:col-span-7 space-y-5' : 'lg:col-span-12 space-y-5'}>
                <div className="inline-flex items-center gap-2 text-base sm:text-lg font-mono font-semibold text-amber-300 tabular-nums">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  <span>{content.event.yearLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans text-slate-300">{content.event.era}</span>
                </div>
                <h2 className={`font-display font-bold text-white tracking-tight ${headingSizeClass}`}>
                  {content.event.title}
                </h2>
                <p className={`text-slate-100 ${textSizeClass}`}>
                  {content.event.description}
                </p>
              </div>

              {content.event.imageUrl && (
                <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-[4/3]">
                  <ResilientImage
                    src={content.event.imageUrl}
                    alt={content.event.title}
                    fallbackLabel={content.event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
