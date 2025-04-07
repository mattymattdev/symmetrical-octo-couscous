import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import Markdown from 'react-markdown';
import { seo } from '~/utils/seo';
import { Article, fixtureData } from '~/common';
import { getSql, LOCAL_DATABASE_URL } from '~/database';

const loadPostServerFn = createServerFn({method: 'GET'})
.validator((data: string) => data)
.handler(async (ctx) : Promise<{article: Article | null, dbData: string | null}> => {
  
  try {

    const sql = getSql(LOCAL_DATABASE_URL);
    const result = await sql`SELECT fixture_col_a FROM fixture_table;`
    const dbData = result[0].fixture_col_a
    
    const article = fixtureData.find((article) => article.stub === ctx.data)

    return {
      article: article as Article | null,
      dbData: dbData as string | null
    }
  } catch (error) {
    console.error(error)
    return { article: null, dbData: null }
  }
})


export const Route = createFileRoute('/posts/$stub')({
  head: (ctx) => {
    const data = ctx.loaderData as unknown as { article: Article | null, dbData: string | null }

    if (data && data.article) {

      return {
        meta: [
          ...seo({
            title: data.article.title,
            description: data.article.content.slice(0, 155) + '...',
            image: data.article.img_url,
        }),
        ],
      }

    } else {
      return {
        meta: [
          ...seo({
            title: 'Error',
            description: 'Failed to load article',
          }),
        ],
      }
    }
  },
  component: PostComponent,
  loader: async ({ params: { stub }, context }) => {
    return await loadPostServerFn({data: stub});
  },
})

function PostComponent() {
  const { article, dbData } = Route.useLoaderData() as { article: Article | null, dbData: string | null }

  if (!article) {
    return <main className="md">
      <div>
        <h1>Error</h1>
        <p>Failed to load article</p>
      </div>
    </main>;
  }

  return <main className="article-md">
    <img className="max-w-full h-auto rounded-xl mb-10 object-cover shadow-lg" src={article.img_url} alt={article.title} />
    <Markdown>{article.content}</Markdown>
    <h1>{dbData}</h1>
  </main>
}
