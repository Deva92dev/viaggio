import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { tourPlaces } from "../db/schema";

const connection = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(connection);

//for seeding data: npx tsx src/scripts/seed.ts

async function main() {
  const Places: (typeof tourPlaces.$inferInsert)[] = [
    {
      name: "Geirangerfjord",
      description:
        "A UNESCO World Heritage site, known for its stunning fjord views, towering cliffs, and cascading waterfalls.",
      location: "Geiranger",
      country: "Norway",
      imageUrl:
        "https://images.pexels.com/photos/6272372/pexels-photo-6272372.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "3 days",
      price: 2450,
      bestTimeToVisit: ["May", "June", "July", "August"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Lofoten Islands",
      description:
        "A group of islands renowned for their dramatic mountain scenery, fishing villages, and pristine beaches.",
      location: "Lofoten",
      country: "Norway",
      imageUrl:
        "https://images.pexels.com/photos/30536635/pexels-photo-30536635/free-photo-of-scenic-lofoten-islands-winter-landscape.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "4 days",
      price: 2600,
      bestTimeToVisit: ["May", "June", "July", "August"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Oslo Opera House",
      description:
        "An architectural marvel in Oslo, offering performances and stunning views of the Oslo fjord from its sloping roof.",
      location: "Oslo",
      country: "Norway",
      imageUrl:
        "https://images.pexels.com/photos/20202718/pexels-photo-20202718/free-photo-of-oslo-opera-house-operahuset-is-home-of-norwegian-national-opera-and-ballet-building-is-situated-at-head-of-oslofjord.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "1 day",
      price: 1200,
      bestTimeToVisit: ["May", "June", "September", "October"],
      category: "cultural",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Acropolis of Athens",
      description:
        "A historic citadel containing ancient buildings, including the Parthenon, offering a glimpse into ancient Greek culture.",
      location: "Athens",
      country: "Greece",
      imageUrl:
        "https://images.pexels.com/photos/15241679/pexels-photo-15241679/free-photo-of-ancient-architecture-on-a-hill.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "1 day",
      price: 1250,
      bestTimeToVisit: ["April", "May", "September", "October"],
      category: "historical",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Meteora",
      description:
        "Known for its stunning rock formations and monasteries perched atop cliffs, Meteora is one of Greece's most unique landscapes.",
      location: "Meteora",
      country: "Greece",
      imageUrl:
        "https://images.pexels.com/photos/28825813/pexels-photo-28825813/free-photo-of-stunning-monastery-on-rocky-cliff-edge.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 2400,
      bestTimeToVisit: ["May", "June", "September", "October"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Crete",
      description:
        "A large and diverse island with beautiful beaches, ancient ruins, and charming towns, making it perfect for both history buffs and nature lovers.",
      location: "Crete",
      country: "Greece",
      imageUrl:
        "https://images.pexels.com/photos/1732423/pexels-photo-1732423.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "5 days",
      price: 2700,
      bestTimeToVisit: ["May", "June", "September", "October"],
      category: "adventure",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Palace of Versailles",
      description:
        "A magnificent royal château with beautiful gardens, reflecting France’s opulent history and culture.",
      location: "Versailles",
      country: "France",
      imageUrl:
        "https://images.pexels.com/photos/17283207/pexels-photo-17283207/free-photo-of-view-of-people-walking-in-front-of-the-palace-of-versailles.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 2300,
      bestTimeToVisit: ["April", "May", "June", "September"],
      category: "historical",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "French Riviera",
      description:
        "A glamorous Mediterranean coastline offering luxurious beaches, resorts, and historical towns.",
      location: "Côte d'Azur",
      country: "France",
      imageUrl:
        "https://images.pexels.com/photos/29983740/pexels-photo-29983740/free-photo-of-charming-village-of-bormes-les-mimosas-france.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "4 days",
      price: 2700,
      bestTimeToVisit: ["May", "June", "September", "October"],
      category: "beach",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Mont Saint-Michel",
      description:
        "A stunning island commune with medieval architecture, set against a dramatic tidal backdrop.",
      location: "Normandy",
      country: "France",
      imageUrl:
        "https://images.pexels.com/photos/13282621/pexels-photo-13282621.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 2350,
      bestTimeToVisit: ["April", "May", "September", "October"],
      category: "historical",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Forbidden City",
      description:
        "The former imperial palace in Beijing, home to emperors for nearly 500 years, offering a deep dive into Chinese history.",
      location: "Beijing",
      country: "China",
      imageUrl:
        "https://images.pexels.com/photos/5106090/pexels-photo-5106090.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 1350,
      bestTimeToVisit: ["April", "May", "September", "October"],
      category: "cultural",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Guilin Karst Mountains",
      description:
        "Renowned for their breathtaking limestone peaks, the Karst Mountains in Guilin provide a surreal landscape.",
      location: "Guilin",
      country: "China",
      imageUrl:
        "https://images.pexels.com/photos/30174999/pexels-photo-30174999/free-photo-of-scenic-view-of-karst-mountains-in-rural-valley.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 1400,
      bestTimeToVisit: ["March", "April", "May", "September"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Yangtze River Cruise",
      description:
        "Experience one of the world’s longest rivers with a scenic cruise that passes through stunning landscapes and historic landmarks.",
      location: "Yangtze River",
      country: "China",
      imageUrl:
        "https://images.pexels.com/photos/30685854/pexels-photo-30685854/free-photo-of-ferry-boat-on-shanghai-s-huangpu-river.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "3 days",
      price: 1500,
      bestTimeToVisit: ["April", "May", "September", "October"],
      category: "adventure",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Marina Bay Sands",
      description:
        "An iconic hotel and entertainment complex offering a rooftop infinity pool with panoramic views of Singapore.",
      location: "Marina Bay",
      country: "Singapore",
      imageUrl:
        "https://images.pexels.com/photos/15166155/pexels-photo-15166155/free-photo-of-high-angle-view-of-singapore-cityscape-and-a-bay.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "1 day",
      price: 1500,
      bestTimeToVisit: ["December", "January", "February", "March"],
      category: "urban",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Gardens by the Bay",
      description:
        "A futuristic garden with stunning Supertree Grove and Cloud Forest, perfect for nature lovers and city explorers.",
      location: "Marina Bay",
      country: "Singapore",
      imageUrl:
        "https://images.pexels.com/photos/26065145/pexels-photo-26065145/free-photo-of-gardens-by-the-bay-in-singapore.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 1400,
      bestTimeToVisit: ["October", "November", "December", "January"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Sentosa Island",
      description:
        "An island resort offering entertainment, beaches, and family-friendly attractions like Universal Studios Singapore.",
      location: "Sentosa",
      country: "Singapore",
      imageUrl:
        "https://images.pexels.com/photos/28748435/pexels-photo-28748435/free-photo-of-scenic-view-of-sentosa-island-in-singapore.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 1800,
      bestTimeToVisit: ["March", "April", "May", "June"],
      category: "adventure",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Chinatown",
      description:
        "A vibrant area filled with traditional markets, Chinese temples, and local delicacies, offering a glimpse into Singapore's heritage.",
      location: "Chinatown",
      country: "Singapore",
      imageUrl:
        "https://images.pexels.com/photos/6871589/pexels-photo-6871589.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "1 day",
      price: 1200,
      bestTimeToVisit: ["April", "May", "June", "July"],
      category: "cultural",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Lake Titicaca",
      description:
        "The largest lake in South America by volume, known for its floating islands and vibrant indigenous culture.",
      location: "Puno Region",
      country: "Peru",
      imageUrl:
        "https://images.pexels.com/photos/27207516/pexels-photo-27207516/free-photo-of-a-boat-is-docked-in-the-water-near-a-small-town.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 2800,
      bestTimeToVisit: ["April", "May", "September", "October"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Sacred Valley",
      description:
        "A stunning valley filled with ancient Incan ruins, picturesque towns, and mountain views.",
      location: "Cusco Region",
      country: "Peru",
      imageUrl:
        "https://images.pexels.com/photos/1570610/pexels-photo-1570610.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "3 days",
      price: 3000,
      bestTimeToVisit: ["April", "May", "June", "September"],
      category: "historical",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Nazca Lines",
      description:
        "A series of ancient geoglyphs in the desert, known for their mysterious and massive designs.",
      location: "Ica Region",
      country: "Peru",
      imageUrl:
        "https://images.pexels.com/photos/7435822/pexels-photo-7435822.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "1 day",
      price: 2500,
      bestTimeToVisit: ["May", "June", "July", "August"],
      category: "adventure",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Great Barrier Reef",
      description:
        "The world's largest coral reef system, perfect for diving and marine life exploration.",
      location: "Queensland",
      country: "Australia",
      imageUrl:
        "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "3 days",
      price: 2500,
      bestTimeToVisit: ["June", "July", "August", "September"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Uluru",
      description:
        "A sacred sandstone monolith in the heart of Australia, rich in Aboriginal culture and history.",
      location: "Northern Territory",
      country: "Australia",
      imageUrl:
        "https://images.pexels.com/photos/21273962/pexels-photo-21273962/free-photo-of-canyon-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 1900,
      bestTimeToVisit: ["May", "June", "July", "August"],
      category: "adventure",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Bondi Beach",
      description:
        "One of Australia’s most famous beaches, known for surfing, coastal walks, and a vibrant atmosphere.",
      location: "Sydney",
      country: "Australia",
      imageUrl:
        "https://images.pexels.com/photos/3348463/pexels-photo-3348463.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 2700,
      bestTimeToVisit: ["December", "January", "February", "March"],
      category: "beach",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Yellowstone National Park",
      description:
        "The first national park in the world, famous for geysers, wildlife, and scenic beauty.",
      location: "Wyoming, Montana, Idaho",
      country: "USA",
      imageUrl:
        "https://images.pexels.com/photos/25729708/pexels-photo-25729708/free-photo-of-hot-springs-in-yellowstone-national-park.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "4 days",
      price: 3100,
      bestTimeToVisit: ["May", "June", "July", "August"],
      category: "nature",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Times Square",
      description:
        "The vibrant heart of New York City, known for Broadway shows, shopping, and neon lights.",
      location: "New York City",
      country: "USA",
      imageUrl:
        "https://images.pexels.com/photos/1838014/pexels-photo-1838014.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "2 days",
      price: 2800,
      bestTimeToVisit: ["April", "May", "September", "December"],
      category: "urban",
      popular: false,
      clerkId: "clerk_id",
    },
    {
      name: "Miami Beach",
      description:
        "A world-famous beach destination known for its nightlife, Art Deco architecture, and crystal-clear waters.",
      location: "Florida",
      country: "USA",
      imageUrl:
        "https://images.pexels.com/photos/24035503/pexels-photo-24035503/free-photo-of-deckchairs-and-umbrellas-on-a-sandy-beach.jpeg?auto=compress&cs=tinysrgb&w=1600",
      duration: "3 days",
      price: 3200,
      bestTimeToVisit: ["March", "April", "May", "November"],
      category: "beach",
      popular: false,
      clerkId: "clerk_id",
    },
  ];

  await db.insert(tourPlaces).values(Places);
  console.log("Places added successfully!");
  await connection.end();
  process.exit();
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
