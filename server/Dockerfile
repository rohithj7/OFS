FROM node:18

WORKDIR /app/OFS/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Node.js app runs on
EXPOSE 8080

# Run the backend server
CMD ["npm", "start"]