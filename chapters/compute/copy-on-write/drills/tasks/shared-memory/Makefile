PYTHON = python3
SCRIPT = generate_skels.py

skels:
	$(PYTHON) $(SCRIPT) --input ./solution/ --output ./support/
	chmod +x support/tests/checker.sh

clean:
	rm -rf support
