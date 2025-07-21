"use client";

import type { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import { AddEntryForm } from "@/components/Entries/AddEntryForm";
import type { ProjectInsert } from "@/db/schema/projects";

export const AddEntryModal = ({
    setIsModalOpen,
    defaultEntry,
}: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    defaultEntry?: ProjectInsert;
}) => {
    const handleBackdropClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2">
            <motion.div
                className="bg-ctp-crust/30 fixed inset-0 backdrop-blur-sm"
                onClick={handleBackdropClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div
                className="z-10 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
                {defaultEntry && (
                    <div className="flex gap-1.5">
                        <p>
                            Editing the{" "}
                            <strong className="font-semibold">
                                {defaultEntry.name}
                            </strong>{" "}
                            entry
                        </p>
                    </div>
                )}
                <AddEntryForm
                    setIsModalOpen={setIsModalOpen}
                    defaultEntry={defaultEntry}
                />
            </motion.div>
        </div>
    );
};

export const ModifyEntryModal = AddEntryModal;
