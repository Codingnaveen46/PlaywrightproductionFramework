FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app

COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y default-jre && rm -rf /var/lib/apt/lists/*

RUN npm ci

COPY . .

CMD ["npm", "test"]
