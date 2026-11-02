#!/bin/sh

. ./config

ffmpeg -i "$input_file" -c:v libx264 -c:a aac output.mp4
