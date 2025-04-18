import { useEffect, useState } from 'react'
import styles from './home.module.css'
import Select from './component/Select'
import Row from './component/Row'

const LOCAL_STORAGE_KEY = 'dictionary'
const options = [
  { value: 'persian', label: 'Persian' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' }
]

function App() {
  const [dictionary, setDictionary] = useState([])
  const [selectedLang, setSelectedLang] = useState('persian')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved && JSON.parse(saved).length > 0) {
      setDictionary(JSON.parse(saved))
    } else {
      console.error('Failed to parse dictionary from localStorage')
    }
  }, [])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <h1>Dictionary</h1>
          <Select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            options={options}
          />
        </div>
        <div className={styles.container}>
          {dictionary.map((item) => (
            <Row key={item.key} item={item} translation={item[selectedLang]} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
