"use client";

import ButtonSubmit from "@/app/components/button/ui";
import Checkbox from "@/app/components/checkbox/ui";
import EditableInput from "@/app/components/input/ui";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from  "./ui.module.css";
import ConsentSection from "@/app/components/consentSection/ui";
import { ApiError } from "@/app/type/ApiError";
import { ResponseApi } from "@/app/type/responseApi";

export default function ConsentClientUI() {
    const [ dni, setDni ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ phoneContact, setPhoneContact ] = useState("");
    const [ fullName, setFullName ] = useState("");
    const [ verified, setVerified ] = useState(false);

    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!dni) return alert("El DNI es requerido");
        if (!phoneNumber) return alert("El teléfono es requerido");
        if (!phoneContact) return alert("El teléfono de contacto es requerido");
        if (!fullName) return alert("El nombre completo es requerido");
        if (!verified) return alert("Debes aceptar la política de privacidad");

        await submitData({
            dni: dni,
            phone_number: phoneNumber,
            phone_contact: phoneContact,
            full_name: fullName,
            verified: verified,
        });
    };

    const submitData = async ( payload: {
        dni: string;
        phone_number: string;
        phone_contact: string;
        full_name: string;
        verified: boolean;
    } ) => {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/system/form-concent/create`, {
            method: "POST",
                        headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            const err = data as ApiError;

            const msg =
                (Array.isArray(err?.message) ? err.message.join(", ") : err?.message) ||
                err?.error ||
                `Error HTTP ${res.status}`;

            setLoading(false);
            return alert(msg);
        }

        const success = data as ResponseApi;
        setLoading(false);
        router.push(`/consent/success/${encodeURIComponent(success.id)}`);

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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={9}
                    />
                    <EditableInput
                        label="Telefono Contacto"
                        value={phoneContact}
                        onChange={(e) => setPhoneContact(e.target.value)}
                        maxLength={9}
                    />
                    <EditableInput
                        label="Nombre Completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        maxLength={255}
                    />

                    <div className={styles.checkboxWrap}>
                        <ConsentSection/>
                        <Checkbox
                            content="He leído y acepto la Política de Privacidad y consiento que  Energía Global Spain SI trate mis datos para enviarme información comercial sobre sus productos y servicios, por medios telefónicos, SMS, mensajería instantánea (como WhatsApp) y correo electrónico, incluso por medios automatizados."
                            checked={verified}
                            onChange={(e) => setVerified(e.target.checked)}
                        />
                    </div>

                    <div className={styles.btnWrap}>
                        <ButtonSubmit
                            label="Enviar"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}