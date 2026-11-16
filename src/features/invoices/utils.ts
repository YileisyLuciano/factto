import type { Item } from "./types";

export function itemsTotal(items: Item[]): number {
    return items.reduce((sum, it) => sum + it.price * (it.qty ?? 1), 0);
}