const ProgressBar = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
    <div
      className="bg-amber-500 h-2 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

export default ProgressBar;
