# library(plumber)
# library(rmarkdown)
# library(jsonlite)

# function(req, res) {
#   json <- fromJSON(req$postBody)
#   write(toJSON(json), "commits.json")  # 저장

#   render("report.r", output_file = "Status of commit data by date.pdf")

#   readBin("Status of commit data by date.pdf", "raw", n = file.info("Status of commit data by date.pdf")$size)
# }