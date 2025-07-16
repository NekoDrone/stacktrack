import { useQuery } from "@tanstack/react-query";
import type { EntriesResponse } from "@/utils/types/responses";
import { Entry } from "@/components/Entries/Entry";
import { LoadingSpinner } from "@/components/Primitives/LoadingSpinner";
import { Error } from "@/components/Error";

export const EntriesList = () => {
    const { data, error, isPending } = useQuery({
        queryKey: ["entries"],
        queryFn: async () => {
            const req = new Request("/api/entries", { method: "GET" });
            return (
                (await (await fetch(req)).json()) as {
                    data: EntriesResponse;
                }
            ).data;
        },
    });

    return (
        <div>
            {error ? (
                <Error error={error} />
            ) : !isPending ? (
                data.entries.map((entry) => {
                    return <Entry entry={entry} key={entry.slug} />;
                })
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};
