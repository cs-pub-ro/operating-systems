PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src
	mkdir -p support/tests
	$(PYTHON) $(SCRIPT) --input ./solution/ --output ./support/
	cp ./solution/tests/* ./support/tests/
	chmod +x support/tests/checker.sh

clean:
	rm -rf support
