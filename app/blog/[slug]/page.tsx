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


async function getPost(slug: string): Promise<Post | null> {
    try {
        const filePath = path.join(process.cwd(), "data", "blog-posts", `${slug}.md`)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { content } = matter(fileContents)
        return {
            content: content.split("##########")
        }
    } catch (error) {
        console.error("Error reading post file:", error)
        return null
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug || '')

    return <div>
        <Gallery post={post} />
    </div>
}