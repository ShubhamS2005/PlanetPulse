import React, { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Log activity", to: "/log" },
  { label: "History", to: "/history" },
  { label: "Settings", to: "/settings" },
];

function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#eef5eb]">
      {/* Full-width navbar */}
      <header className="w-full bg-[#17352a] text-white shadow-md">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-4 md:px-5">
          <div className="flex min-h-[88px] items-center justify-between gap-5">
            {/* Brand */}
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Leaf className="h-6 w-6" />
              </span>

              <div>
                <p className="m-0 text-[1.2rem] font-bold tracking-[0.1rem] leading-tight sm:text-[1.35rem]">
                  PLANETPULSE
                </p>

                <p className="mt-1 text-sm leading-tight text-[#dce8dc] sm:text-[0.9rem]">
                  Your everyday impact, made visible
                </p>
              </div>
            </NavLink>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-1.5 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-[0.95rem] font-semibold transition ${
                      isActive
                        ? "bg-[#c9ef78] text-[#17352a]"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20 md:hidden"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile navigation */}
          {menuOpen && (
            <nav className="border-t border-white/10 py-4 md:hidden">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className={`block rounded-xl px-4 py-3.5 text-[0.95rem] font-semibold transition ${
                        isActive
                          ? "bg-[#c9ef78] text-[#17352a]"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="grid-wash mx-auto min-h-[calc(100vh-88px)] w-full max-w-[1500px] px-3 pb-10 pt-5 sm:px-4 md:px-5">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;