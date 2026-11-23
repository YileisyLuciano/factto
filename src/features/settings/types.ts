export interface Settings {
    businessName: string;
    currency: string;
    docTitle: string;
    thanksText: string;
    nextNumber: number;
}

export const defaultSettings: Settings = {
    businessName: "",
    currency: "$RD",
    docTitle: "Factura",
    thanksText: "¡Gracias por tu compra!",
    nextNumber: 1,
};