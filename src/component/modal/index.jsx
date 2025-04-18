import { useEffect, useRef } from 'react'
import styles from './modal.module.css'
const Modal = ({ children, title, closeModal }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside)

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeModal])

  const modalRef = useRef(null)
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}
export default Modal
