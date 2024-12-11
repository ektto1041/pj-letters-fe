# Dockerfile
FROM nginx:alpine

# 빌드된 React 프로젝트 파일들을 Nginx의 기본 서비스 디렉토리로 복사
COPY ./dist /usr/share/nginx/html

# Nginx 실행 (기본 명령어 사용)
CMD ["nginx", "-g", "daemon off;"]