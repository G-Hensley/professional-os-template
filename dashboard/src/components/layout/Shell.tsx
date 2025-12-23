function Shell({children}: {children: React.ReactNode}) {
  return (
    <section className="neumorphic w-full h-full p-8 rounded-4xl flex flex-col gap-4">
      {children}
    </section>
  )
}

export { Shell };