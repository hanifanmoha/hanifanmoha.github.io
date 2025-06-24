'use client';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import ReactMarkdown from "react-markdown"
import { Post } from "@/lib/types";

interface GalleryProps {
  post: Post | null
}

export default function Gallery({ post }: GalleryProps) {

  if (!post) {
    return <div>404 | Post not found</div>;
  }

  return (
    <div className='h-[100vh] flex flex-col'>
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={styles.swiper}
        className='w-full flex-1'
      >
        {post.content.map((content, index) => (
          <SwiperSlide key={index} className="overflow-y-auto">
            <div className='max-w-2xl py-12 px-6 mx-auto prose bg-white min-h-full'>
              <ReactMarkdown>
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