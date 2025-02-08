export function Input({ id, type, ...props }: { id: string; type: string }) {
    return (
      <input
        id={id}
        type={type}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        {...props}
      />
    );
  }
  