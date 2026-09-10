FROM alpine:latest
RUN apk add --no-cache zip
WORKDIR /data
CMD ["zip", "-r", "heap3.zip", ".", "-x", "Dockerfile", "-x", "README.md"]
