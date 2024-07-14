import styles from './page.module.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getMarkdownContent } from '@/utils/read-file'

export default function Home() {
  const contents = getMarkdownContent('md/profile.md')
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown>
      </div>
    </main>
  )
}
