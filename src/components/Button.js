import styles from './Button.module.css';

function createButton({ style }) {

  return function Button({ children, onClick = () => {}, className, disabled = false }) {
    return (
    <button 
      className={`${styles[style]} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
    )
  }
}

export default createButton;