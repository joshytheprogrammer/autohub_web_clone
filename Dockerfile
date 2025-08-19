# Step 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies based on lockfile
COPY package*.json ./
RUN npm ci

# Copy all files and build Next.js app
COPY . .
RUN npm run build

# Step 2: Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package.json (needed for npm start)
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
