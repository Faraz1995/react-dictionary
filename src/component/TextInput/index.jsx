import styles from './textInput.module.css'
import { forwardRef } from 'react'

const TextInput = forwardRef(({ value, onChange, placeholder }, ref) => {
  return (
    <input
      ref={ref || null}
      className={styles.input}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
})

// Add a display name for the component (helpful for debugging)
TextInput.displayName = 'TextInput'

export default TextInput
