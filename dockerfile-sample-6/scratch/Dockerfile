FROM golang:1.12.7 as builder

WORKDIR /go/src/app
COPY main.go .

RUN CGO_ENABLED=0 GOOS=linux go build -v -ldflags '-s' -a -installsuffix cgo -o webserver .

FROM scratch

COPY --from=builder /go/src/app/webserver /app/webserver

EXPOSE 8080

CMD ["/app/webserver"]
