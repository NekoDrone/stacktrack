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
import { useContext, useState } from "react";
import { AdminContext } from "@/utils/providers/AdminProvider";
import { ProjectStatus } from "@/utils/types/client";
import { submitEntry } from "@/utils/client/submitEntry";
import { LucideChevronDown } from "@/components/Icons/LucideChevronDown";
import { LucideCheck } from "@/components/Icons/LucideCheck";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

interface EntryProps {
    entry: ProjectSelect;
}

export const Entry = ({ entry }: EntryProps) => {
    const queryClient = useQueryClient();
    const { isAdmin, adminToken } = useContext(AdminContext);

    const [isUpvoted, setIsUpvoted] = useLocalStorage<boolean>(
        `${entry.id.toString()}:isUpvoted`,
        false,
    );

    const [isDownvoted, setIsDownvoted] = useLocalStorage<boolean>(
        `${entry.id.toString()}:isDownvoted`,
        false,
    );
    const [showDropdown, setShowDropdown] = useState(false);

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
        removeUpvoteMutation.mutate();
        setIsUpvoted(false);

        removeDownvoteMutation.mutate();
        setIsDownvoted(false);
    }

    const submitEntryMutation = useMutation({
        mutationFn: async (newEntry: ProjectSelect) => {
            const submittedEntry: ProjectSelect = {
                ...newEntry,
                updatedAt: new Date(),
            };
            return await submitEntry({ entry: submittedEntry, adminToken });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["entries"] });
        },
    });

    const handlePriorityClick = () => {
        const newEntry: ProjectSelect = {
            ...entry,
            isPriority: !entry.isPriority,
        };
        submitEntryMutation.mutate(newEntry);
    };

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleStatusChange = (newStatus: ProjectStatus) => {
        const newEntry: ProjectSelect = {
            ...entry,
            status: newStatus,
        };
        submitEntryMutation.mutate(newEntry);
        setShowDropdown(!showDropdown);
    };

    const outlines: Record<ProjectStatus, string> = {
        [ProjectStatus.COMPLETE]: "outline-ctp-mauve",
        [ProjectStatus.INACTIVE]: "outline-ctp-subtext-0",
        [ProjectStatus.ACTIVE]: "outline-ctp-green",
        [ProjectStatus.SUSPENDED]: "outline-ctp-red",
    };

    const textColours: Record<ProjectStatus, string> = {
        [ProjectStatus.COMPLETE]: "text-ctp-mauve",
        [ProjectStatus.INACTIVE]: "text-ctp-subtext-0",
        [ProjectStatus.ACTIVE]: "text-ctp-green",
        [ProjectStatus.SUSPENDED]: "text-ctp-red",
    };

    return (
        <div
            className={`${outlines[entry.status]} flex w-76 flex-col gap-2 rounded-2xl p-4 outline-1 transition-all`}
        >
            <div className="relative overflow-visible">
                <div className="relative flex items-end">
                    {showDropdown && (
                        <div
                            className="fixed inset-0"
                            onClick={handleDropdownClick}
                        />
                    )}
                    <div
                        className={`${textColours[entry.status]} ${isAdmin ? "peer hover:bg-ctp-overlay-0 bg-ctp-surface-1 cursor-pointer p-1 pr-1.5 pl-1.5 transition" : ""} flex h-fit w-fit items-center justify-between gap-1 rounded-md ${showDropdown ? "rounded-b-none" : ""}`}
                        onClick={isAdmin ? handleDropdownClick : undefined}
                    >
                        <p className="font-secondary pl-0.5 text-[0.66rem] font-semibold tracking-[0.12em]">
                            {entry.status.toUpperCase()}
                        </p>
                        {isAdmin && (
                            <LucideChevronDown
                                className={`text-ctp-mauve ${showDropdown ? "rotate-180" : ""} transition`}
                            />
                        )}
                    </div>
                    {showDropdown && (
                        <div className="peer-hover:bg-ctp-overlay-0 bg-ctp-surface-1 relative h-1 w-1 transition">
                            <div className="bg-ctp-base absolute right-0 h-1 w-1 rounded-bl-full">
                                {/* entirely for the little curve thing lmao */}
                            </div>
                        </div>
                    )}
                </div>

                {isAdmin && (
                    <AnimatePresence>
                        {showDropdown && (
                            <EntryStatusDropdown
                                currentStatus={entry.status}
                                handleStatusChange={handleStatusChange}
                            />
                        )}
                    </AnimatePresence>
                )}
            </div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">{entry.name}</h2>
                <div
                    className={
                        isAdmin
                            ? "bg-ctp-surface-1 hover:bg-ctp-overlay-0 cursor-pointer rounded-sm p-1 transition"
                            : ""
                    }
                    onClick={isAdmin ? handlePriorityClick : undefined}
                >
                    <LucideStar
                        className={
                            entry.isPriority
                                ? "text-ctp-yellow"
                                : "text-ctp-text"
                        }
                    />
                </div>
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
                        className={`hover:text-ctp-green cursor-pointer transition ${isUpvoted ? "text-ctp-green" : ""}`}
                        onClick={handleUpvote}
                    />
                    <LucideArrowBigDown
                        className={`hover:text-ctp-red cursor-pointer transition ${isDownvoted ? "text-ctp-red" : ""}`}
                        onClick={handleDownvote}
                    />
                </div>
            </div>
        </div>
    );
};

interface DropdownProps {
    currentStatus: ProjectStatus;
    handleStatusChange: (newStatus: ProjectStatus) => void;
}

const EntryStatusDropdown = ({
    currentStatus,
    handleStatusChange,
}: DropdownProps) => {
    const textColours: Record<ProjectStatus, string> = {
        [ProjectStatus.COMPLETE]: "text-ctp-mauve",
        [ProjectStatus.INACTIVE]: "text-ctp-subtext-0",
        [ProjectStatus.ACTIVE]: "text-ctp-green",
        [ProjectStatus.SUSPENDED]: "text-ctp-red",
    };

    return (
        <motion.div
            className="text-ctp-text bg-ctp-surface-1 absolute inset-0 top-6 flex h-fit w-fit flex-col rounded-lg rounded-tl-none pt-2 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.15, ease: "easeInOut" }}
        >
            {Object.values(ProjectStatus).map((status) => {
                return (
                    <div
                        key={status}
                        className="bg-ctp-surface-1 hover:bg-ctp-overlay-0 flex w-28 cursor-pointer items-center justify-between p-1.5 pr-2 pl-2 transition"
                        onClick={() => {
                            handleStatusChange(status);
                        }}
                    >
                        <p
                            className={`text-xs tracking-[0.12em] ${textColours[status]}`}
                        >
                            {status
                                .charAt(0)
                                .toUpperCase()
                                .concat(status.slice(1))}
                        </p>
                        {currentStatus == status && <LucideCheck />}
                    </div>
                );
            })}
        </motion.div>
    );
};
