ALTER TABLE "friendship" ALTER COLUMN "requester_id" SET DATA TYPE uuid USING requester_id::uuid;
--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_requester_id_user_id_fk" FOREIGN KEY ("requester_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;