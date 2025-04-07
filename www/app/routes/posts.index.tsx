import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { seo } from '~/utils/seo';
import { fixtureData } from '~/common';

const loadPostsServerFn = createServerFn({method: 'GET'}).handler(async () => {
  try {
   
    return { articles: fixtureData }
  } catch (error) {
    console.error(error)
    return { articles: [] }
  }
})

export const Route = createFileRoute('/posts/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Posts',
        description: 'Clean Project posts',
      }),
    ],
  }),
  component: RouteComponent,
  loader: async () => {
    return await loadPostsServerFn();
  },
})

function RouteComponent() {
  const { articles } = Route.useLoaderData()
  console.log(articles)
  return <main>
    <h1 className="text-2xl font-bold">Writing</h1>
    <ul className="flex flex-col gap-4 mt-10">
      {articles.map((article) => (
        <li key={article.id} className="flex flex-row justify-between">
          <h2 className="text-xl flex-shrink-1"><Link to={'/posts/$stub'} params={{stub: article.stub}}>{article.title}</Link></h2>
          <p className="text-sm flex-shrink-0">{article.publish_date.toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  </main>
}
