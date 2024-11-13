import { useState } from 'react';
import Button from './Button';
import styles from './TextInputForm.module.css';

function TextInputForm({
    onSubmit,
    placeholder,
    buttonText,
    buttonDisabled,
}) {
    const [content, setContent] = useState('')

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(content);
        setContent('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label htmlfor="ask">문의하기</label>
                <textarea 
                    name="content"
                    placeholder={placeholder}
                    value={content}
                    onChange={handleInputChange} 
                />
                <Button disabled={buttonDisabled || !content} type="submit">
                    {buttonText}
                </Button>
            </div>
        </form>
    )
}

export default TextInputForm