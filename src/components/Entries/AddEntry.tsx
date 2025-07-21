"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AddEntryModal } from "@/components/Entries/AddEntryModal";

export const AddEntry = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex flex-col items-start justify-center">
                    <p>entry tonite 👀</p>
                    <p>entry tonite queen??</p>
                    <p>entry tonite 👀</p>
                </div>
                <motion.button
                    className="text-ctp-crust from-ctp-lavender to-ctp-mauve cursor-pointer rounded-lg bg-gradient-to-r p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.6,
                    }}
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    add entry
                </motion.button>
            </div>
            <AnimatePresence initial={false}>
                {isModalOpen && (
                    <AddEntryModal setIsModalOpen={setIsModalOpen} />
                )}
            </AnimatePresence>
        </div>
    );
};
