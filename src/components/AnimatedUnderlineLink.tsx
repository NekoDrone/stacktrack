import { motion } from "motion/react";
import type { FC, ReactNode } from "react";

enum UnderlineColours {
    BLUE = "bg-ctp-blue",
    MAUVE = "bg-ctp-mauve",
    RED = "bg-ctp-red",
}

interface AnimatedLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    underlineColour?: UnderlineColours | string;
}

export const AnimatedUnderlineLink: FC<AnimatedLinkProps> = ({
    href,
    children,
    className,
    underlineColour = UnderlineColours.BLUE,
}) => {
    return (
        <motion.a
            href={href}
            className={`relative inline-block ${className ?? ""}`}
            initial="initial"
            whileHover="hover"
        >
            {children}
            <motion.span
                className={`${underlineColour} absolute bottom-1 left-0 h-0.25 w-full origin-center`}
                variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 },
                }}
                transition={{
                    type: "spring",
                    duration: 0.25,
                    bounce: 0.3,
                }}
            />
        </motion.a>
    );
};
