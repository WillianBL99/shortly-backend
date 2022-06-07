CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL UNIQUE,
	"created_at" timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" serial NOT NULL PRIMARY KEY,
	"user_id" integer REFERENCES users(id),
	"url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"views" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL DEFAULT NOW()
);
