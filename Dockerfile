#Layer 1 Sử dụng Node.js 14 làm base image
FROM node:14  

#Layer 2 Thiết lập thư mục làm việc trong container
WORKDIR /app  

#Layer 3 Copy file package.json vào container để cài đặt dependencies trước
COPY package.json .  

#Layer 4 Cài đặt dependencies
RUN npm install  

#Layer 5 Copy toàn bộ mã nguồn vào container
COPY . .  

#Layer 6 Khai báo container sẽ sử dụng cổng 3000
EXPOSE 3000

#Layer 7 Chạy ứng dụng Node.js với file server.js
CMD [ "node", "server.js"]
