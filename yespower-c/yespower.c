#include "yespower.h"

const char* yespower_wasm(const char* input, uint32_t inputLen, char* pers, uint32_t persLen) {
	char output[32];
	
	yespower_hash(input, inputLen, pers, persLen, output);
	
	return output;
}

void yespower_hash(const char* input, uint32_t inputLen, char* pers, uint32_t persLen, char* output) {
    const yespower_params_t params = {
        .version = YESPOWER_1_0,
        .N = 2048,
        .r = 32,
        .pers = (const uint8_t*)pers,
        .perslen = persLen
    };
    yespower_tls((const uint8_t*)input, inputLen, &params, (yespower_binary_t*)output);
}