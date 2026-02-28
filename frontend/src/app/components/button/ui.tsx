import styles from "./ui.module.css";

export default function ButtonSubmit({
    disabled = false,
    loading = false,
    label,
    loadingLabel = "Cargando...",
    onClick,
}: {
    disabled?: boolean;
    loading?: boolean;
    label: string;
    loadingLabel?: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={styles.formButton}
            onClick={onClick}
        >
            {loading ? loadingLabel : label}
        </button>
    );
}