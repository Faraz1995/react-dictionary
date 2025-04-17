import styles from './select.module.css'
const Select = ({ value, onChange, options }) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
