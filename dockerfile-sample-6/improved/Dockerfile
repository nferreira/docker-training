FROM golang:alpine

WORKDIR /go/src/app
COPY main.go .

RUN go build -o webserver .

EXPOSE 8080

CMD ["./webserver"]
