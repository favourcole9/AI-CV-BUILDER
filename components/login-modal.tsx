"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GoogleIcon } from "./google-icon"
import { signIn } from "next-auth/react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/builder" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Sign In</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Sign in with your Google account to save and manage your CVs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-12 text-base font-medium"
          >
            <GoogleIcon />
            <span className="ml-3">Sign in with Google</span>
          </Button>

          <p className="text-sm text-gray-500 text-center">Secure authentication powered by Google OAuth 2.0</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
