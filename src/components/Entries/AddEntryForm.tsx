import { motion } from "motion/react";

export const AddEntryForm = () => {
    return (
        <form
            className="bg-ctp-base outline-ctp-mauve flex flex-col gap-2 rounded-xl p-4 outline-1"
            action={() => {}}
        >
            <p className="pb-2 text-xs font-semibold">New Entry</p>
            <div className="flex items-center justify-end gap-2">
                <p className="text-sm">Name:</p>
                <input className="outline-ctp-text w-full rounded-md p-1 pr-2 pl-2 text-sm outline-1" />
            </div>
            <div className="flex items-start gap-2">
                <p className="pt-2 text-sm">Description:</p>
                <textarea className="outline-ctp-text h-24 w-full rounded-md p-1 pr-2 pl-2 text-sm outline-1" />
            </div>
            <div className="flex items-center gap-2">
                <p className="text-sm">Status:</p>
                <input className="outline-ctp-text w-full rounded-md p-1 pr-2 pl-2 text-sm outline-1" />
            </div>
            <div>
                <motion.button
                    className="from-ctp-lavender to-ctp-mauve text-ctp-crust cursor-pointer rounded-md bg-gradient-to-br p-2 text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.6,
                    }}
                >
                    Create new entry
                </motion.button>
            </div>
        </form>
    );
};
