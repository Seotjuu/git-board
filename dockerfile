FROM rocker/r-ver:4.4.3

# 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libfontconfig1-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    libfreetype6-dev \
    libpng-dev \
    libtiff5-dev \
    pandoc \
    texlive-xetex

# R 패키지 설치
RUN R -e "install.packages(c('plumber', 'jsonlite', 'ggplot2', 'dplyr'))"

# 앱 코드 복사
COPY . /app
WORKDIR /app

EXPOSE 8000

CMD ["R", "-e", "pr <- plumber::plumb('plumber.R'); pr$run(host='0.0.0.0', port=8000)"]
