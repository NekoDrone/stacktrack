"use client";

import { motion } from "motion/react";
import type { Dispatch } from "react";
import { LucideLink } from "@/components/Icons/LucideLink";
import { AnimatedUnderlineLink } from "@/components/AnimatedUnderlineLink";
import { LucideGithub } from "@/components/Icons/LucideGithub";
import { LucideArrowRight } from "@/components/Icons/LucideArrowRight";

interface InfoModalProps {
    projectUrl: string | null;
    repoUrl: string | null;
}

export const EntryInfoModal = ({ projectUrl, repoUrl }: InfoModalProps) => {
    return (
        <motion.div
            className="absolute bottom-6 flex-nowrap text-nowrap whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.15, ease: "easeInOut" }}
        >
            <div className="bg-ctp-surface-1 z-10 flex flex-col items-start justify-center gap-2 rounded-md rounded-bl-none p-2">
                {projectUrl && (
                    <div className="flex items-center gap-1">
                        <LucideLink className="text-ctp-mauve" />
                        <AnimatedUnderlineLink
                            href={projectUrl}
                            underlineColour={"bg-ctp-mauve"}
                            className="peer hover:text-ctp-mauve transition"
                        >
                            <p className="text-sm">Access it here!</p>
                        </AnimatedUnderlineLink>
                        <LucideArrowRight className="peer-hover:text-ctp-mauve" />
                    </div>
                )}

                {repoUrl && (
                    <div className="flex items-center gap-1">
                        <LucideGithub className="text-ctp-blue" />
                        <AnimatedUnderlineLink
                            href={repoUrl}
                            underlineColour={"bg-ctp-blue"}
                            className="peer hover:text-ctp-blue transition"
                        >
                            <p className="text-sm">Source</p>
                        </AnimatedUnderlineLink>
                        <LucideArrowRight className="peer-hover:text-ctp-blue" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};
