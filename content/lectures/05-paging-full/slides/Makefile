.PHONY: run-site run-site-daemon generate-pdf

run-site:
	docker run --rm -p 1948:1948 -p 35729:35729 -v $$(pwd):/slides webpronl/reveal-md:latest /slides --watch

remove-if-exists:
	-docker container inspect reveal-md-daemon > /dev/null 2>&1 && docker stop reveal-md-daemon

run-site-daemon: remove-if-exists
	docker run --rm -d --name reveal-md-daemon -p 1948:1948 -p 35729:35729 -v $$(pwd):/slides webpronl/reveal-md:latest /slides --watch

generate-site:
	docker run --rm -v $$(pwd):/slides webpronl/reveal-md:latest --static /slides/_site

generate-pdf: run-site-daemon
	docker run --rm -t --net=host -v $$(pwd):/slides astefanutti/decktape 'http://localhost:1948/slides.md#/' slides.pdf
	docker stop reveal-md-daemon
