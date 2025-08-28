import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialsSkeleton = () => {
  return (
    <div className="relative w-full py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full opacity-30 md:hidden" />
      <div
        className="hidden md:block absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-blue-200 opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-purple-200 opacity-15 animate-pulse" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <div className="h-8 md:h-12 w-64 md:w-80 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 md:h-6 w-80 md:w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="relative bg-white/90 md:backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl border border-gray-100 p-6 md:p-8 lg:p-12">
          <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl opacity-30 -z-10 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative bg-white rounded-xl md:rounded-2xl border border-gray-100 p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-pulse"
                style={{ animationDelay: `${item * 0.1}s` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center animate-pulse">
                  <Quote size={16} className="md:w-5 md:h-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="w-4 h-4 md:w-5 md:h-5 bg-yellow-200 rounded-sm animate-pulse"
                    >
                      <Star size={16} className="md:w-5 md:h-5 text-gray-300" />
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 md:h-5 w-24 md:w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-3 md:h-4 w-32 md:w-40 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8 md:mt-12">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse ${
                    dot === 2 ? "bg-blue-300" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
                <ChevronLeft
                  size={20}
                  className="md:w-6 md:h-6 text-gray-400"
                />
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-200 rounded-full flex items-center justify-center animate-pulse">
                <ChevronRight
                  size={20}
                  className="md:w-6 md:h-6 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4].map((stat) => (
            <div
              key={stat}
              className="text-center animate-pulse"
              style={{ animationDelay: `${stat * 0.1 + 0.5}s` }}
            >
              <div className="h-8 md:h-10 w-16 md:w-20 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="h-4 w-20 md:w-24 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl md:rounded-3xl flex items-center justify-center z-10 pointer-events-none">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-600 font-medium text-sm">
            Loading testimonials...
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSkeleton;
