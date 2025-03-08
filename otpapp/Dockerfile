# Sử dụng JDK để build
FROM openjdk:17-jdk-slim as build

# Đặt thư mục làm việc
WORKDIR /app

# Copy các file cấu hình Maven vào container để cache dependency
COPY ./pom.xml ./mvnw ./mvnw.cmd ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -B

# Copy toàn bộ mã nguồn vào container
COPY src ./src

# Build ứng dụng
RUN ./mvnw clean package -DskipTests

# Dùng JDK nhẹ hơn để chạy ứng dụng
FROM openjdk:17-jdk-slim

# Đặt thư mục làm việc
WORKDIR /app

# Copy file JAR đã build từ container build sang container chạy
COPY --from=build /app/target/*.jar app.jar

# Copy file .env vào container
COPY .env .env

# Thiết lập các biến môi trường cho Spring Boot từ Docker Compose
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}
ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
ENV TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
ENV TWILIO_FROM_PHONE=${TWILIO_FROM_PHONE}

# Mở cổng 9090
EXPOSE 9090

# Khởi động ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
