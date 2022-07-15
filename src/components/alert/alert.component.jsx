const Alert = ({ message, closeAlert, color }) => (
  <div
    className={`text-white px-6 py-2 w-[250px] mb-4 bg-${color}-400 flex flex-row justify-between items-center`}>
    <span>{message}</span>
    <button
      className="bg-transparent p-1 text-2xl font-semibold leading-none outline-none focus:outline-none"
      onClick={closeAlert}>
      <span>×</span>
    </button>
  </div>
);

export default Alert;
