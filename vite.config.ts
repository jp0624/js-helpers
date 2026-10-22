import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {cpSync} from 'node:fs';
export default defineConfig({plugins:[react(),{name:'preserve-original-guide',closeBundle(){cpSync('src/_db','dist/data',{recursive:true})}}]});
