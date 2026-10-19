import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import {cpSync} from "node:fs"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), {name:"publish-guide-data",closeBundle(){cpSync("src/_db","dist/data",{recursive:true})}}],
	define: {
		global: "globalThis",
	},
})
