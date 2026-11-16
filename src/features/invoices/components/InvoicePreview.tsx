import type { Invoice } from "../types";
import { itemsTotal } from "../utils";
import { formatDate, formatMoney } from "../../../lib/format";
import "./InvoicePreview.css";

interface InvoicePreviewProps {
  invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <article className="invoice">
      <header className="invoice-header">
        <h2>Factura</h2>
        <p>No. {String(invoice.number).padStart(4, "0")}</p>
      </header>

      <dl className="invoice-meta">
        <div>
          <dt>Cliente</dt>
          <dd>{invoice.customerName || "—"}</dd>
        </div>
        <div>
          <dt>Fecha</dt>
          <dd>{formatDate(invoice.date)}</dd>
        </div>
      </dl>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th className="num">Cant.</th>
            <th className="num">Precio</th>
            <th className="num">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.length === 0 ? (
            <tr>
              <td colSpan={4}>Aún no hay artículos</td>
            </tr>
          ) : (
            invoice.items.map((it) => {
              const qty = it.qty ?? 1;
              return (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td className="num">{qty}</td>
                  <td className="num">{formatMoney(it.price)}</td>
                  <td className="num">{formatMoney(it.price * qty)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <p className="invoice-total">
        Total: <strong>{formatMoney(itemsTotal(invoice.items))}</strong>
      </p>

      <p className="invoice-thanks">¡Gracias por tu compra!</p>
    </article>
  );
}