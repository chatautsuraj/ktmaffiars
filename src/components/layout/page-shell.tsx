interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function PageShell({ children, className = "", narrow }: PageShellProps) {
  return (
    <div className={`container-editorial py-8 sm:py-10 md:py-12 ${className}`}>
      <div className={narrow ? "max-w-3xl mx-auto" : undefined}>{children}</div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      <div className="gold-rule mb-4" />
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
      {description && (
        <p className="text-muted mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed max-w-2xl">{description}</p>
      )}
    </header>
  );
}
