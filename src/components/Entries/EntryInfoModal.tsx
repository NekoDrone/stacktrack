"use client";

import { motion } from "motion/react";
import type { Dispatch } from "react";

interface InfoModalProps {
    setShowModal: Dispatch<boolean>;
    projectUrl: string | null;
    repoUrl: string | null;
}

export const EntryInfoModal = ({
    setShowModal,
    projectUrl,
    repoUrl,
}: InfoModalProps) => {
    return (
        <motion.div
            className="absolute bottom-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.15, ease: "easeInOut" }}
        >
            <div className="">
                <div className="bg-ctp-surface-1 z-10 flex w-fit flex-col gap-2 rounded-md rounded-bl-none p-2">
                    <div className="w-fit">
                        {projectUrl && (
                            <a href={projectUrl} className="w-fit">
                                Access it here!
                            </a>
                        )}
                    </div>
                    <div className="w-fit">
                        {repoUrl && (
                            <a href={repoUrl} className="w-fit">
                                Repo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
