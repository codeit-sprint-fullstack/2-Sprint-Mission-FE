import React from 'react';
import Styles from '@/components/modal.module.css';

export default function Modal({ children, onClose }) {
    return (
        <div className={Styles.modalOverlay} onClick={onClose}>
            <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={Styles.modalClose} onClick={onClose}>확인</button>
            </div>
        </div>
    );
}