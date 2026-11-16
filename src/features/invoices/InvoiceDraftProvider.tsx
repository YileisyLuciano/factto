import { useEffect, useState, type ReactNode } from "react";
import { todayISO } from "../../lib/format";
import { InvoiceDraftContext } from "./InvoiceDraftContext";
import type { Invoice } from "./types";

const STORAGE_KEY = "factto:invoice-draft";

function emptyInvoice(): Invoice {
  return { number: 1, customerName: "", date: todayISO(), items: [] };
}

function loadDraft(): Invoice {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Invoice) : emptyInvoice();
  } catch {
    return emptyInvoice();
  }
}

export function InvoiceDraftProvider({ children }: { children: ReactNode }) {
  const [invoice, setInvoice] = useState<Invoice>(loadDraft);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
    } catch {
      // storage may be unavailable; ignore
    }
  }, [invoice]);

  return (
    <InvoiceDraftContext.Provider value={{ invoice, setInvoice }}>
      {children}
    </InvoiceDraftContext.Provider>
  );
}