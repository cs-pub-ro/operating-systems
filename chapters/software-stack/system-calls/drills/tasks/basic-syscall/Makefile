PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src/arm
	$(PYTHON) $(SCRIPT) --input ./solution/src/arm --output ./support/src/arm
	$(PYTHON) $(SCRIPT) --input ./solution/src/ --output ./support/src/
	cp -r ./solution/tests ./support/tests

clean:
	rm -rf support/
