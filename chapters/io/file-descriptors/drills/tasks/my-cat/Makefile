PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/
	mkdir -p support/tests
	cp solution/tests/checker.sh support/tests/checker.sh
	$(PYTHON) $(SCRIPT) --input ./solution/src --output ./support/src

clean:
	rm -rf support/
