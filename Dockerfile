# Use the official Node image
FROM node:lts AS runtime
WORKDIR /app
# Copy everything into the container
COPY . .
# Install dependencies
RUN npm install
# Build the Astro site
RUN npm run build
# Expose environment variables and port
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
# Launch the server
CMD node ./dist/server/entry.mjs
