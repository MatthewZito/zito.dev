---
title: Lorem Ipsum Dolor
subtitle: dolor
createdAt: 2020-01-01
updatedAt: 2021-01-01
imgSrc: https://payload.cargocollective.com/1/17/549798/8559338/paperrad_print09_1000.jpg
slug: test-page
---

# X X X X 

## sub title

```docker
FROM golang:alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o app ./cmd/ 

WORKDIR /dist

RUN cp /build/app .
RUN cp /build/.env .

FROM scratch

COPY --from=builder /dist/app . /dist/.env ./

ENTRYPOINT ["/app"]
```
