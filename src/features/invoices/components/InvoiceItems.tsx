import { useState, type FormEvent } from "react";
import type { Item } from "../types";
import { itemsTotal } from "../utils";
import { formatMoney } from "../../../lib/format";
import { useCatalog } from "../../catalog/useCatalog";
import { ItemRow } from "./ItemRow";

interface InvoiceItemsProps {
  items: Item[];
  onChange: (items: Item[]) => void;
}

export function InvoiceItems({ items, onChange }: InvoiceItemsProps) {
  const { entries } = useCatalog();

  // from catalog
  const [selectedId, setSelectedId] = useState("");
  const [catalogQty, setCatalogQty] = useState("1");

  // free line
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleAddFromCatalog() {
    const entry = entries.find((e) => e.id === selectedId);
    if (!entry) return;
    const qty = Math.max(1, Math.floor(Number(catalogQty)) || 1);

    const existing = items.find((it) => it.catalogId === entry.id);
    if (existing) {
      onChange(
        items.map((it) =>
          it.id === existing.id ? { ...it, qty: (it.qty ?? 1) + qty } : it,
        ),
      );
    } else {
      onChange([
        ...items,
        {
          id: crypto.randomUUID(),
          catalogId: entry.id,
          name: entry.name,
          price: entry.price,
          qty,
        },
      ]);
    }
    setSelectedId("");
    setCatalogQty("1");
  }

  function handleAddFreeLine(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedPrice = Number(price);
    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) return;

    onChange([
      ...items,
      { id: crypto.randomUUID(), name: name.trim(), price: parsedPrice, qty: 1 },
    ]);
    setName("");
    setPrice("");
  }

  function handleQtyChange(id: string, newQty: number) {
    onChange(items.map((it) => (it.id === id ? { ...it, qty: newQty } : it)));
  }

  function handleRemove(id: string) {
    onChange(items.filter((it) => it.id !== id));
  }

  return (
    <section>
      <h2>Items</h2>

      <h3>From catalog</h3>
      {entries.length === 0 ? (
        <p>Your catalog is empty. Add products in the Catalog tab.</p>
      ) : (
        <div>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Select an item…</option>
            {entries.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name} — {formatMoney(entry.price)}
              </option>
            ))}
          </select>{" "}
          <input
            type="number"
            min="1"
            value={catalogQty}
            onChange={(e) => setCatalogQty(e.target.value)}
          />{" "}
          <button
            type="button"
            disabled={!selectedId}
            onClick={handleAddFromCatalog}
          >
            Add
          </button>
        </div>
      )}

      <h3>Free line</h3>
      <form onSubmit={handleAddFreeLine}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map((it) => (
          <ItemRow
            key={it.id}
            item={it}
            onQtyChange={handleQtyChange}
            onRemove={handleRemove}
          />
        ))}
      </ul>

      <p>
        <strong>Total: {formatMoney(itemsTotal(items))}</strong>
      </p>
    </section>
  );
}