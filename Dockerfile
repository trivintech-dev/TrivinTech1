# Use Node.js LTS Alpine image for smaller size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy server application code
COPY server/src ./src

# Expose the port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
