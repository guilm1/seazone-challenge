ALTER TABLE "ai_guides" DROP CONSTRAINT "ai_guides_pkey";
ALTER TABLE "ai_guides" ADD COLUMN "language" varchar(2) NOT NULL DEFAULT 'pt';
ALTER TABLE "ai_guides" ADD PRIMARY KEY ("property_code", "language");
