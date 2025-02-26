# Step 1: Use the official Node.js image as a parent image
FROM node:18-alpine AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Use a lighter base image for the production build
FROM node:18-alpine AS runner

# Step 8: Set the working directory for the runner
WORKDIR /app

# Step 9: Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Step 10: Expose the port your app runs on
EXPOSE 3000

# Step 11: Start the application
CMD ["npm", "start"]
