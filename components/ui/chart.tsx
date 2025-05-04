"use client"

import type { ReactNode } from "react"

// Create proper chart components with children support
export const BarChart = ({ children, data, ...props }: { children?: ReactNode; data?: any[] }) => {
  return (
    <div className="w-full h-full flex items-end justify-between gap-1 pt-4" {...props}>
      {data?.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="bg-primary rounded-t w-8"
            style={{ height: `${(item.value / 100) * 100}%`, minHeight: "4px" }}
          ></div>
          <div className="text-xs mt-1">{item.name}</div>
        </div>
      ))}
      {children}
    </div>
  )
}

export const Bar = ({ dataKey, fill, ...props }: { dataKey: string; fill: string }) => {
  return null // Handled by parent
}

export const XAxis = ({ dataKey, ...props }: { dataKey: string }) => {
  return null // Handled by parent
}

export const YAxis = (props: any) => {
  return null // Handled by parent
}

export const CartesianGrid = ({ strokeDasharray, ...props }: { strokeDasharray: string }) => {
  return null // Handled by parent
}

export const Tooltip = () => {
  return null // Handled by parent
}

export const ResponsiveContainer = ({
  children,
  width,
  height,
  ...props
}: { children: ReactNode; width: string; height: string }) => {
  return (
    <div className="w-full h-full" {...props}>
      {children}
    </div>
  )
}
