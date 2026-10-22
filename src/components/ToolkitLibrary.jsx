import { TOOL_CATEGORIES } from '../data/toolkitData'
import { padNumber } from '../utils/format'
import { ToolCard } from './ToolCard'
import { ToolkitSidebar } from './ToolkitSidebar'

export function ToolkitLibrary({ tools, activeCategory, onSelectToolCategory, query, emptyState }) {
  const groups = TOOL_CATEGORIES.map((category) => ({
    ...category,
    tools: tools.filter((tool) => tool.category === category.id),
  })).filter((group) => group.tools.length > 0)

  return (
    <div className="toolkit-layout">
      <ToolkitSidebar
        activeCategory={activeCategory}
        onSelectToolCategory={onSelectToolCategory}
      />

      <div className="toolkit-content" id="toolkit-content">
        {tools.length === 0 ? (
          emptyState
        ) : activeCategory !== 'all' ? (
          <div className="tool-card-grid">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} query={query} />
            ))}
          </div>
        ) : (
          groups.map((group) => (
            <section
              className={`tool-group cat-${group.tone}`}
              key={group.id}
              aria-labelledby={`tool-group-${group.id}`}
            >
              <div className="group-heading">
                <span className="group-index" aria-hidden="true">
                  {group.index}
                </span>
                <h3 id={`tool-group-${group.id}`}>{group.label}</h3>
                <span className="group-en">{group.en}</span>
                <span className="group-desc">{group.description}</span>
                <span className="group-count">{padNumber(group.tools.length)} tools</span>
              </div>
              <div className="tool-card-grid">
                {group.tools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} query={query} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
