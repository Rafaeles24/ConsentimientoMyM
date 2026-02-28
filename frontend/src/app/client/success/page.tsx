"use client";

import { useRouter } from "next/navigation";
import styles from "./ui.module.css";
import ButtonSubmit from "@/app/components/button/ui";

export default function SuccessClientUI({
  ipAddress,
}: {
  ipAddress: string;
}) {
    const router = useRouter();

    return (
        <div className={styles.bg}>
            <div className={styles.card}>
                <h2 className={styles.title}>
                  Tu consentimiento fue registrado correctamente
                </h2>
                
                {ipAddress && (
                  <p className={styles.ip}>
                    IP registrada: <strong>{ipAddress}</strong>
                  </p>
                )}

                <ButtonSubmit
                  label="Regresar"
                  onClick={() => router.push("/consent")}
                />
            </div>
        </div>
    );
}