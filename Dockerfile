# Multi-stage build for production
FROM node:18-alpine AS frontend-build

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY package*.json ./
RUN npm install --production

COPY backend ./backend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 8000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "backend/server.js"]
