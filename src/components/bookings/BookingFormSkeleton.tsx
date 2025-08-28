export default function BookingFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SkelInput />
        <SkelInput />
      </div>
      <SkelInput />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SkelInput />
        <SkelInput />
      </div>
      <div className="h-24 bg-gray-200/70 rounded-xl" />
      <div className="h-60 bg-gray-200/70 rounded-2xl" />
      <div className="h-14 bg-gray-200/70 rounded-xl" />
    </div>
  );
}

function SkelInput() {
  return <div className="h-14 bg-gray-200/70 rounded-xl" />;
}
