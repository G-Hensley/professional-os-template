function Shell({children}: {children: React.ReactNode}) {
  return (
    <section className="neumorphic w-full h-full rounded-4xl p-4 justify-items-center
    overflow-y-auto items-center grid grid-cols-3 gap-x-6 gap-y-4">
      {children}
    </section>
  )
}

export { Shell };