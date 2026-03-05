export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border px-4 py-8 text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left transition-smooth">
        <p className="m-0 text-xs tracking-wide uppercase font-medium opacity-70">
          &copy; {year} BudgetWise
        </p>
        <p className="m-0 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity">
          Desenvolvido por{' '}
          <span className="text-foreground font-bold italic tracking-tighter uppercase">
            nilByte
          </span>
        </p>
      </div>
    </footer>
  );
}
