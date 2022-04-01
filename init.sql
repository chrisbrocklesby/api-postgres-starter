-- User Table
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "email" text,
    "password" text,
    "verifiedEmail" bool NOT NULL DEFAULT false,
    "token" text,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now()
);

-- Session Table
DROP TABLE IF EXISTS "sessions";
CREATE TABLE "sessions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "userId" uuid NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now()
);

-- Post Table
DROP TABLE IF EXISTS "posts";
CREATE TABLE "posts" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "title" text,
    "body" text,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now()
);