# Use the official MySQL 8.0 image as the base
FROM mysql:8.0

# Copy the initialization SQL script into the Docker image
COPY db.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306