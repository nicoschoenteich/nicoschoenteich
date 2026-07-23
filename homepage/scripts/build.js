import { cpSync, rmSync } from "fs"

rmSync("dist", { recursive: true, force: true })
cpSync("app", "dist", { recursive: true })
