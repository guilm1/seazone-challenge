CREATE TABLE IF NOT EXISTS "properties" (
  "code" varchar(10) PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "property_type" text NOT NULL,
  "bedroom_quantity" integer NOT NULL,
  "bathroom_quantity" integer NOT NULL,
  "guest_capacity" integer NOT NULL,
  "address" jsonb NOT NULL,
  "operational" jsonb NOT NULL,
  "rules" jsonb NOT NULL,
  "amenities" jsonb NOT NULL,
  "images" jsonb NOT NULL,
  "host" jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "ai_guides" (
  "property_code" varchar(10) PRIMARY KEY NOT NULL,
  "content" jsonb,
  "is_generating" boolean DEFAULT false NOT NULL,
  "error" text,
  "generated_at" timestamp,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "ai_guides_property_code_fk" FOREIGN KEY ("property_code") REFERENCES "properties"("code") ON DELETE CASCADE
);
