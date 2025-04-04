export const DEFAULT_IMAGE = "https://picsum.photos/200/300";


export interface Article {
  stub: string;
  title: string;
  content: string;
  img_url: string;
  publish_date: Date;
  // other properties
}


export const fixtureData = [
  {
      id: 1,
      img_url: DEFAULT_IMAGE,
      stub: 'my-first-post',
      title: 'My First Post',
      content: 'This is my first post',
      publish_date: new Date(),
      updatedAt: new Date(),
  },
  {
      id: 2,
      img_url: DEFAULT_IMAGE,
      stub: 'my-second-post',
      title: 'My Second Post',
      content: 'This is my second post',
      publish_date: new Date(),
      updatedAt: new Date(),
  },
  {
      id: 3,
      img_url: DEFAULT_IMAGE,
      stub: 'my-third-post',
      title: 'My Third Post',
      content: 'This is my third post',
      publish_date: new Date(),
      updatedAt: new Date(),
  }
]