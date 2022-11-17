



export function throwError({ message, title }: { title?: string, message: string }) {
    const error = new Error(message);
    error.message = message;
    error.name = title || ""
    throw error;
}