CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"item_id" uuid NOT NULL,
	"item_type" varchar(20) NOT NULL,
	"bookingDate" timestamp with time zone DEFAULT now() NOT NULL,
	"check_in_date" date NOT NULL,
	"check_out_date" date NOT NULL,
	"number_of_guests" integer DEFAULT 1 NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"booking_status" varchar(20) DEFAULT 'confirmed' NOT NULL,
	"payment_status" varchar(20) DEFAULT 'pending' NOT NULL,
	"payment_id" varchar(255),
	"special_requests" text,
	"room_type" varchar(100),
	"number_of_rooms" integer DEFAULT 1,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "is_verified" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "hotels" ADD COLUMN "average_rating" numeric(3, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "hotels" ADD COLUMN "total_reviews" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "booking_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "tourPlaces" ADD COLUMN "average_rating" numeric(3, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "tourPlaces" ADD COLUMN "total_reviews" integer DEFAULT 0;