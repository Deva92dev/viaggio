export default function BookingFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Date & guest selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SkelInput />
        <SkelInput />
      </div>
      <SkelInput />
      {/* Hotel-specific rows: render two fake inputs so height matches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SkelInput />
        <SkelInput />
      </div>
      {/* Special requests textarea */}
      <div className="h-24 bg-gray-200/70 rounded-xl" />
      {/* Price breakdown card */}
      <div className="h-60 bg-gray-200/70 rounded-2xl" />
      {/* Submit button */}
      <div className="h-14 bg-gray-200/70 rounded-xl" />
    </div>
  );
}

function SkelInput() {
  return <div className="h-14 bg-gray-200/70 rounded-xl" />;
}
