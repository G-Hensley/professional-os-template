function Shell({children}: {children: React.ReactNode}) {
  return (
    <section className="neumorphic w-full h-full rounded-4xl flex gap-6 p-4 flex-wrap justify-center
    overflow-y-auto items-center">
      {children}
    </section>
  )
}

export { Shell };