interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}
export const Confirm: React.FC<IProps> = ({ onCancel, onConfirm, text }) => {
  return (
    <div
      className="fixed left-0 top-0 w-full h-full flex justify-center items-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
    >
      <div className="bg-white shadow-md rounded-md p-5">
        <h1 className="text-xl font-thin">{text}</h1>
        <div className="flex justify-center mt-3">
          <button className="button-gray mr-2" onClick={onCancel}>
            cancel
          </button>
          <button className="button-red" onClick={onConfirm}>
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};
