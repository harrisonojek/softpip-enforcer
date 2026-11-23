"use client";

import React, { useState, useId } from "react";

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const baseId = useId();

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="surface-card overflow-hidden divide-y divide-[var(--rule)]">
      {items.map((item, index) => {
        const isOpen = !!openIds[item.id];
        const buttonId = `${baseId}-btn-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className="group">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer transition-colors hover:bg-[var(--slate)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mint)]"
              >
                <span className="type-h3 m-0 text-[var(--text)] group-hover:text-[var(--mint-text)] transition-colors">
                  <span className="font-mono text-xs text-[var(--text-45)] mr-3 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.question}
                </span>

                <span
                  className={`w-6 h-6 rounded-full border border-[var(--line)] flex items-center justify-center shrink-0 text-xs font-mono transition-transform duration-200 ${
                    isOpen
                      ? "rotate-45 bg-[var(--mint)] text-[var(--void)] border-[var(--mint)]"
                      : "text-[var(--text-70)] group-hover:border-[var(--text-70)]"
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden" aria-hidden={!isOpen}>
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1">
                  <div className="type-body text-[var(--text-70)] prose-col leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
