import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        "http://10.0.0.183:8080/graphql": {},
    },
    documents: ["src/**/*.graphql"],
    generates: {
        "src/graphql/graphql-types.ts": {
            plugins: ["typescript"],
            config: {
                declarationKind: "interface",
                flattenGeneratedTypes: false,
                // nonOptionalTypename: true,
                // skipTypename: true,
                // inlineFragmentTypes: "mask",
                // wrapFieldDefinitions: true,
                defaultScalarType: "unknown",
                useImplementingTypes: true,
            },
        },
        "src/": {
            preset: "near-operation-file",
            presetConfig: {
                folder: "../__generated__",
                extension: ".generated.ts",
                // flattenGeneratedTypesIncludingFragments: true,
                fragmentMasking: false,
                exportFragmentSpreadSubTypes: true,
                declarationKind: "interface",
                baseTypesPath: "graphql/graphql-types.ts",
            },
            config: {
                withHooks: true,
                skipTypename: true,
                inlineFragmentTypes: "combine",
                // flattenGeneratedTypes: true,
                // flattenGeneratedTypesIncludingFragments: true,
                defaultScalarType: "unknown",
                exportFragmentSpreadSubTypes: true,
                declarationKind: "interface",
            },
            plugins: ["typescript-urql", "typescript-operations"],
        },
    },
};

export default config;
