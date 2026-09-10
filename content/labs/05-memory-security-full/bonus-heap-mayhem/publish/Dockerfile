FROM alpine:latest
RUN apk add --no-cache zip
WORKDIR /data
CMD ["zip", "-r", "heap-mayhem.zip", ".", "-x", "Dockerfile", "-x", "README.md"]
