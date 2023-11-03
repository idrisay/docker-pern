# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app/backend

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code into the container
COPY . .

# Expose the port that your Node.js app uses (replace with your actual port)
EXPOSE 5055

# Start the Node.js application
CMD ["npm", "start"]
