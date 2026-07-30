"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/types";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const safeEvents = Array.isArray(events) ? events : [];
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      <div className="space-y-8">
        {safeEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-10"
          >
            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-gold border-2 border-background" />
            <span className="text-gold text-sm font-semibold">{event.year}</span>
            <h4 className="font-serif text-lg font-semibold mt-1">{event.title}</h4>
            <p className="text-sm text-muted mt-1 leading-relaxed">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
