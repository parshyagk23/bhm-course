export const getNextDueDate = (duration) => {
    const now = new Date();

    if (!duration) return now.toISOString().split("T")[0];

    const [value, unit] = duration.split(" ");
    const amount = parseInt(value, 10);

    const nextDate = new Date(now);

    switch (unit.toLowerCase()) {
        case "day":
        case "days":
            nextDate.setDate(now.getDate() + amount);
            break;
        case "week":
        case "weeks":
            nextDate.setDate(now.getDate() + amount * 7);
            break;
        case "month":
        case "months":
            nextDate.setMonth(now.getMonth() + amount);
            break;
        case "year":
        case "years":
            nextDate.setFullYear(now.getFullYear() + amount);
            break;
        default:
            nextDate.setDate(now.getDate() + 30);
    }

    return nextDate.toISOString().split("T")[0];
};

export const getExpiryDateFromDuration = (courseDuration) => {
    const now = new Date();

    if (!courseDuration) {
        return now.toISOString().split("T")[0];
    }

    const { value, unit } = courseDuration;
    const amount = parseInt(value, 10);

    const expiryDate = new Date(now);

    switch (unit?.toLowerCase()) {
        case "day":
        case "days":
            expiryDate.setDate(now.getDate() + amount);
            break;

        case "month":
        case "months":
            expiryDate.setMonth(now.getMonth() + amount);
            break;

        case "year":
        case "years":
            expiryDate.setFullYear(now.getFullYear() + amount);
            break;

        case "lifetime":
            // Arbitrary far future date for lifetime
            expiryDate.setFullYear(now.getFullYear() + 100);
            break;

        default:
            // fallback → 1 year
            expiryDate.setFullYear(now.getFullYear() + 1);
    }

    return expiryDate.toISOString().split("T")[0];
};



export const parseCourseDescription = (description = "") => {
    if (!description) return [];

    // Prefer newline split
    const hasNewLines = description.includes("\n");

    const items = hasNewLines
        ? description.split("\n")
        : description.split(/\. (?=[A-Z])/); // split by sentence

    return items
        .map(item =>
            item
                .replace(/^\d+\.\s*/, "") // remove numbering
                .trim()
        )
        .filter(Boolean);
};
