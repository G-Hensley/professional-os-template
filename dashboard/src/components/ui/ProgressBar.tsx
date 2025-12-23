function ProgressBar() {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
      <div
        className="bg-teal-600 h-4 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: '50%' }} // Example width, can be dynamic
      ></div>
    </div>
  );
}

export { ProgressBar };