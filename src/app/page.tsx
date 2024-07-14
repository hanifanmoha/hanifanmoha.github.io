import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './page.module.css'

import { getMarkdownContent } from '@/utils/read-file'

export default function Home() {
  const contents = getMarkdownContent('md/profile.md')
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className='markdown-body'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown>
        </div>
      </div>
    </main>
  )
}
