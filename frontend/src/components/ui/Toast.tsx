import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  description: string;
  duration?: number;
}

interface ToastContextType {
  toast: (message: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(({ type, title, description, duration = 3000 }: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description, duration }]);

    setTimeout(() => {
      dismiss(id);
    }, duration);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const icons = {
            success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
            info: <Info className="w-5 h-5 text-sky-500 shrink-0" />
          };

          const backgrounds = {
            success: 'bg-white border-l-4 border-emerald-500 shadow-lg',
            warning: 'bg-white border-l-4 border-amber-500 shadow-lg',
            error: 'bg-white border-l-4 border-red-500 shadow-lg',
            info: 'bg-white border-l-4 border-sky-500 shadow-lg'
          };

          return (
            <div
              key={t.id}
              className={`p-4 rounded-lg flex gap-3 items-start border border-slate-100 ${backgrounds[t.type]} pointer-events-auto animate-in slide-in-from-bottom-5 duration-200`}
            >
              {icons[t.type]}
              <div className="flex-1 flex flex-col gap-0.5">
                {t.title && <h4 className="text-xs font-semibold text-slate-800">{t.title}</h4>}
                <p className="text-xs text-slate-600 leading-normal">{t.description}</p>
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
