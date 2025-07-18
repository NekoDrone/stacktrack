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
import { ProjectStatus } from "@/utils/types/client";

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

    const outlines: Record<ProjectStatus, string> = {
        [ProjectStatus.COMPLETE]: "outline-ctp-mauve",
        [ProjectStatus.INACTIVE]: "outline-ctp-subtext-0",
        [ProjectStatus.ACTIVE]: "outline-ctp-green",
        [ProjectStatus.SUSPENDED]: "outline-ctp-yellow",
    };

    const textColours: Record<ProjectStatus, string> = {
        [ProjectStatus.COMPLETE]: "text-ctp-mauve",
        [ProjectStatus.INACTIVE]: "text-ctp-subtext-0",
        [ProjectStatus.ACTIVE]: "text-ctp-green",
        [ProjectStatus.SUSPENDED]: "text-ctp-yellow",
    };

    return (
        <div
            className={`${outlines[entry.status]} flex w-76 flex-col gap-2 rounded-2xl p-4 outline-1`}
        >
            <div
                className={`bg-ctp-surface-1 ${textColours[entry.status]} font-secondary w-fit rounded-md p-1 pr-1.5 pl-1.5 text-xs font-semibold tracking-widest`}
            >
                {entry.status.toUpperCase()}
            </div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">{entry.name}</h2>
                <LucideStar
                    className={
                        entry.isPriority ? "text-ctp-yellow" : "text-ctp-text"
                    }
                />
            </div>

            <p className="text-sm">{entry.description}</p>
            <div className="flex items-center justify-between">
                <p
                    className={`text-xs font-extralight ${isUpvoted ? "text-ctp-green" : isDownvoted ? "text-ctp-red" : "text-ctp-text"}`}
                >
                    {entry.votes} votes
                </p>
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
