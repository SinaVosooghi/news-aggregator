# Use a Node.js base image
FROM node:20.16.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port
EXPOSE 5173

# Start the application
CMD ["yarn", "dev", "--host"]
