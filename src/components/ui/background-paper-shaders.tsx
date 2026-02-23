import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

/**
 * Animated mesh-gradient background using @paper-design/shaders-react.
 * Renders an absolutely-positioned full-coverage WebGL canvas.
 *
 * @param colors  – Array of 4 hex/rgb color strings that drive the gradient.
 * @param speed   – Animation speed multiplier (default 0.8).
 * @param className – Extra Tailwind classes for the wrapper div.
 */
export function ShaderBackground({
    colors = ["#0d2e1a", "#1a4a28", "#2d6b3e", "#3d8c52"],
    speed = 0.8,
    className,
}: {
    colors?: [string, string, string, string];
    speed?: number;
    className?: string;
}) {
    return (
        <div className={cn("absolute inset-0 w-full h-full", className)}>
            <MeshGradient
                className="w-full h-full"
                colors={colors}
                speed={speed}
            />
        </div>
    );
}
