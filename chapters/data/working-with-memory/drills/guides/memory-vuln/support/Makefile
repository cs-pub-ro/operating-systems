BINARY = c_memory_vuln
CFLAGS = -Wno-unused-variable
DC = gdc

d_memory_vuln: d_memory_vuln.d
	$(DC) -o $@ $^

clean::
	-rm -f d_memory_vuln
