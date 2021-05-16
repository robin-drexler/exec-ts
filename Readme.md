# exec-ts

Transpiles TypeScript files to JavaScript and executes them.

## Usage

```
npx exec-ts ./your-ts-file.ts
```

### CLI Arguments

- `--require module` Preload the specified module at startup before executing the script. Similar to node's [`--require` flag](https://nodejs.org/api/cli.html#cli_r_require_module). Useful in combination with [tsconfig-paths](https://github.com/dividab/tsconfig-paths#readme) to support aliases in your TypeScript scripts. Can be specified multiple times to preload multiple modules. `--require module-a --require module-b`

### Passing arguments to scripts

You need to use `--` before passing arguments **to** the TS file.

```
npx exec-ts ./your-ts-file.ts -- --your-arg=is-valid
```

Arguments before `--` are parsed by `exec-ts` itself.

## Caveats

Uses [esbuild](https://esbuild.github.io), hence esbuild [caveats](https://esbuild.github.io/content-types/#typescript-caveats) apply.
