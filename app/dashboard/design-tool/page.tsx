"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/color-picker"
import { toast } from "@/components/ui/use-toast"
import {
  Square,
  Circle,
  Type,
  ImageIcon,
  Pointer,
  Move,
  Download,
  Save,
  Trash2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

export default function DesignToolPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<string>("select")
  const [color, setColor] = useState<string>("#000000")
  const [strokeWidth, setStrokeWidth] = useState<number[]>([2])
  const [elements, setElements] = useState<any[]>([])
  const [selectedElement, setSelectedElement] = useState<number | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [zoom, setZoom] = useState<number>(1)
  const [history, setHistory] = useState<any[][]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [projectName, setProjectName] = useState<string>("Untitled Design")

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Initial render
    drawCanvas()

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        drawCanvas()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Redraw canvas when elements change
  useEffect(() => {
    drawCanvas()
  }, [elements, selectedElement, zoom])

  // Draw all elements on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply zoom
    ctx.save()
    ctx.scale(zoom, zoom)

    // Draw all elements
    elements.forEach((element, index) => {
      ctx.beginPath()

      // Set styles
      ctx.strokeStyle = element.color
      ctx.fillStyle = element.color
      ctx.lineWidth = element.strokeWidth

      // Draw based on element type
      switch (element.type) {
        case "rectangle":
          ctx.rect(element.x, element.y, element.width, element.height)
          ctx.stroke()
          break
        case "circle":
          ctx.arc(
            element.x + element.width / 2,
            element.y + element.height / 2,
            Math.min(element.width, element.height) / 2,
            0,
            2 * Math.PI,
          )
          ctx.stroke()
          break
        case "text":
          ctx.font = `${element.fontSize || 16}px Arial`
          ctx.fillText(element.text || "Text", element.x, element.y + 16)
          break
        case "image":
          if (element.image) {
            ctx.drawImage(element.image, element.x, element.y, element.width, element.height)
          } else {
            // Placeholder for image
            ctx.rect(element.x, element.y, element.width, element.height)
            ctx.fillStyle = "#f0f0f0"
            ctx.fill()
            ctx.stroke()
            ctx.fillStyle = "#999"
            ctx.textAlign = "center"
            ctx.fillText("Image", element.x + element.width / 2, element.y + element.height / 2)
          }
          break
      }

      // Draw selection box if element is selected
      if (index === selectedElement) {
        ctx.setLineDash([5, 5])
        ctx.strokeStyle = "#0070f3"
        ctx.lineWidth = 1
        ctx.rect(element.x - 5, element.y - 5, element.width + 10, element.height + 10)
        ctx.stroke()
        ctx.setLineDash([])
      }
    })

    ctx.restore()
  }

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoom
    const y = (e.clientY - rect.top) / zoom

    setStartPos({ x, y })

    if (tool === "select") {
      // Check if clicking on an element
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i]
        if (x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height) {
          setSelectedElement(i)
          return
        }
      }
      setSelectedElement(null)
    } else {
      setIsDrawing(true)
      setSelectedElement(null)
    }
  }

  // Handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoom
    const y = (e.clientY - rect.top) / zoom

    const newElements = [...elements]

    if (tool === "rectangle") {
      newElements[newElements.length - 1] = {
        type: "rectangle",
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        width: Math.abs(x - startPos.x),
        height: Math.abs(y - startPos.y),
        color,
        strokeWidth: strokeWidth[0],
      }
    } else if (tool === "circle") {
      newElements[newElements.length - 1] = {
        type: "circle",
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        width: Math.abs(x - startPos.x),
        height: Math.abs(y - startPos.y),
        color,
        strokeWidth: strokeWidth[0],
      }
    }

    setElements(newElements)
  }

  // Handle mouse up event
  const handleMouseUp = () => {
    if (isDrawing) {
      // Save to history
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push([...elements])
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }

    setIsDrawing(false)
    setStartPos(null)
  }

  // Add new element
  const addElement = (type: string) => {
    const newElement = {
      type,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      color,
      strokeWidth: strokeWidth[0],
    }

    if (type === "text") {
      Object.assign(newElement, {
        text: "Double click to edit",
        fontSize: 16,
      })
    }

    const newElements = [...elements, newElement]
    setElements(newElements)

    // Save to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newElements])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Add image element
  const addImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const newElement = {
            type: "image",
            x: 100,
            y: 100,
            width: 200,
            height: 200 * (img.height / img.width),
            image: img,
            color: "#000000",
            strokeWidth: 1,
          }

          const newElements = [...elements, newElement]
          setElements(newElements)

          // Save to history
          const newHistory = history.slice(0, historyIndex + 1)
          newHistory.push([...newElements])
          setHistory(newHistory)
          setHistoryIndex(newHistory.length - 1)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  // Delete selected element
  const deleteSelected = () => {
    if (selectedElement === null) return

    const newElements = elements.filter((_, index) => index !== selectedElement)
    setElements(newElements)
    setSelectedElement(null)

    // Save to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newElements])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Undo action
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements(history[historyIndex - 1])
    } else {
      toast({
        title: "Cannot undo",
        description: "No more actions to undo",
      })
    }
  }

  // Redo action
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements(history[historyIndex + 1])
    } else {
      toast({
        title: "Cannot redo",
        description: "No more actions to redo",
      })
    }
  }

  // Export canvas as image
  const exportCanvas = () => {
    try {
      const canvas = canvasRef.current
      if (!canvas) {
        throw new Error("Canvas not found")
      }

      const dataUrl = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `${projectName.replace(/\s+/g, "-").toLowerCase()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      toast({
        title: "Design exported",
        description: "Your design has been exported as PNG",
      })
    } catch (err) {
      toast({
        title: "Export failed",
        description: `Failed to export: ${err instanceof Error ? err.message : String(err)}`,
        variant: "destructive",
      })
    }
  }

  // Save project
  const saveProject = () => {
    try {
      const project = {
        name: projectName,
        elements: elements.map((el) => {
          // Remove actual image data and just keep a placeholder
          if (el.type === "image" && el.image) {
            return {
              ...el,
              image: null,
              imagePlaceholder: true,
            }
          }
          return el
        }),
        date: new Date().toISOString(),
      }

      localStorage.setItem(`design_${Date.now()}`, JSON.stringify(project))

      toast({
        title: "Project saved",
        description: "Your design has been saved locally",
      })
    } catch (err) {
      toast({
        title: "Save failed",
        description: `Failed to save: ${err instanceof Error ? err.message : String(err)}`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Design Tool</h1>
        <div className="flex items-center space-x-2">
          <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-64" />
          <Button variant="outline" onClick={saveProject}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={exportCanvas}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="shapes" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="shapes">Shapes</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={tool === "select" ? "default" : "outline"}
                    onClick={() => setTool("select")}
                    className="flex flex-col items-center py-6"
                  >
                    <Pointer className="h-6 w-6 mb-1" />
                    <span>Select</span>
                  </Button>
                  <Button
                    variant={tool === "move" ? "default" : "outline"}
                    onClick={() => setTool("move")}
                    className="flex flex-col items-center py-6"
                  >
                    <Move className="h-6 w-6 mb-1" />
                    <span>Move</span>
                  </Button>
                  <Button
                    variant={tool === "rectangle" ? "default" : "outline"}
                    onClick={() => setTool("rectangle")}
                    className="flex flex-col items-center py-6"
                  >
                    <Square className="h-6 w-6 mb-1" />
                    <span>Rectangle</span>
                  </Button>
                  <Button
                    variant={tool === "circle" ? "default" : "outline"}
                    onClick={() => setTool("circle")}
                    className="flex flex-col items-center py-6"
                  >
                    <Circle className="h-6 w-6 mb-1" />
                    <span>Circle</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addElement("text")}
                    className="flex flex-col items-center py-6"
                  >
                    <Type className="h-6 w-6 mb-1" />
                    <span>Add Text</span>
                  </Button>
                  <Button variant="outline" onClick={addImage} className="flex flex-col items-center py-6">
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span>Add Image</span>
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <ColorPicker color={color} onChange={setColor} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Stroke Width</label>
                  <span className="text-sm">{strokeWidth[0]}px</span>
                </div>
                <Slider value={strokeWidth} min={1} max={20} step={1} onValueChange={setStrokeWidth} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Zoom</label>
                  <span className="text-sm">{Math.round(zoom * 100)}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider
                    value={[zoom * 100]}
                    min={10}
                    max={200}
                    step={10}
                    onValueChange={(value) => setZoom(value[0] / 100)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(3, zoom + 0.1))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {elements.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">No elements yet</div>
                ) : (
                  elements.map((element, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                        selectedElement === index ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedElement(index)}
                    >
                      <div className="flex items-center">
                        {element.type === "rectangle" && <Square className="h-4 w-4 mr-2" />}
                        {element.type === "circle" && <Circle className="h-4 w-4 mr-2" />}
                        {element.type === "text" && <Type className="h-4 w-4 mr-2" />}
                        {element.type === "image" && <ImageIcon className="h-4 w-4 mr-2" />}
                        <span className="text-sm">
                          {element.type} {index + 1}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedElement(index)
                          deleteSelected()
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader className="border-b p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1}>
                  <Redo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={deleteSelected} disabled={selectedElement === null}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div className="bg-[#f0f0f0] dark:bg-[#1a1a1a] h-full overflow-auto">
                <div
                  className="bg-white dark:bg-[#2a2a2a] shadow-md mx-auto my-8"
                  style={{ width: "800px", height: "600px" }}
                >
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
