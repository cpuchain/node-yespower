{
    "targets": [
        {
            "target_name": "yespower",
            "sources": [
                "yespower.cc",
                "../yespower-c/sha256.c",
                "../yespower-c/yespower.c",
                "../yespower-c/yespower-opt.c",
            ],
            "include_dirs": [
                "<!(node -e \"require('nan')\")"
            ],
            "cflags_cc": [
                "-std=c++17"
            ],
        }
    ]
}
