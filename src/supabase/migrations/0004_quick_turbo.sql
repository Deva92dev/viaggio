CREATE TABLE "favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"item_id" uuid NOT NULL,
	"item_type" varchar(20) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hotels" RENAME COLUMN "popular" TO "check_in_date";--> statement-breakpoint
ALTER TABLE "hotels" ADD COLUMN "check_out_date" date NOT NULL;