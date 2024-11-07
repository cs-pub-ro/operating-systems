# The script expect the source .svg files to be named as $TARGET-$i.svg, where $i is the frame number.
TARGETS = socket-summary
RVMD = reveal-md
MDPP = markdown-pp
FFMPEG = ffmpeg

SLIDES ?= slides.mdpp
SLIDES_OUT ?= slides.md
SITE ?= _site
OPEN ?= xdg-open

.PHONY: all html clean videos

all: videos html

html: $(SITE)

$(SITE): $(SLIDES)
	$(MDPP) $< -o $(SLIDES_OUT)
	$(RVMD) $(SLIDES_OUT) --static $@

videos:
	for TARGET in $(TARGETS); do \
		TARGET_DIR=$$(find -name $$TARGET -type d | grep media); \
		MEDIA_DIR=$$(dirname $$TARGET_DIR); \
		$(FFMPEG) -framerate 0.5 -f image2 -y \
			-i "$$TARGET_DIR/$$TARGET-%d.svg" -vf format=yuv420p $$MEDIA_DIR/$$TARGET-generated.gif; \
	done

open: $(SITE)
	$(OPEN) $</index.html

clean:
	-rm -f $(MEDIA_DIR)/*-generated.gif
	-rm -f *~
	-rm -fr $(SITE) $(SLIDES_OUT)
