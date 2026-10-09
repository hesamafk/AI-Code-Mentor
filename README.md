# AI Code Mentor

An AI-assisted coding companion built with React 18 and Vite. The intended workflows are code review, explanation, refactoring suggestions, and unit-test generation across common programming languages.

## Project status
This repository currently contains the source archive `ai-code-mentor.zip` and this documentation. Extract and review the archive before assuming the app builds in a clean environment; source files, package manifests, and automated tests should be committed as normal repository files for maintainable collaboration.

## Security notes
- Do not put a production OpenAI API key in client-side code or browser `localStorage`. Anything shipped to a browser can be inspected by the user.
- For a public deployment, route model requests through a server-side endpoint, store the API key in a server environment variable, and enforce authentication, rate limits, request-size limits, and usage budgets.
- Never commit `.env` files, API keys, tokens, or real user code.
- Streaming output should handle network errors, cancellation, timeouts, and provider rate limits.

## Recommended local setup
1. Install a current Node.js LTS release.
2. Extract the archive to a working directory and inspect its `package.json`.
3. Install dependencies with the package manager matching the lockfile.
4. Add required environment variables using `.env.example` as a template; never put secrets in a `VITE_*` variable because Vite exposes those values to the client.
5. Run the script documented in `package.json`, then run lint/build/test scripts if provided.

## Production readiness checklist
- [ ] Commit the extracted source, package manifest, and lockfile.
- [ ] Add a backend proxy that reads `OPENAI_API_KEY` from the server environment.
- [ ] Add validation, auth, rate limiting, usage limits, and safe error messages.
- [ ] Add unit tests for streaming, cancellation, and malformed requests.
- [ ] Add screenshots and a reproducible demo link after deployment.

## Tech stack
React 18 · Vite · CSS · OpenAI API · react-markdown · react-syntax-highlighter

## Author
Hesam Afkhami · [LinkedIn](https://www.linkedin.com/in/hesam-afkhami)


## Quality checks
GitHub Actions verifies that the source archive is present and readable and checks that the repository does not contain obvious OpenAI API-key strings. These checks do not replace extracting the source, reviewing its implementation, and building/testing the application.
