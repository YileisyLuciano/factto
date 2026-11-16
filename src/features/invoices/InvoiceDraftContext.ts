import { createContext } from "react";
import type { Invoice } from "./types";

export interface InvoiceDraftContextValue {
    invoice: Invoice;
    setInvoice: (invoice: Invoice) => void;
}

export const InvoiceDraftContext =
    createContext<InvoiceDraftContextValue | null>(null);