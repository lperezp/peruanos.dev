'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import { trackEvent } from '@/app/lib/analytics';

type TrackedLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    eventName?: string;
    eventParams?: Record<string, unknown>;
};

export default function TrackedLink({ children, eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (eventName) trackEvent(eventName, eventParams);
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <Link {...props} title={props.href?.toString()} onClick={handleClick}>
            {children}
        </Link>
    );
}
