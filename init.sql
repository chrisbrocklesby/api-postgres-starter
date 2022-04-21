-- User Table
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "email" text,
    "password" text,
    "verifiedEmail" bool NOT NULL DEFAULT false,
    "token" text
);

-- Session Table
DROP TABLE IF EXISTS "sessions";
CREATE TABLE "sessions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "userId" uuid NOT NULL
);

-- Post Table
DROP TABLE IF EXISTS "posts";
CREATE TABLE "posts" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    "title" text,
    "body" text
);