"use client";
import { EntriesList } from "@/components/Entries/EntriesList";
import { useContext } from "react";
import { AdminContext } from "@/utils/providers/AdminProvider";
import { AddEntry } from "@/components/Entries/AddEntry";

const IndexPage = () => {
    const isAdmin = useContext(AdminContext);

    const eitherAdminGreeting = !!Math.floor(Math.random() * 2);

    return (
        <div className="bg-ctp-base flex min-h-screen flex-col items-center justify-center gap-8">
            {isAdmin && <p>hey {eitherAdminGreeting ? "sexy" : "queen"}</p>}
            {isAdmin && <AddEntry />}
            <div>
                <p>Serenity is currently working on:</p>
            </div>
            <EntriesList />
        </div>
    );
};

export default IndexPage;
