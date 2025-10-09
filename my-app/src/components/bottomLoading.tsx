export default function BottomLoader() {
  return (
    <div className="flex justify-center items-center w-full py-6">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-2 text-gray-500 text-sm">Loading more products...</span>
    </div>
  )
}