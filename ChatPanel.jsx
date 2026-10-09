import { Sparkles, Trash2, Send, User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatPanel({
  messages,
  input,
  setInput,
  onSubmit,
  loading,
  onClear,
}) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">
          <Sparkles size={16} style={{ color: '#34d399' }} />
          AI Mentor
        </div>
        <button className="btn btn-ghost" onClick={onClear} title="Clear chat">
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      <div className="messages">
        {messages.length === 0 && (
          <div className="messages-empty">
            <div className="icon-box">
              <Sparkles size={22} style={{ color: '#34d399' }} />
            </div>
            <p>Ready when you are</p>
            <span>
              Paste code on the left and pick an action,<br />
              or just type a question below.
            </span>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <div className={`avatar ${m.role}`}>
              {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className="message-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: '0.5rem 0', borderRadius: 8, fontSize: '0.8rem' }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        style={{
                          background: '#27272a',
                          padding: '0.15em 0.4em',
                          borderRadius: 4,
                          fontSize: '0.85em',
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="loading-row">
            <div className="spinner" />
            Thinking…
          </div>
        )}
      </div>

      <form className="input-bar" onSubmit={onSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a follow-up or chat freely…"
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary btn-icon"
          disabled={loading || !input.trim()}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
