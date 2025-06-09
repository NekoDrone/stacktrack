import { motion } from "motion/react";
import { FC, ReactNode } from "react";

interface WiggleProps {
  children: ReactNode;
}

export const WiggleWiggle: FC<WiggleProps> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.8 }}
      transition={{
        type: "spring",
        duration: 0.6,
        bounce: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
};
