"use client";
import ButtonSubmit from "../button/ui";
import styles from "./ui.module.css";

export default function SuccessPopup({
    ip,
    onClose,
} : {
    ip: string;
    onClose: () => void;
}) {
    return (
        <div className={styles.bg}>
            <div className={styles.card}>
                <h2 className={styles.title}>
                    Tu consentimiento fue registrado correctamente
                </h2>
                {ip && (
                    <p className={styles.ip}>
                        IP registrada: <strong>{ip}</strong>
                    </p>
                )}

                <ButtonSubmit
                    label="Regresar"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}