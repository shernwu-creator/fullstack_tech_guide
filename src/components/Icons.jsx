/* 統一的 inline SVG 圖示；不依賴任何圖示套件。 */
const baseProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const SearchIcon = ({ size = 18, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
)

export const CloseIcon = ({ size = 16, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const SunIcon = ({ size = 17, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.7 4.7l1.4 1.4M17.9 17.9l1.4 1.4M2.5 12h2M19.5 12h2M4.7 19.3l1.4-1.4M17.9 6.1l1.4-1.4" />
  </svg>
)

export const MoonIcon = ({ size = 17, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z" />
  </svg>
)

export const ArrowRightIcon = ({ size = 16, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const ArrowDownIcon = ({ size = 16, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
)

export const ArrowUpRightIcon = ({ size = 14, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const LayersIcon = ({ size = 15, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
    <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
  </svg>
)

export const SparkIcon = ({ size = 15, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M12 2.8 13.8 9l6.2 1.8-6.2 1.8L12 19l-1.8-6.4L4 10.8 10.2 9 12 2.8Z" />
    <path d="m19 17 .7 2.1L22 20l-2.3.9L19 23l-.7-2.1L16 20l2.3-.9L19 17Z" />
  </svg>
)

export const GaugeIcon = ({ size = 15, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M4.2 18a8.5 8.5 0 1 1 15.6 0" />
    <path d="m12 13 3.5-3.5" />
    <circle cx="12" cy="14" r="1.4" />
  </svg>
)

export const BookIcon = ({ size = 14, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M4 4.8A2.8 2.8 0 0 1 6.8 2H20v17.2H6.8A2.8 2.8 0 0 0 4 22V4.8Z" />
    <path d="M4 17.2A2.8 2.8 0 0 1 6.8 20H20M8 6.5h8M8 10.5h6" />
  </svg>
)

export const CompassIcon = ({ size = 22, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
)

export const AlertIcon = ({ size = 15, ...props }) => (
  <svg {...baseProps} width={size} height={size} {...props}>
    <path d="M12 3.5 21 20H3L12 3.5Z" />
    <path d="M12 9v4.5M12 17h.01" />
  </svg>
)
