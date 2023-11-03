# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend source code into the container
COPY . .

# Expose the port that Next.js uses (default: 3000)
EXPOSE 3033

# Start the Next.js application
CMD ["npm", "run", "dev"]
