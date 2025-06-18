# Node.js 기반 이미지
FROM node:18

# R 설치
RUN apt-get update && apt-get install -y \
    r-base \
    r-base-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    pandoc

# TinyTeX 설치
RUN R -e "install.packages('tinytex', repos='https://cran.rstudio.com/')"
RUN R -e "tinytex::install_tinytex()"

# R 패키지 설치
RUN R -e "install.packages(c('jsonlite', 'ggplot2', 'dplyr'), repos='https://cran.rstudio.com/')"

# 작업 디렉토리 설정
WORKDIR /app

# Next.js 프로젝트 복사
COPY package*.json ./
RUN npm install
COPY . .

# Next.js 빌드
RUN npm run build

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "run", "dev"]