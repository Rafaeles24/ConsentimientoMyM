"use client";

import { useState } from "react";
import styles from "./ui.module.css";

export default function ErrorToast(
    {
        message,
        onClose
    } : {
        message: string;
        onClose: () => void;
    }
) {
    const [ closing, setClosing ] = useState<boolean>(false);

    const handleClose = () => {
        setClosing(true);

        setTimeout(() => {
            onClose();
        }, 300)
    }

    if (!message) return null;

    return (
        <div className={`${styles.overlay} ${closing ? styles.hide : styles.show}`}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <p className={styles.message}>{message}</p>
                    <button onClick={handleClose} className={styles.closeBtn}>
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    )
}