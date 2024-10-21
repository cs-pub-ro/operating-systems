PYTHON = python3
SCRIPT = generate_skels.py

skels:
	mkdir -p support/src
	$(PYTHON) $(SCRIPT) --input ./solution/src --output ./support/src
	chmod +x ./support/src/benchmark_cp.sh
	cp -r ./solution/src/utils ./support/src/utils
	cp -r ./solution/tests ./support/tests

clean:
	rm -rf support/
