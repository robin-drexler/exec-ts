# exec-ts

Transpiles TypeScript files to JavaScript and executes them.

## Usage

```
npx exec-ts ./your-ts-file.ts
```

### Passing arguments

You need to use `--` before passing arguments **to** the TS file.

```
npx exec-ts ./your-ts-file.ts -- --your-arg=is-valid
```

Arguments before `--` are parsed by `exec-ts` itself.

## Caveats

Uses [esbuild](https://esbuild.github.io), hence esbuild [caveats](https://esbuild.github.io/content-types/#typescript-caveats) apply.
