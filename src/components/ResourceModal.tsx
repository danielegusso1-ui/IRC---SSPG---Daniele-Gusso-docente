import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckSquare,
  ClipboardList,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Loader2,
  MonitorPlay,
  PlayCircle,
  Sparkles,
  Square,
  Star,
  X,
} from 'lucide-react';
import { GradeId, ResourceItem } from '../types/irc';
import { requestAiSummary } from '../utils/aiSummary';
import { GRADE_THEMES, RESOURCE_TYPE_META } from '../utils/gradeThemes';
import { getYoutubeEmbedUrl } from '../utils/storage';
import { ResilientImage } from './ResilientImage';

interface ResourceModalProps {
  resource: ResourceItem | null;
  unitTitle: string;
  gradeId: GradeId;
  isFavorite: boolean;
  onToggleFavorite: (resourceId: string) => void;
  onClose: () => void;
  onProjectLim: (resource: ResourceItem) => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  unitTitle,
  gradeId,
  isFavorite,
  onToggleFavorite,
  onClose,
  onProjectLim,
}) => {
  const [studentNotes, setStudentNotes] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setStudentNotes('');
    setCompletedSteps({});
    setAiSummary(null);
    setAiLoading(false);
    setAiError(null);
  }, [resource?.id]);

  useEffect(() => {
    if (!resource) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [resource, onClose]);

  if (!resource) return null;

  const theme = GRADE_THEMES[gradeId];
  const meta = RESOURCE_TYPE_META[resource.type];
  const youtubeEmbed = resource.type === 'video' ? getYoutubeEmbedUrl(resource.url) : null;

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const result = await requestAiSummary({
        title: resource.title,
        content: `${resource.description}\n\n${resource.content}`,
        contextLabel: `${theme.label} · ${unitTitle}`,
      });
      setAiSummary(result);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Errore imprevisto durante la generazione del riassunto.';
      setAiError(msg);
    } finally {
      setAiLoading(false);
    }
  };

  const handleDownloadDocument = () => {
    const text = `${resource.title}\n${theme.label} – ${unitTitle}\n\n${resource.description}\n\n${resource.content}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const activityLines =
    resource.type === 'activity'
      ? resource.content.split('\n').filter((line) => line.trim().length > 0)
      : [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className={theme.accentText}>{meta.shortLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{theme.label}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{unitTitle}</span>
            </div>
            <h2
              id="resource-modal-title"
              className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5 truncate"
            >
              {resource.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(resource.id)}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
              title={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                isFavorite
                  ? 'border-amber-300 bg-amber-50 text-amber-500 hover:bg-amber-100'
                  : 'border-slate-200 bg-white text-slate-500 hover:text-amber-500 hover:bg-slate-50'
              }`}
            >
              <Star
                className={`w-5 h-5 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`}
                aria-hidden="true"
              />
            </button>

            {meta.supportsLim && (
              <button
                type="button"
                onClick={() => onProjectLim(resource)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold text-white whitespace-nowrap cursor-pointer ${theme.accentBg} ${theme.accentBgHover}`}
              >
                <MonitorPlay className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Proietta su LIM</span>
                <span className="sm:hidden">LIM</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi finestra"
              className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {resource.type === 'document' && (
            <>
              <div className={`rounded-xl p-4 border ${theme.softSurface} ${theme.softBorder} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                <div className="flex items-start gap-3">
                  <FileText className={`w-5 h-5 mt-0.5 shrink-0 ${theme.accentText}`} aria-hidden="true" />
                  <p className="text-sm text-slate-700 leading-relaxed">{resource.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleGenerateSummary}
                    disabled={aiLoading}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-semibold whitespace-nowrap cursor-pointer disabled:opacity-60 ${theme.accentBg} ${theme.accentBgHover}`}
                  >
                    {aiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{aiLoading ? 'Riassunto in corso...' : 'Genera Riassunto'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadDocument}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap cursor-pointer"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Scarica scheda</span>
                  </button>
                </div>
              </div>

              {/* Dedicated AI Summary Area */}
              {(aiLoading || aiError || aiSummary) && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`inline-flex items-center gap-2 text-xs font-bold ${theme.accentText}`}>
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span>Riassunto AI per lo studio</span>
                    </div>
                    {!aiLoading && (
                      <button
                        type="button"
                        onClick={() => {
                          setAiSummary(null);
                          setAiError(null);
                        }}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        Nascondi
                      </button>
                    )}
                  </div>

                  {aiLoading && (
                    <div className="flex items-center gap-2.5 text-sm text-slate-600 py-2">
                      <Loader2 className={`w-4 h-4 animate-spin ${theme.accentText}`} aria-hidden="true" />
                      <span>Sto sintetizzando il testo in italiano semplice per la scuola media...</span>
                    </div>
                  )}

                  {!aiLoading && aiError && (
                    <div className="flex items-start gap-2.5 text-sm text-rose-800 bg-rose-50 border border-rose-200 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{aiError}</span>
                    </div>
                  )}

                  {!aiLoading && !aiError && aiSummary && (
                    <div className="whitespace-pre-wrap text-slate-800 text-sm sm:text-[15px] leading-relaxed">
                      {aiSummary}
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-slate max-w-none bg-slate-50/70 rounded-xl border border-slate-200 p-5 sm:p-7">
                <div className="whitespace-pre-wrap text-slate-800 text-[15px] sm:text-base leading-7 font-normal">
                  {resource.content}
                </div>
              </div>

              {resource.url && (
                <div className="flex justify-end">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-4"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>Apri allegato esterno</span>
                  </a>
                </div>
              )}
            </>
          )}

          {resource.type === 'activity' && (
            <>
              <div className={`rounded-xl p-4 border ${theme.softSurface} ${theme.softBorder} flex items-start gap-3`}>
                <ClipboardList className={`w-5 h-5 mt-0.5 shrink-0 ${theme.accentText}`} aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-slate-700">Consegna operativa</div>
                  <p className="text-sm text-slate-700 mt-0.5">{resource.description}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-2.5">
                {activityLines.map((line, idx) => {
                  const isStep = /^[0-9]+[.)]|^[•\-]/.test(line.trim());
                  const checked = !!completedSteps[idx];
                  if (!isStep) {
                    return (
                      <p key={idx} className="text-sm sm:text-base font-semibold text-slate-900 pt-2 first:pt-0">
                        {line}
                      </p>
                    );
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg transition-colors cursor-pointer ${
                        checked ? 'bg-emerald-50 text-emerald-950' : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 mt-1 shrink-0 text-emerald-600" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 mt-1 shrink-0 text-slate-400" aria-hidden="true" />
                      )}
                      <span className={`text-sm sm:text-base leading-relaxed ${checked ? 'line-through opacity-75' : ''}`}>
                        {line}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div>
                <label
                  htmlFor="student-notes-box"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Spazio appunti dello studente (facoltativo, per preparare il confronto in classe)
                </label>
                <textarea
                  id="student-notes-box"
                  rows={4}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Scrivi qui le tue osservazioni o le risposte prima di condividerle sul quaderno o alla LIM..."
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </>
          )}

          {resource.type === 'image' && (
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 aspect-[16/10] max-h-[60vh] flex items-center justify-center">
                <ResilientImage
                  src={resource.imageUrl}
                  alt={resource.title}
                  fallbackLabel={resource.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-start gap-3">
                <ImageIcon className={`w-5 h-5 mt-0.5 shrink-0 ${theme.accentText}`} aria-hidden="true" />
                <div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                    {resource.caption || resource.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {resource.type === 'video' && (
            <div className="space-y-4">
              {youtubeEmbed ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
                  <iframe
                    src={youtubeEmbed}
                    title={resource.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-100 p-8 text-center space-y-3">
                  <PlayCircle className="w-10 h-10 text-slate-500 mx-auto" aria-hidden="true" />
                  <p className="text-sm text-slate-700">
                    Questo video è ospitato su un portale esterno. Puoi aprirlo direttamente in una nuova scheda.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-700">{resource.description}</p>
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>Apri su YouTube / Link</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
