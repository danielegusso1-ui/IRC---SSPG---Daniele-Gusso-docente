import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileText,
  FolderPlus,
  HelpCircle,
  KeyRound,
  Layers,
  Lock,
  Pencil,
  Plus,
  RotateCcw,
  Star,
  Trash2,
  Unlock,
  Upload,
  X,
} from 'lucide-react';
import {
  FavoritesState,
  GlossaryEntry,
  GradeId,
  PortalData,
  PublishStatus,
  QuizQuestion,
  ResourceItem,
  ResourceType,
  ThematicUnit,
  TimelineEvent,
} from '../types/irc';
import { GRADE_THEMES, PRESET_IMAGES, RESOURCE_TYPE_META } from '../utils/gradeThemes';
import {
  createId,
  exportPortalDataJson,
  parseImportedBackupJson,
} from '../utils/storage';

export type TeacherTab =
  | 'favorites'
  | 'resources'
  | 'units'
  | 'timeline'
  | 'quiz'
  | 'glossary'
  | 'backup';

interface TeacherModalProps {
  isOpen: boolean;
  teacherMode: boolean;
  onSetTeacherMode: (active: boolean) => void;
  data: PortalData;
  onUpdateData: (updater: (prev: PortalData) => PortalData) => void;
  onResetDefaultData: () => void;
  initialTab?: TeacherTab;
  initialGrade?: GradeId;
  editingResource?: ResourceItem | null;
  editingTimeline?: TimelineEvent | null;
  favorites: FavoritesState;
  onToggleFavoriteUnit: (unitId: string) => void;
  onToggleFavoriteResource: (resourceId: string) => void;
  onJumpToUnit: (gradeId: GradeId, unitId: string) => void;
  onOpenResourceFromFavorites: (resource: ResourceItem) => void;
  onClearPreselectedEdit: () => void;
  onClose: () => void;
}

const DEMO_PIN = '1234';

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  teacherMode,
  onSetTeacherMode,
  data,
  onUpdateData,
  onResetDefaultData,
  initialTab = 'resources',
  initialGrade = '1',
  editingResource,
  editingTimeline,
  favorites,
  onToggleFavoriteUnit,
  onToggleFavoriteResource,
  onJumpToUnit,
  onOpenResourceFromFavorites,
  onClearPreselectedEdit,
  onClose,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(teacherMode);
  const [activeTab, setActiveTab] = useState<TeacherTab>(initialTab);
  const [guestSection, setGuestSection] = useState<'favorites' | 'pin'>(
    initialTab === 'favorites' ? 'favorites' : 'pin'
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Resource form state
  const [resEditId, setResEditId] = useState<string | null>(null);
  const [resGrade, setResGrade] = useState<GradeId>(initialGrade);
  const [resUnitId, setResUnitId] = useState<string>('');
  const [creatingInlineUnit, setCreatingInlineUnit] = useState(false);
  const [inlineUnitTitle, setInlineUnitTitle] = useState('');
  const [resType, setResType] = useState<ResourceType>('document');
  const [resTitle, setResTitle] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resContent, setResContent] = useState('');
  const [resUrl, setResUrl] = useState('');
  const [resImageUrl, setResImageUrl] = useState('');
  const [resCaption, setResCaption] = useState('');
  const [resMeta, setResMeta] = useState('');
  const [resStatus, setResStatus] = useState<PublishStatus>('published');
  const [resFilterGrade, setResFilterGrade] = useState<GradeId | 'all'>('all');

  // Unit form state
  const [unitEditId, setUnitEditId] = useState<string | null>(null);
  const [unitGrade, setUnitGrade] = useState<GradeId>(initialGrade);
  const [unitTitle, setUnitTitle] = useState('');
  const [unitDesc, setUnitDesc] = useState('');
  const [unitOrder, setUnitOrder] = useState<number>(1);
  const [unitStatus, setUnitStatus] = useState<PublishStatus>('published');

  // Timeline form state
  const [tlEditId, setTlEditId] = useState<string | null>(null);
  const [tlGrade, setTlGrade] = useState<GradeId>(initialGrade);
  const [tlYearLabel, setTlYearLabel] = useState('');
  const [tlEra, setTlEra] = useState('');
  const [tlTitle, setTlTitle] = useState('');
  const [tlDesc, setTlDesc] = useState('');
  const [tlImageUrl, setTlImageUrl] = useState('');
  const [tlOrder, setTlOrder] = useState<number>(1);
  const [tlStatus, setTlStatus] = useState<PublishStatus>('published');

  // Quiz form state
  const [quizGrade, setQuizGrade] = useState<GradeId>(initialGrade);
  const [quizUnitId, setQuizUnitId] = useState<string>('');
  const [qEditId, setQEditId] = useState<string | null>(null);
  const [qQuestion, setQQuestion] = useState('');
  const [qOpt1, setQOpt1] = useState('');
  const [qOpt2, setQOpt2] = useState('');
  const [qOpt3, setQOpt3] = useState('');
  const [qOpt4, setQOpt4] = useState('');
  const [qCorrectIndex, setQCorrectIndex] = useState<number>(0);
  const [qExplanation, setQExplanation] = useState('');

  // Glossary form state
  const [glEditId, setGlEditId] = useState<string | null>(null);
  const [glTerm, setGlTerm] = useState('');
  const [glCategory, setGlCategory] = useState('Bibbia');
  const [glDef, setGlDef] = useState('');
  const [glOrigin, setGlOrigin] = useState('');

  useEffect(() => {
    if (teacherMode) setIsUnlocked(true);
  }, [teacherMode]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveTab(initialTab);
    setGuestSection(initialTab === 'favorites' ? 'favorites' : 'pin');
    setResGrade(initialGrade);
    setUnitGrade(initialGrade);
    setTlGrade(initialGrade);
    setQuizGrade(initialGrade);
  }, [isOpen, initialTab, initialGrade]);

  // Populate Resource edit if opened from a card
  useEffect(() => {
    if (editingResource && isOpen) {
      setActiveTab('resources');
      setResEditId(editingResource.id);
      setResGrade(editingResource.gradeId);
      setResUnitId(editingResource.unitId);
      setResType(editingResource.type);
      setResTitle(editingResource.title);
      setResDesc(editingResource.description);
      setResContent(editingResource.content);
      setResUrl(editingResource.url || '');
      setResImageUrl(editingResource.imageUrl || '');
      setResCaption(editingResource.caption || '');
      setResMeta(editingResource.durationOrMeta || '');
      setResStatus(editingResource.status);
    }
  }, [editingResource, isOpen]);

  // Populate Timeline edit if opened from a milestone
  useEffect(() => {
    if (editingTimeline && isOpen) {
      setActiveTab('timeline');
      setTlEditId(editingTimeline.id);
      setTlGrade(editingTimeline.gradeId);
      setTlYearLabel(editingTimeline.yearLabel);
      setTlEra(editingTimeline.era);
      setTlTitle(editingTimeline.title);
      setTlDesc(editingTimeline.description);
      setTlImageUrl(editingTimeline.imageUrl || '');
      setTlOrder(editingTimeline.order);
      setTlStatus(editingTimeline.status);
    }
  }, [editingTimeline, isOpen]);

  // Keep unit dropdown valid when grade changes
  useEffect(() => {
    const gradeUnits = data.units.filter((u) => u.gradeId === resGrade);
    if (!gradeUnits.some((u) => u.id === resUnitId)) {
      setResUnitId(gradeUnits[0]?.id || '');
    }
  }, [resGrade, data.units, resUnitId]);

  useEffect(() => {
    const gradeUnits = data.units.filter((u) => u.gradeId === quizGrade);
    if (!gradeUnits.some((u) => u.id === quizUnitId)) {
      setQuizUnitId(gradeUnits[0]?.id || '');
    }
  }, [quizGrade, data.units, quizUnitId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEMO_PIN) {
      setIsUnlocked(true);
      onSetTeacherMode(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('PIN non corretto. Per provare il portale inserisci 1234.');
    }
  };

  // --- Resource CRUD ---
  const resetResourceForm = () => {
    setResEditId(null);
    setCreatingInlineUnit(false);
    setInlineUnitTitle('');
    setResType('document');
    setResTitle('');
    setResDesc('');
    setResContent('');
    setResUrl('');
    setResImageUrl('');
    setResCaption('');
    setResMeta('');
    setResStatus('published');
    onClearPreselectedEdit();
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;

    let targetUnitId = resUnitId;
    let newUnit: ThematicUnit | null = null;

    if (creatingInlineUnit && inlineUnitTitle.trim()) {
      const gradeUnitsCount = data.units.filter((u) => u.gradeId === resGrade).length;
      newUnit = {
        id: createId('unit'),
        gradeId: resGrade,
        title: inlineUnitTitle.trim(),
        description: 'Nuova unità didattica creata dall’Area Docente.',
        order: gradeUnitsCount + 1,
        status: resStatus,
      };
      targetUnitId = newUnit.id;
    }

    if (!targetUnitId) return;

    const payload: ResourceItem = {
      id: resEditId || createId('res'),
      gradeId: resGrade,
      unitId: targetUnitId,
      type: resType,
      title: resTitle.trim(),
      description: resDesc.trim() || 'Materiale didattico IRC.',
      content: resContent.trim() || resDesc.trim(),
      url: resUrl.trim() || undefined,
      imageUrl: resImageUrl.trim() || undefined,
      caption: resCaption.trim() || undefined,
      durationOrMeta: resMeta.trim() || RESOURCE_TYPE_META[resType].shortLabel,
      status: resStatus,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onUpdateData((prev) => ({
      ...prev,
      units: newUnit ? [...prev.units, newUnit] : prev.units,
      resources: resEditId
        ? prev.resources.map((r) => (r.id === resEditId ? payload : r))
        : [payload, ...prev.resources],
    }));

    showSuccess(resEditId ? 'Risorsa aggiornata.' : 'Nuova risorsa salvata.');
    resetResourceForm();
  };

  // --- Unit CRUD ---
  const resetUnitForm = () => {
    setUnitEditId(null);
    setUnitTitle('');
    setUnitDesc('');
    setUnitOrder(data.units.filter((u) => u.gradeId === unitGrade).length + 1);
    setUnitStatus('published');
  };

  const handleSaveUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitTitle.trim()) return;

    const payload: ThematicUnit = {
      id: unitEditId || createId('unit'),
      gradeId: unitGrade,
      title: unitTitle.trim(),
      description: unitDesc.trim() || 'Unità didattica di Religione Cattolica.',
      order: Number(unitOrder) || 1,
      status: unitStatus,
    };

    onUpdateData((prev) => ({
      ...prev,
      units: unitEditId
        ? prev.units.map((u) => (u.id === unitEditId ? payload : u))
        : [...prev.units, payload],
    }));

    showSuccess(unitEditId ? 'Unità aggiornata.' : 'Nuova unità creata.');
    resetUnitForm();
  };

  // --- Timeline CRUD ---
  const resetTimelineForm = () => {
    setTlEditId(null);
    setTlYearLabel('');
    setTlEra('');
    setTlTitle('');
    setTlDesc('');
    setTlImageUrl('');
    setTlOrder(data.timelineEvents.filter((t) => t.gradeId === tlGrade).length + 1);
    setTlStatus('published');
    onClearPreselectedEdit();
  };

  const handleSaveTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tlTitle.trim() || !tlYearLabel.trim()) return;

    const payload: TimelineEvent = {
      id: tlEditId || createId('tl'),
      gradeId: tlGrade,
      yearLabel: tlYearLabel.trim(),
      era: tlEra.trim() || 'Periodo storico',
      title: tlTitle.trim(),
      description: tlDesc.trim(),
      imageUrl: tlImageUrl.trim() || undefined,
      order: Number(tlOrder) || 1,
      status: tlStatus,
    };

    onUpdateData((prev) => ({
      ...prev,
      timelineEvents: tlEditId
        ? prev.timelineEvents.map((t) => (t.id === tlEditId ? payload : t))
        : [...prev.timelineEvents, payload],
    }));

    showSuccess(tlEditId ? 'Tappa cronologica aggiornata.' : 'Nuova tappa aggiunta alla Linea del Tempo.');
    resetTimelineForm();
  };

  // --- Quiz CRUD ---
  const currentUnitQuiz = data.quizzes.find((q) => q.unitId === quizUnitId);
  const selectedQuizUnitObj = data.units.find((u) => u.id === quizUnitId);

  const resetQuestionForm = () => {
    setQEditId(null);
    setQQuestion('');
    setQOpt1('');
    setQOpt2('');
    setQOpt3('');
    setQOpt4('');
    setQCorrectIndex(0);
    setQExplanation('');
  };

  const handleSaveQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizUnitId || !qQuestion.trim()) return;
    const options = [qOpt1.trim(), qOpt2.trim(), qOpt3.trim(), qOpt4.trim()].filter(Boolean);
    if (options.length < 2) return;

    const safeCorrectIdx = Math.min(qCorrectIndex, options.length - 1);
    const newQ: QuizQuestion = {
      id: qEditId || createId('qq'),
      question: qQuestion.trim(),
      options,
      correctIndex: safeCorrectIdx,
      explanation: qExplanation.trim() || 'Risposta verificata dal docente.',
    };

    onUpdateData((prev) => {
      const existing = prev.quizzes.find((q) => q.unitId === quizUnitId);
      if (existing) {
        const updatedQuestions = qEditId
          ? existing.questions.map((item) => (item.id === qEditId ? newQ : item))
          : [...existing.questions, newQ];
        return {
          ...prev,
          quizzes: prev.quizzes.map((q) =>
            q.id === existing.id ? { ...q, questions: updatedQuestions } : q
          ),
        };
      }
      const createdQuiz = {
        id: createId('quiz'),
        gradeId: quizGrade,
        unitId: quizUnitId,
        title: `Mettiti alla prova: ${selectedQuizUnitObj?.title || 'Unità'}`,
        questions: [newQ],
        status: 'published' as PublishStatus,
      };
      return {
        ...prev,
        quizzes: [...prev.quizzes, createdQuiz],
      };
    });

    showSuccess(qEditId ? 'Domanda quiz aggiornata.' : 'Domanda aggiunta al quiz.');
    resetQuestionForm();
  };

  const handleToggleQuizStatus = () => {
    if (!currentUnitQuiz) return;
    onUpdateData((prev) => ({
      ...prev,
      quizzes: prev.quizzes.map((q) =>
        q.id === currentUnitQuiz.id
          ? { ...q, status: q.status === 'published' ? 'draft' : 'published' }
          : q
      ),
    }));
  };

  // --- Glossary CRUD ---
  const resetGlossaryForm = () => {
    setGlEditId(null);
    setGlTerm('');
    setGlCategory('Bibbia');
    setGlDef('');
    setGlOrigin('');
  };

  const handleSaveGlossary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!glTerm.trim() || !glDef.trim()) return;
    const payload: GlossaryEntry = {
      id: glEditId || createId('gl'),
      term: glTerm.trim(),
      category: glCategory.trim() || 'IRC',
      definition: glDef.trim(),
      exampleOrOrigin: glOrigin.trim() || undefined,
    };
    onUpdateData((prev) => ({
      ...prev,
      glossary: glEditId
        ? prev.glossary.map((g) => (g.id === glEditId ? payload : g))
        : [...prev.glossary, payload],
    }));
    showSuccess(glEditId ? 'Voce del glossario aggiornata.' : 'Nuovo termine aggiunto al glossario.');
    resetGlossaryForm();
  };

  // --- Backup Import ---
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      const parsed = parseImportedBackupJson(text);
      if (parsed) {
        onUpdateData(() => parsed);
        showSuccess('Backup importato con successo! Tutti i contenuti sono stati ripristinati.');
      } else {
        showSuccess('File JSON non valido: controlla che sia un backup esportato dal Portale IRC.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const gradeUnitsForResource = data.units.filter((u) => u.gradeId === resGrade);
  const filteredResourcesList = data.resources.filter((r) =>
    resFilterGrade === 'all' ? true : r.gradeId === resFilterGrade
  );

  const favoriteUnits = data.units.filter((u) => favorites.unitIds.includes(u.id));
  const favoriteResources = data.resources.filter((r) => favorites.resourceIds.includes(r.id));
  const totalFavoritesCount = favoriteUnits.length + favoriteResources.length;

  const renderFavoritesSection = () => (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
              I miei preferiti
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Accessibile liberamente senza login. Le tue unità e risorse contrassegnate restano salvate su questo dispositivo.
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-600 tabular-nums shrink-0">
          {favoriteUnits.length} unità · {favoriteResources.length} risorse
        </div>
      </div>

      {/* Elenco separato 1: Unità Didattiche Preferite */}
      <section aria-label="Unità didattiche preferite" className="space-y-3">
        <h4 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-600" aria-hidden="true" />
          <span>Unità Didattiche Preferite ({favoriteUnits.length})</span>
        </h4>

        {favoriteUnits.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
            Non hai ancora contrassegnato nessuna unità didattica. Clicca sull’icona stella accanto al titolo di un’unità per aggiungerla qui.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {favoriteUnits.map((unit) => {
              const gTheme = GRADE_THEMES[unit.gradeId];
              return (
                <div
                  key={unit.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className={`text-xs font-semibold ${gTheme.accentText}`}>
                      {gTheme.label} · Unità {unit.order}
                    </div>
                    <div className="font-display font-bold text-slate-900 mt-0.5 truncate">
                      {unit.title}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {unit.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onJumpToUnit(unit.gradeId, unit.id);
                        onClose();
                      }}
                      className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:underline ${gTheme.accentText}`}
                    >
                      <span>Vai all’unità</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleFavoriteUnit(unit.id)}
                    aria-label={`Rimuovi ${unit.title} dai preferiti`}
                    title="Rimuovi dai preferiti"
                    className="w-9 h-9 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Elenco separato 2: Risorse Preferite */}
      <section aria-label="Risorse preferite" className="space-y-3 pt-2 border-t border-slate-200">
        <h4 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-600" aria-hidden="true" />
          <span>Risorse Preferite ({favoriteResources.length})</span>
        </h4>

        {favoriteResources.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
            Non hai ancora contrassegnato nessuna risorsa (schede, video, immagini, attività o link). Clicca sulla stella di qualsiasi card per salvarla qui.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {favoriteResources.map((res) => {
              const gTheme = GRADE_THEMES[res.gradeId];
              const meta = RESOURCE_TYPE_META[res.type];
              const unit = data.units.find((u) => u.id === res.unitId);
              return (
                <div
                  key={res.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className={`font-semibold ${gTheme.accentText}`}>
                        {gTheme.shortLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{meta.shortLabel}</span>
                      {unit && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{unit.title}</span>
                        </>
                      )}
                    </div>
                    <div className="font-display font-bold text-slate-900 mt-0.5 truncate">
                      {res.title}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {res.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (res.type === 'link' && res.url) {
                          window.open(res.url, '_blank', 'noopener,noreferrer');
                          return;
                        }
                        onClose();
                        onOpenResourceFromFavorites(res);
                      }}
                      className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:underline ${gTheme.accentText}`}
                    >
                      <span>{meta.actionLabel}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleFavoriteResource(res.id)}
                    aria-label={`Rimuovi ${res.title} dai preferiti`}
                    title="Rimuovi dai preferiti"
                    className="w-9 h-9 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-5 bg-slate-950/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-panel-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              {isUnlocked ? (
                <Unlock className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Lock className="w-5 h-5" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0">
              <h2 id="teacher-panel-title" className="font-display text-lg font-bold text-slate-900">
                Area Docente e Preferiti
              </h2>
              <p className="text-xs text-slate-500">
                I miei preferiti per gli alunni (senza login) e gestione didattica per il docente
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isUnlocked && (
              <button
                type="button"
                onClick={() => onSetTeacherMode(!teacherMode)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                  teacherMode
                    ? 'bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {teacherMode ? (
                  <>
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>Modalità Docente: Attiva (vedi Bozze)</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                    <span>Modalità Docente: Disattiva (vista Alunni)</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi Area Docente"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Guest Switcher (I miei preferiti without login vs PIN Gate) or Management Workspace */}
        {!isUnlocked ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="px-5 sm:px-6 pt-3 border-b border-slate-200 flex items-center gap-2 bg-white shrink-0">
              <button
                type="button"
                onClick={() => setGuestSection('favorites')}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  guestSection === 'favorites'
                    ? 'border-amber-500 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                <span>I miei preferiti ({totalFavoritesCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setGuestSection('pin')}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  guestSection === 'pin'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <KeyRound className="w-4 h-4" aria-hidden="true" />
                <span>Accesso Docente (PIN)</span>
              </button>
            </div>

            {guestSection === 'favorites' ? (
              <div className="p-5 sm:p-6 overflow-y-auto flex-1">
                {renderFavoritesSection()}
              </div>
            ) : (
              <div className="p-6 sm:p-12 flex items-center justify-center flex-1 overflow-y-auto">
                <form
                  onSubmit={handlePinSubmit}
                  className="w-full max-w-sm bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto">
                    <KeyRound className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Accesso riservato al docente
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Inserisci il codice PIN per creare risorse, gestire le bozze ed esportare i backup.
                    </p>
                    <p className="text-xs font-mono font-semibold text-emerald-700 mt-2 bg-emerald-50 border border-emerald-200 rounded-lg py-1.5 px-3 inline-block">
                      PIN demo per test: 1234
                    </p>
                  </div>

                  <div>
                    <label htmlFor="teacher-pin-input" className="sr-only">
                      Codice PIN docente
                    </label>
                    <input
                      id="teacher-pin-input"
                      type="password"
                      inputMode="numeric"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Inserisci PIN (es. 1234)"
                      autoFocus
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    {pinError && (
                      <p className="text-xs text-rose-700 font-medium mt-2 text-center">
                        {pinError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                  >
                    Sblocca Area Docente
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="px-5 sm:px-6 pt-3 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto bg-white shrink-0">
              {[
                { id: 'favorites' as TeacherTab, label: `I miei preferiti (${totalFavoritesCount})`, icon: Star },
                { id: 'resources' as TeacherTab, label: 'Risorse', icon: FileText },
                { id: 'units' as TeacherTab, label: 'Unità Didattiche', icon: Layers },
                { id: 'timeline' as TeacherTab, label: 'Linea del Tempo', icon: Calendar },
                { id: 'quiz' as TeacherTab, label: 'Mini-Quiz', icon: HelpCircle },
                { id: 'glossary' as TeacherTab, label: 'Glossario', icon: BookOpen },
                { id: 'backup' as TeacherTab, label: 'Backup JSON', icon: Download },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'border-slate-900 text-slate-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {feedbackMsg && (
              <div className="mx-5 sm:mx-6 mt-3 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {/* Tab Panels */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {activeTab === 'favorites' && renderFavoritesSection()}

              {/* TAB 1: RISORSE */}
              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleSaveResource}
                    className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 h-fit"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {resEditId ? 'Modifica risorsa' : 'Aggiungi nuova risorsa'}
                      </h3>
                      {resEditId && (
                        <button
                          type="button"
                          onClick={resetResourceForm}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Annulla modifica
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Classe
                        </label>
                        <select
                          value={resGrade}
                          onChange={(e) => setResGrade(e.target.value as GradeId)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="1">Classe Prima</option>
                          <option value="2">Classe Seconda</option>
                          <option value="3">Classe Terza</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Stato visibilità
                        </label>
                        <select
                          value={resStatus}
                          onChange={(e) => setResStatus(e.target.value as PublishStatus)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="published">Pubblicato</option>
                          <option value="draft">Bozza (solo docente)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Unità Didattica
                        </label>
                        <button
                          type="button"
                          onClick={() => setCreatingInlineUnit(!creatingInlineUnit)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                        >
                          <FolderPlus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{creatingInlineUnit ? 'Usa esistente' : '+ Crea nuova unità'}</span>
                        </button>
                      </div>
                      {creatingInlineUnit ? (
                        <input
                          type="text"
                          required
                          value={inlineUnitTitle}
                          onChange={(e) => setInlineUnitTitle(e.target.value)}
                          placeholder="Titolo della nuova unità didattica..."
                          className="w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 text-sm"
                        />
                      ) : (
                        <select
                          value={resUnitId}
                          onChange={(e) => setResUnitId(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          {gradeUnitsForResource.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.title} {u.status === 'draft' ? '(BOZZA)' : ''}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tipologia di contenuto
                      </label>
                      <select
                        value={resType}
                        onChange={(e) => setResType(e.target.value as ResourceType)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      >
                        {Object.entries(RESOURCE_TYPE_META).map(([key, meta]) => (
                          <option key={key} value={key}>
                            {meta.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Titolo *
                      </label>
                      <input
                        type="text"
                        required
                        value={resTitle}
                        onChange={(e) => setResTitle(e.target.value)}
                        placeholder="Es. Le Parabole del Vangelo"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Descrizione breve *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={resDesc}
                        onChange={(e) => setResDesc(e.target.value)}
                        placeholder="Breve riassunto visibile nella card..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    {(resType === 'video' || resType === 'link' || resType === 'document') && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {resType === 'video'
                            ? 'Link YouTube (es. https://www.youtube.com/watch?v=...)'
                            : resType === 'link'
                            ? 'URL sito web (https://...)'
                            : 'Link esterno opzionale (PDF o sito)'}
                        </label>
                        <input
                          type="url"
                          required={resType === 'video' || resType === 'link'}
                          value={resUrl}
                          onChange={(e) => setResUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        />
                      </div>
                    )}

                    {resType === 'image' && (
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Scegli immagine della raccolta o inserisci percorso
                          </label>
                          <select
                            value={PRESET_IMAGES.some((p) => p.url === resImageUrl) ? resImageUrl : ''}
                            onChange={(e) => setResImageUrl(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm mb-2"
                          >
                            <option value="">-- Seleziona immagine illustrata --</option>
                            {PRESET_IMAGES.map((img) => (
                              <option key={img.url} value={img.url}>
                                {img.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={resImageUrl}
                            onChange={(e) => setResImageUrl(e.target.value)}
                            placeholder="/src/assets/images/... oppure URL"
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Didascalia dell’opera / mappa
                          </label>
                          <input
                            type="text"
                            value={resCaption}
                            onChange={(e) => setResCaption(e.target.value)}
                            placeholder="Spiegazione proiettata sotto l'immagine..."
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {(resType === 'document' || resType === 'activity') && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {resType === 'document'
                            ? 'Testo completo della scheda didattica'
                            : 'Istruzioni passo per passo per gli alunni'}
                        </label>
                        <textarea
                          rows={5}
                          value={resContent}
                          onChange={(e) => setResContent(e.target.value)}
                          placeholder="Scrivi qui il testo da leggere e proiettare sulla LIM..."
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nota tempo / etichetta (opzionale)
                      </label>
                      <input
                        type="text"
                        value={resMeta}
                        onChange={(e) => setResMeta(e.target.value)}
                        placeholder="Es. Attività a coppie · 20 min"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span>{resEditId ? 'Salva modifiche' : 'Salva risorsa'}</span>
                    </button>
                  </form>

                  {/* Resource list */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        Elenco risorse ({filteredResourcesList.length})
                      </h3>
                      <select
                        value={resFilterGrade}
                        onChange={(e) => setResFilterGrade(e.target.value as GradeId | 'all')}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold"
                      >
                        <option value="all">Tutte le classi</option>
                        <option value="1">Classe Prima</option>
                        <option value="2">Classe Seconda</option>
                        <option value="3">Classe Terza</option>
                      </select>
                    </div>

                    <div className="space-y-2.5">
                      {filteredResourcesList.map((r) => {
                        const unit = data.units.find((u) => u.id === r.unitId);
                        const isDraft = r.status === 'draft';
                        return (
                          <div
                            key={r.id}
                            className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isDraft ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span className={`font-semibold ${GRADE_THEMES[r.gradeId].accentText}`}>
                                  {GRADE_THEMES[r.gradeId].shortLabel}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{RESOURCE_TYPE_META[r.type].shortLabel}</span>
                                <span aria-hidden="true">·</span>
                                <span className="truncate">{unit?.title || 'Unità'}</span>
                                {isDraft && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                    BOZZA
                                  </span>
                                )}
                              </div>
                              <div className="font-semibold text-sm text-slate-900 mt-0.5 truncate">
                                {r.title}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateData((prev) => ({
                                    ...prev,
                                    resources: prev.resources.map((item) =>
                                      item.id === r.id
                                        ? {
                                            ...item,
                                            status: item.status === 'published' ? 'draft' : 'published',
                                          }
                                        : item
                                    ),
                                  }))
                                }
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap"
                              >
                                {isDraft ? 'Pubblica' : 'Bozza'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setResEditId(r.id);
                                  setResGrade(r.gradeId);
                                  setResUnitId(r.unitId);
                                  setResType(r.type);
                                  setResTitle(r.title);
                                  setResDesc(r.description);
                                  setResContent(r.content);
                                  setResUrl(r.url || '');
                                  setResImageUrl(r.imageUrl || '');
                                  setResCaption(r.caption || '');
                                  setResMeta(r.durationOrMeta || '');
                                  setResStatus(r.status);
                                }}
                                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                                aria-label={`Modifica ${r.title}`}
                              >
                                <Pencil className="w-4 h-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateData((prev) => ({
                                    ...prev,
                                    resources: prev.resources.filter((item) => item.id !== r.id),
                                  }))
                                }
                                className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 cursor-pointer"
                                aria-label={`Elimina ${r.title}`}
                              >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: UNITÀ DIDATTICHE */}
              {activeTab === 'units' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleSaveUnit}
                    className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 h-fit"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {unitEditId ? 'Modifica unità didattica' : 'Nuova unità didattica'}
                      </h3>
                      {unitEditId && (
                        <button
                          type="button"
                          onClick={resetUnitForm}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Annulla
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Classe
                        </label>
                        <select
                          value={unitGrade}
                          onChange={(e) => setUnitGrade(e.target.value as GradeId)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="1">Classe Prima</option>
                          <option value="2">Classe Seconda</option>
                          <option value="3">Classe Terza</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Stato
                        </label>
                        <select
                          value={unitStatus}
                          onChange={(e) => setUnitStatus(e.target.value as PublishStatus)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="published">Pubblicato</option>
                          <option value="draft">Bozza</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Titolo unità *
                      </label>
                      <input
                        type="text"
                        required
                        value={unitTitle}
                        onChange={(e) => setUnitTitle(e.target.value)}
                        placeholder="Es. I Sacramenti nella vita cristiana"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Descrizione
                      </label>
                      <textarea
                        rows={3}
                        value={unitDesc}
                        onChange={(e) => setUnitDesc(e.target.value)}
                        placeholder="Obiettivi e argomenti principali dell’unità..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ordine di visualizzazione
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={unitOrder}
                        onChange={(e) => setUnitOrder(Number(e.target.value))}
                        className="w-28 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm tabular-nums"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                    >
                      {unitEditId ? 'Aggiorna unità' : 'Crea unità didattica'}
                    </button>
                  </form>

                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="font-display text-base font-bold text-slate-900">
                      Unità configurate ({data.units.length})
                    </h3>
                    {(['1', '2', '3'] as GradeId[]).map((gId) => {
                      const list = data.units
                        .filter((u) => u.gradeId === gId)
                        .sort((a, b) => a.order - b.order);
                      return (
                        <div key={gId} className="space-y-2">
                          <div className={`text-xs font-bold ${GRADE_THEMES[gId].accentText}`}>
                            {GRADE_THEMES[gId].label}
                          </div>
                          {list.map((u) => {
                            const isDraft = u.status === 'draft';
                            return (
                              <div
                                key={u.id}
                                className={`rounded-xl border p-3.5 flex items-center justify-between gap-3 ${
                                  isDraft ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200'
                                }`}
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-slate-900 truncate">
                                      {u.order}. {u.title}
                                    </span>
                                    {isDraft && (
                                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                        BOZZA
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 truncate mt-0.5">{u.description}</p>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onUpdateData((prev) => ({
                                        ...prev,
                                        units: prev.units.map((item) =>
                                          item.id === u.id
                                            ? {
                                                ...item,
                                                status: item.status === 'published' ? 'draft' : 'published',
                                              }
                                            : item
                                        ),
                                      }))
                                    }
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                                  >
                                    {isDraft ? 'Pubblica' : 'Bozza'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setUnitEditId(u.id);
                                      setUnitGrade(u.gradeId);
                                      setUnitTitle(u.title);
                                      setUnitDesc(u.description);
                                      setUnitOrder(u.order);
                                      setUnitStatus(u.status);
                                    }}
                                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                                    aria-label={`Modifica ${u.title}`}
                                  >
                                    <Pencil className="w-4 h-4" aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onUpdateData((prev) => ({
                                        ...prev,
                                        units: prev.units.filter((item) => item.id !== u.id),
                                      }))
                                    }
                                    className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 cursor-pointer"
                                    aria-label={`Elimina ${u.title}`}
                                  >
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: LINEA DEL TEMPO */}
              {activeTab === 'timeline' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleSaveTimeline}
                    className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 h-fit"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {tlEditId ? 'Modifica tappa storica' : 'Nuova tappa cronologica'}
                      </h3>
                      {tlEditId && (
                        <button
                          type="button"
                          onClick={resetTimelineForm}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Annulla
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Classe
                        </label>
                        <select
                          value={tlGrade}
                          onChange={(e) => setTlGrade(e.target.value as GradeId)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="1">Classe Prima</option>
                          <option value="2">Classe Seconda</option>
                          <option value="3">Classe Terza</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Stato
                        </label>
                        <select
                          value={tlStatus}
                          onChange={(e) => setTlStatus(e.target.value as PublishStatus)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="published">Pubblicato</option>
                          <option value="draft">Bozza</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Anno / Data *
                        </label>
                        <input
                          type="text"
                          required
                          value={tlYearLabel}
                          onChange={(e) => setTlYearLabel(e.target.value)}
                          placeholder="Es. 313 d.C."
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Epoca / Contesto
                        </label>
                        <input
                          type="text"
                          value={tlEra}
                          onChange={(e) => setTlEra(e.target.value)}
                          placeholder="Es. Impero Romano"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Titolo evento *
                      </label>
                      <input
                        type="text"
                        required
                        value={tlTitle}
                        onChange={(e) => setTlTitle(e.target.value)}
                        placeholder="Es. Editto di Milano"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Spiegazione breve *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={tlDesc}
                        onChange={(e) => setTlDesc(e.target.value)}
                        placeholder="Descrizione chiara per gli studenti..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Immagine (opzionale)
                      </label>
                      <select
                        value={PRESET_IMAGES.some((p) => p.url === tlImageUrl) ? tlImageUrl : ''}
                        onChange={(e) => setTlImageUrl(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm mb-2"
                      >
                        <option value="">-- Nessuna immagine o scegli preset --</option>
                        {PRESET_IMAGES.map((img) => (
                          <option key={img.url} value={img.url}>
                            {img.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={tlImageUrl}
                        onChange={(e) => setTlImageUrl(e.target.value)}
                        placeholder="URL immagine opzionale"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ordine cronologico
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={tlOrder}
                        onChange={(e) => setTlOrder(Number(e.target.value))}
                        className="w-28 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm tabular-nums"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                    >
                      {tlEditId ? 'Salva modifiche tappa' : 'Aggiungi alla Linea del Tempo'}
                    </button>
                  </form>

                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="font-display text-base font-bold text-slate-900">
                      Eventi per {GRADE_THEMES[tlGrade].label}
                    </h3>
                    {data.timelineEvents
                      .filter((t) => t.gradeId === tlGrade)
                      .sort((a, b) => a.order - b.order)
                      .map((ev) => {
                        const isDraft = ev.status === 'draft';
                        return (
                          <div
                            key={ev.id}
                            className={`rounded-xl border p-3.5 flex items-center justify-between gap-3 ${
                              isDraft ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span className="font-mono font-semibold text-slate-800 tabular-nums">
                                  #{ev.order} · {ev.yearLabel}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{ev.era}</span>
                                {isDraft && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                    BOZZA
                                  </span>
                                )}
                              </div>
                              <div className="font-semibold text-sm text-slate-900 mt-0.5 truncate">
                                {ev.title}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateData((prev) => ({
                                    ...prev,
                                    timelineEvents: prev.timelineEvents.map((item) =>
                                      item.id === ev.id
                                        ? {
                                            ...item,
                                            status: item.status === 'published' ? 'draft' : 'published',
                                          }
                                        : item
                                    ),
                                  }))
                                }
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                              >
                                {isDraft ? 'Pubblica' : 'Bozza'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTlEditId(ev.id);
                                  setTlGrade(ev.gradeId);
                                  setTlYearLabel(ev.yearLabel);
                                  setTlEra(ev.era);
                                  setTlTitle(ev.title);
                                  setTlDesc(ev.description);
                                  setTlImageUrl(ev.imageUrl || '');
                                  setTlOrder(ev.order);
                                  setTlStatus(ev.status);
                                }}
                                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                                aria-label={`Modifica ${ev.title}`}
                              >
                                <Pencil className="w-4 h-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateData((prev) => ({
                                    ...prev,
                                    timelineEvents: prev.timelineEvents.filter((item) => item.id !== ev.id),
                                  }))
                                }
                                className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 cursor-pointer"
                                aria-label={`Elimina ${ev.title}`}
                              >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* TAB 4: MINI-QUIZ */}
              {activeTab === 'quiz' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleSaveQuizQuestion}
                    className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3.5 h-fit"
                  >
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {qEditId ? 'Modifica domanda quiz' : 'Aggiungi domanda al quiz'}
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Classe
                        </label>
                        <select
                          value={quizGrade}
                          onChange={(e) => setQuizGrade(e.target.value as GradeId)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          <option value="1">Classe Prima</option>
                          <option value="2">Classe Seconda</option>
                          <option value="3">Classe Terza</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Unità Didattica
                        </label>
                        <select
                          value={quizUnitId}
                          onChange={(e) => setQuizUnitId(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                          {data.units
                            .filter((u) => u.gradeId === quizGrade)
                            .map((u) => (
                              <option key={u.id} value={u.id}>
                                {u.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Domanda *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={qQuestion}
                        onChange={(e) => setQQuestion(e.target.value)}
                        placeholder="Scrivi la domanda a scelta multipla..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Opzioni di risposta (almeno 2)
                      </label>
                      {[
                        { val: qOpt1, set: setQOpt1, label: 'Opzione 1 *', req: true },
                        { val: qOpt2, set: setQOpt2, label: 'Opzione 2 *', req: true },
                        { val: qOpt3, set: setQOpt3, label: 'Opzione 3', req: false },
                        { val: qOpt4, set: setQOpt4, label: 'Opzione 4', req: false },
                      ].map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="correctOption"
                            checked={qCorrectIndex === idx}
                            onChange={() => setQCorrectIndex(idx)}
                            title="Segna come risposta corretta"
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            required={opt.req}
                            value={opt.val}
                            onChange={(e) => opt.set(e.target.value)}
                            placeholder={opt.label}
                            className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm"
                          />
                        </div>
                      ))}
                      <p className="text-[11px] text-slate-500">
                        Seleziona il cerchietto accanto alla risposta corretta.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Spiegazione breve (mostrata dopo la risposta)
                      </label>
                      <textarea
                        rows={2}
                        value={qExplanation}
                        onChange={(e) => setQExplanation(e.target.value)}
                        placeholder="Spiega perché la risposta è corretta..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex gap-2">
                      {qEditId && (
                        <button
                          type="button"
                          onClick={resetQuestionForm}
                          className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold cursor-pointer"
                        >
                          Annulla
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex-1 py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                      >
                        {qEditId ? 'Aggiorna domanda' : 'Aggiungi domanda'}
                      </button>
                    </div>
                  </form>

                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        Domande dell’unità ({currentUnitQuiz?.questions.length || 0})
                      </h3>

                      {currentUnitQuiz && (
                        <button
                          type="button"
                          onClick={handleToggleQuizStatus}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                            currentUnitQuiz.status === 'draft'
                              ? 'bg-amber-100 border-amber-300 text-amber-900'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          }`}
                        >
                          Quiz: {currentUnitQuiz.status === 'draft' ? 'BOZZA (clicca per pubblicare)' : 'Pubblicato'}
                        </button>
                      )}
                    </div>

                    {!currentUnitQuiz || currentUnitQuiz.questions.length === 0 ? (
                      <div className="rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-500">
                        Nessuna domanda presente per questa unità. Aggiungine una dal modulo a sinistra.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {currentUnitQuiz.questions.map((q, idx) => (
                          <div
                            key={q.id}
                            className="rounded-xl border border-slate-200 bg-white p-4 flex items-start justify-between gap-3"
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="text-sm font-semibold text-slate-900">
                                {idx + 1}. {q.question}
                              </div>
                              <div className="text-xs text-emerald-700 font-medium">
                                Risposta corretta: {q.options[q.correctIndex]}
                              </div>
                              <div className="text-xs text-slate-500">{q.explanation}</div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setQEditId(q.id);
                                  setQQuestion(q.question);
                                  setQOpt1(q.options[0] || '');
                                  setQOpt2(q.options[1] || '');
                                  setQOpt3(q.options[2] || '');
                                  setQOpt4(q.options[3] || '');
                                  setQCorrectIndex(q.correctIndex);
                                  setQExplanation(q.explanation);
                                }}
                                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                                aria-label="Modifica domanda"
                              >
                                <Pencil className="w-4 h-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateData((prev) => ({
                                    ...prev,
                                    quizzes: prev.quizzes.map((qz) =>
                                      qz.id === currentUnitQuiz.id
                                        ? {
                                            ...qz,
                                            questions: qz.questions.filter((item) => item.id !== q.id),
                                          }
                                        : qz
                                    ),
                                  }))
                                }
                                className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 cursor-pointer"
                                aria-label="Elimina domanda"
                              >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: GLOSSARIO */}
              {activeTab === 'glossary' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleSaveGlossary}
                    className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 h-fit"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold text-slate-900">
                        {glEditId ? 'Modifica voce glossario' : 'Aggiungi voce al glossario'}
                      </h3>
                      {glEditId && (
                        <button
                          type="button"
                          onClick={resetGlossaryForm}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Annulla
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Termine *
                      </label>
                      <input
                        type="text"
                        required
                        value={glTerm}
                        onChange={(e) => setGlTerm(e.target.value)}
                        placeholder="Es. Liturgia"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ambito / Categoria
                      </label>
                      <input
                        type="text"
                        value={glCategory}
                        onChange={(e) => setGlCategory(e.target.value)}
                        placeholder="Es. Bibbia, Storia, Dialogo..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Definizione semplice *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={glDef}
                        onChange={(e) => setGlDef(e.target.value)}
                        placeholder="Spiegazione chiara adatta a studenti delle medie..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Origine o esempio (opzionale)
                      </label>
                      <input
                        type="text"
                        value={glOrigin}
                        onChange={(e) => setGlOrigin(e.target.value)}
                        placeholder="Es. Dal greco..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                    >
                      {glEditId ? 'Aggiorna termine' : 'Aggiungi al glossario'}
                    </button>
                  </form>

                  <div className="lg:col-span-7 space-y-2.5">
                    <h3 className="font-display text-base font-bold text-slate-900">
                      Voci nel Glossario IRC ({data.glossary.length})
                    </h3>
                    {[...data.glossary]
                      .sort((a, b) => a.term.localeCompare(b.term, 'it'))
                      .map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-xl border border-slate-200 bg-white p-3.5 flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-slate-900">
                                {entry.term}
                              </span>
                              <span className="text-xs text-slate-400">· {entry.category}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                              {entry.definition}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setGlEditId(entry.id);
                                setGlTerm(entry.term);
                                setGlCategory(entry.category);
                                setGlDef(entry.definition);
                                setGlOrigin(entry.exampleOrOrigin || '');
                              }}
                              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                              aria-label={`Modifica ${entry.term}`}
                            >
                              <Pencil className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateData((prev) => ({
                                  ...prev,
                                  glossary: prev.glossary.filter((g) => g.id !== entry.id),
                                }))
                              }
                              className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 cursor-pointer"
                              aria-label={`Elimina ${entry.term}`}
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 6: BACKUP JSON */}
              {activeTab === 'backup' && (
                <div className="max-w-2xl space-y-5">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 space-y-3">
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Trasferisci lezioni tra PC di casa e LIM di scuola
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Tutti i contenuti modificati vengono salvati automaticamente nella memoria del browser (localStorage). Esporta un file JSON per portare il tuo archivio completo su un altro computer o sulla LIM in classe.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          exportPortalDataJson(data);
                          showSuccess('File JSON esportato! Controlla la cartella Download.');
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        <span>Esporta Backup (JSON)</span>
                      </button>

                      <label className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-sm font-semibold cursor-pointer">
                        <Upload className="w-4 h-4" aria-hidden="true" />
                        <span>Importa Backup (JSON)</span>
                        <input
                          type="file"
                          accept=".json,application/json"
                          onChange={handleImportFile}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 space-y-3">
                    <h4 className="font-display text-base font-bold text-slate-900">
                      Ripristina contenuti predefiniti
                    </h4>
                    <p className="text-sm text-slate-600">
                      Se desideri riportare tutte le unità, le schede, i quiz e il glossario allo stato iniziale del portale, usa il pulsante qui sotto.
                    </p>
                    {!confirmReset ? (
                      <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-300 bg-white text-rose-700 hover:bg-rose-50 text-xs font-semibold cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        <span>Ripristina dati predefiniti</span>
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-semibold text-rose-800">
                          Confermi di voler sovrascrivere le modifiche locali?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onResetDefaultData();
                            setConfirmReset(false);
                            showSuccess('Dati predefiniti ripristinati.');
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-700 text-white text-xs font-semibold cursor-pointer"
                        >
                          Sì, ripristina
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmReset(false)}
                          className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          Annulla
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
