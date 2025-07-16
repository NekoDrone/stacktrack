import type { ReactNode } from "react";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AdminResponse } from "@/utils/types/responses";
import { Error } from "@/components/Error";

export const AdminContext = createContext(false);

export const AdminProvider = ({
    children,
    adminToken,
}: {
    children: ReactNode;
    adminToken: string;
}) => {
    const { data, error, isPending } = useQuery({
        queryKey: ["admin", adminToken],
        queryFn: async () => {
            const req = new Request(`/api/admin?token=${adminToken}`);
            return (
                (await (await fetch(req)).json()) as {
                    data: AdminResponse;
                }
            ).data;
        },
    });

    return error ? (
        <Error error={error} />
    ) : !isPending ? (
        <AdminContext value={data.isAdmin}>{children}</AdminContext>
    ) : (
        <>{children}</>
    );
};
