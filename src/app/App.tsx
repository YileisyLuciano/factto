import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { InvoicePage } from "../features/invoices/InvoicePage";
import { HistoryPage } from "../features/history/HistoryPage";
import { CatalogPage } from "../features/catalog/CatalogPage";
import { CatalogProvider } from "../features/catalog/CatalogProvider";
import { InvoiceDraftProvider } from "../features/invoices/InvoiceDraftProvider";
import { SettingsPage } from "../features/settings/SettingsPage";

export default function App() {
  return (
    <CatalogProvider>
      <InvoiceDraftProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/invoice" replace />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </InvoiceDraftProvider>
    </CatalogProvider>
  );
}