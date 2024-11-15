module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^((?:#|ADM-)\d+) (\w+)\((.+)\) (.+)$/,
      headerCorrespondence: ["reference", "type", "scope", "subject"],
      noteKeywords: ["BREAKING CHANGE"],
      revertPattern:
        /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
      revertCorrespondence: ["header", "hash"],
      commentChar: "$",
    },
  },
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "subject-case": [2, "never", ["start-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "logs",
        "config",
        "data",
      ],
    ],
    "scope-enum": [
      2,
      "always",
      ["admin", "auth", "ux", "ui", "new", "dx", "api", "frontend", "backend"],
    ],
    "reference-empty": [2, "never"],
  },
  plugins: [
    {
      rules: {
        "reference-empty": ({ reference }) => [
          reference,
          "reference may not be empty",
        ],
      },
    },
  ],
};
