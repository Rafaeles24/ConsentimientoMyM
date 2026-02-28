"use client";

import { useState } from "react";
import styles from "./ui.module.css";

export default function ConsentSection() {
    const [openConcent, setOpenConcent] = useState(false);

    return (
        <div>
                <div
                    className={styles.concentHeader}
                    onClick={() => setOpenConcent((prev) => !prev)}
                >
                    <span>
                        {openConcent ? "Ocultar texto de consentimiento" : "Ver texto de consentimiento"}
                    </span>
                </div>

                {openConcent && (
                    <div className={styles.concentBody}>
                        <p>
                            <strong>Finalidad:</strong> Gestionar su solicitud, prestarle el
                            servicio solicitado y/o enviarle información relacionada con
                            nuestros productos y servicios.
                        </p>

                        <p>
                            <strong>Legitimación:</strong> Consentimiento del interesado.
                        </p>

                        <p>
                            <strong>Destinatarios:</strong> No se cederán datos a terceros,
                            salvo obligación legal o cuando sea necesario para la prestación
                            del servicio.
                        </p>
                    </div>
                )}
        </div>
    );
}