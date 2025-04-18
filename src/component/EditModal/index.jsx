import { useEffect, useRef, useState } from 'react'
import Modal from '../modal'
import TextInput from '../TextInput'
import styles from './edit.module.css'
import { useSetDictionaryContext } from '../../context/DictionaryContext'

const EditModal = ({ item, selectedLang, setOpen }) => {
  const setDictionary = useSetDictionaryContext()
  const [editValue, setEditValue] = useState('')
  const editRef = useRef(null)

  useEffect(() => {
    // Focus the input when the component mounts
    if (editRef.current) {
      editRef.current.focus()
    }
  }, []) // Empty dependency array means this runs once on mount

  const saveEdit = () => {
    setDictionary((prev) => {
      const updated = prev.map((word) =>
        word.key === item.key ? { ...word, [selectedLang]: editValue } : word
      )
      return updated
    })
    setOpen((prev) => !prev)
    setEditValue('')
  }

  return (
    <Modal title={'Edit ' + item.key} closeModal={() => setOpen(false)}>
      <TextInput
        ref={editRef}
        placeholder={`translation in ${selectedLang}`}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
      <button className={styles.submitBtn} onClick={saveEdit}>
        Submit
      </button>
    </Modal>
  )
}
export default EditModal
