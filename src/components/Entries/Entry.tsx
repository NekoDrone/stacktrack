import type { ProjectSelect } from "@/db/schema/projects";
import { LucideStar } from "@/components/Icons/LucideStar";
import { LucideArrowBigDown } from "@/components/Icons/LucideArrowBigDown";
import { LucideArrowBigUp } from "@/components/Icons/LucideArrowBigUp";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
    removeDownvote,
    removeUpvote,
    submitDownvote,
    submitUpvote,
} from "@/utils/client/votes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AdminContext } from "@/utils/providers/AdminProvider";

interface EntryProps {
    entry: ProjectSelect;
}

export const Entry = ({ entry }: EntryProps) => {
    const queryClient = useQueryClient();
    const isAdmin = useContext(AdminContext);

    const [isUpvoted, setIsUpvoted] = useLocalStorage<boolean>(
        `${entry.id.toString()}:isUpvoted`,
        false,
    );

    const [isDownvoted, setIsDownvoted] = useLocalStorage<boolean>(
        `${entry.id.toString()}:isDownvoted`,
        false,
    );

    const removeDownvoteMutation = useMutation({
        mutationFn: async () => {
            setIsDownvoted(false);
            try {
                const { success, error } = await removeDownvote(entry.id);
                if (!success) {
                    setIsDownvoted(true);
                }
                if (error) {
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["entries"] });
        },
    });

    const removeUpvoteMutation = useMutation({
        mutationFn: async () => {
            setIsUpvoted(false);
            try {
                const { success, error } = await removeUpvote(entry.id);
                if (!success) {
                    setIsUpvoted(true);
                }
                if (error) {
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["entries"] });
        },
    });

    const submitUpvoteMutation = useMutation({
        mutationFn: async () => {
            setIsUpvoted(true);
            try {
                const { success, error } = await submitUpvote(entry.id);
                if (!success) {
                    setIsUpvoted(false);
                }
                if (error) {
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["entries"] });
        },
    });

    const submitDownvoteMutation = useMutation({
        mutationFn: async () => {
            setIsDownvoted(true);
            try {
                const { success, error } = await submitDownvote(entry.id);
                if (!success) {
                    setIsDownvoted(false);
                }
                if (error) {
                    console.log(error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["entries"] });
        },
    });

    const handleUpvote = () => {
        if (isDownvoted) {
            // change downvote to upvote
            removeDownvoteMutation.mutate();
        }
        if (isUpvoted) {
            // remove upvote
            removeUpvoteMutation.mutate();
        } else {
            // do normal upvote
            submitUpvoteMutation.mutate();
        }
    };

    const handleDownvote = () => {
        if (isUpvoted) {
            // change upvote to downvote
            removeUpvoteMutation.mutate();
        }
        if (isDownvoted) {
            // remove downvote
            removeDownvoteMutation.mutate();
        } else {
            // do normal downvote
            submitDownvoteMutation.mutate();
        }
    };

    if (isUpvoted && isDownvoted) {
        console.log(
            "Somehow got into the state where user has upvoted and downvoted. This should never happen, but because it did, we are resetting the vote count.",
        );
        // actually un-upvote
        setIsUpvoted(false);

        // actually un-downvote
        setIsDownvoted(false);
    }

    return (
        <div className="outline-1 outline-ctp-overlay-2 p-4 rounded-2xl w-76 gap-2 flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-xl">{entry.name}</h2>
                <LucideStar
                    className={
                        entry.isPriority ? "text-ctp-yellow" : "text-ctp-text"
                    }
                />
            </div>

            <p className="text-sm">{entry.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-xs font-extralight">{entry.votes} votes</p>
                <div className="flex">
                    <LucideArrowBigUp
                        className={`hover:text-ctp-green cursor-pointer ${isUpvoted ? "text-ctp-green" : ""}`}
                        onClick={handleUpvote}
                    />
                    <LucideArrowBigDown
                        className={`hover:text-ctp-red cursor-pointer ${isDownvoted ? "text-ctp-red" : ""}`}
                        onClick={handleDownvote}
                    />
                </div>
            </div>
        </div>
    );
};
