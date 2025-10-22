ALTER TABLE "friendship" ALTER COLUMN "receiver_id" SET DATA TYPE uuid USING receiver_id::uuid;
--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_receiver_id_user_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;