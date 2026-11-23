import { useSettings } from "./useSettings";
import "./SettingsPage.css";

export function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <section>
      <h2>My business</h2>

      <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Business name
          <input
            value={settings.businessName}
            onChange={(e) => updateSettings({ businessName: e.target.value })}
          />
        </label>

        <label>
          Document title
          <input
            value={settings.docTitle}
            onChange={(e) => updateSettings({ docTitle: e.target.value })}
          />
        </label>

        <label>
          Currency
          <input
            value={settings.currency}
            onChange={(e) => updateSettings({ currency: e.target.value })}
          />
        </label>

        <label>
          Thank-you message
          <input
            value={settings.thanksText}
            onChange={(e) => updateSettings({ thanksText: e.target.value })}
          />
        </label>

        <label>
          Next invoice number
          <input
            type="number"
            min="1"
            value={settings.nextNumber}
            onChange={(e) =>
              updateSettings({
                nextNumber: Math.max(1, Math.floor(Number(e.target.value)) || 1),
              })
            }
          />
        </label>
      </form>
    </section>
  );
}