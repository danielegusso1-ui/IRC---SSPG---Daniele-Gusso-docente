import React, { useEffect } from 'react';
import { AlertCircle, Loader2, RefreshCw, Sparkles, X } from 'lucide-react';
import { GradeId } from '../types/irc';
import { GRADE_THEMES } from '../utils/gradeThemes';

interface AiSummaryModalProps {
  isOpen: boolean;
  title: string;
  gradeId: GradeId;
  summary: string | null;
  isLoading: boolean;
  error: string | null;
  onRegenerate: () => void;
  onClose: () => void;
}

export const AiSummaryModal: React.FC<AiSummaryModalProps> = ({
  isOpen,
  title,
  gradeId,
  summary,
  isLoading,
  error,
  onRegenerate,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const theme = GRADE_THEMES[gradeId];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-summary-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className={`text-xs font-semibold ${theme.accentText}`}>
              Riassunto di studio · {theme.label}
            </div>
            <h2
              id="ai-summary-modal-title"
              className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5 truncate"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi riassunto"
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-600">
              <Loader2 className={`w-8 h-8 animate-spin ${theme.accentText}`} aria-hidden="true" />
              <p className="text-sm font-medium">
                Generazione del riassunto in italiano per studenti delle medie...
              </p>
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 flex items-start gap-3 text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-700 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="text-sm space-y-2">
                <div className="font-semibold">Non è stato possibile generare il riassunto</div>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && summary && (
            <div className={`rounded-xl border p-5 space-y-3 ${theme.softSurface} ${theme.softBorder}`}>
              <div className={`flex items-center gap-2 text-xs font-bold ${theme.accentText}`}>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Sintesi semplificata per il ripasso</span>
              </div>
              <div className="whitespace-pre-wrap text-slate-800 text-sm sm:text-base leading-relaxed">
                {summary}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Rigenera riassunto</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white cursor-pointer ${theme.accentBg} ${theme.accentBgHover}`}
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
