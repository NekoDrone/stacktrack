import type { ReactNode } from "react";
import { AdminProvider } from "@/utils/providers/AdminProvider";
import { useSearchParams } from "next/navigation";

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
    const queryParams = useSearchParams();

    const adminToken = queryParams.get("admin");

    return (
        <AdminProvider adminToken={adminToken ?? ""}>{children}</AdminProvider>
    );
};
