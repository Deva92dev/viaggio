CREATE TABLE "tourPlaces" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"image_url" text NOT NULL,
	"duration" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"best_time_to_visit" varchar(255),
	"popular" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tourPlaces_name_unique" UNIQUE("name")
);
