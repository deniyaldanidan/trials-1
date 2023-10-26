# Ideas App

## Authentication Endpoints
- POST /auth/login
- POST /auth/register
- POST /auth/logout
- GET /auth/refresh

## Unprotected Endpoints
- GET /
- GET /ideas?page=1
- GET /ideas/:id

## Protected Endpoints
- POST /ideas
- PUT /ideas
- DELETE /ideas/:id
- POST /ideas/like
- POST /comment
- PUT /comment
- DELETE /comment