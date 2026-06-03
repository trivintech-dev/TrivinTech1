/**
 * Merge class names with support for Tailwind CSS classes and conditional classes
 * @param {...any} classes - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...classes) {
    return classes
        .flat()
        .filter(Boolean)
        .join(" ");
}
