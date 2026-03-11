FROM node:20 as builder
# ENV NODE_ENV production
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY . .
# COPY package*.json ./
RUN npm install -g @nestjs/cli@10.1.18
RUN npm install
RUN npm run build
# RUN prisma generate
# FROM node:lts-slim
#RUN npm ci --production
EXPOSE 8080 
ENTRYPOINT ["nest", "start"]
