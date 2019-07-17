FROM golang:1.12.7

WORKDIR /go/src/app
COPY main.go .

RUN go build -o webserver .

EXPOSE 8080

CMD ["./webserver"]
