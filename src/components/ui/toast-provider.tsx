'use client';

import * as Toast from '@radix-ui/react-toast';
import { createContext, useContext, useState, useCallback } from 'react';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  toast: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { ...msg, id }]);
  }, []);

  const borderColor = (variant?: ToastMessage['variant']) => {
    if (variant === 'success') return 'var(--success)';
    if (variant === 'error') return 'var(--error)';
    return 'var(--info)';
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider swipeDirection="right" duration={4000}>
        {toasts.map((t) => (
          <Toast.Root
            key={t.id}
            onOpenChange={(open) => {
              if (!open) setToasts((prev) => prev.filter((x) => x.id !== t.id));
            }}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${borderColor(t.variant)}`,
              borderRadius: '2px',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <Toast.Title
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}
            >
              {t.title}
            </Toast.Title>
            {t.description && (
              <Toast.Description
                style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
              >
                {t.description}
              </Toast.Description>
            )}
          </Toast.Root>
        ))}
        <Toast.Viewport
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '320px',
            zIndex: 9999,
          }}
        />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
