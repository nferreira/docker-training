FROM golang:alpine as builder

WORKDIR /go/src/app
COPY main.go .

RUN go build -o webserver .

FROM alpine

COPY --from=builder /go/src/app/webserver /app/webserver

EXPOSE 8080

CMD ["/app/webserver"]
