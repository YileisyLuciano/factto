import type { Item } from "../types";

interface ItemRowProps {
  item: Item;
  onRemove: (id: string) => void;
}

export function ItemRow({ item, onRemove }: ItemRowProps) {
  const qty = item.qty ?? 1;

  return (
    <li>
      {item.name}: {qty} × {item.price} = {qty * item.price}{" "}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
}
