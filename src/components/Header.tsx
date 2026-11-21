import React from 'react';
import { BookOpen, GraduationCap, Lock, Unlock } from 'lucide-react';

interface HeaderProps {
  teacherMode: boolean;
  onOpenGlossary: () => void;
  onOpenTeacherPanel: () => void;
  glossaryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  teacherMode,
  onOpenGlossary,
  onOpenTeacherPanel,
  glossaryCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="min-w-0 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 truncate">
              Portale IRC – Religione Cattolica
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Spazio digitale per le classi della Scuola Secondaria di Primo Grado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenGlossary}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <BookOpen className="w-4 h-4 text-slate-600 shrink-0" aria-hidden="true" />
            <span>Glossario IRC</span>
            <span className="hidden sm:inline text-xs text-slate-400 tabular-nums">({glossaryCount})</span>
          </button>

          <button
            type="button"
            onClick={onOpenTeacherPanel}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
              teacherMode
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:ring-emerald-700'
                : 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900'
            }`}
          >
            {teacherMode ? (
              <Unlock className="w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
            <span className="hidden xs:inline sm:inline">
              {teacherMode ? 'Area Docente (Attiva)' : 'Area Docente'}
            </span>
            <span className="sm:hidden">Docente</span>
            <GraduationCap className="w-4 h-4 hidden md:inline shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
