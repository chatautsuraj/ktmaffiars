"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AiAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiAssistant({ open, onOpenChange }: AiAssistantProps) {
  const [query, setQuery] = useState("");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => onOpenChange(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-navy text-white">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-gold" />
                <div>
                  <h2 className="font-serif text-lg font-bold">KTM Intelligence</h2>
                  <p className="text-xs text-white/60">AI research assistant · Preview</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="text-white hover:text-gold">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="p-4 bg-secondary/50 border border-border mb-6">
                <p className="text-sm text-muted leading-relaxed">
                  Ask about diplomatic relations, country profiles, trade data, or recent analysis.
                  This is a preview interface — full AI capabilities coming soon.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gold uppercase tracking-wider">Suggested queries</p>
                {[
                  "Summarize Nepal-India relations in 2026",
                  "What are BIMSTEC's key initiatives?",
                  "Latest developments in Himalayan water security",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="block w-full text-left p-3 text-sm border border-border hover:border-gold/50 hover:bg-secondary/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="p-4 border-t border-border flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setQuery("");
              }}
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about global affairs..."
                className="flex-1"
              />
              <Button type="submit" size="icon" aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
