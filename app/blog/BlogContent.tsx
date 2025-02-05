"use client"

import ReactMarkdown from "react-markdown"
import { Navigation, Pagination } from 'swiper/modules';

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
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        style={{ height: "400px" }}
                    >
                        {post.content.map((content, index) =>
                            <SwiperSlide key={index} className="px-12 py-6 overflow-y-auto prose">
                                <ReactMarkdown>
                                    {content}
                                </ReactMarkdown>
                            </SwiperSlide>)}
                    </Swiper>

                </div>
            ))}
        </div>
    )
} 