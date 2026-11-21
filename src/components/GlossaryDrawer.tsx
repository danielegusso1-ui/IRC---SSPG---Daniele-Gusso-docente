import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import { GlossaryEntry } from '../types/irc';

interface GlossaryDrawerProps {
  isOpen: boolean;
  entries: GlossaryEntry[];
  onClose: () => void;
}

export const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({
  isOpen,
  entries,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('Tutte');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => a.term.localeCompare(b.term, 'it'));
  }, [entries]);

  const letters = useMemo(() => {
    const set = new Set(sortedEntries.map((e) => e.term.charAt(0).toUpperCase()));
    return ['Tutte', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'it'))];
  }, [sortedEntries]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return sortedEntries.filter((entry) => {
      const matchesLetter =
        selectedLetter === 'Tutte' ||
        entry.term.charAt(0).toUpperCase() === selectedLetter;
      const matchesQuery =
        !q ||
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q);
      return matchesLetter && matchesQuery;
    });
  }, [sortedEntries, searchTerm, selectedLetter]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-slate-950/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <BookOpen className="w-5 h-5 text-slate-800 shrink-0" aria-hidden="true" />
            <div>
              <h2 id="glossary-title" className="font-display text-lg font-bold text-slate-900">
                Glossario IRC
              </h2>
              <p className="text-xs text-slate-500">
                Parole chiave spiegate in modo chiaro ({entries.length} voci)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi glossario"
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Search & Alphabet Filter */}
        <div className="px-6 py-4 border-b border-slate-100 space-y-3 bg-slate-50/60">
          <div className="relative">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca una parola (es. Sinagoga, Parabola, Concilio...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtra per iniziale">
            {letters.map((letter) => {
              const active = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedLetter(letter)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Entries list */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-slate-500">
              Nessun termine trovato per "{searchTerm}".
            </div>
          ) : (
            filtered.map((entry) => (
              <article
                key={entry.id}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {entry.term}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 shrink-0">
                    {entry.category}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {entry.definition}
                </p>
                {entry.exampleOrOrigin && (
                  <p className="text-xs text-slate-500 pt-1">
                    {entry.exampleOrOrigin}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
