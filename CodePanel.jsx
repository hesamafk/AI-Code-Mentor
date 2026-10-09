import { Code2, FileSearch, Lightbulb, Sparkles, TestTube } from 'lucide-react'

const ACTIONS = [
  { id: 'review', label: 'Review', desc: 'Find bugs & issues', icon: FileSearch },
  { id: 'explain', label: 'Explain', desc: 'Understand the code', icon: Lightbulb },
  { id: 'improve', label: 'Improve', desc: 'Refactor & clean up', icon: Sparkles },
  { id: 'tests', label: 'Tests', desc: 'Generate unit tests', icon: TestTube },
]

export default function CodePanel({
  code,
  setCode,
  language,
  setLanguage,
  languages,
  onAction,
  loading,
  activeMode,
}) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">
          <Code2 size={16} style={{ color: '#60a5fa' }} />
          Your Code
        </div>
        <div className="select-wrap">
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <textarea
        className="code-area"
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Paste your code here..."
        spellCheck={false}
      />

      <div className="actions">
        {ACTIONS.map(a => {
          const Icon = a.icon
          return (
            <button
              key={a.id}
              className={`action-btn ${activeMode === a.id ? 'active' : ''}`}
              onClick={() => onAction(a.id)}
              disabled={loading || !code.trim()}
            >
              <span className="label">
                <Icon size={13} />
                {a.label}
              </span>
              <span className="desc">{a.desc}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
