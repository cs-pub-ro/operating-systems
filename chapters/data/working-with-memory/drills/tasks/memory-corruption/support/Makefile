BINARY = c_segfault


DC = gdc

d_segfault: d_segfault.d
	$(DC) -o $@ $^

clean::
	-rm -f d_segfault

all: $(BINARY)

$(BINARY): $(OBJS) $(LOGGER)
	$(CC) $^ $(LDFLAGS) -o $@ $(LDLIBS)

clean::
	-rm -f $(BINARY)

.PHONY: all clean
