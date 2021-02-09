export const InputFile = ({ register, file }) => {
  return (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        name="file"
        id="file"
        ref={register}
      />
      <label
        htmlFor="file"
        className="rounded-full bg-blue-500 text-white py-2 px-5 text-sm absolute right-0 top-0 shadow-md"
      >
        add file
      </label>
      <input
        type="text"
        className="py-2 bg-blue-300 rounded-md float-left pl-3 pr-10 text-sm text-white"
        readOnly
        value={file?.[0]?.name ?? ''}
      />
    </div>
  );
};
