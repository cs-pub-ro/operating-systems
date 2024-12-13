REPO_NAME = operating-systems
IMAGE_NAME = $(REPO_NAME)/docusaurus:latest
CONTAINER_NAME = open-edu-hub-$(REPO_NAME)-bash
OUTPUT_DIR = $$PWD/.output/$(REPO_NAME)

.PHONY: all buildimg build serve run_bash enter_bash stop_bash clean cleanall

all: build

buildimg:
	docker build -f ./Dockerfile --tag $(IMAGE_NAME) .

build: buildimg
	@echo "Building content. This will take a while (several minutes) ..."
	@echo "After the build, run"
	@echo ""
	@echo "       make serve"
	@echo ""
	@mkdir -p $(OUTPUT_DIR)
	docker run --rm -v $$PWD/:/content -v $(OUTPUT_DIR):/output $(IMAGE_NAME)

serve:
	@echo "Point your browser to http://localhost:8080/$(REPO_NAME)"
	@cd $(OUTPUT_DIR)/.. && python3 -m http.server 8080

run_bash: buildimg
	@mkdir -p $(OUTPUT_DIR)
	docker run -d -it --entrypoint /bin/bash --name $(CONTAINER_NAME) -v $$PWD/:/content -v $(OUTPUT_DIR):/output $(IMAGE_NAME)

enter_bash:
	docker exec -it $(CONTAINER_NAME) /bin/bash

stop_bash:
	-test "$(shell docker container inspect -f '{{.State.Running}}' $(CONTAINER_NAME) 2> /dev/null)" = "true" && docker stop $(CONTAINER_NAME)

clean: stop_bash
	-docker container inspect $(CONTAINER_NAME) > /dev/null 2>&1 && docker rm $(CONTAINER_NAME)
	-sudo rm -fr $(OUTPUT_DIR)

cleanall: clean
	-docker inspect --type=image $(IMAGE_NAME) > /dev/null 2>&1 && docker image rm $(IMAGE_NAME)

.PHONY: lint markdownlint cpplint black shellcheck
lint: markdownlint cpplint black shellcheck

CHANGED_MD_FILES = $(call get_changed_files,\.md$$)
markdownlint:
	@echo "Checking markdown files ..."
	@if [ "$(CHANGED_MD_FILES)" ]; then \
		docker run --rm -v $(PWD):/md peterdavehello/markdownlint markdownlint \
			--config .github/.markdownlint.yaml \
			--rules .github/markdownlint-custom/rules.js \
			$(CHANGED_MD_FILES); \
	fi

CHANGED_CPP_FILES = $(call get_changed_files,\.\(c\|cc\|cpp\|h\|hpp\)$$)
cpplint: # Runs locally, requires cpplint installed
	@echo "Checking C/C++ files ..."
	@if [ "$(CHANGED_CPP_FILES)" ]; then \
		cpplint --recursive --quiet $(CHANGED_CPP_FILES); \
	fi

CHANGED_PY_FILES = $(call get_changed_files,\.py$$)
black:
	@echo "Checking Python files ..."
	@if [ "$(CHANGED_PY_FILES)" ]; then \
		docker run --rm -v $(PWD):/data --workdir=/data pyfound/black:latest \
			black --check --diff $(CHANGED_PY_FILES); \
	fi

CHANGED_SHELL_FILES = $(call get_changed_files,\.\(sh\|bash\)$$)
shellcheck:
	@echo "Checking shell scripts ..."
	@if [ "$(CHANGED_SHELL_FILES)" ]; then \
		docker run --rm -v $(PWD):/data --workdir=/data koalaman/shellcheck-alpine:v0.10.0 \
			shellcheck --severity=warning $(CHANGED_SHELL_FILES); \
	fi

# Get a list of files that changed in the current branch and match the given pattern
define get_changed_files # $(1): pattern
$(shell git diff --name-only HEAD $(shell git merge-base HEAD main) | grep "$(1)" | tr '\n' ' ')
endef
