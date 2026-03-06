"use client";

import { ApiError } from "@/app/type/ApiError";
import { Consentimiento } from "@/app/type/Consentimiento";
import { IpAddressResponse } from "@/app/type/responseApi";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import styles from "./ui.module.css";
import EditableInput from "@/app/components/input/ui";
import ConsentSection from "@/app/components/consentSection/ui";
import Checkbox from "@/app/components/checkbox/ui";
import ButtonSubmit from "@/app/components/button/ui";
import SuccessPopup from "@/app/components/successPopup/ui";

export default function DemoTelecomConsentimientoClient() {
    const [ dni, setDni ] = useState<string>("");
    const [ numTelefono, setNumTelefono ] = useState<string>("");
    const [ numContacto, setNumContacto ] = useState<string>("");
    const [ nombreCompleto, setNombreCompleto ] = useState<string>("");
    const [ verificado, setVerificado ] = useState<boolean>(false);
    const [ error, setError ] = useState<null | string>(null);

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ open, setOpen ] = useState<boolean>(false);

    const [ ip, setIp ] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitData({
            dni: dni,
            origen: "DEMO",
            num_telefono: numTelefono,
            num_contacto: numContacto,
            nombre_completo: nombreCompleto,
            verificado: verificado
        });
    }

    const submitData = async (payload: Consentimiento) => {
        setLoading(true);

        const res = await fetch(
            `${process.env.BACKEND_INTERNAL_URL}/system/consentimiento/registrar`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            const err = data as ApiError;

            const msg =
                (Array.isArray(err?.message) ? err.message.join(", ") : err?.message)
                || err?.error
                || `Error HTTP ${res.status}`;
                
            setLoading(false);
            return alert(msg);
            /* return setError(msg); */
        }

        const success = data as IpAddressResponse;
        setLoading(false);
        setIp(success.ip)
        setOpen(true)
        return;
    }

    return (
        <div className={styles.bg}>
            <div className={styles.card}>
                <p className={styles.desc}>
                    Si estás interesado en recibir una oferta de telecomunicaciones o energía rellena el formulario y nos pondremos en contacto contigo.
                </p>

                <p className={styles.note}>
                    Los campos marcados con el símbolo asterisco (*) son obligatorios.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <EditableInput
                    label="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    maxLength={8}
                    />
                    <EditableInput
                        label="Telefono"
                        value={numTelefono}
                        onChange={(e) => setNumTelefono(e.target.value)}
                        maxLength={9}
                    />
                    <EditableInput
                        label="Telefono Contacto"
                        value={numContacto}
                        onChange={(e) => setNumContacto(e.target.value)}
                        maxLength={9}
                    />
                    <EditableInput
                        label="Nombre Completo"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        maxLength={255}
                    />

                    <div className={styles.checkboxWrap}>
                        <ConsentSection/>
                        <Checkbox
                            content="He leído y acepto la Política de Privacidad y consiento que  Energía Global Spain SI trate mis datos para enviarme información comercial sobre sus productos y servicios, por medios telefónicos, SMS, mensajería instantánea (como WhatsApp) y correo electrónico, incluso por medios automatizados."
                            checked={verificado}
                            onChange={(e) => setVerificado(e.target.checked)}
                        />
                    </div>

                    <div className={styles.btnWrap}>
                        <ButtonSubmit
                            label="Enviar"
                        />
                    </div>
                </form>
            </div>

            {open && 
                <SuccessPopup 
                    ip={ip} 
                    onClose={() => {
                        setOpen(false)
                        setIp("")
                        setDni("")
                        setNumTelefono("")
                        setNumContacto("")
                        setNombreCompleto("")
                        setVerificado(false)
                }} />
            }
        </div>
    )
}