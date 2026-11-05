SRC_PATH ?= ../src
UTILS_PATH = $(realpath ../utils)

.PHONY: all src check lint clean distclean

all: src

src:
	$(MAKE) -C $(SRC_PATH) UTILS_PATH=$(UTILS_PATH)

check: clean
	-$(MAKE) SRC_PATH=$(SRC_PATH)
	SRC_PATH=$(SRC_PATH) python3 checker.py

lint:
	-cd $(SRC_PATH)/.. && checkpatch.pl -f src/*.c
	-cd $(SRC_PATH)/.. && cpplint --recursive src/
	-cd $(SRC_PATH)/.. && shellcheck tests/*.sh
	# All tests/*.py are checker related
	# -cd $(SRC_PATH)/.. && pylint tests/*.py

clean:
	$(MAKE) -C $(SRC_PATH) clean
	-rm -f *~
	-rm -rf __pycache__
	-rm -rf out

distclean: clean
	-rm -rf in
	-rm -rf ref
