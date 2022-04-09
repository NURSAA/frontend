
export abstract class LocalStorage {
    static set(key: string, data: unknown): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static get<T = unknown>(key: string): T | null {
        const itemString = localStorage.getItem(key);
        if (!itemString) {
            return null;
        }

        return JSON.parse(itemString) as T;
    }

    static clear(): void {
        localStorage.clear();
    }

    static removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
