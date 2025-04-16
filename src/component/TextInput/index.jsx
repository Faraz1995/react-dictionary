import styles from './textInput.module.css'
const TextInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      className={styles.input}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
export default TextInput
