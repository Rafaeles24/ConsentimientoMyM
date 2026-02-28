import { redirect } from "next/navigation";
import SuccessClientUI from "../../../client/success/page";
import { IpAddressResponse } from "@/app/type/responseApi";
export const dynamic = "force-dynamic";

export default async function SuccessPage(
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }
) {
    const { id } = await params;  

    const res = await fetch(`${process.env.BACKEND_INTERNAL_URL}/system/form-concent/ip/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json().catch(() => null) as IpAddressResponse;

    if (!res.ok || !data) {
        return redirect("/consent");
    }

    return <SuccessClientUI ipAddress={data.ip_address} />;
}