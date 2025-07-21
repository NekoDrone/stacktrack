"use client";

import { AnimatePresence, motion } from "motion/react";
import { ProjectStatus } from "@/utils/types/client";
import type { ChangeEvent, Dispatch } from "react";
import { useContext } from "react";
import { useState } from "react";
import type { ProjectInsert } from "@/db/schema/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitEntry } from "@/utils/client/submitEntry";
import { AdminContext } from "@/utils/providers/AdminProvider";

interface EntryFormProps {
    setIsModalOpen: Dispatch<boolean>;
}

export const AddEntryForm = ({ setIsModalOpen }: EntryFormProps) => {
    const queryClient = useQueryClient();

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(
        ProjectStatus.INACTIVE,
    );
    const [formIsReady, setFormIsReady] = useState(false);

    const { adminToken } = useContext(AdminContext);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newProjectName = e.target.value;
        setProjectName(newProjectName);
        setFormIsReady(newProjectName.length > 0);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const performSubmission = async () => {
        const now = new Date();
        const newEntry: ProjectInsert = {
            status: selectedStatus,
            slug: projectName.toLowerCase(),
            name: projectName,
            votes: 0,
            isPriority: false,
            description,
            createdAt: now,
            updatedAt: now,
        };
        await submitEntry({ entry: newEntry, adminToken });
    };

    const submissionMutation = useMutation({
        mutationFn: performSubmission,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["entries"],
            });
        },
    });

    return (
        <motion.form
            className="bg-ctp-base outline-ctp-mauve flex flex-col gap-4 rounded-xl p-4 outline-1"
            action={() => {
                submissionMutation.mutate();
                setIsModalOpen(false);
            }}
            layout="position"
            transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <p className="pb-2 text-xs font-semibold">New Entry</p>
            <div className="flex items-center justify-end gap-2">
                <p className="text-sm">Name:</p>
                <input
                    className="outline-ctp-text w-full rounded-md p-1 pr-2 pl-2 text-sm outline-1"
                    name="project-name"
                    onChange={handleNameChange}
                    value={projectName}
                />
            </div>
            <div className="flex items-start gap-2">
                <p className="pt-2 text-sm">Description:</p>
                <textarea
                    className="outline-ctp-text h-24 w-full rounded-md p-1 pr-2 pl-2 text-sm outline-1"
                    name="description"
                    onChange={handleDescriptionChange}
                    value={description}
                />
            </div>
            <div className="flex items-center gap-2">
                <p className="text-sm">Status:</p>
                <SelectStatus
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
            </div>
            <AnimatePresence>
                {formIsReady && (
                    <motion.div
                        className="pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                    >
                        <motion.button
                            className="from-ctp-lavender to-ctp-mauve text-ctp-crust w-full cursor-pointer rounded-md bg-gradient-to-br p-2 text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                duration: 0.5,
                                bounce: 0.6,
                            }}
                        >
                            Add Entry
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.form>
    );
};

interface SelectStatusProps {
    selectedStatus: ProjectStatus;
    setSelectedStatus: Dispatch<ProjectStatus>;
}

const SelectStatus = ({
    selectedStatus,
    setSelectedStatus,
}: SelectStatusProps) => {
    const statuses = Object.values(ProjectStatus);

    const handleSelection = (status: ProjectStatus) => {
        setSelectedStatus(status);
        console.log("Set selected status to", status);
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
        <div className="flex justify-center gap-1">
            {statuses.map((status) => (
                <div
                    key={status}
                    onClick={() => {
                        handleSelection(status);
                    }}
                    className={`bg-ctp-surface-1 hover:bg-ctp-overlay-2 flex cursor-pointer items-center justify-center rounded-md p-1 pr-1.5 pl-1.5 transition ${selectedStatus == status ? `outline-1 ${outlines[status]}` : ""}`}
                >
                    <input
                        type="radio"
                        className="sr-only"
                        id={status}
                        name="status"
                    />
                    <label
                        htmlFor={status}
                        className={`font-secondary cursor-pointer pl-0.5 text-[0.66rem] font-semibold tracking-[0.12em] ${textColours[status]}`}
                    >
                        {status.toUpperCase()}
                    </label>
                </div>
            ))}
        </div>
    );
};
