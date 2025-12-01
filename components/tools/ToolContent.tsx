'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQ {
    question: string;
    answer: string;
}

interface ToolContentProps {
    title: string;
    description: string;
    howToUse: string[];
    faqs: FAQ[];
}

export function ToolContent({ title, description, howToUse, faqs }: ToolContentProps) {
    return (
        <div className="max-w-4xl mx-auto mt-16 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Introduction */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-blue-600">💡</span> {title}란?
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                    {description}
                </p>
            </section>

            {/* How to Use */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-blue-600">📝</span> 사용 방법
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {howToUse.map((step, index) => (
                        <div key={index} className="flex gap-4 p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                {index + 1}
                            </div>
                            <p className="text-foreground/80 font-medium pt-1">{step}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-blue-600">❓</span> 자주 묻는 질문 (FAQ)
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="accordion-item border rounded-xl bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                            <AccordionTrigger className="text-left text-lg font-medium px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-foreground/70 leading-relaxed whitespace-pre-line px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/20">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
}
