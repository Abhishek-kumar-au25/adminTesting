"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, Download, Copy, Code, FileJson, Settings } from "lucide-react"

export function ScriptEditor() {
  const [code, setCode] = useState(`// Login Flow Test Automation Script
const { test, expect } = require('@playwright/test');

test('Login flow test', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://example.com/login');
  
  // Fill in login form
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  
  // Click login button
  await page.click('#login-button');
  
  // Verify successful login
  await expect(page.locator('.welcome-message')).toContainText('Welcome');
  
  // Verify redirect to dashboard
  await expect(page).toHaveURL('https://example.com/dashboard');
});`)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Script Editor</CardTitle>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="code">
          <div className="border-b">
            <div className="flex items-center px-4">
              <TabsList className="h-10">
                <TabsTrigger value="code" className="flex items-center">
                  <Code className="mr-2 h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="config" className="flex items-center">
                  <FileJson className="mr-2 h-4 w-4" />
                  Config
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <TabsContent value="code" className="m-0">
            <div className="relative">
              <pre className="language-javascript rounded-md bg-muted p-4 text-sm font-mono">
                <code>{code}</code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="config" className="m-0">
            <div className="relative">
              <pre className="language-json rounded-md bg-muted p-4 text-sm font-mono">
                <code>{`{
  "name": "Login Flow Test",
  "type": "UI",
  "browser": "chromium",
  "viewport": {
    "width": 1280,
    "height": 720
  },
  "recordVideo": true,
  "retries": 2,
  "timeout": 30000
}`}</code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="m-0 p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Browser</label>
                  <select className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Chromium</option>
                    <option>Firefox</option>
                    <option>WebKit</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Timeout (ms)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="30000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Viewport Width</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="1280"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Viewport Height</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="720"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="record-video" className="rounded border-input" defaultChecked />
                <label htmlFor="record-video" className="text-sm font-medium">
                  Record Video
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
