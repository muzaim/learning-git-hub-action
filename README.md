# Next.js Enterprise CI/CD Pipeline

Production-grade Next.js TypeScript application demonstrating an end-to-end continuous integration and continuous deployment (CI/CD) workflow powered by GitHub Actions and Docker.

---

## 1. Overview

This repository serves as a reference implementation for a secure, automated, and fail-safe deployment pipeline. It enforces strict code quality gates, automated vulnerability scanning, unit testing, and isolated container packaging before rolling out changes to target environments.

### Core Technologies
- **Application Framework**: Next.js 14 (App Router, Standalone Output)
- **Language**: TypeScript
- **Testing Engine**: Vitest
- **Code Quality**: ESLint, TypeScript Compiler (`tsc --noEmit`)
- **Containerization**: Docker (Multi-stage Build), Docker Compose
- **Orchestration**: GitHub Actions

---

## 2. Pipeline Architecture

The workflow is structured into six sequential stages. Each subsequent stage depends explicitly on the success of the preceding stage via the `needs` attribute, ensuring that any defect immediately terminates execution before deployment occurs.

```text
[ 1. Code Quality ]
  - ESLint Syntax Check
  - TypeScript Type Validation
          |
          v (passes)
[ 2. Security Scan ]
  - NPM Audit (High/Critical Vulnerabilities)
          |
          v (passes)
[ 3. Automated Testing ]
  - Vitest Unit Test Suite
          |
          v (passes)
[ 4. Build Verification ]
  - Next.js Standalone Compilation
          |
          v (passes)
[ 5. Deployment & Configuration Injection ]
  - Dynamic .env.local generation from Repository Variables
  - Container rollout via Docker Compose
          |
          v (passes)
[ 6. Health Check ]
  - Post-deployment verification and status reporting
```

### Fail-Safe Execution Strategy
In the event that any check fails (for example, a type mismatch in Stage 1 or a failed test in Stage 3), downstream stages are automatically canceled by the runner. Defective artifacts never reach staging or production environments.

---

## 3. Environment Variable Architecture

Environment configuration adheres to industry security standards by separating public defaults from sensitive credentials.

### File Hierarchy
- **`.env.example`**: Tracked in version control. Defines the expected schema and non-sensitive fallback values for development teams.
- **`.env.local`**: Local override file on the host machine. Ignored by Git to prevent secret leakage.
- **`.env.development` / `.env.production`**: Specific stage configurations ignored by default via `.gitignore`.

### Automated Injection Mechanism
During CI/CD execution, environment variables are retrieved from GitHub Repository Variables and Secrets, then dynamically written into `.env.local` on the runner or deployment host:

```bash
cat <<EOF > .env.local
PORT=${{ vars.PORT || '3000' }}
APP_ENV=${{ vars.APP_ENV || 'production' }}
NEXT_PUBLIC_APP_NAME=${{ vars.NEXT_PUBLIC_APP_NAME }}
NEXT_PUBLIC_API_URL=${{ vars.NEXT_PUBLIC_API_URL }}
EOF
```

Docker Compose references this file via `env_file: - .env.local`, ensuring credentials are decoupled from repository code.

---

## 4. Containerization Details

The container setup uses a 4-stage `Dockerfile` based on `node:20-alpine`:

1. **`base`**: Base Node.js image with minimal system utilities.
2. **`deps`**: Installs production and development dependencies using `npm ci`.
3. **`builder`**: Copies dependencies and source files, then executes `npm run build` to generate standalone bundles.
4. **`runner`**: Production runtime containing only `node_modules` required for standalone execution and static assets, reducing final image size to approximately 100 MB and running under a non-root `nextjs` user.

---

## 5. Getting Started

### Prerequisites
- Node.js 20 or higher
- npm 10 or higher
- Docker Engine and Docker Compose (optional, for container runs)

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/muzaim/learning-git-hub-action.git
   cd learning-git-hub-action
   ```

2. Copy the template environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`.

---

## 6. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with hot-reload |
| `npm run build` | Compiles the production standalone application |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint validation across all pages and components |
| `npm run type-check` | Executes TypeScript type verification without emitting output |
| `npm run test` | Executes the unit test suite using Vitest |

---

## 7. Running with Docker

To build and run the isolated container locally:

```bash
# Build and start container in detached mode
docker compose up -d --build

# View container logs
docker compose logs -f

# Stop container
docker compose down
```

The application will be accessible at `http://localhost:8080`.

---

## 8. Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── pipeline.yml       # Enterprise CI/CD pipeline definition
├── app/
│   ├── layout.tsx             # Root application layout
│   ├── page.tsx               # Index page displaying dynamic environment info
│   └── page.test.tsx          # Automated unit test suite
├── .env.example               # Public environment configuration template
├── .gitignore                 # Exclusion rules protecting secret files
├── Dockerfile                 # Multi-stage production container build
├── docker-compose.yml         # Container runtime service definition
├── next.config.js             # Standalone output configuration
├── package.json               # Dependencies and execution scripts
├── tsconfig.json              # TypeScript compiler configuration
└── README.md                  # Project documentation
```
