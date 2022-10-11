FROM alpine

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Add user so we don't need --no-sandbox. (still need the --no-sandbox though)
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

# Set the working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy app
COPY . .
# Build app
RUN yarn build

# Open port 8080
ENV PORT=8080
EXPOSE 8080

# Run the app
CMD ["yarn", "start"]