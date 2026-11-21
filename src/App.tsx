import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Eye,
  EyeOff,
  Filter,
  HelpCircle,
  Layers,
  Plus,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import { INITIAL_PORTAL_DATA } from './data/initialData';
import {
  FavoritesState,
  GradeId,
  LimContent,
  PortalData,
  ResourceItem,
  ResourceType,
  ThematicUnit,
  TimelineEvent,
  UnitQuiz,
} from './types/irc';
import { requestAiSummary } from './utils/aiSummary';
import { GRADE_THEMES, RESOURCE_TYPE_META } from './utils/gradeThemes';
import {
  loadFavorites,
  loadPortalData,
  loadTeacherMode,
  saveFavorites,
  savePortalData,
  saveTeacherMode,
} from './utils/storage';
import { AiSummaryModal } from './components/AiSummaryModal';
import { GlossaryDrawer } from './components/GlossaryDrawer';
import { GradeSelector } from './components/GradeSelector';
import { Header } from './components/Header';
import { LimProjectionModal } from './components/LimProjectionModal';
import { QuizModal } from './components/QuizModal';
import { ResourceCard } from './components/ResourceCard';
import { ResourceModal } from './components/ResourceModal';
import { TeacherModal, TeacherTab } from './components/TeacherModal';
import { TimelineSection } from './components/TimelineSection';

type GradeViewTab = 'units' | 'timeline';

export function App() {
  const [data, setData] = useState<PortalData>(() => loadPortalData());
  const [favorites, setFavorites] = useState<FavoritesState>(() => loadFavorites());
  const [teacherMode, setTeacherMode] = useState<boolean>(() => loadTeacherMode());
  const [selectedGrade, setSelectedGrade] = useState<GradeId>('1');
  const [gradeViewTab, setGradeViewTab] = useState<GradeViewTab>('units');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<ResourceType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<UnitQuiz | null>(null);
  const [limContent, setLimContent] = useState<LimContent | null>(null);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  // Unit AI Summary Modal state
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [summaryTargetUnit, setSummaryTargetUnit] = useState<ThematicUnit | null>(null);
  const [unitSummaryText, setUnitSummaryText] = useState<string | null>(null);
  const [unitSummaryLoading, setUnitSummaryLoading] = useState(false);
  const [unitSummaryError, setUnitSummaryError] = useState<string | null>(null);

  // Teacher Panel state
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [teacherInitialTab, setTeacherInitialTab] = useState<TeacherTab>('resources');
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [editingTimeline, setEditingTimeline] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    savePortalData(data);
  }, [data]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    saveTeacherMode(teacherMode);
  }, [teacherMode]);

  // Reset sub-filters when grade changes (preserve jumpToUnit selection if just jumped)
  const handleSelectGrade = (grade: GradeId) => {
    setSelectedGrade(grade);
    setSelectedUnitId('all');
    setTypeFilter('all');
    setSearchQuery('');
  };

  const theme = GRADE_THEMES[selectedGrade];

  const handleToggleFavoriteUnit = (unitId: string) => {
    setFavorites((prev) => {
      const exists = prev.unitIds.includes(unitId);
      return {
        ...prev,
        unitIds: exists
          ? prev.unitIds.filter((id) => id !== unitId)
          : [...prev.unitIds, unitId],
      };
    });
  };

  const handleToggleFavoriteResource = (resourceId: string) => {
    setFavorites((prev) => {
      const exists = prev.resourceIds.includes(resourceId);
      return {
        ...prev,
        resourceIds: exists
          ? prev.resourceIds.filter((id) => id !== resourceId)
          : [...prev.resourceIds, resourceId],
      };
    });
  };

  const handleGenerateUnitSummary = async (unit: ThematicUnit) => {
    setSummaryTargetUnit(unit);
    setSummaryModalOpen(true);
    setUnitSummaryLoading(true);
    setUnitSummaryError(null);
    setUnitSummaryText(null);

    const unitDocs = data.resources.filter(
      (r) =>
        r.unitId === unit.id &&
        (teacherMode || r.status === 'published') &&
        (r.type === 'document' || r.type === 'activity')
    );

    const combinedText = [
      `Descrizione unità: ${unit.description}`,
      ...unitDocs.map((doc) => `--- ${doc.title} ---\n${doc.description}\n${doc.content}`),
    ].join('\n\n');

    try {
      const summary = await requestAiSummary({
        title: unit.title,
        content: combinedText,
        contextLabel: `${GRADE_THEMES[unit.gradeId].label} · Unità Didattica ${unit.order}`,
      });
      setUnitSummaryText(summary);
    } catch (err: unknown) {
      setUnitSummaryError(
        err instanceof Error
          ? err.message
          : 'Errore imprevisto durante la generazione del riassunto.'
      );
    } finally {
      setUnitSummaryLoading(false);
    }
  };

  // Visible units for selected grade
  const gradeUnits = useMemo(() => {
    return data.units
      .filter((u) => u.gradeId === selectedGrade && (teacherMode || u.status === 'published'))
      .sort((a, b) => a.order - b.order);
  }, [data.units, selectedGrade, teacherMode]);

  const visibleUnitIds = useMemo(() => new Set(gradeUnits.map((u) => u.id)), [gradeUnits]);

  // Visible resources for selected grade + filters
  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return data.resources.filter((r) => {
      if (r.gradeId !== selectedGrade) return false;
      if (!teacherMode && r.status !== 'published') return false;
      if (!visibleUnitIds.has(r.unitId)) return false;
      if (selectedUnitId !== 'all' && r.unitId !== selectedUnitId) return false;
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      if (
        q &&
        !r.title.toLowerCase().includes(q) &&
        !r.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [
    data.resources,
    selectedGrade,
    teacherMode,
    visibleUnitIds,
    selectedUnitId,
    typeFilter,
    searchQuery,
  ]);

  // Visible timeline events for selected grade
  const gradeTimelineEvents = useMemo(() => {
    return data.timelineEvents.filter(
      (ev) => ev.gradeId === selectedGrade && (teacherMode || ev.status === 'published')
    );
  }, [data.timelineEvents, selectedGrade, teacherMode]);

  // Stats per grade card
  const statsByGrade = useMemo(() => {
    const calc = (gId: GradeId) => {
      const units = data.units.filter(
        (u) => u.gradeId === gId && (teacherMode || u.status === 'published')
      );
      const unitSet = new Set(units.map((u) => u.id));
      const resources = data.resources.filter(
        (r) =>
          r.gradeId === gId &&
          unitSet.has(r.unitId) &&
          (teacherMode || r.status === 'published')
      );
      return { unitsCount: units.length, resourcesCount: resources.length };
    };
    return {
      '1': calc('1'),
      '2': calc('2'),
      '3': calc('3'),
    };
  }, [data.units, data.resources, teacherMode]);

  const totalFavoritesCount = favorites.unitIds.length + favorites.resourceIds.length;

  const handleProjectResourceToLim = (resource: ResourceItem) => {
    const unit = data.units.find((u) => u.id === resource.unitId);
    setActiveResource(null);
    setLimContent({
      kind: 'resource',
      resource,
      unitTitle: unit?.title || 'Unità didattica',
      gradeLabel: GRADE_THEMES[resource.gradeId].label,
    });
  };

  const handleProjectTimelineToLim = (event: TimelineEvent) => {
    setLimContent({
      kind: 'timeline',
      event,
      gradeLabel: GRADE_THEMES[event.gradeId].label,
    });
  };

  const handleToggleResourceStatus = (resourceId: string) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.map((r) =>
        r.id === resourceId
          ? { ...r, status: r.status === 'published' ? 'draft' : 'published' }
          : r
      ),
    }));
  };

  const handleDeleteResource = (resourceId: string) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r.id !== resourceId),
    }));
  };

  const handleToggleTimelineStatus = (eventId: string) => {
    setData((prev) => ({
      ...prev,
      timelineEvents: prev.timelineEvents.map((ev) =>
        ev.id === eventId
          ? { ...ev, status: ev.status === 'published' ? 'draft' : 'published' }
          : ev
      ),
    }));
  };

  const handleDeleteTimeline = (eventId: string) => {
    setData((prev) => ({
      ...prev,
      timelineEvents: prev.timelineEvents.filter((ev) => ev.id !== eventId),
    }));
  };

  const handleOpenUnitQuiz = (unitId: string) => {
    const quiz = data.quizzes.find(
      (q) => q.unitId === unitId && (teacherMode || q.status === 'published')
    );
    if (quiz) {
      setActiveQuiz(quiz);
    }
  };

  const unitsToDisplay =
    selectedUnitId === 'all'
      ? gradeUnits
      : gradeUnits.filter((u) => u.id === selectedUnitId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        teacherMode={teacherMode}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenTeacherPanel={() => {
          setEditingResource(null);
          setEditingTimeline(null);
          setTeacherInitialTab(teacherMode ? 'resources' : 'favorites');
          setTeacherOpen(true);
        }}
        glossaryCount={data.glossary.length}
      />

      {/* Teacher Mode active ribbon (functional exit/quick-add bar) */}
      {teacherMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-amber-950 font-medium">
              <Eye className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
              <span>
                Modalità Docente attiva: stai visualizzando anche i contenuti in stato <strong>BOZZA</strong>.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingResource(null);
                  setTeacherInitialTab('resources');
                  setTeacherOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Nuova risorsa</span>
              </button>
              <button
                type="button"
                onClick={() => setTeacherMode(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-amber-950 text-xs font-semibold hover:bg-amber-100 cursor-pointer whitespace-nowrap"
              >
                <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Passa a vista Alunni</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">
        {/* Grade Navigation Cards */}
        <GradeSelector
          selectedGrade={selectedGrade}
          onSelectGrade={handleSelectGrade}
          statsByGrade={statsByGrade}
        />

        {/* Active Grade Workspace Header & Mode Switch (Unità Didattiche vs Linea del Tempo + Preferiti) */}
        <section
          aria-label={`Contenuti per ${theme.label}`}
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <div className={`text-xs font-semibold ${theme.accentText}`}>
              {theme.focusArea}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
              {theme.label} · {theme.shortLabel}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            {/* Quick access to I miei preferiti (no login required) */}
            <button
              type="button"
              onClick={() => {
                setEditingResource(null);
                setEditingTimeline(null);
                setTeacherInitialTab('favorites');
                setTeacherOpen(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 hover:bg-amber-100 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" aria-hidden="true" />
              <span>I miei preferiti</span>
              <span className="tabular-nums text-amber-700">({totalFavoritesCount})</span>
            </button>

            {/* Primary View Switcher: Unità Didattiche | Linea del Tempo */}
            <div
              className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200"
              role="tablist"
              aria-label="Sezioni della classe"
            >
              <button
                type="button"
                role="tab"
                aria-selected={gradeViewTab === 'units'}
                onClick={() => setGradeViewTab('units')}
                className={`inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  gradeViewTab === 'units'
                    ? `${theme.tabActive} shadow-sm`
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Unità Didattiche ({gradeUnits.length})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={gradeViewTab === 'timeline'}
                onClick={() => setGradeViewTab('timeline')}
                className={`inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  gradeViewTab === 'timeline'
                    ? `${theme.tabActive} shadow-sm`
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Linea del Tempo ({gradeTimelineEvents.length})</span>
              </button>
            </div>
          </div>
        </section>

        {/* VIEW 1: UNITÀ DIDATTICHE & RISORSE */}
        {gradeViewTab === 'units' && (
          <div className="space-y-7">
            {/* Filter Toolbar: Unit Tabs + Type Filter + Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtra per unità didattica">
                <button
                  type="button"
                  onClick={() => setSelectedUnitId('all')}
                  className={`px-3.5 py-2 min-h-[38px] rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedUnitId === 'all'
                      ? `${theme.accentBg} text-white`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tutte le unità
                </button>
                {gradeUnits.map((unit) => {
                  const active = selectedUnitId === unit.id;
                  return (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => setSelectedUnitId(unit.id)}
                      className={`px-3.5 py-2 min-h-[38px] rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? `${theme.accentBg} text-white`
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {unit.title}
                      {unit.status === 'draft' ? ' (Bozza)' : ''}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtra per tipologia">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
                    <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Tipo:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setTypeFilter('all')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      typeFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Tutti
                  </button>
                  {(Object.keys(RESOURCE_TYPE_META) as ResourceType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTypeFilter(t)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        typeFilter === t
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {RESOURCE_TYPE_META[t].shortLabel}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search
                    className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca scheda o attività..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Thematic Units Sections */}
            {unitsToDisplay.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
                Nessuna unità didattica disponibile per questa selezione.
              </div>
            ) : (
              <div className="space-y-8">
                {unitsToDisplay.map((unit) => {
                  const unitResources = filteredResources.filter((r) => r.unitId === unit.id);
                  const unitQuiz = data.quizzes.find(
                    (q) =>
                      q.unitId === unit.id &&
                      q.questions.length > 0 &&
                      (teacherMode || q.status === 'published')
                  );
                  const isUnitFav = favorites.unitIds.includes(unit.id);

                  // Hide empty unit sections only when a specific search/type filter is active
                  const hasActiveSubFilter = typeFilter !== 'all' || searchQuery.trim().length > 0;
                  if (hasActiveSubFilter && unitResources.length === 0) {
                    return null;
                  }

                  return (
                    <section
                      key={unit.id}
                      aria-labelledby={`unit-heading-${unit.id}`}
                      className="space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-slate-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold ${theme.accentText}`}>
                              Unità {unit.order}
                            </span>
                            {unit.status === 'draft' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-[11px]">
                                <EyeOff className="w-3 h-3" aria-hidden="true" />
                                BOZZA
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5 mt-0.5">
                            <h3
                              id={`unit-heading-${unit.id}`}
                              className="font-display text-xl sm:text-2xl font-bold text-slate-900"
                            >
                              {unit.title}
                            </h3>

                            <button
                              type="button"
                              onClick={() => handleToggleFavoriteUnit(unit.id)}
                              aria-pressed={isUnitFav}
                              aria-label={
                                isUnitFav
                                  ? `Rimuovi unità ${unit.title} dai preferiti`
                                  : `Aggiungi unità ${unit.title} ai preferiti`
                              }
                              title={isUnitFav ? 'Rimuovi unità dai preferiti' : 'Salva unità nei preferiti'}
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                                isUnitFav
                                  ? 'border-amber-300 bg-amber-50 text-amber-500 hover:bg-amber-100'
                                  : 'border-slate-200 bg-white text-slate-400 hover:text-amber-500 hover:bg-slate-50'
                              }`}
                            >
                              <Star
                                className={`w-4 h-4 ${isUnitFav ? 'fill-amber-400 text-amber-500' : ''}`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                            {unit.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleGenerateUnitSummary(unit)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Sparkles className={`w-4 h-4 shrink-0 ${theme.accentText}`} aria-hidden="true" />
                            <span>Genera Riassunto</span>
                          </button>

                          {unitQuiz && (
                            <button
                              type="button"
                              onClick={() => handleOpenUnitQuiz(unit.id)}
                              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${theme.softSurface} ${theme.softBorder} ${theme.accentText} hover:brightness-95`}
                            >
                              <HelpCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                              <span>
                                Mettiti alla prova (Quiz · {unitQuiz.questions.length})
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      {unitResources.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
                          Nessuna risorsa pubblicata in questa unità didattica.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {unitResources.map((resource) => (
                            <ResourceCard
                              key={resource.id}
                              resource={resource}
                              unitTitle={unit.title}
                              gradeId={selectedGrade}
                              teacherMode={teacherMode}
                              isFavorite={favorites.resourceIds.includes(resource.id)}
                              onToggleFavorite={handleToggleFavoriteResource}
                              onOpenResource={setActiveResource}
                              onProjectLim={handleProjectResourceToLim}
                              onToggleStatus={handleToggleResourceStatus}
                              onEditResource={(res) => {
                                setEditingTimeline(null);
                                setEditingResource(res);
                                setTeacherInitialTab('resources');
                                setTeacherOpen(true);
                              }}
                              onDeleteResource={handleDeleteResource}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: LINEA DEL TEMPO */}
        {gradeViewTab === 'timeline' && (
          <TimelineSection
            gradeId={selectedGrade}
            events={gradeTimelineEvents}
            teacherMode={teacherMode}
            onProjectEvent={handleProjectTimelineToLim}
            onToggleStatus={handleToggleTimelineStatus}
            onEditEvent={(ev) => {
              setEditingResource(null);
              setEditingTimeline(ev);
              setTeacherInitialTab('timeline');
              setTeacherOpen(true);
            }}
            onDeleteEvent={handleDeleteTimeline}
            onAddNewEvent={() => {
              setEditingResource(null);
              setEditingTimeline(null);
              setTeacherInitialTab('timeline');
              setTeacherOpen(true);
            }}
          />
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Portale IRC – Religione Cattolica · Scuola Secondaria di Primo Grado
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGlossaryOpen(true)}
              className="hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              Glossario IRC
            </button>
            <button
              type="button"
              onClick={() => {
                setTeacherInitialTab('favorites');
                setTeacherOpen(true);
              }}
              className="hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              I miei preferiti
            </button>
            <button
              type="button"
              onClick={() => {
                setTeacherInitialTab('backup');
                setTeacherOpen(true);
              }}
              className="hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              Area Docente e Backup
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ResourceModal
        resource={activeResource}
        unitTitle={
          data.units.find((u) => u.id === activeResource?.unitId)?.title || ''
        }
        gradeId={activeResource?.gradeId || selectedGrade}
        isFavorite={activeResource ? favorites.resourceIds.includes(activeResource.id) : false}
        onToggleFavorite={handleToggleFavoriteResource}
        onClose={() => setActiveResource(null)}
        onProjectLim={handleProjectResourceToLim}
      />

      <AiSummaryModal
        isOpen={summaryModalOpen}
        title={summaryTargetUnit ? `Unità: ${summaryTargetUnit.title}` : 'Riassunto unità'}
        gradeId={summaryTargetUnit?.gradeId || selectedGrade}
        summary={unitSummaryText}
        isLoading={unitSummaryLoading}
        error={unitSummaryError}
        onRegenerate={() => {
          if (summaryTargetUnit) handleGenerateUnitSummary(summaryTargetUnit);
        }}
        onClose={() => setSummaryModalOpen(false)}
      />

      <QuizModal
        quiz={activeQuiz}
        gradeId={activeQuiz?.gradeId || selectedGrade}
        onClose={() => setActiveQuiz(null)}
      />

      <LimProjectionModal
        content={limContent}
        onExit={() => setLimContent(null)}
      />

      <GlossaryDrawer
        isOpen={glossaryOpen}
        entries={data.glossary}
        onClose={() => setGlossaryOpen(false)}
      />

      <TeacherModal
        isOpen={teacherOpen}
        teacherMode={teacherMode}
        onSetTeacherMode={setTeacherMode}
        data={data}
        onUpdateData={(updater) => setData((prev) => updater(prev))}
        onResetDefaultData={() => setData(INITIAL_PORTAL_DATA)}
        initialTab={teacherInitialTab}
        initialGrade={selectedGrade}
        editingResource={editingResource}
        editingTimeline={editingTimeline}
        favorites={favorites}
        onToggleFavoriteUnit={handleToggleFavoriteUnit}
        onToggleFavoriteResource={handleToggleFavoriteResource}
        onJumpToUnit={(gId, uId) => {
          setSelectedGrade(gId);
          setGradeViewTab('units');
          setSelectedUnitId(uId);
          setTypeFilter('all');
          setSearchQuery('');
        }}
        onOpenResourceFromFavorites={(res) => {
          setSelectedGrade(res.gradeId);
          setGradeViewTab('units');
          setActiveResource(res);
        }}
        onClearPreselectedEdit={() => {
          setEditingResource(null);
          setEditingTimeline(null);
        }}
        onClose={() => setTeacherOpen(false)}
      />
    </div>
  );
}

export default App;
