'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';

type TrackedLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    eventName?: string;
    eventParams?: Record<string, unknown>;
};

export default function TrackedLink({ children, eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (eventName && typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
            window.gtag('event', eventName, eventParams);
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
}
