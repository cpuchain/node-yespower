#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <nan.h>

extern "C" {
    #include "yespower/yespower.h"
}

using namespace node;
using namespace Nan;
using namespace v8;

NAN_METHOD(yespower) {
    if(info.Length() < 1) {
        Nan::ThrowError("You must provide at least one argument.");
        return;
    }

    Local<Object> target = Nan::To<Object>(info[0]).ToLocalChecked();
    Local<String> persTarget = Nan::To<String>(info[1]).ToLocalChecked();

    if(!node::Buffer::HasInstance(target)) {
        Nan::ThrowError("Argument should be a buffer object.");
        return;
    }

    char* input = node::Buffer::Data(target);
    uint32_t input_len = node::Buffer::Length(target);
    
    char *pers;
    uint32_t pers_len = 0;

    if (info[1]->IsString()) {
        v8::Isolate* isolate = info.GetIsolate();
        v8::String::Utf8Value str(isolate, info[1]);
        std::string cppStr(*str);
        pers_len = cppStr.length();
        pers = (char*)*str;
    }

    char output[32];

    yespower_hash(input, input_len, pers, pers_len, output);

    info.GetReturnValue().Set(Nan::CopyBuffer(output, 32).ToLocalChecked());
}

NAN_MODULE_INIT(init)
{
    NAN_EXPORT(target, yespower);
}

NAN_MODULE_WORKER_ENABLED(yespower, init);