// src/components/ui/Modal.tsx
'use client';

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  submitButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitButtonText = 'Submit',
}) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Overlay with blur effect */}
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        
        {/* Modal Content */}
        <DialogPrimitive.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md w-[90vw] bg-white rounded-xl shadow-2xl border border-indigo-100 z-50"
        >
          <div className="border-b border-indigo-50 pb-4 px-6 pt-6">
            <DialogPrimitive.Title className="text-xl font-semibold text-indigo-900">
              {title}
            </DialogPrimitive.Title>
          </div>
          {onSubmit ? (
            <form onSubmit={onSubmit} className="space-y-6 p-6">
              {children}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                {submitButtonText}
              </button>
            </form>
          ) : (
            <div className="p-6">{children}</div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;