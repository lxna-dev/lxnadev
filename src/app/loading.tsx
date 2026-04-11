export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="border-onyx border-t-flag-red h-6 w-6 animate-spin rounded-full border-2" />
        <p className="font-syne text-dim-grey text-[10px] tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
