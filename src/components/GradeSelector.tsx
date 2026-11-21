import React from 'react';
import { Compass, Globe2, ScrollText } from 'lucide-react';
import { GradeId } from '../types/irc';
import { GRADE_THEMES } from '../utils/gradeThemes';

interface GradeSelectorProps {
  selectedGrade: GradeId;
  onSelectGrade: (grade: GradeId) => void;
  statsByGrade: Record<GradeId, { unitsCount: number; resourcesCount: number }>;
}

const GRADE_ICONS: Record<GradeId, React.ComponentType<{ className?: string }>> = {
  '1': ScrollText,
  '2': Compass,
  '3': Globe2,
};

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onSelectGrade,
  statsByGrade,
}) => {
  const grades: GradeId[] = ['1', '2', '3'];

  return (
    <section aria-label="Selezione della classe" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {grades.map((gradeId) => {
        const theme = GRADE_THEMES[gradeId];
        const Icon = GRADE_ICONS[gradeId];
        const isSelected = selectedGrade === gradeId;
        const stats = statsByGrade[gradeId];

        return (
          <button
            key={gradeId}
            type="button"
            onClick={() => onSelectGrade(gradeId)}
            aria-pressed={isSelected}
            className={`group text-left rounded-2xl p-5 transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.ringFocus} ${
              isSelected
                ? `bg-gradient-to-br ${theme.gradientBanner} text-white border-transparent shadow-md`
                : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div
                  className={`text-xs font-semibold tracking-wide ${
                    isSelected ? 'text-white/90' : theme.accentText
                  }`}
                >
                  {theme.shortLabel}
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold mt-0.5 leading-snug">
                  {theme.label}
                </h2>
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                  isSelected ? 'bg-white/20 text-white' : `${theme.softSurface} ${theme.accentText}`
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>

            <p
              className={`mt-2.5 text-sm leading-relaxed line-clamp-2 ${
                isSelected ? 'text-white/90' : 'text-slate-600'
              }`}
            >
              {theme.subtitle}
            </p>

            <div
              className={`mt-4 pt-3 border-t flex items-center gap-3 text-xs font-medium tabular-nums ${
                isSelected
                  ? 'border-white/20 text-white/90'
                  : 'border-slate-100 text-slate-500'
              }`}
            >
              <span>{stats.unitsCount} unità didattiche</span>
              <span aria-hidden="true">·</span>
              <span>{stats.resourcesCount} risorse</span>
            </div>
          </button>
        );
      })}
    </section>
  );
};
