function Footer() {
  return (
    <footer className="footer border-t border-cyan-900 w-fit mx-auto px-8 rounded-t-2xl">
      <div className="text-center text-sm text-gray-500 py-2">
        &copy; {new Date().getFullYear()} Personal OS. All rights reserved.
      </div>
    </footer>
  );
}

export { Footer };