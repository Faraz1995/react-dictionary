import styles from './modal.module.css'
const Modal = ({ children, title }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}
export default Modal
