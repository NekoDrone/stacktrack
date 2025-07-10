import type { ProjectSelect } from "@/db/schema/projects";
import { LucideStar } from "@/components/Icons/LucideStar";
import { LucideArrowBigDown } from "@/components/Icons/LucideArrowBigDown";
import { LucideArrowBigUp } from "@/components/Icons/LucideArrowBigUp";
import { useLocalStorage } from "@uidotdev/usehooks";

interface EntryProps {
    entry: ProjectSelect;
}

export const Entry = ({ entry }: EntryProps) => {
    const [isUpvoted, setIsUpvoted] = useLocalStorage<boolean>(
        `${entry.id.toString()}:isUpvoted`,
        false,
    );

    const [isDownvoted, setIsDownvoted] = useLocalStorage<boolean>(
        `${entry.id.toString()}:isDownvoted`,
        false,
    );

    const handleUpvote = () => {
        if (isUpvoted) {
            // remove upvote
        } else if (isDownvoted) {
            // change downvote to upvote
        } else {
            // do normal upvote
        }
    };

    const handleDownvote = () => {
        if (isDownvoted) {
            // remove downvote
        } else if (isUpvoted) {
            // change upvote to downvote
        } else {
            // do normal downvote
        }
    };

    if (isUpvoted && isDownvoted) {
        console.log(
            "Somehow got into the state where user has upvoted and downvoted. Resetting vote count.",
        );
        // actually un-upvote
        setIsUpvoted(false);

        // actually un-downvote
        setIsDownvoted(false);
    }

    return (
        <div className="outline-1 outline-ctp-overlay-2 p-4 rounded-2xl w-76 gap-2 flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="font-medium text-xl">{entry.name}</h2>
                <LucideStar
                    className={
                        entry.isPriority ? "text-ctp-yellow" : "text-ctp-text"
                    }
                />
            </div>

            <p className="text-sm">{entry.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-xs font-extralight">{entry.votes} votes</p>
                <div className="flex">
                    <LucideArrowBigUp
                        className={`hover:text-ctp-green cursor-pointer ${isUpvoted ? "text-ctp-green" : ""}`}
                    />
                    <LucideArrowBigDown
                        className={`hover:text-ctp-red cursor-pointer ${isDownvoted ? "text-ctp-red" : ""}`}
                    />
                </div>
            </div>
        </div>
    );
};
