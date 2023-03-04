FROM golang:1.20.1
WORKDIR /Go
COPY . .
RUN go mod download

EXPOSE 5000
CMD ["go","run","main.go"]