"use client";
import { EntriesList } from "@/components/Entries/EntriesList";
import { useContext } from "react";
import { AdminContext } from "@/utils/providers/AdminProvider";
import { AddEntry } from "@/components/Entries/AddEntry";

const IndexPage = () => {
    const isAdmin = useContext(AdminContext);

    return (
        <div className="bg-ctp-base flex min-h-screen flex-col items-center justify-center gap-8">
            {isAdmin && <p>hey sexy</p>}
            <EntriesList />
        </div>
    );
};

export default IndexPage;
