import { CloseIcon, MoonIcon, SearchIcon, SunIcon } from './Icons'

export function Header({ query, onQueryChange, theme, onToggleTheme, searchRef, placeholder }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <a className="brand" href="#top" aria-label="StackAtlas 全端技術知識庫，回到頁首">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 7 4 12l4.5 5" stroke="currentColor" />
              <path d="M15.5 7 20 12l-4.5 5" stroke="currentColor" />
              <path d="M13.5 4.5 10.5 19.5" stroke="var(--warm)" />
            </svg>
          </span>
          <span className="brand-copy">
            <span className="brand-name">StackAtlas</span>
            <span className="brand-sub">全端技術知識庫</span>
          </span>
        </a>

        <div className={`searchbox${query ? ' has-query' : ''}`} role="search">
          <SearchIcon className="searchbox-icon" />
          <input
            ref={searchRef}
            id="global-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                onQueryChange('')
                event.currentTarget.blur()
              }
            }}
            placeholder={placeholder}
            aria-label="搜尋全端技術名詞或開發工具，支援中英文與簡繁模糊搜尋"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {query ? (
            <button
              type="button"
              className="search-clear"
              onClick={() => {
                onQueryChange('')
                searchRef.current?.focus()
              }}
              aria-label="清除搜尋"
            >
              <CloseIcon size={15} />
            </button>
          ) : (
            <kbd className="search-shortcut" aria-hidden="true">
              /
            </kbd>
          )}
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`切換至${nextTheme === 'dark' ? '深色' : '淺色'}主題`}
            title={`切換至${nextTheme === 'dark' ? '深色' : '淺色'}主題`}
          >
            <span className="theme-icon">{theme === 'dark' ? <MoonIcon /> : <SunIcon />}</span>
            <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
