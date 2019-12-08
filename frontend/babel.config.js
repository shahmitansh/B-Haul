module.exports = {
    presets: [
    [
        "next/babel",
        {
            "preset-env": {
                useBuiltIns: "entry"
            }
        }
    ]
    ],

    plugins: [
    ["styled-components", { ssr: true, displayName: true, preprocess: false }],
    [
    "module-resolver",
    {
        root: ["./"]
    }
    ]
    ],

    env: {
        dev: {
          plugins: [
            ["transform-define", enviroments],
            ["module-resolver", { root: ["./"] }],
            "transform-decorators-legacy",
            "transform-class-properties"
          ]
        },

        build: {
          plugins: [
            ["transform-define", enviroments],
            ["module-resolver", { root: ["./"] }],
            "transform-decorators-legacy",
            "transform-class-properties"
          ]
        },

        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        debug: false
                    }
                ],
                '@babel/preset-flow',
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties'
            ]
        },
        production: {
            presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/preset-flow',
                '@babel/preset-react',
                "minify", // why add minify here, we run uglify over the whole code bundles
                  {
                    mangle: false,
                    evaluate: false
                  }
            ],
            plugins: [
                ["transform-define", enviroments],
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                ["module-resolver", { root: ["./"] }]
            ],
            comments: false,
            compact: true,
            minified: true
        },
        development: {
            presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/preset-flow',
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }
};