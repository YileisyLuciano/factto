import { formatMoney } from "../../lib/format";
import { useSettings } from "./useSettings";

export function useFormatMoney() {
    const { settings } = useSettings();
    return (amount: number) => formatMoney(amount, settings.currency);
}