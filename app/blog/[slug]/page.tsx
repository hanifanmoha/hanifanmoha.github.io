import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Gallery from "./Gallery"
import { Post } from "@/lib/types"

async function getPost(): Promise<Post | null> {
    try {
        const filePath = path.join(process.cwd(), "data", "blog-posts", "importance-of-code-reviews.md")
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

export default async function Page() {
    const post = await getPost()

    return <div>
        <Gallery post={post} />
    </div>
}