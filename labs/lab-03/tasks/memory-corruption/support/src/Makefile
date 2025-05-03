C_SEGFAULT = c_segfault
C_OBJECTS = c_segfault.o
D_SEGFAULT = d_segfault
D_SOURCE = d_segfault.d

DC = gdc

all: $(C_SEGFAULT) $(D_SEGFAULT)

$(D_SEGFAULT): $(D_SOURCE)
	$(DC) -o $@ $<

$(C_SEGFAULT): $(C_OBJECTS)
	$(CC) $^ $(LDFLAGS) -o $@

clean:
	-rm -f $(C_SEGFAULT) $(D_SEGFAULT) $(C_OBJECTS)

.PHONY: all clean
