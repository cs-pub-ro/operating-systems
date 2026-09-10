FROM alpine:latest
RUN apk add --no-cache zip
WORKDIR /data
CMD ["zip", "-r", "heap2.zip", ".", "-x", "Dockerfile", "-x", "README.md"]
