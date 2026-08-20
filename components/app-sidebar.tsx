"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, LayoutDashboard, LineChart, Table2, User, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Athlete Management", href: "/profile", icon: User },
  { title: "Prediction", href: "/prediction", icon: LineChart },
  { title: "Weekly Tracking", href: "/tracking", icon: Table2 },
  { title: "Model Insights", href: "/insights", icon: Brain },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 flex h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Activity className="size-5" strokeWidth={2.4} aria-hidden="true" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-sidebar-foreground">PrepCast AI</p>
          <p className="text-xs text-muted-foreground">Contest Prep Predictor</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2" aria-label="Primary">
        {nav.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          Decision-support prototype. Not medical or nutrition advice.
        </p>
      </div>
    </aside>
  )
}
