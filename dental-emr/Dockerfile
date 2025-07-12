# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:1.25-alpine

# Copy build output to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
