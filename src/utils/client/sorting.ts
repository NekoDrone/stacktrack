import type { ProjectSelect } from "@/db/schema/projects";

export const likeAStack = (a: ProjectSelect, b: ProjectSelect) => {
    if (a.isPriority && b.isPriority) return 0;
    if (a.isPriority) return -1;
    if (b.isPriority) return 1;
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // emulate a stack, so we want newer entries at the top.
    return dateB.valueOf() - dateA.valueOf();
};

export const likeAQueue = (a: ProjectSelect, b: ProjectSelect) => {
    if (a.isPriority && b.isPriority) return 0;
    if (a.isPriority) return -1;
    if (b.isPriority) return 1;
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // emulate a queue, so we want newer entries at the bottom.
    return dateA.valueOf() - dateB.valueOf();
};
