import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  // Add other Recharts components as needed
} from "recharts";

import { cn } from "@/lib/utils";

// Define the structure for chart configuration
export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string; // Allow direct color definition
    theme?: Record<string, string>; // Allow theme-specific colors
  };
};

// Create a context to share the chart configuration
type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

// Hook to easily access the chart configuration
function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

// ChartContainer component to set up the context and responsive container
interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ReactNode; // Allow any valid React node as children
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  // Keep the complex className for now, assuming it's necessary for styling
  // We can revisit this if it causes further linting issues
  const chartSpecificClassName = `flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke="#fff"]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border [&_.recharts-sector[stroke="#fff"]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(chartSpecificClassName, className)}
        {...props}
      >
        {/* ChartStyle is integrated into the main container's styling */} 
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "ChartContainer";

// Helper function to get payload config
interface PayloadItem {
  dataKey?: string;
  name?: string;
  value?: string | number | (string | number)[];
  fill?: string;
  color?: string;
  payload?: Record<string, unknown>;
  [key: string]: unknown;
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: PayloadItem[], // Use the defined interface array
  key: string
) {
  if (!Array.isArray(payload) || payload.length === 0) {
    return undefined;
  }

  const item = payload[0]; // Assuming we are interested in the first item for label

  const payloadPayload =
    "payload" in item &&
    typeof item.payload === "object" &&
    item.payload !== null
      ? item.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in item &&
    typeof item[key as keyof typeof item] === "string"
  ) {
    configLabelKey = item[key as keyof typeof item] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

// Custom Tooltip Content component
interface ChartTooltipContentProps
  extends React.ComponentProps<typeof Tooltip> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, payload, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            // Add a check for item.dataKey to ensure it's a string
            if (typeof item.dataKey !== 'string') return null;

            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, payload, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {/* Add a check for item.value to ensure it's a number or string */}
                      {item.value !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {/* Ensure item.value is treated as a number for toLocaleString */}
                          {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltipContent";

// Custom Legend Content component
interface ChartLegendContentProps
  extends React.ComponentProps<typeof Legend> {
  hideIcon?: boolean;
  nameKey?: string;
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
           // Add a check for item.dataKey to ensure it's a string
           if (typeof item.dataKey !== 'string') return null;

          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, payload, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  }
);

ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  // Export other components as needed
};
