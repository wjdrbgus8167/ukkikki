#Build Stage
FROM gradle:8.12-jdk17 AS builder
WORKDIR /build

#Gradle 파일이 변경되면 새롭게 의존 패키지 다운로드
COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

# 빌드 컨텍스트에 포함된 파일을 이미지에 복사
COPY . /build
RUN gradle clean build -x test --parallel

# Runtime stage
FROM openjdk:17-alpine
WORKDIR /app

# 빌더 이미지에서 jar 파일만 복사
COPY --from=builder /build/build/libs/ukkikki-0.0.1-SNAPSHOT.jar app.jar

#로그 디렉토리 생성
RUN mkdir -p /app/logs

EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]