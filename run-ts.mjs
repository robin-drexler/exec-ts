#!/usr/bin/env node

import { resolve } from "path";
import { run } from "./index.mjs";

run({ filePath: resolve(process.argv[2]) });
