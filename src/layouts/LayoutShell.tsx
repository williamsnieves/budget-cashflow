import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Tag, BarChart3, FileText, LifeBuoy, LogOut } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/categories', label: 'Categories', icon: Tag },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

export default function LayoutShell() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <aside
        style={{
          width: 260,
          backgroundColor: 'var(--color-bg-card)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: -0.5,
              margin: 0,
            }}
          >
            Architectural Ledger
          </h1>
          <p
            style={{
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              margin: '4px 0 0',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Freelancer Pro
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 12px', flex: 1 }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-accent-green)' : 'var(--color-text-secondary)',
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--color-accent-green)' : '3px solid transparent',
                textDecoration: 'none',
                transition: 'background-color 0.15s, color 0.15s',
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '0 24px', marginTop: 24 }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '10px 0',
              backgroundColor: 'var(--color-accent-green)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            <FileText size={16} />
            New Invoice
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 24,
            padding: '0 24px',
            marginTop: 24,
            borderTop: '1px solid var(--color-border)',
            paddingTop: 16,
          }}
        >
          <a
            href="#support"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
            }}
          >
            <LifeBuoy size={14} />
            Support
          </a>
          <a
            href="#signout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
            }}
          >
            <LogOut size={14} />
            Sign Out
          </a>
        </div>
      </aside>

      <main style={{ marginLeft: 260, flex: 1, minHeight: '100vh', padding: 32 }}>
        <Outlet />
      </main>
    </div>
  );
}