import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Modal from '../../component/modal'
import TextInput from '../../component/TextInput'
import styles from './admin.module.css'
import DragableRow from '../../component/Row/DragableRow'
import Select from '../../component/Select'
import {
  useDictionaryContext,
  useSetDictionaryContext
} from '../../context/DictionaryContext'

const options = [
  { value: 'persian', label: 'Persian' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' }
]

const Admin = () => {
  const dictionary = useDictionaryContext()
  const setDictionary = useSetDictionaryContext()
  const [selectedLang, setSelectedLang] = useState('persian')

  // Modal states
  const [showaddModal, setShowAddModal] = useState(false)
  const [newKeyword, setNewKeyword] = useState('')
  const [newPersian, setNewPersian] = useState('')
  const [newSpanish, setNewSpanish] = useState('')
  const [newFrench, setNewFrench] = useState('')

  const navigate = useNavigate()

  // Check if user is admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin !== 'true') {
      navigate('/login')
    }
  }, [])

  const resetModalInfo = () => {
    // Reset form and close modal
    setShowAddModal(false)
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
          <Select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            options={options}
          />
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.container}>
            {dictionary?.map((item, index) => (
              <DragableRow
                key={item.key}
                item={item}
                index={index}
                selectedLang={selectedLang}
              />
            ))}
          </div>
        </DndProvider>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
          + Add Keyword
        </button>
      </div>
      {showaddModal && (
        <Modal title={'Add New Keyword'} closeModal={() => setShowAddModal(false)}>
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
          <TextInput
            placeholder='French translation'
            value={newFrench}
            onChange={(e) => setNewFrench(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
            <button className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Admin
