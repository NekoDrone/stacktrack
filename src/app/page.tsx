"use client";
import { EntriesList } from "@/components/Entries/EntriesList";

const IndexPage = () => {
    return (
        <div className="bg-ctp-base flex min-h-screen flex-col items-center justify-center gap-8">
            <EntriesList />
        </div>
    );
};

export default IndexPage;
