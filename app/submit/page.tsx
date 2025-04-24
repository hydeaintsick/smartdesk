"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import SubmitConfirmation from "@/components/submit-confirmation"
import RichTextEditor from "@/components/rich-text-editor"
import Footer from "@/components/footer"

export default function SubmitPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [receiveNotifications, setReceiveNotifications] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formState, setFormState] = useState({
    type: "",
    scope: "",
    description: "",
    email: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowConfirmation(true)

      // Redirect back to home after 3 seconds
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }, 1500)
  }

  const removeFile = () => {
    setFile(null)
  }

  if (showConfirmation) {
    return <SubmitConfirmation />
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-600/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="fancy-form-container gradient-border">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Submit a Request
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below to submit your IT support request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 relative">
                    <Label htmlFor="type" className="text-sm font-medium text-gray-300 mb-1 block">
                      Request Type
                    </Label>
                    <Select required value={formState.type} onValueChange={(value) => handleChange("type", value)}>
                      <SelectTrigger id="type" className="fancy-input bg-gray-800/50 border-gray-700 h-12">
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="inquiry">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="scope" className="text-sm font-medium text-gray-300 mb-1 block">
                      Scope
                    </Label>
                    <Select required value={formState.scope} onValueChange={(value) => handleChange("scope", value)}>
                      <SelectTrigger id="scope" className="fancy-input bg-gray-800/50 border-gray-700 h-12">
                        <SelectValue placeholder="Select scope" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="homepage">Homepage</SelectItem>
                        <SelectItem value="product">Product Page</SelectItem>
                        <SelectItem value="thematics">Thematics</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-300 mb-1 block">
                    Description
                  </Label>
                  <RichTextEditor
                    value={formState.description}
                    onChange={(value) => handleChange("description", value)}
                    placeholder="Describe your issue or request in detail..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment" className="text-sm font-medium text-gray-300 mb-1 block">
                    Attachments
                  </Label>
                  {file ? (
                    <div className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                      <div className="flex-1 truncate">
                        <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="attachment"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-300">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 10MB)</p>
                        </div>
                        <input
                          id="attachment"
                          type="file"
                          className="hidden"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
                  <Checkbox
                    id="notifications"
                    checked={receiveNotifications}
                    onCheckedChange={(checked) => setReceiveNotifications(checked as boolean)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="notifications" className="text-sm text-gray-300 cursor-pointer">
                    Receive notifications about this ticket
                  </Label>
                </div>

                {receiveNotifications && (
                  <div className="space-y-2 animate-in">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="fancy-input bg-gray-800/50 border-gray-700 h-12"
                      required={receiveNotifications}
                      value={formState.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                )}

                <CardFooter className="px-0 pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 text-lg font-medium shadow-glow transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
