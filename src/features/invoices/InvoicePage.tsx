import { useState } from "react";
import type { Invoice } from "./types";
import { todayISO } from "../../lib/format";
import { InvoiceItems } from "./components/InvoiceItems";
import { InvoicePreview } from "./components/InvoicePreview";
import "./InvoicePage.css";

export function InvoicePage() {
  const [invoice, setInvoice] = useState<Invoice>({
    number: 1,
    customerName: "",
    date: todayISO(),
    items: [],
  });
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="invoice-page">
      <div className="invoice-editor">
        <label>
          Customer
          <input
            value={invoice.customerName}
            onChange={(e) =>
              setInvoice({ ...invoice, customerName: e.target.value })
            }
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={invoice.date}
            onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
          />
        </label>

        <InvoiceItems
          items={invoice.items}
          onChange={(items) => setInvoice({ ...invoice, items })}
        />

        <button
          type="button"
          disabled={invoice.items.length === 0}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Hide invoice" : "Generate invoice"}
        </button>
      </div>

      {showPreview && <InvoicePreview invoice={invoice} />}
    </div>
  );
}