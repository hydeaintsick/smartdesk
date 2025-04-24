import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                SmartDesk
              </span>
            </div>
            <p className="text-gray-500 mt-2">
              Revolutionize Your IT Support Experience
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            Made with ❤️ by{" "}
            <Link href="https://github.com/hydeaintsick">@hydeaintsick</Link>{" "}
            and the community.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            MIT License © 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
