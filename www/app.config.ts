// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { getSql } from './app/database';
import { cloudflare } from 'unenv';
import tailwindcss from '@tailwindcss/vite';

import { fixtureData } from './app/common';

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
  },
  server: {
    preset: 'cloudflare-pages',
    unenv: cloudflare,
    hooks: {
      'prerender:routes': async (routes) => {
        
        fixtureData.forEach((result: any) => {
          routes.add(`/posts/${result.stub}`)
        })
      }
    },

    prerender: {
      routes: ['/','/posts']
    }
  },
})