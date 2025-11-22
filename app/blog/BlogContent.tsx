"use client"

import Link from 'next/link'

interface LightBlogPost {
    slug: string
    title: string
    published: boolean
    description?: string
    date?: string
}

interface LightBlogContentProps {
    initialPosts: LightBlogPost[]
}

export function LightBlogContent({ initialPosts }: LightBlogContentProps) {

    if (initialPosts.length === 0) return <div>No posts found.</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-2 mb-16">
                <h1 className="text-5xl font-bold text-gray-900">Blog</h1>
                <p className="text-xl text-gray-600">To test the limit and breakthrough</p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1">
                {initialPosts.filter((post) => post.published).map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block"
                    >
                        <div className="h-full bg-gray-50 overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-gray-300 hover:shadow-lg p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">{post.title}</h3>
                                {post.description && <p className="mt-2 text-gray-600">{post.description}</p>}
                            </div>
                            {post.date && <p className="mt-4 text-sm text-gray-500">{post.date}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
} 