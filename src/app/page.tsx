import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import cx from 'classnames'

import styles from './page.module.css'

import { getMarkdownContent } from '@/utils/read-file'

export default function Home() {
  const contents = getMarkdownContent('md/profile.md')
  return (
    <main className={cx(styles.main, 'markdown-body')}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {contents}
      </ReactMarkdown>
    </main>
  )
}
