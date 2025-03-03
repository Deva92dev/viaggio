import Image from "next/image";

const Booking = () => {
  return (
    <section className="capitalize px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Booking is easy With Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="space-y-8">
          <div className="bg-white p-6">
            <h3 className="text-xl font-semibold mb-3">
              Find the perfect place
            </h3>
            <p className="text-foreground normal-case">
              Browse through our curated selection of destinations to find your
              ideal getaway spot.
            </p>
          </div>
          <div className="bg-white p-6">
            <h3 className="text-xl font-semibold mb-3">Select The trip</h3>
            <p className="text-foreground normal-case">
              Choose from various packages tailored to meet your preferences and
              budget.
            </p>
          </div>
        </div>
        <div className="relative h-64 w-5/6 md:h-80 rounded-lg shadow-xl">
          <Image
            src="/Boat.webp"
            alt="Boat Image"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
          />
        </div>
        {/* some pattern here  */}
        <div className="space-y-8">
          <div className="bg-white p-6">
            <h3 className="text-xl font-semibold mb-3">Book with Ease</h3>
            <p className="text-foreground normal-case">
              Our simple booking process ensures a hassle-free experience with
              secure payment options.
            </p>
          </div>
          <div className="bg-white p-6">
            <h3 className="text-xl font-semibold mb-3">Travel Out</h3>
            <p className="text-foreground normal-case">
              Pack your bags and enjoy your journey with our comprehensive
              travel support and guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
