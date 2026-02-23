import {
    ElementType,
    RefObject,
    ComponentPropsWithoutRef,
} from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type CustomVariants = {
    visible: (i: number) => object;
    hidden: object;
};

type TimelineContentProps<T extends ElementType = "div"> = {
    as?: T;
    animationNum: number;
    timelineRef: RefObject<HTMLElement | null>;
    customVariants?: CustomVariants;
    className?: string;
    children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "animationNum" | "timelineRef" | "customVariants">;

const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

// Map HTML tag names to motion equivalents
const MOTION_TAGS = ["div", "span", "p", "a", "figure", "section", "button", "h1", "h2", "h3", "li", "ul"] as const;
type MotionTag = (typeof MOTION_TAGS)[number];

export function TimelineContent<T extends ElementType = "div">({
    as,
    animationNum,
    timelineRef,
    customVariants,
    className,
    children,
    ...rest
}: TimelineContentProps<T>) {
    const isInView = useInView(timelineRef as RefObject<Element>, {
        once: true,
        margin: "-60px",
    });

    const variants = (customVariants as unknown as Variants) ?? defaultVariants;

    const tag = (as ?? "div") as string;
    const motionTag = MOTION_TAGS.includes(tag as MotionTag) ? tag : "div";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionComponent = (motion as any)[motionTag];

    return (
        <MotionComponent
            className={cn(className)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={animationNum}
            variants={variants}
            {...rest}
        >
            {children}
        </MotionComponent>
    );
}
