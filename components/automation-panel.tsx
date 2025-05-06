"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Play, Save, Plus, Trash2, FileCode, Clock, RotateCw } from "lucide-react"

export default function AutomationPanel() {
  const [scriptName, setScriptName] = useState("")
  const [scriptCode, setScriptCode] = useState(`// Example Selenium script
const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://example.com');
    await driver.findElement(By.name('q')).sendKeys('testing', Key.RETURN);
    await driver.wait(until.titleContains('testing'), 1000);
    return 'Test completed successfully!';
  } finally {
    await driver.quit();
  }
}`)

  const [savedScripts] = useState([
    { id: 1, name: "Login Form Test", type: "selenium", lastRun: "2 hours ago" },
    { id: 2, name: "API Health Check", type: "api", lastRun: "1 day ago" },
    { id: 3, name: "Performance Test", type: "performance", lastRun: "3 days ago" },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automation Scripts</CardTitle>
          <CardDescription>Create, manage, and run automated test scripts for your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Script</TabsTrigger>
              <TabsTrigger value="manage">Manage Scripts</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="script-name">Script Name</Label>
                    <Input
                      id="script-name"
                      placeholder="My Test Script"
                      value={scriptName}
                      onChange={(e) => setScriptName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="script-type">Script Type</Label>
                    <Select defaultValue="selenium">
                      <SelectTrigger id="script-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selenium">Selenium</SelectItem>
                        <SelectItem value="api">API Test</SelectItem>
                        <SelectItem value="performance">Performance Test</SelectItem>
                        <SelectItem value="custom">Custom Script</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="script-code">Script Code</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <FileCode className="mr-1 h-4 w-4" />
                        Templates
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="script-code"
                    className="font-mono h-[300px]"
                    value={scriptCode}
                    onChange={(e) => setScriptCode(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="headless" />
                  <Label htmlFor="headless">Run in headless mode</Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="manage" className="pt-4">
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-3 font-medium text-sm text-muted-foreground">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-3">Last Run</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {savedScripts.map((script) => (
                    <div key={script.id} className="grid grid-cols-12 gap-2 border-t p-3 items-center">
                      <div className="col-span-5 font-medium">{script.name}</div>
                      <div className="col-span-2">{script.type}</div>
                      <div className="col-span-3 text-sm text-muted-foreground">{script.lastRun}</div>
                      <div className="col-span-2 flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Code className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Script
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Script
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Run Script
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Tasks</CardTitle>
          <CardDescription>Configure automated tests to run on a schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-3 font-medium text-sm text-muted-foreground">
                <div className="col-span-4">Task Name</div>
                <div className="col-span-3">Schedule</div>
                <div className="col-span-3">Last Run Status</div>
                <div className="col-span-2">Actions</div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-t p-3 items-center">
                <div className="col-span-4 font-medium">Daily Login Test</div>
                <div className="col-span-3 text-sm">Every day at 9:00 AM</div>
                <div className="col-span-3">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Success
                  </span>
                </div>
                <div className="col-span-2 flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 border-t p-3 items-center">
                <div className="col-span-4 font-medium">Weekly API Health Check</div>
                <div className="col-span-3 text-sm">Every Monday at 8:00 AM</div>
                <div className="col-span-3">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Failed
                  </span>
                </div>
                <div className="col-span-2 flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
