PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src/
	$(PYTHON) $(SCRIPT) --input ./solution/src/ --output ./support/src/
	cp -r solution/tests support/tests
	cp -r solution/utils support/utils

clean:
	rm -rf support
