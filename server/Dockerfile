FROM node:22-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client (Make sure prisma schema is inside your folder)
RUN npx prisma generate

# Expose the port your server runs on
EXPOSE 3000

# Start the Node server
CMD ["node", "main.js"]
