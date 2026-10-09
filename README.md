# AI Code Mentor

A React/Vite prototype for reviewing, explaining, improving, and generating tests for code using the OpenAI API.

## Run locally

The current source code is stored in `ai-code-mentor.zip`. Extract it first, then run commands in the extracted `ai-code-mentor` directory (the directory containing `package.json`):

```bash
unzip ai-code-mentor.zip
cd ai-code-mentor
npm install
npm run dev
```

On Windows, use File Explorer's **Extract All** on the ZIP, then open a terminal in the extracted folder and run `npm install` and `npm run dev`. The app is usually served at http://localhost:5173.

## Production build and verification

Run `npm run build` inside the extracted app folder. GitHub Actions also extracts the committed archive, verifies the expected source files exist, installs dependencies, and runs the production build. This validates compilation, but does not prove the OpenAI request flow works against a real API account or that the UI has been browser-tested.

## Security and limitations

- Treat this as a development prototype, not a production-ready service.
- **Do not use a valuable or production API key in this client-side app.** A key entered into a browser and stored in `localStorage` can be read by scripts running in that origin and by anyone with access to that browser profile. A request sent directly from the browser to OpenAI necessarily exposes the key to the client. For deployment, move API calls behind a server-side endpoint, keep the key in server environment variables, and add authentication, rate limiting, usage limits, and input/output safeguards.
- Code sent for review is sent to the configured AI provider; do not paste secrets or confidential source code unless authorized.
- No live API integration test, browser automation, or production security audit has been completed.
- Dependencies are currently described in `package.json` inside the archive; a committed lockfile should be generated and reviewed before release.

## License

MIT
