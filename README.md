# AI Code Mentor

Simple React app that lets you paste code and get instant feedback from GPT.

I made this for myself first – useful when I want a quick review before opening a PR or when I'm stuck understanding someone else's code.

## What it does

- **Review** – points out bugs, security issues, style problems
- **Explain** – walks through the code in plain language
- **Improve** – suggests a cleaner version
- **Generate Tests** – writes unit tests for you
- Free chat for follow-up questions

Works with TypeScript, JavaScript, Python, Java, Go, Rust, and a few others.

## Stack

- React 18
- Vite
- plain CSS (no Tailwind)
- OpenAI API (streaming)
- react-markdown + syntax highlighter

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite gives you (usually http://localhost:5173).

You'll need an OpenAI API key. Paste it in the banner at the top – it only lives in your browser's localStorage, nothing is sent anywhere except OpenAI.

## Project structure

```
index.html
src/
  main.jsx
  App.jsx
  components/
    CodePanel.jsx
    ChatPanel.jsx
  styles/
    index.css
    App.css
```

Pretty straightforward. The OpenAI call and streaming logic live in `App.jsx`.

## Build for production

```bash
npm run build
```

Output goes to `dist/`.

## License

MIT
