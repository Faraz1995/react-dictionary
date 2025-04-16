import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './admin.module.css'
import Modal from '../../component/modal'
import TextInput from '../../component/TextInput'

const LOCAL_STORAGE_KEY = 'dictionary'
const initialData = {
  hi: {
    english: 'hi',
    persian: 'سلام',
    spanish: 'hola'
  },
  goodbye: {
    english: 'goodbye',
    persian: 'خداحافظ',
    spanish: 'adiós'
  },
  book: {
    english: 'book',
    persian: 'کتاب',
    spanish: ''
  }
}

const Admin = () => {
  const [dictionary, setDictionary] = useState({})
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
    if (saved && Object.keys(JSON.parse(saved)).length > 0) {
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
    if (!newKeyword.trim()) return

    const keyword = newKeyword.trim().toLowerCase()

    setDictionary((prev) => ({
      ...prev,
      [keyword]: {
        english: newKeyword.trim(),
        persian: newPersian.trim(),
        spanish: newSpanish.trim()
      }
    }))

    resetModalInfo()
  }

  const renderRows = () => {
    return Object.entries(dictionary).map(([key, value]) => {
      const translation = value[selectedLang]

      return (
        <div className={styles.row} key={key}>
          <div className={styles.english}>{value.english}</div>
          <div className={`${styles.translation} ${!translation ? styles.missing : ''}`}>
            {translation || '.....'}
          </div>
        </div>
      )
    })
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
        <div className={styles.container}>{renderRows()}</div>
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
