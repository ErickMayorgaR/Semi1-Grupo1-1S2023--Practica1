FROM golang:1.20.1
WORKDIR /Go
COPY . .
RUN go get -d -v ./...
RUN go install -v ./...
EXPOSE 5000
CMD ["go run main.go"]