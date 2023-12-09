# Use an official Node runtime as a parent image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use the lightweight serve package to serve the app
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app/build /app

# Install serve globally
RUN npm install -g serve

# Expose port 5000
EXPOSE 80

# Start serving the app
CMD ["serve", "-p", "80", "-s", "."]
