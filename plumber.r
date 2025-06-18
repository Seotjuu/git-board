# plumber.R
library(plumber)

#* @post /report
#* @serializer contentType list(type="application/pdf")
function(req, res) {
  write(req$postBody, file = "commits.json")  # JSON 파일 저장

  # 순수 R 스크립트 실행
  source("report.r")

  # PDF 바이너리로 읽어서 반환
  readBin("commit_report.pdf", "raw", n = file.info("commit_report.pdf")$size)
}