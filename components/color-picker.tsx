"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(color)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Common colors
  const presetColors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#c0c0c0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
  ]

  useEffect(() => {
    setInputValue(color)
  }, [color])

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw color gradient
    const gradientH = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradientH.addColorStop(0, "#ff0000")
    gradientH.addColorStop(1 / 6, "#ffff00")
    gradientH.addColorStop(2 / 6, "#00ff00")
    gradientH.addColorStop(3 / 6, "#00ffff")
    gradientH.addColorStop(4 / 6, "#0000ff")
    gradientH.addColorStop(5 / 6, "#ff00ff")
    gradientH.addColorStop(1, "#ff0000")

    ctx.fillStyle = gradientH
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw black to white gradient overlay
    const gradientV = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradientV.addColorStop(0, "rgba(255,255,255,1)")
    gradientV.addColorStop(0.5, "rgba(255,255,255,0)")
    gradientV.addColorStop(0.5, "rgba(0,0,0,0)")
    gradientV.addColorStop(1, "rgba(0,0,0,1)")

    ctx.fillStyle = gradientV
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [isOpen])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const newColor = `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1].toString(16).padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`

    onChange(newColor)
    setInputValue(newColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      onChange(e.target.value)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start" onClick={() => setIsOpen(true)}>
          <div className="w-6 h-6 rounded-sm mr-2 border" style={{ backgroundColor: color }} />
          {inputValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              className="w-full h-40 rounded cursor-crosshair"
              onClick={handleCanvasClick}
            />
          </div>

          <div className="grid grid-cols-8 gap-1">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="w-6 h-6 rounded-sm border"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange(presetColor)
                  setInputValue(presetColor)
                }}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-sm border" style={{ backgroundColor: color }} />
            <Input value={inputValue} onChange={handleInputChange} className="flex-1" placeholder="#000000" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
