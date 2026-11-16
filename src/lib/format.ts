export function formatMoney(amount: number, currency = "$RD"): string {
    return `${currency} ${amount.toLocaleString("en-US")}`;
}

// iso is "yyyy-mm-dd". Adding T00:00:00 makes it local time, not UTC.
export function formatDate(iso: string): string {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("es-DO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

// Today's date in the user's local timezone, as "yyyy-mm-dd".
export function todayISO(): string {
    return new Date().toLocaleDateString("en-CA");
}