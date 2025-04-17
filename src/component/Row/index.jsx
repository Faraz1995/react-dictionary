import styles from './row.module.css'
import { forwardRef } from 'react'

const Row = forwardRef(({ translation, isDragging, item, dragable }, ref) => {
  return (
    <div
      ref={ref}
      className={`${styles.row} ${isDragging ? styles.dragging : ''} ${
        dragable ? styles.dragable : ''
      }`}
    >
      <div className={styles.english}>{item.english}</div>
      <div className={`${styles.translation} ${!translation ? styles.missing : ''}`}>
        {translation || '......'}
      </div>
    </div>
  )
})

Row.displayName = 'Row'

export default Row
