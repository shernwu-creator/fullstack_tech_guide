import { getHighlightParts } from '../utils/search'

/** 將搜尋字串以 <mark> 反白，同時避免 dangerouslySetInnerHTML。 */
export function HighlightedText({ text, query }) {
  if (!text) return null
  const parts = getHighlightParts(text, query)
  return parts.map((part, index) =>
    part.match ? <mark key={`${part.text}-${index}`}>{part.text}</mark> : part.text,
  )
}
