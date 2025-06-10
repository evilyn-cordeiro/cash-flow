FROM node:18 AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .

# Copia o .env para dentro do build (não obrigatório para o build, mas vamos garantir)
COPY .env ./

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env ./  

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/index.js"]