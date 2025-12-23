import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Gallery from "./Gallery"
import { Post } from "@/lib/types"

export async function generateStaticParams() {
    try {
        const jsonPath = path.join(process.cwd(), "data", "blog-posts.json")
        const jsonContents = fs.readFileSync(jsonPath, "utf8")
        const posts = JSON.parse(jsonContents)
        return posts.map((post: { slug: string }) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.error("Error reading post file:", error)
        return []
    }
}

const SEPARATOR = `---\n---\n---`

async function getPost(slug: string): Promise<Post | null> {
    try {
        const numberSlug = Number(slug.split('-')[0])
        if (isNaN(numberSlug)) {
            console.error("Invalid slug, not a number:", slug)
            return null
        }
        const blogPostsDir = path.join(process.cwd(), "data", "blog-posts")
        const files = fs.readdirSync(blogPostsDir)
        const fileName = files.find(name => name.startsWith(`${numberSlug}`))
        if (!fileName) {
            console.error("No file found for slug:", slug)
            return null
        }
        const filePath = path.join(blogPostsDir, fileName)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { content } = matter(fileContents)
        return {
            content: content.split(SEPARATOR)
        }
    } catch (error) {
        console.error("Error reading post file:", error)
        return null
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug || '')

    return <div>
        <Gallery post={post} slug={params.slug || ''} />
    </div>
}