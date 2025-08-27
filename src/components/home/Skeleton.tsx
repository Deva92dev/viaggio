export const FeaturesSkeleton = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const InstagramGallerySkeleton = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-12"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CallToActionSkeleton = () => (
  <div className="py-20 bg-blue-600">
    <div className="container mx-auto px-4 text-center">
      <div className="animate-pulse">
        <div className="h-10 bg-blue-400 rounded w-2/3 mx-auto mb-4"></div>
        <div className="h-6 bg-blue-400 rounded w-1/2 mx-auto mb-8"></div>
        <div className="h-12 bg-blue-400 rounded w-48 mx-auto"></div>
      </div>
    </div>
  </div>
);

export const TrustIndicatorsSkeleton = () => (
  <div className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="flex justify-center items-center space-x-8 md:space-x-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
