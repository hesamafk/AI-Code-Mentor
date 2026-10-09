import { useState, useRef, useEffect } from 'react'
import { Code2, Sparkles, Trash2, Send } from 'lucide-react'
import CodePanel from './components/CodePanel'
import ChatPanel from './components/ChatPanel'
import './styles/App.css'

const SYSTEM_PROMPTS = {
  review: `You are a senior software engineer doing a thorough code review.
Focus on: bugs, security issues, performance problems, readability, and best practices.
Be specific and constructive. Use markdown. Show fixed snippets when helpful.`,

  explain: `You are a patient coding mentor. Explain the given code clearly.
Break down the logic, mention important design choices, and use simple language.
Structure the explanation with markdown headings if the code is long.`,

  improve: `You are a principal engineer focused on clean code.
Refactor the provided code. Keep the same behavior.
Return the improved version in a code block first, then briefly explain the main changes.`,

  tests: `You are a testing specialist. Write solid unit tests for the given code.
Cover happy path, edge cases, and error cases.
Use the most common test framework for the language (Jest/Vitest for JS/TS, pytest for Python, etc.).
Return complete, runnable test code.`,
}

const LANGUAGES = [
  'typescript', 'javascript', 'python', 'java', 'go',
  'rust', 'csharp', 'php', 'ruby', 'swift', 'kotlin',
]

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_key') || '')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('typescript')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(null)
  const abortRef = useRef(null)

  useEffect(() => {
    if (apiKey) localStorage.setItem('openai_key', apiKey)
  }, [apiKey])

  async function callOpenAI(userContent, systemExtra) {
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key first.')
      return
    }

    setLoading(true)
    const userMsg = { role: 'user', content: userContent }
    setMessages(prev => [...prev, userMsg])

    const system = systemExtra || `You are a helpful coding mentor. Answer clearly and use markdown when showing code.`

    try {
      abortRef.current = new AbortController()

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          stream: true,
          temperature: 0.35,
          messages: [
            { role: 'system', content: system },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userContent },
          ],
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `API error ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      // add empty assistant message that we will fill
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              assistantText += delta
              setMessages(prev => {
                const copy = [...prev]
                copy[copy.length - 1] = { role: 'assistant', content: assistantText }
                return copy
              })
            }
          } catch {
            // ignore parse errors on partial chunks
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `⚠️ ${err.message}` },
        ])
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  function handleAction(actionId) {
    if (!code.trim()) return
    setMode(actionId)

    const prompt = `Here is some ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
    callOpenAI(prompt, SYSTEM_PROMPTS[actionId])
  }

  function handleChatSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading) return
    const text = input.trim()
    setInput('')
    callOpenAI(text)
  }

  function clearAll() {
    if (abortRef.current) abortRef.current.abort()
    setMessages([])
    setCode('')
    setInput('')
    setMode(null)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <Code2 />
          </div>
          <div>
            <h1>AI Code Mentor</h1>
            <div className="subtitle">Review · Explain · Improve · Test</div>
          </div>
        </div>
        <div className="header-right">
          <Sparkles size={14} style={{ color: '#10b981' }} />
          <span>gpt-4o-mini</span>
        </div>
      </header>

      {!apiKey && (
        <div style={{ padding: '0.75rem 1.25rem' }}>
          <div className="key-banner">
            <p>Enter your OpenAI API key to start (stored only in your browser):</p>
            <input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          </div>
        </div>
      )}

      {apiKey && (
        <div style={{ padding: '0.5rem 1.25rem 0', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => { setApiKey(''); localStorage.removeItem('openai_key') }}>
            Change API key
          </button>
        </div>
      )}

      <div className="main">
        <CodePanel
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          languages={LANGUAGES}
          onAction={handleAction}
          loading={loading}
          activeMode={mode}
        />
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          onSubmit={handleChatSubmit}
          loading={loading}
          onClear={clearAll}
        />
      </div>

      <footer className="footer">
        AI Code Mentor · built with React + Vite
      </footer>
    </div>
  )
}
