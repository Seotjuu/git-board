library(jsonlite)
library(ggplot2)
library(dplyr)


json_file <- "./commits.json"
data <- fromJSON(json_file)

if (nrow(data) == 0 || is.null(data$author$date)) {
  stop("JSON 데이터가 비어 있거나 author.date 필드가 없습니다.")
}

cat("Raw data preview:\n")
print(head(data))

data$date <- as.Date(data$author$date) # ISO 8601 형식을 Date로 변환
if (any(is.na(data$date))) {
  warning("일부 date 값이 NA로 변환되었습니다. 문제 있는 데이터:")
  print(data$author$date[is.na(data$date)])
}

commit_counts <- data %>% filter(!is.na(date)) %>% group_by(date) %>% summarise(count = n(), .groups = "drop") # nolint

if (nrow(commit_counts) == 0) {
  stop("commit_counts 데이터가 비어 있습니다. 필터링 후 데이터가 없습니다.")
}

cat("Commit counts by date:\n")
print(commit_counts)

p <- ggplot(commit_counts, aes(x = date, y = count)) +
  geom_line(color = "blue") +
  geom_point(color = "blue") +
  theme_minimal() +
  labs(title = "Status of commit data by date", x = "Date", y = "Number of Commits")

pdf("./Status of commit data by date.pdf", width = 8, height = 6)
print(p)
dev.off()

cat("PDF chart generated successfully\n")