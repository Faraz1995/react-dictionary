import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Modal from '../../component/modal'
import TextInput from '../../component/TextInput'
import styles from './admin.module.css'
import DragableRow from '../../component/Row/DragableRow'

const LOCAL_STORAGE_KEY = 'dictionary'
const initialData = [
  { key: 'hi', english: 'hi', persian: 'سلام', spanish: 'hola' },
  { key: 'goodbye', english: 'goodbye', persian: 'خداحافظ', spanish: 'adiós' },
  { key: 'book', english: 'book', persian: 'کتاب', spanish: '' }
]

const Admin = () => {
  const [dictionary, setDictionary] = useState([])
  const [selectedLang, setSelectedLang] = useState('persian')
  const [mounted, setMounted] = useState(false)

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [newKeyword, setNewKeyword] = useState('')
  const [newPersian, setNewPersian] = useState('')
  const [newSpanish, setNewSpanish] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin !== 'true') {
      navigate('/')
    }
  }, [])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved && JSON.parse(saved).length > 0) {
      setDictionary(JSON.parse(saved))
    } else {
      setDictionary(initialData)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData))
    }
    setMounted(true)
  }, [])

  // Save to localStorage whenever dictionary changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dictionary))
    }
  }, [dictionary])

  const resetModalInfo = () => {
    // Reset form and close modal
    setShowModal(false)
    setNewKeyword('')
    setNewPersian('')
    setNewSpanish('')
  }

  const handleSubmit = () => {
    const key = newKeyword.trim().toLowerCase()
    if (!key) return

    const exists = dictionary.some((entry) => entry.key === key)
    if (exists) return

    const newEntry = {
      key,
      english: newKeyword.trim(),
      persian: newPersian.trim(),
      spanish: newSpanish.trim()
    }

    setDictionary((prev) => [...prev, newEntry])

    resetModalInfo()
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <h1>Translation Management</h1>

          <select
            className={styles.select}
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value='persian'>Persian</option>
            <option value='spanish'>Spanish</option>
          </select>
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.container}>
            {dictionary.map((entry, index) => (
              <DragableRow
                key={entry.key}
                entry={entry}
                index={index}
                dictionary={dictionary}
                setDictionary={setDictionary}
                selectedLang={selectedLang}
              />
            ))}
          </div>
        </DndProvider>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + Add Keyword
        </button>
      </div>
      {showModal && (
        <Modal title={'Add New Keyword'}>
          <TextInput
            placeholder='English keyword'
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <TextInput
            placeholder='Persian translation'
            value={newPersian}
            onChange={(e) => setNewPersian(e.target.value)}
          />
          <TextInput
            placeholder='Spanish translation'
            value={newSpanish}
            onChange={(e) => setNewSpanish(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
            <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Admin
