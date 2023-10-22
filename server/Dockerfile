# Start from a Node.js 14 base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Globally install the zero CLI
RUN npm install -g @rootbeer/zero

# Expose the port your GraphQL server will run on
EXPOSE 9002

# Default command to keep the container alive (you'll run zero CLI commands against the running container)
CMD ["tail", "-f", "/dev/null"]
