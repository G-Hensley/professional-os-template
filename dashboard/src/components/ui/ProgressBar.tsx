function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-16 bg-gray-200 rounded-full h-4 dark:bg-orange-200 neumorphic">
      <div
        className={`h-4 rounded-full transition-all duration-500 ease-in-out
          ${value < 50 ? 'bg-red-500' : value < 100 ? 'bg-orange-500' : 'bg-green-500'}`}
        style={{ width: `${value}%` }} // Example width, can be dynamic
      ></div>
    </div>
  );
}

export { ProgressBar };