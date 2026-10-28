# Image for building and serving the website locally, the same way
# .github/workflows/pages.yml builds it in CI: Python with the packages in
# dev/requirements.txt, plus Quarto for the lecture slides.
#
# The repository is not copied in: docker-compose.yaml mounts it at /site, so
# edits on the host are picked up by `mkdocs serve` without a rebuild.  Rebuild
# the image only when dev/requirements.txt or the Quarto version changes.

FROM python:3.12-slim

# Keep in step with the version pinned in .github/workflows/pages.yml.
ARG QUARTO_VERSION=1.6.43
ARG TARGETARCH

RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates curl \
	&& curl -fsSL -o /tmp/quarto.deb \
		"https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/quarto-${QUARTO_VERSION}-linux-${TARGETARCH:-amd64}.deb" \
	&& apt-get install -y --no-install-recommends /tmp/quarto.deb \
	&& rm -rf /tmp/quarto.deb /var/lib/apt/lists/*

COPY dev/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# The container runs as the host user (see docker-compose.yaml), who has no
# home directory in the image; Quarto and Deno need a writable one for caches.
ENV HOME=/tmp
# A banner from mkdocs-material about MkDocs 2 that says nothing about the site.
ENV DISABLE_MKDOCS_2_WARNING=true

WORKDIR /site
EXPOSE 8000

# Render the decks first, because scripts/gen_pages.py publishes whatever
# decks are on disk when it walks content/, then serve. mkdocs only watches
# docs/ and mkdocs.yml on its own, so content/, scripts/ and README.md are
# manually added
CMD ["sh", "-c", "./scripts/render_slides.sh && exec mkdocs serve --dev-addr 0.0.0.0:8000 --watch content --watch scripts --watch README.md"]
