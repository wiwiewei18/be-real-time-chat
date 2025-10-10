CREATE TABLE "friendship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"requester_id" varchar(36) NOT NULL,
	"receiver_id" varchar(36) NOT NULL,
	"status" varchar(255) NOT NULL
);
