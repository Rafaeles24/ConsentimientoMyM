"use client";
import styles from './ui.module.css';

export default function EditableInput(
    {   
        label,
        value="",
        maxLength=255,
        error=null,
        onChange 
    } : {
        label: string;
        value: string;
        maxLength?: number;
        error?: string | null;
        onChange: (e: any) => void;
    }
) {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label} <span className={styles.required}>*</span></label>
            <input 
                type="text" 
                value={value}
                maxLength={maxLength}
                onChange={onChange} 
                className={styles.input}
            />
            { error && <label className={styles.error}>{error}</label>}
        </div>
    )
}