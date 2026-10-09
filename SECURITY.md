# Security Policy

## Reporting
Please do not publish API keys, access tokens, private code, or sensitive logs in public issues. Rotate any credential that has been exposed.

## API key handling
OpenAI API keys must be held by a trusted server, not in browser storage or client bundles. Use server-side environment variables, authentication, request limits, and rate limits before exposing a public endpoint.

## Scope
This file documents the intended security posture. The existing ZIP archive has not been extracted and rebuilt in this branch, so the implementation must be reviewed against these requirements before deployment.
