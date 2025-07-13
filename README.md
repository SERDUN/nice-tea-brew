# Tea‑Tracker API

A production-ready REST API built with NestJS, TypeScript, and Zod. Features include custom decorators, guards, interceptors, and full validation with Swagger documentation.

---

## Stack

- NestJS
- TypeScript (strict mode)
- Zod (validation)
- Swagger (API documentation)
- Docker (multi-stage)
- In-memory database

---

## Installation

```bash
npm install
```

## Development

```bash
npm run start:dev
```

## Production Build

```bash
npm run build
node dist/main.js
```

## Docker

```bash
docker build -t tea-api .
docker run -p 3000:3000 tea-api
```

---

## Features

### Validation with Zod

- Central schema: `TeaSchema`
- DTOs:
    - `CreateTeaDto` – full required fields
    - `UpdateTeaDto` – patch with optional fields
- Custom decorator: `@ZBody(schema)`
    - Uses `parseAsync`
    - Throws `BadRequestException` on failure

### TeaController Endpoints

| Method | Path        | Description                                                              |
|--------|-------------|--------------------------------------------------------------------------|
| GET    | `/tea`      | Public. Query: `minRating`, `page`, `pageSize`. Returns paginated object |
| GET    | `/tea/:id`  | Returns 404 if not found                                                  |
| POST   | `/tea`      | Protected. Validates body via `@ZBody`. Rate limited to 10 req/min        |
| PUT    | `/tea/:id`  | Validates body via `@ZBody(UpdateTeaDto)`                                |
| DELETE | `/tea/:id`  | Deletes a tea item                                                       |

### Tea Model Schema

| Field     | Type    | Constraints                    |
|-----------|---------|--------------------------------|
| name      | string  | 3–40 characters                |
| origin    | string  | 2–30 characters                |
| rating    | number  | 1–10, optional                 |
| brewTemp  | number  | 60–100 (°C), optional          |
| notes     | string  | Max 150 characters, optional  |

---

## Additional Features

### Swagger

- Available at `/docs`
- DTOs documented with `@ApiProperty`
- Reflects validation rules from Zod

### Guards & Decorators

- `@ZBody(schema)` – Zod validator for request bodies
- `@Public()` – marks routes exempt from API key guard
- API key guard – requires `x-api-key: im_rd_student` for all routes except those with `@Public()`

### Interceptor

- Logs response time for each request

### Graceful Shutdown

- On `SIGINT`, logs: `Bye tea-lovers` and exits

---
