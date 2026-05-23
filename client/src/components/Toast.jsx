import React from 'react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toast-notifications">
      {toasts.map((toast) => {
        let toastClass = "toast";
        if (toast.type === 'demo') {
          toastClass += " toast-demo";
        } else if (toast.type === 'error') {
          toastClass += " toast-error";
        }

        return (
          <div 
            key={toast.id} 
            className={toastClass}
            role="alert"
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}
