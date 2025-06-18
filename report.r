# report.r
library(jsonlite)
library(ggplot2)
library(dplyr)

json_file <- "./commits.json"
data <- fromJSON(json_file)

if (nrow(data) == 0 || is.null(data$author$date)) {
  stop("JSON 데이터가 비어 있거나 author.date 필드가 없습니다.")
}

data$date <- as.Date(data$author$date)

commit_counts <- data %>%
  filter(!is.na(date)) %>%
  group_by(date) %>%
  summarise(count = n(), .groups = "drop")

p <- ggplot(commit_counts, aes(x = date, y = count)) +
  geom_line(color = "blue") +
  geom_point(color = "blue") +
  theme_minimal() +
  labs(title = "Status of commit data by date", x = "Date", y = "Number of Commits")

pdf("commit_report.pdf", width = 8, height = 6)
print(p)
dev.off()
