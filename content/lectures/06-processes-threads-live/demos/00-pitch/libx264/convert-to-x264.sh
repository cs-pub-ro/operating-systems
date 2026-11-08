#!/bin/sh

. ./config

# input_file is set in ./config, written from config.sample.
# shellcheck disable=SC2154
ffmpeg -i "$input_file" -c:v libx264 -c:a aac output.mp4
