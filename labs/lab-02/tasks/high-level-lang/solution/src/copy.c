#include <stdio.h>

int main(int argc, char* argv[])
{
	char buf[128];
	FILE *fin, *fout;

	/* TODO 28: Copy file from command line arguments */
	if (argc < 3)
		return 1;

	fin = fopen(argv[1], "rb");
	if (!fin)
		return 1;

	fout = fopen(argv[2], "wb");
	if (!fout) {
		fclose(fin);
		return 1;
	}

	while (!feof(fin) && !ferror(fin)) {
		size_t bytes = fread(buf, 1, sizeof buf, fin);
		fwrite(buf, 1, bytes, fout);
	}

	if (!ferror(fin) && !ferror(fout)) {
		fclose(fin);
		fclose(fout);
		return 0;
	}

	fclose(fin);
	fclose(fout);

	return 1;
}
