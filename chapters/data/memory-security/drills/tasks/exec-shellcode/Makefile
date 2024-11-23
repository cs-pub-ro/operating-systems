PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src
	$(PYTHON) $(SCRIPT) --input ./solution/src --output ./support/src
	$(PYTHON) $(SCRIPT) --input ./solution/tests --output ./support/tests

clean:
	rm -rf support/
