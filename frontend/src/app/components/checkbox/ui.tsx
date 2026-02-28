"use client";
import { ChangeEvent } from "react";
import styles from "./ui.module.css";

export default function Checkbox({
    content,
    checked,
    onChange,
    required = false
}: {
    content: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}) {
    return (
        <label className={styles.container}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={styles.input}
            />
            <span className={styles.custom}></span>
            <span className={styles.text}>
                {content}
                {required && <span className={styles.required}> *</span>}
            </span>
        </label>
    );
}