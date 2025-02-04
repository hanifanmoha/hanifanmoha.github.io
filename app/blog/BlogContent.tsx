"use client"

import ReactMarkdown from "react-markdown"
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react'

interface LightBlogPost {
    slug: string
    title: string
    date: string
    content: string[]
}

interface LightBlogContentProps {
    initialPosts: LightBlogPost[]
}

export function LightBlogContent({ initialPosts }: LightBlogContentProps) {

    if (initialPosts.length === 0) return <div>No posts found.</div>

    return (
        <div className="max-w-lg mx-auto mt-8 space-y-6">
            <div className="space-y-2 mb-16">
                <h1 className="text-5xl font-bold text-gray-900">Blog</h1>
                <p className="text-xl text-gray-600">Light reading to keep you occupied</p>
            </div>

            {initialPosts.map((post) => (
                <div key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div>
                                <h2 className="font-medium text-sm">{post.title}</h2>
                            </div>
                        </div>
                    </div>


                    <Swiper
                        pagination={true}
                        modules={[Pagination]}
                        style={{ height: "400px" }}
                    >
                        {post.content.map(content =>
                            <SwiperSlide className="p-6 overflow-y-auto">
                                <ReactMarkdown
                                    components={{
                                        pre: ({ node, ...props }) => (
                                            <pre className="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto" {...props} />
                                        ),
                                        code: ({ node, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || "")
                                            if (match) {
                                                return (
                                                    <pre className="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
                                                        <code className={`language-${match[1]} text-sm`} {...props}>
                                                            {children}
                                                        </code>
                                                    </pre>
                                                )
                                            }
                                            return (
                                                <code className="bg-gray-100 text-sm px-1.5 py-0.5 rounded font-mono" {...props}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </SwiperSlide>)}
                    </Swiper>

                </div>
            ))}
        </div>
    )
} 