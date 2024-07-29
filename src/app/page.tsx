import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import { getMarkdownContent } from '@/utils/read-file'
import TestGA from '@/components/TestGA'

export default function Home() {
  const contents = getMarkdownContent('README.md')
  return (
    <div className='markdown-body'>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {contents}
      </ReactMarkdown>
      <TestGA />
    </div>
  )
}
