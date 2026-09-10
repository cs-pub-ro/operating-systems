FROM alpine:latest
RUN apk add --no-cache zip
WORKDIR /data
CMD ["zip", "-r", "heap0.zip", ".", "-x", "Dockerfile", "-x", "README.md"]
