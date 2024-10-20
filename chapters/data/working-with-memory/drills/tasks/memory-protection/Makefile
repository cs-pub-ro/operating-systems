PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src
	$(PYTHON) $(SCRIPT) --input ./solution/src --output ./support/src
	cp solution/src/str.py support/src/str.py
	cp -r ./solution/tests ./support/tests

clean:
	rm -rf support/
