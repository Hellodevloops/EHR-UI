// src/components/ui/Dialog.tsx
'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = DialogPrimitive.Content;
export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2">{children}</div>
);
export const DialogTitle = DialogPrimitive.Title;

// Add this to your global.css or a CSS module
/*
.dialog-content {
  @apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full;
}
*/