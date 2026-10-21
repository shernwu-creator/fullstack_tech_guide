export const padNumber = (value) => String(value).padStart(2, '0')

const LEVEL_LABELS = ['', '極低', '低', '中等', '高', '極高']

export const levelLabel = (score) => LEVEL_LABELS[score] ?? '—'
