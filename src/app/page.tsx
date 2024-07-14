import styles from './page.module.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getMarkdownContent } from '@/utils/read-file'

const markdown = `Just a link: https://reactjs.com.`

export default function Home() {
  const contents = getMarkdownContent('md/profile.md')
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ReactMarkdown children={contents} remarkPlugins={[remarkGfm]} />
      </div>
    </main>
  )
}
