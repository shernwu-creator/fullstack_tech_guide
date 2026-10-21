import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { EmptyState } from './components/EmptyState'
import { FilterBar } from './components/FilterBar'
import { Footer } from './components/Footer'
import { GlossaryCard } from './components/GlossaryCard'
import { GuideCTA } from './components/GuideCTA'
import { GuideLibrary } from './components/GuideLibrary'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import {
  CATEGORY_META,
  GLOSSARY,
} from './data/glossaryData'
import { STACK_GUIDES } from './data/stackMatrixData'
import { useTheme } from './hooks/useTheme'
import { padNumber } from './utils/format'
import { searchGlossary, searchGuides } from './utils/search'

const CATEGORY_ORDER = ['frontend', 'backend', 'database', 'devops']

const SUGGESTIONS = {
  all: ['SSR', 'GraphQL', 'Redis', 'Docker', '微服務'],
  frontend: ['SSR', 'Virtual DOM', 'Hydration', 'Core Web Vitals'],
  backend: ['REST', 'GraphQL', 'JWT', '冪等'],
  database: ['PostgreSQL', 'Redis', 'ACID', 'Sharding'],
  devops: ['Docker', 'CI/CD', '反向代理', '可觀測性'],
}

const GUIDE_SUGGESTIONS = ['Next.js', 'PostgreSQL', 'Supabase', 'Astro']

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const deferredQuery = useDeferredValue(query)
  const searchRef = useRef(null)
  const libraryRef = useRef(null)

  const cleanQuery = deferredQuery.trim()
  const isSearching = cleanQuery.length > 0
  const isStale = query !== deferredQuery
  const isGuideView = category === 'guide'
  const categoryMeta = category !== 'all' && category !== 'guide' ? CATEGORY_META[category] : null

  const glossaryScope = useMemo(
    () =>
      category === 'all' || category === 'guide'
        ? GLOSSARY
        : GLOSSARY.filter((term) => term.category === category),
    [category],
  )

  const filteredGlossary = useMemo(
    () => searchGlossary(glossaryScope, deferredQuery),
    [glossaryScope, deferredQuery],
  )

  const filteredGuides = useMemo(
    () => searchGuides(STACK_GUIDES, deferredQuery),
    [deferredQuery],
  )

  const groupedGlossary = useMemo(
    () =>
      CATEGORY_ORDER.map((id) => ({
        id,
        ...CATEGORY_META[id],
        terms: filteredGlossary.filter((term) => term.category === id),
      })).filter((group) => group.terms.length > 0),
    [filteredGlossary],
  )

  const scrollToLibrary = useCallback(() => {
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    libraryRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  const selectCategory = useCallback(
    (nextCategory, { scroll = false } = {}) => {
      setCategory(nextCategory)
      if (scroll) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(scrollToLibrary)
        })
      }
    },
    [scrollToLibrary],
  )

  const handleExplore = useCallback(() => {
    scrollToLibrary()
  }, [scrollToLibrary])

  const handleExploreGuide = useCallback(() => {
    selectCategory('guide', { scroll: true })
  }, [selectCategory])

  const handleSelectCategory = useCallback(
    (nextCategory) => {
      selectCategory(nextCategory)
    },
    [selectCategory],
  )

  const handleSuggestion = useCallback((suggestion) => {
    setQuery(suggestion)
    window.requestAnimationFrame(() => searchRef.current?.focus())
  }, [])

  const handleClear = useCallback(() => {
    setQuery('')
    window.requestAnimationFrame(() => searchRef.current?.focus())
  }, [])

  const handleReset = useCallback(() => {
    setQuery('')
    setCategory('all')
  }, [])

  const handleBackToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [])

  // 按 "/" 快速聚焦搜尋，按 Escape 離開輸入時清除。
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      const tagName = target?.tagName
      if (
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        target?.isContentEditable
      ) {
        return
      }
      event.preventDefault()
      searchRef.current?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const resultCount = isGuideView ? filteredGuides.length : filteredGlossary.length

  const heading = isSearching
    ? isGuideView
      ? '指南搜尋結果'
      : '名詞搜尋結果'
    : isGuideView
      ? '四種網站，四種取捨。'
      : category === 'all'
        ? '全端名詞地圖'
        : `${categoryMeta.label}技術名詞`

  const description = isSearching
    ? isGuideView
      ? `在四種網站型態中尋找「${cleanQuery}」，涵蓋技術組合、選型理由與成本評估。`
      : `在${category === 'all' ? '全端名詞庫' : `${categoryMeta.label}名詞`}中尋找「${cleanQuery}」；中英文、縮寫與簡繁輸入皆可。`
    : isGuideView
      ? '依網站型態整理推薦組合、選型理由與成本／維護評估。沒有最好的技術，只有最適合當下團隊的取捨。'
      : category === 'all'
        ? '從渲染策略、API 設計到資料層與部署，把分散的技術名詞放回同一個脈絡。支援中英文、縮寫與簡繁模糊搜尋。'
        : `${categoryMeta.description} 共 ${filteredGlossary.length} 個名詞，點開官方文件可繼續延伸閱讀。`

  const kicker = isSearching
    ? isGuideView
      ? 'Stack guide / search'
      : 'Glossary / search'
    : isGuideView
      ? 'Stack guide / 05'
      : category === 'all'
        ? 'Glossary / 01—04'
        : `Glossary / ${categoryMeta.index}`

  return (
    <div className="app">
      <div className="ambient" aria-hidden="true" />
      <a className="skip-link" href="#main">
        跳至主要內容
      </a>

      <Header
        query={query}
        onQueryChange={setQuery}
        theme={theme}
        onToggleTheme={toggleTheme}
        searchRef={searchRef}
      />

      <main id="main">
        <Hero
          activeCategory={category}
          onSelectCategory={(nextCategory) => selectCategory(nextCategory, { scroll: true })}
          onExplore={handleExplore}
          onExploreGuide={handleExploreGuide}
        />

        <FilterBar activeCategory={category} onSelectCategory={handleSelectCategory} />

        <section
          className="library shell"
          id="library"
          ref={libraryRef}
          aria-busy={isStale}
          aria-labelledby="library-title"
        >
          <div className="section-heading">
            <div className="section-heading-copy">
              <p className="section-kicker">{kicker}</p>
              <h2 id="library-title">{heading}</h2>
              <p className="section-desc">{description}</p>
            </div>
            <div className="result-meta" role="status" aria-live="polite">
              <span className="result-number">{padNumber(resultCount)}</span>
              <span className="result-label">
                {isSearching ? 'matches' : isGuideView ? 'blueprints' : 'terms'}
              </span>
              {isSearching && <span className="result-query">「{cleanQuery}」</span>}
            </div>
          </div>

          {isGuideView ? (
            filteredGuides.length > 0 ? (
              <GuideLibrary guides={filteredGuides} />
            ) : (
              <EmptyState
                query={cleanQuery}
                variant="guide"
                suggestions={GUIDE_SUGGESTIONS}
                onSelectSuggestion={handleSuggestion}
                onClear={handleClear}
                onReset={handleReset}
              />
            )
          ) : filteredGlossary.length === 0 ? (
            <EmptyState
              query={cleanQuery}
              variant="glossary"
              suggestions={SUGGESTIONS[category] ?? SUGGESTIONS.all}
              onSelectSuggestion={handleSuggestion}
              onClear={handleClear}
              onReset={handleReset}
            />
          ) : category === 'all' ? (
            groupedGlossary.map((group) => (
              <section
                className={`glossary-group cat-${group.id}`}
                key={group.id}
                aria-labelledby={`group-${group.id}`}
              >
                <div className="group-heading">
                  <span className="group-index" aria-hidden="true">
                    {group.index}
                  </span>
                  <h3 id={`group-${group.id}`}>{group.label}</h3>
                  <span className="group-en">{group.en}</span>
                  <span className="group-desc">{group.description}</span>
                  <span className="group-count">
                    {padNumber(group.terms.length)} terms
                  </span>
                </div>
                <div className="card-grid">
                  {group.terms.map((term, index) => (
                    <GlossaryCard
                      key={term.id}
                      term={term}
                      index={index}
                      query={cleanQuery}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="card-grid">
              {filteredGlossary.map((term, index) => (
                <GlossaryCard
                  key={term.id}
                  term={term}
                  index={index}
                  query={cleanQuery}
                />
              ))}
            </div>
          )}
        </section>

        {!isGuideView && !isSearching && <GuideCTA onExploreGuides={handleExploreGuide} />}
      </main>

      <Footer onBackToTop={handleBackToTop} />
    </div>
  )
}
