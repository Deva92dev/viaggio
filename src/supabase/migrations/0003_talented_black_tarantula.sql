CREATE TABLE "hotels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"imageUrl" text NOT NULL,
	"price_per_night" integer NOT NULL,
	"available_rooms" integer DEFAULT 0 NOT NULL,
	"amenities" text[] DEFAULT '{}' NOT NULL,
	"category" varchar(100) DEFAULT 'standard' NOT NULL,
	"popular" boolean DEFAULT false,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hotels_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "tourPlaces" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "tourPlaces" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "tourPlaces" ALTER COLUMN "best_time_to_visit" SET DATA TYPE varchar(255)[];--> statement-breakpoint
ALTER TABLE "tourPlaces" ALTER COLUMN "best_time_to_visit" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "tourPlaces" ALTER COLUMN "best_time_to_visit" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tourPlaces" ADD COLUMN "category" varchar(100) DEFAULT 'adventure' NOT NULL;