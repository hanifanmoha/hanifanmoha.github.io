import fs from "fs"
import path from "path"
import { LightBlogContent } from "./BlogContent"
import PortoLayout from "../PortoLayout"

interface LightBlogPost {
  slug: string
  title: string
  description?: string
  date?: string
}

async function getLightBlogPosts(): Promise<LightBlogPost[]> {
  const jsonPath = path.join(process.cwd(), "data", "blog-posts.json")
  const jsonContents = fs.readFileSync(jsonPath, "utf8")
  const posts = JSON.parse(jsonContents)

  return posts
}

export default async function LightBlog() {
  const posts = await getLightBlogPosts()

  return <PortoLayout>
    <LightBlogContent initialPosts={posts} />
  </PortoLayout>
}

