function Shell({children}: {children: React.ReactNode}) {
  return (
    <section className="neumorphic w-full h-full rounded-4xl flex gap-4 p-4 flex-wrap justify-center">
      {children}
    </section>
  )
}

export { Shell };