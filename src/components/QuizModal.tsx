import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, RotateCcw, X, XCircle } from 'lucide-react';
import { GradeId, UnitQuiz } from '../types/irc';
import { GRADE_THEMES } from '../utils/gradeThemes';

interface QuizModalProps {
  quiz: UnitQuiz | null;
  gradeId: GradeId;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, gradeId, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setShowSummary(false);
  }, [quiz?.id]);

  useEffect(() => {
    if (!quiz) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [quiz, onClose]);

  if (!quiz) return null;

  const theme = GRADE_THEMES[gradeId];
  const questions = quiz.questions;

  if (questions.length === 0) {
    return (
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/65"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl p-6 max-w-md w-full text-center space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-slate-700">Questo quiz non contiene ancora domande.</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const hasAnsweredCurrent = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion.correctIndex;

  const totalCorrect = questions.reduce((acc, q, idx) => {
    return acc + (answers[idx] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleChooseOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedOption(optionIndex);
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowSummary(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setShowSummary(false);
  };

  const progressPercent = Math.round(
    ((showSummary ? questions.length : currentIndex + (hasAnsweredCurrent ? 1 : 0)) /
      questions.length) *
      100
  );

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className={`text-xs font-semibold ${theme.accentText}`}>
              Autovalutazione · Nessun voto registrato
            </div>
            <h2
              id="quiz-modal-title"
              className="font-display text-lg sm:text-xl font-bold text-slate-900 truncate"
            >
              {quiz.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi quiz"
            className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-100 w-full">
          <div
            className={`h-full transition-all duration-300 ${theme.accentBg}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {!showSummary ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 tabular-nums">
                <span>
                  Domanda {currentIndex + 1} di {questions.length}
                </span>
                <span>{progressPercent}% completato</span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>

              <div className="space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isRightOption = idx === currentQuestion.correctIndex;

                  let styleClass =
                    'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                  if (hasAnsweredCurrent) {
                    if (isRightOption) {
                      styleClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                    } else if (isSelected) {
                      styleClass = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      styleClass = 'border-slate-200 bg-slate-50/50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleChooseOption(idx)}
                      className={`w-full text-left px-4 py-3.5 min-h-[48px] rounded-xl border transition-colors flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${styleClass}`}
                    >
                      <span className="text-sm sm:text-base">{option}</span>
                      {hasAnsweredCurrent && isRightOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isRightOption && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasAnsweredCurrent && (
                <div
                  className={`rounded-xl p-4 border ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-bold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                        <span>Risposta esatta!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-700" aria-hidden="true" />
                        <span>Non proprio, ecco la spiegazione:</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm mt-1.5 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {hasAnsweredCurrent && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`px-5 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold text-white cursor-pointer ${theme.accentBg} ${theme.accentBgHover}`}
                  >
                    {currentIndex + 1 < questions.length
                      ? 'Prossima domanda'
                      : 'Vedi riepilogo'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-5 py-3">
              <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${theme.softSurface} ${theme.accentText}`}>
                <Award className="w-7 h-7" aria-hidden="true" />
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-500">Risultato autovalutazione</div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-1 tabular-nums">
                  {totalCorrect} / {questions.length} risposte corrette
                </div>
                <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-md mx-auto">
                  {totalCorrect === questions.length
                    ? 'Ottimo lavoro! Hai padroneggiato tutti i concetti principali di questa unità.'
                    : totalCorrect >= Math.ceil(questions.length / 2)
                    ? 'Buon risultato! Rivedi i punti delle schede didattiche per consolidare gli argomenti.'
                    : 'Un buon punto di partenza: rileggi le schede dell’unità e riprova il quiz per esercitarti.'}
                </p>
              </div>

              <div className="text-left space-y-2.5 pt-2">
                {questions.map((q, idx) => {
                  const ok = answers[idx] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-slate-200 p-3.5 bg-slate-50 flex items-start gap-3"
                    >
                      {ok ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" aria-hidden="true" />
                      )}
                      <div className="text-sm">
                        <div className="font-semibold text-slate-900">{q.question}</div>
                        <div className="text-slate-600 mt-0.5">
                          Risposta corretta: <span className="font-medium text-slate-900">{q.options[q.correctIndex]}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Riprova il quiz</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-5 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold text-white cursor-pointer ${theme.accentBg} ${theme.accentBgHover}`}
                >
                  Torna all’unità
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
