import { useState, type FormEvent } from "react";
import type { Item } from "../types";
import { itemsTotal } from "../utils";
import { formatMoney } from "../../../lib/format";
import { ItemRow } from "./ItemRow";

interface InvoiceItemsProps {
  items: Item[];
  onChange: (items: Item[]) => void;
}

export function InvoiceItems({ items, onChange }: InvoiceItemsProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedPrice = Number(price);
    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) return;

    onChange([
      ...items,
      { id: crypto.randomUUID(), name: name.trim(), price: parsedPrice },
    ]);
    setName("");
    setPrice("");
  }

  function handleRemove(id: string) {
    onChange(items.filter((it) => it.id !== id));
  }

  return (
    <section>
      <h2>Items</h2>

      <form onSubmit={handleSubmit}>
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
          <ItemRow key={it.id} item={it} onRemove={handleRemove} />
        ))}
      </ul>

      <p>
        <strong>Total: {formatMoney(itemsTotal(items))}</strong>
      </p>
    </section>
  );
}