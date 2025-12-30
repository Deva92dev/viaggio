import type { Metadata } from "next";
import PlacesCard from "@/components/destinations/PlacesCard";
import SectionTitle from "@/components/global/SectionTitle";
import HotelCard from "@/components/hotels/HotelCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFavoriteDestinations, getFavoriteHotels } from "@/utils/actions";

export const metadata: Metadata = {
  title: "My Favorites - Saved Destinations & Hotels | Viagio",
  description:
    "Access your saved destinations and hotels. Keep track of places you love and plan your future travels with Viagio.",
  keywords: [
    "favorites",
    "saved destinations",
    "saved hotels",
    "wishlist",
    "travel planning",
  ],
  alternates: {
    canonical: "/favorites",
  },
  robots: {
    index: false, // Private user page
    follow: false,
  },
};

const FavoritesPage = async () => {
  const [favoritesDestinations, favoritesHotel] = await Promise.all([
    getFavoriteDestinations(),
    getFavoriteHotels(),
  ]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-12 lg:py-24">
      <SectionTitle text="Your Favorites" description="" />
      <Tabs defaultValue="destinations" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="destinations" className="px-6 cursor-pointer">
            Destinations ({favoritesDestinations.length})
          </TabsTrigger>
          <TabsTrigger value="hotels" className="px-6 cursor-pointer">
            Hotels ({favoritesHotel.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="destinations" className="mt-6">
          {favoritesDestinations.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600">
                No Favorite Destinations yet
              </h3>
            </div>
          ) : (
            <PlacesCard destinations={favoritesDestinations} />
          )}
        </TabsContent>
        <TabsContent value="hotels" className="mt-6">
          {favoritesHotel.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600">
                No Favorite Hotels yet
              </h3>
            </div>
          ) : (
            <HotelCard hotels={favoritesHotel} />
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default FavoritesPage;
