# Use Node.js to build the React app
FROM node:18 as build

# Set the working directory to the frontend folder inside the container
WORKDIR /app/OFS/client

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/OFS/client/build /usr/share/nginx/html

# Expose the port the frontend app runs on
EXPOSE 3000

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]