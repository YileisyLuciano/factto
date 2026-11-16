import { NavLink, Outlet } from "react-router-dom";
import "./AppLayout.css";

export function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Factto</h1>
        <nav>
          <NavLink to="/invoice">Invoice</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/settings">My business</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}