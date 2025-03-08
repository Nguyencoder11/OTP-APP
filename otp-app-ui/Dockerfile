# Dùng Node.js để build dự án
FROM node:20 as build

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json để cài đặt dependency
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Dùng nginx để phục vụ ứng dụng React
FROM nginx:stable-alpine

# Copy file build vào thư mục html của nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy cấu hình nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 3000
EXPOSE 3000

# Khởi động nginx
CMD ["nginx", "-g", "daemon off;"]
