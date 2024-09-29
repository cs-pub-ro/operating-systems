PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src/
	$(PYTHON) $(SCRIPT) --input ./solution/src/ --output ./support/src/
	chmod +x support/src/get_files.sh

clean:
	rm -rf support/
