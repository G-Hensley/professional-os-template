# InstAPI - Project Spec

> Mock APIs in seconds. Stop waiting for backend, start building frontend.

## Project Identity

**Name**: InstAPI

**Type**: SaaS Web Application / Developer Tool

**Tagline**: Mock APIs in seconds. Stop waiting for backend, start building frontend.

---

## The Problem

**Problem Statement**: Frontend developers often block on backend APIs that aren't ready yet. Setting up mock servers is tedious. Existing tools like JSON Server require local setup. There's friction between needing an API to build against and waiting for the real backend to be ready.

**Current Solutions**: JSON Server (local setup), Postman mocks (complex), hardcoded data in frontend, waiting for backend.

**Cost of Inaction**: Frontend development blocked, slower iteration, harder demos, frustrating developer experience.

---

## The Solution

**Solution Statement**: InstAPI lets you define API endpoints and response schemas in a web UI, then instantly generates a hosted mock API you can call from your frontend. No local setup, no code, just define and use. Great for prototyping, demos, and unblocking frontend development.

**What This Is NOT**:
- Not a backend framework
- Not an API gateway
- Not a testing tool (focused on mocking, not testing)

---

## Target Audience

**Primary User**: Frontend developer building a React app who needs to mock an API that doesn't exist yet.

**User Personas**:
1. Frontend developers needing mock APIs for development
2. Full-stack developers prototyping before building real backends
3. Teams with frontend and backend working in parallel
4. Developers building demos or proof-of-concepts quickly

**Anti-Personas**:
1. Backend developers (they can build the real API)
2. Teams with existing mock infrastructure
3. Enterprise needing complex API simulation

---

## MVP Spec

**MVP Goal**: Prove that developers will use a hosted mock API service instead of setting up local mocks.

**MVP Features**:
1. Web UI to define endpoints (path, method, response shape)
2. Instant hosted API URL you can call
3. JSON response configuration
4. Basic authentication (API key)
5. Request logging

**MVP Technologies**:
- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase

**MVP Timeline**: 3-4 weeks

**MVP Success Criteria**: 50 developers use InstAPI to create mock APIs for their projects.

---

## Post-MVP Spec

**Post-MVP Features**:
1. Dynamic responses based on request params
2. Response delays (simulate slow APIs)
3. Error simulation (4xx, 5xx responses)
4. OpenAPI import
5. Team workspaces
6. Webhooks for callbacks

**Post-MVP Technologies**:
- OpenAPI parser
- Advanced routing engine
- Team collaboration features

**Post-MVP Phases**:

Phase 1 (after MVP validation):
- Dynamic responses
- OpenAPI import
- Better request logging

Phase 2 (scaling):
- Team workspaces
- Error simulation
- Custom domains

Phase 3 (expansion):
- Webhooks
- GraphQL support
- Enterprise features

---

## Technical Architecture

**Architecture Overview**: Next.js application with serverless API endpoints that dynamically route to user-defined mock responses.

**Key Technical Decisions**:
- Serverless for scalability
- Supabase for user data and mock definitions
- Edge functions for low-latency mock responses
- Unique subdomains per project

**Dependencies/Blockers**: None

**Security Considerations**:
- API key authentication for mock endpoints
- Rate limiting to prevent abuse
- No sensitive data in mock responses (user responsibility)

---

## Success Criteria

**Success Milestone**: 50 developers use InstAPI to create mock APIs for their projects.

**Key Metrics**:
1. Mock APIs created
2. API calls to mock endpoints
3. User retention
4. Time from signup to first mock

---

## Business Model

**Monetization Strategy**: Freemium

**Pricing Thoughts**:
- Free: 3 mock APIs, 1000 requests/month
- Pro ($9/mo): Unlimited mocks, 50k requests, custom domains
- Team ($29/mo): Team workspaces, 500k requests

**Revenue Goal**: $1,000 MRR in first 12 months

---

## Mission Statement

InstAPI exists to unblock frontend development. Our mission is to eliminate the wait for backend APIs by letting developers instantly create the mock APIs they need to keep building.

---

## Planning Checklist

Before moving to `active.json`:

- [x] Problem is validated (common pain point)
- [x] Solution is clearly differentiated (hosted, zero-setup)
- [x] MVP scope is realistic (can ship in 3-4 weeks of focused work)
- [x] MVP and post-MVP are clearly separated
- [x] Success milestone is specific and measurable
- [x] No unresolved blockers
- [x] Created folder in `projects/specs/instapi/`
