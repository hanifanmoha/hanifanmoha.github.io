'use client';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import ReactMarkdown from "react-markdown"
import { Post } from "@/lib/types";
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

interface GalleryProps {
  post: Post | null
  slug: string
}

export default function Gallery({ post, slug }: GalleryProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!post) {
    return <div>404 | Post not found</div>;
  }

  // Custom component to render markdown with images
  const MarkdownComponents = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (!src) return null;

      // Handle image paths - convert relative paths to absolute paths
      const imagePath = src.startsWith('http') ? src : `/images/blogs/${slug}/${src}`;

      // Check if it's an SVG
      if (imagePath.endsWith('.svg')) {
        return (
          <div className="my-4 flex justify-center">
            <img
              src={imagePath}
              alt={alt || ''}
              className="max-w-full h-auto"
              style={{ maxWidth: '80%' }}
            />
          </div>
        );
      }

      // For other image formats, use Next.js Image component
      return (
        <div className="my-4 flex justify-center">
          <Image
            src={imagePath}
            alt={alt || ''}
            width={600}
            height={400}
            className="max-w-full h-auto"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
      );
    }
  };

  return (
    <div className='h-[100vh] flex flex-col'>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={styles.swiper}
        className='w-full flex-1'
      >
        {post.content.map((content, index) => (
          <SwiperSlide key={index} className="overflow-y-auto">
            <div className='max-w-2xl py-12 px-6 mx-auto prose prose-lg bg-white min-h-full flex flex-col justify-center'>
              <ReactMarkdown components={MarkdownComponents}>
                {content}
              </ReactMarkdown>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='min-h-8 w-full' style={styles.swiperFooter}></div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  swiper: {
    backgroundColor: '#333'
  },
  swiperFooter: {
    backgroundColor: '#333'
  }
}