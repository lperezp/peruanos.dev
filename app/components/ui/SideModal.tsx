'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function SideModal({ isOpen, onClose, children, title }: SideModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // ESLint disable is needed here as this is the standard pattern for Next.js portal mounting
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl bg-background h-full shadow-2xl animate-slide-in-right flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground truncate pr-4">{title || 'Detalles'}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-hover transition-colors text-foreground"
                        aria-label="Cerrar modal"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
