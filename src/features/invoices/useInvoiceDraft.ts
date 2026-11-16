import { useContext } from "react";
import { InvoiceDraftContext } from "./InvoiceDraftContext";

export function useInvoiceDraft() {
    const ctx = useContext(InvoiceDraftContext);
    if (!ctx) {
        throw new Error("useInvoiceDraft must be used inside <InvoiceDraftProvider>");
    }
    return ctx;
}