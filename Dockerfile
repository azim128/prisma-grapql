# Use the official Node.js 14 image
FROM node:20

# Set the working directory
WORKDIR /src

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
