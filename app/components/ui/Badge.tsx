interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline';
    className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const baseStyles = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors';

    const variantStyles = {
        default: 'bg-primary text-white hover:bg-primary-hover mb-2 mr-2',
        outline: 'border border-border text-foreground bg-transparent hover:bg-border mb-2 mr-2',
    };

    return (
        <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {children}
        </span>
    );
}