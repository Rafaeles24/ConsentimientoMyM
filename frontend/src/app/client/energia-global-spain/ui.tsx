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
import ErrorToast from "@/app/components/errorToast/ui";

export default function EnergiaGlobalSpainConsentimientoClient() {
    const [ dni, setDni ] = useState<string>("");
    const [ dniErr, setDniErr ] = useState<string | null>(null);

    const [ numTelefono, setNumTelefono ] = useState<string>("");
    const [ numTelefonoErr, setNumTelefonoErr ] = useState<string | null>(null);

    const [ numContacto, setNumContacto ] = useState<string>("");
    const [ numContactoErr, setNumContactoErr ] = useState<string | null>(null);

    const [ nombreCompleto, setNombreCompleto ] = useState<string>("");
    const [ nombreCompletoErr, setNombreCompletoErr ] = useState<string | null>(null);

    const [ verificado, setVerificado ] = useState<boolean>(false);
    const [ verificadoErr, setVerificadoErr ] = useState<string | null>(null);

    const [ error, setError ] = useState<null | string>(null);

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ open, setOpen ] = useState<boolean>(false);

    const [ ip, setIp ] = useState<string>("");

    const resetErrores = () => {
        setDniErr(null);
        setNumTelefonoErr(null);
        setNumContactoErr(null);
        setNombreCompletoErr(null);
        setVerificadoErr(null);
        setError(null);
    }

    const resetForm = () => {
        setOpen(false);
        setIp("");
        setDni("");
        setNumTelefono("");
        setNumContacto("");
        setNombreCompleto("");
        setVerificado(false);

        resetErrores();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        resetErrores();
        let hasError = false;

        if (!dni) {
            setDniErr("Debes colocar el DNI");
            hasError = true;
        }
        if (!numTelefono) {
            setNumTelefonoErr("Debes ingresar un numero de telefono");
            hasError = true;
        }
        if (!numContacto) {
            setNumContactoErr("Debes ingresar un numero de contacto.");
            hasError = true;
        }
        if (!nombreCompleto) {
            setNombreCompletoErr("Debes ingresar tu nombre");
            hasError = true;
        }
        if (verificado === false) {
            setVerificadoErr("Debes aceptar los terminos y condiciones.") ;
            hasError = true;
        }

        if (hasError) return;

        await submitData({
            dni: dni,
            origen: "ENERGIA",
            num_telefono: numTelefono,
            num_contacto: numContacto,
            nombre_completo: nombreCompleto,
            verificado: verificado
        });
    }

    const submitData = async (payload: Consentimiento) => {
        setLoading(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/system/consentimiento/registrar`,
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
            setError(msg);
            return;
        }

        const success = data as IpAddressResponse;
        setLoading(false);
        setIp(success.ip);
        setOpen(true)
        return;
    }

    return (
        <div className={styles.bg}>
            { error &&
                <ErrorToast
                    message={error}
                    onClose={() => setError(null)}
                />
            }
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
                    error={dniErr}
                    onChange={(e) => setDni(e.target.value)}
                    maxLength={18}
                    />
                    <EditableInput
                        label="Telefono"
                        value={numTelefono}
                        error={numTelefonoErr}
                        onChange={(e) => setNumTelefono(e.target.value)}
                        maxLength={9}
                    />
                    <EditableInput
                        label="Telefono Contacto"
                        value={numContacto}
                        error={numContactoErr}
                        onChange={(e) => setNumContacto(e.target.value)}
                        maxLength={9}
                    />
                    <EditableInput
                        label="Nombre Completo"
                        value={nombreCompleto}
                        error={nombreCompletoErr}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        maxLength={255}
                    />

                    <div className={styles.checkboxWrap}>
                        <ConsentSection/>
                        <Checkbox
                            content="He leído y acepto la Política de Privacidad y consiento que  Energía Global Spain SI trate mis datos para enviarme información comercial sobre sus productos y servicios, por medios telefónicos, SMS, mensajería instantánea (como WhatsApp) y correo electrónico, incluso por medios automatizados."
                            checked={verificado}
                            onChange={(e) => setVerificado(e.target.checked)}
                            error={verificadoErr}
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
                        setOpen(false);
                        resetForm();
                    }}
                />
            }
        </div>
    )
}