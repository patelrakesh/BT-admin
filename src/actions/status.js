export const STATUS_REPLACE = 'STATUS_REPLACE';

export function status_replace(message) {
    return {
        type: STATUS_REPLACE,
        message: message,
    }
}


