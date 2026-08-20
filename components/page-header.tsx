export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card/60 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-sm text-muted-foreground text-pretty">{subtitle}</p>
        ) : null}
      </div>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </header>
  )
}
