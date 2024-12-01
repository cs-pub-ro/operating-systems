PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/
	$(PYTHON) $(SCRIPT) --input ./solution --output ./support
	chmod +x support/tests/checker.sh

clean:
	rm -rf support/
