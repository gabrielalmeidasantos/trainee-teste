import React, { useEffect, useRef } from "react";

const Toast = ({ message, type, show, onClose }) => {
  const toastRef = useRef(null);
  const toastInstance = useRef(null); // Armazena a instância do Toast

  useEffect(() => {
    // Verifica se deve mostrar o Toast e se a instância do Toast não foi inicializada ainda
    if (show && toastRef.current) {
      toastInstance.current = new bootstrap.Toast(toastRef.current);
      toastInstance.current.show();

      // Adiciona o evento de fechamento manual

      toastRef.current.addEventListener("hidden.bs.toast", onClose);
    }

    return () => {
      // Verifica se o Toast está ativo e o remove corretamente
      if (toastInstance.current) {
        toastInstance.current.hide();
        toastInstance.current.dispose(); // Remove o Toast da memória
        toastInstance.current = null; // Reseta a instância do Toast
      }
    };
  }, [show, onClose]);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        ref={toastRef}
        className={`toast text-white ${
          type === "success" ? "bg-success" : "bg-danger"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header text-white">
          <i
            className={`bi ${
              type === "success"
                ? "bi-check-circle-fill"
                : "bi-exclamation-triangle-fill"
            } me-2`}
          ></i>
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
