import { useState, type FormEvent } from "react";
import { formatMoney } from "../../lib/format";
import { useCatalog } from "./useCatalog";
import type { CatalogEntry } from "./types";

export function CatalogPage() {
  const { entries, addEntry, updateEntry, removeEntry } = useCatalog();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function resetForm() {
    setEditingId(null);
    setName("");
    setPrice("");
  }

  function startEditing(entry: CatalogEntry) {
    setEditingId(entry.id);
    setName(entry.name);
    setPrice(String(entry.price));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedPrice = Number(price);
    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) return;

    const data = { name: name.trim(), price: parsedPrice };
    if (editingId) {
      updateEntry(editingId, data);
    } else {
      addEntry(data);
    }
    resetForm();
  }

  return (
    <section>
      <h2>Catalog</h2>

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
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {entries.length === 0 ? (
        <p>Your catalog is empty. Add your first product or service.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              {entry.name} — {formatMoney(entry.price)}{" "}
              <button onClick={() => startEditing(entry)}>Edit</button>{" "}
              <button onClick={() => removeEntry(entry.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}