import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { LightBlogContent } from "./BlogContent"

interface LightBlogPost {
  slug: string
  title: string
  date: string
  content: string[]
}

async function getLightBlogPosts(): Promise<LightBlogPost[]> {
  const jsonPath = path.join(process.cwd(), "data", "blog-posts.json")
  const jsonContents = fs.readFileSync(jsonPath, "utf8")
  const posts = JSON.parse(jsonContents)

  return posts.map((post: { slug: string; title: string; date: string }) => {
    const filePath = path.join(process.cwd(), "data", "blog-posts", `${post.slug}.md`)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { content } = matter(fileContents)
    return {
      ...post,
      content: content.split("##########"),
    }
  })
}

export default async function LightBlog() {
  const posts = await getLightBlogPosts()

  return <LightBlogContent initialPosts={posts} />
}

