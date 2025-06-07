CREATE TABLE "chapitres" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"etat" text,
	"description" text,
	"matiere_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercices" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"etat" text,
	"questions" json,
	"lecon_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercices_resultats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"exercice_id" integer,
	"score" integer,
	"reponses" json,
	"date_de_soumission" timestamp
);
--> statement-breakpoint
CREATE TABLE "lecons" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"etat" text,
	"contenu" text,
	"chapitre_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matieres" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"niveau" text NOT NULL,
	"description" text,
	"etat" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "simulations_examen" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"etat" text,
	"duree" integer,
	"date" timestamp,
	"date_limite" timestamp,
	"questions" json,
	"matiere_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "simulations_examen_resultats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"simulation_id" integer,
	"score" integer,
	"reponses" json,
	"date_de_soumission" timestamp
);
--> statement-breakpoint
ALTER TABLE "chapitres" ADD CONSTRAINT "chapitres_matiere_id_matieres_id_fk" FOREIGN KEY ("matiere_id") REFERENCES "public"."matieres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercices" ADD CONSTRAINT "exercices_lecon_id_lecons_id_fk" FOREIGN KEY ("lecon_id") REFERENCES "public"."lecons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercices_resultats" ADD CONSTRAINT "exercices_resultats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercices_resultats" ADD CONSTRAINT "exercices_resultats_exercice_id_exercices_id_fk" FOREIGN KEY ("exercice_id") REFERENCES "public"."exercices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecons" ADD CONSTRAINT "lecons_chapitre_id_chapitres_id_fk" FOREIGN KEY ("chapitre_id") REFERENCES "public"."chapitres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulations_examen" ADD CONSTRAINT "simulations_examen_matiere_id_matieres_id_fk" FOREIGN KEY ("matiere_id") REFERENCES "public"."matieres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulations_examen_resultats" ADD CONSTRAINT "simulations_examen_resultats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulations_examen_resultats" ADD CONSTRAINT "simulations_examen_resultats_simulation_id_simulations_examen_id_fk" FOREIGN KEY ("simulation_id") REFERENCES "public"."simulations_examen"("id") ON DELETE no action ON UPDATE no action;