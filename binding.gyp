{
    "targets": [
        {
            "target_name": "yespower",
            "sources": [
                "yespower.cc",
                "yespower/sha256.c",
                "yespower/yespower.c",
                "yespower/yespower-opt.c",
            ],
            "include_dirs": [
                "<!(node -e \"require('nan')\")"
            ],
            "cflags_cc": [
                "-std=c++17 -march=native"
            ],
        }
    ]
}
