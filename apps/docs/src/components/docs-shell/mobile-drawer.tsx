"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { XIcon } from "lucide-react";
import { useEffect, useEffectEvent, useRef } from "react";

import { Brand } from "@/components/site/brand";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

import { SidebarFooter } from "./sidebar-footer";
import { SidebarNav } from "./sidebar-nav";

/**
 * Navigation drawer for small screens, built on the native `<dialog>` so
 * focus trapping, Escape handling and the backdrop come for free.
 *
 * @param props - Open state, close callback and the page tree.
 * @returns The dialog element.
 */
export const MobileDrawer = ({
  onClose,
  open,
  tree,
}: {
  onClose: () => void;
  open: boolean;
  tree: PageTree.Root;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onBackdropClick = useEffectEvent((event: MouseEvent) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    // Clicks that land on the dialog itself (not its children) hit the backdrop.
    const listener = (event: MouseEvent) => onBackdropClick(event);
    dialog.addEventListener("click", listener);
    return () => dialog.removeEventListener("click", listener);
  }, []);

  return (
    <dialog
      aria-label="Documentation navigation"
      className={cn(
        "border-fd-border bg-fd-background text-fd-foreground fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-72 max-w-full flex-col border-r p-0 open:flex md:hidden",
        "backdrop:bg-fd-overlay",
        "transition-transform duration-200 ease-out starting:open:-translate-x-full"
      )}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="border-fd-border flex h-12 shrink-0 items-center justify-between border-b px-2.5">
        <Brand />
        <IconButton label="Close navigation" onClick={onClose}>
          <XIcon />
        </IconButton>
      </div>
      <SidebarNav onNavigate={onClose} tree={tree} />
      <SidebarFooter />
    </dialog>
  );
};
