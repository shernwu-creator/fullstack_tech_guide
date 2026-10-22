import { GLOSSARY } from '../data/glossaryData'
import { STACK_GUIDES } from '../data/stackMatrixData'
import { TOOLS } from '../data/toolkitData'

export function Footer({ onBackToTop }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner shell">
        <div className="footer-brand">
          <span className="footer-mark" aria-hidden="true">
            ⌘
          </span>
          <div>
            <strong>StackAtlas</strong>
            <p>
              以官方文件為錨點的全端知識庫。收錄 {GLOSSARY.length} 個名詞、{TOOLS.length} 個開發工具與{' '}
              {STACK_GUIDES.length} 套選型藍圖；技術版本迭代快速，實作前請以最新官方文件為準。
            </p>
          </div>
        </div>
        <div className="footer-meta">
          <span>React 19 · Vite 8 · Vanilla CSS</span>
          <span>內容以資料驅動，搜尋在你的瀏覽器完成。</span>
          <button type="button" className="footer-top" onClick={onBackToTop}>
            回到頁首 ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
