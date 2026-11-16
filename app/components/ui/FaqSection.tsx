import { ChevronDown } from 'lucide-react';

export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    title?: string;
    faqs: FaqItem[];
}

export default function FaqSection({ title = 'Preguntas frecuentes', faqs }: FaqSectionProps) {
    return (
        <section className="w-full mt-16 pt-10 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{title}</h2>
            <div className="flex flex-col gap-3">
                {faqs.map((faq) => (
                    <details
                        key={faq.question}
                        className="group border border-border rounded-lg bg-background p-5"
                    >
                        <summary className="font-semibold text-foreground cursor-pointer list-none flex justify-between items-center gap-4">
                            <span>{faq.question}</span>
                            <ChevronDown
                                size={18}
                                className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                            />
                        </summary>
                        <p className="mt-3 text-accent text-sm leading-relaxed">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
