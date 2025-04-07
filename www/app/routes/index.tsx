// app/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getSql } from '~/database'
import Markdown from 'react-markdown'
import { seo } from '~/utils/seo'
import { DEFAULT_IMAGE, fixtureData } from '~/common'


const loadAboutServerFn = createServerFn({method: 'GET'}).handler(async () => {
  const firstPost = fixtureData[0];
  
  return {content: firstPost.content}
})

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Clean Project',
        description: 'Clean Project',
        image: DEFAULT_IMAGE,
        keywords: 'clean, project, clean project',
      }),
    ],
  }),
  component: Home,
  loader: async () => {
    try {
      return await loadAboutServerFn();
    } catch (error) {
      console.error(error)
      return {content: ''}
    }
  },
})

function Home() {
  const { content } = Route.useLoaderData()

  return (
    <div className="article-md">
      <Markdown>{content}</Markdown>
    </div>
  )
}