"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    icon?: string;
    iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
    data: FAQItem[];
    className?: string;
    timestamp?: string;
    questionClassName?: string;
    answerClassName?: string;
}

export function FaqAccordion({
    data,
    className,
    timestamp,
    questionClassName,
    answerClassName,
}: FaqAccordionProps) {
    const [openItem, setOpenItem] = React.useState<string | null>(null);

    return (
        <div className={cn("p-4", className)}>
            {timestamp && (
                <div className="mb-4 text-sm text-muted-foreground">{timestamp}</div>
            )}

            <Accordion.Root
                type="single"
                collapsible
                value={openItem || ""}
                onValueChange={(value) => setOpenItem(value)}
            >
                {data.map((item) => (
                    <Accordion.Item
                        value={item.id.toString()}
                        key={item.id}
                        className="mb-2"
                    >
                        <Accordion.Header>
                            <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4 text-left">
                                <div
                                    className={cn(
                                        "relative flex items-center space-x-2 rounded-xl px-4 py-3 transition-colors flex-1 font-body font-semibold text-sm",
                                        // Default light-theme styles (overridden when questionClassName is provided)
                                        !questionClassName && (
                                            openItem === item.id.toString()
                                                ? "bg-primary/15 text-primary"
                                                : "bg-muted hover:bg-primary/10 text-foreground"
                                        ),
                                        questionClassName
                                    )}
                                >
                                    {item.icon && (
                                        <span
                                            className={cn(
                                                "absolute -bottom-2",
                                                item.iconPosition === "right" ? "right-2" : "left-2"
                                            )}
                                            style={{
                                                transform:
                                                    item.iconPosition === "right"
                                                        ? "rotate(7deg)"
                                                        : "rotate(-4deg)",
                                            }}
                                        >
                                            {item.icon}
                                        </span>
                                    )}
                                    <span className="font-body font-semibold text-sm pr-2 leading-snug">{item.question}</span>
                                </div>

                                <span
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        // When a custom question style is set, inherit its colour (e.g. white)
                                        // Otherwise fall back to the default muted/secondary scheme
                                        questionClassName
                                            ? "text-inherit opacity-70"
                                            : openItem === item.id.toString()
                                                ? "text-secondary"
                                                : "text-muted-foreground"
                                    )}
                                >
                                    {openItem === item.id.toString() ? (
                                        <Minus className="h-5 w-5" />
                                    ) : (
                                        <Plus className="h-5 w-5" />
                                    )}
                                </span>
                            </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Content asChild forceMount>
                            <motion.div
                                initial="collapsed"
                                animate={
                                    openItem === item.id.toString() ? "open" : "collapsed"
                                }
                                variants={{
                                    open: { opacity: 1, height: "auto" },
                                    collapsed: { opacity: 0, height: 0 },
                                }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="ml-4 mt-2 mb-3 md:ml-6">
                                    <div
                                        className={cn(
                                            "relative rounded-2xl rounded-tl-none bg-primary px-5 py-3 text-primary-foreground font-body text-sm leading-relaxed max-w-xl",
                                            answerClassName
                                        )}
                                    >
                                        {item.answer}
                                    </div>
                                </div>
                            </motion.div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    );
}
