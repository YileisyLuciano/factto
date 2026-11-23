import type { Item } from "../types";
import { useFormatMoney } from "../../settings/useFormatMoney";

interface ItemRowProps {
  item: Item;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function ItemRow({ item, onQtyChange, onRemove }: ItemRowProps) {
  const formatMoney = useFormatMoney();
  const qty = item.qty ?? 1;
  
  return (
    <li>
      {item.name} — {formatMoney(item.price)} ×{" "}
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) =>
          onQtyChange(item.id, Math.max(1, Math.floor(Number(e.target.value)) || 1))
        }
      />{" "}
      = {formatMoney(item.price * qty)}{" "}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
}