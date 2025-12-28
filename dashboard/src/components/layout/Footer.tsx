function Footer() {
  return (
    <footer className="footer w-fit mx-auto mt-auto">
      <div className="surface-2 rounded-full px-6 py-2 text-center text-xs text-muted border border-cyan-900/50">
        &copy; {new Date().getFullYear()} Personal OS. All rights reserved.
      </div>
    </footer>
  );
}

export { Footer };
