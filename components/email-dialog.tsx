"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Paperclip, Send } from "lucide-react"

interface EmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  defaultRecipients?: string
  defaultSubject?: string
  defaultMessage?: string
}

export default function EmailDialog({
  open,
  onOpenChange,
  title = "Send Report via Email",
  defaultRecipients = "",
  defaultSubject = "Test Report",
  defaultMessage = "Please find attached the test report.",
}: EmailDialogProps) {
  const [recipients, setRecipients] = useState(defaultRecipients)
  const [subject, setSubject] = useState(defaultSubject)
  const [message, setMessage] = useState(defaultMessage)
  const [isSending, setIsSending] = useState(false)

  const handleSend = () => {
    setIsSending(true)

    // Simulate sending email
    setTimeout(() => {
      setIsSending(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>Send the report directly to stakeholders via email.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Input
              id="recipients"
              placeholder="email@example.com, another@example.com"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Attachments</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="attach-pdf" defaultChecked />
                <label htmlFor="attach-pdf" className="text-sm">
                  Test Report (PDF)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="attach-excel" defaultChecked />
                <label htmlFor="attach-excel" className="text-sm">
                  Test Data (Excel)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="attach-screenshots" />
                <label htmlFor="attach-screenshots" className="text-sm">
                  Screenshots
                </label>
              </div>
            </div>
          </div>
          <Button variant="outline" className="flex items-center justify-center">
            <Paperclip className="mr-2 h-4 w-4" />
            Add More Attachments
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!recipients || !subject || isSending}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSending ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
