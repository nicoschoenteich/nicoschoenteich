import { spawn } from "child_process"

spawn("serve", ["dist"], { stdio: "inherit", shell: true })
spawn("nodemon", ["--watch", "app", "--ext", "html,js,css,md", "--exec", "node scripts/build.js"], { stdio: "inherit", shell: true })
