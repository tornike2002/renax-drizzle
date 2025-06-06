import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const carType = pgEnum("car_type", ["premium", "economy", "luxury"]);
export const teamLevel = pgEnum("team_level", ["senior", "expert", "junior"]);

export const admin = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const video = pgTable("video", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  carModel: varchar("car_model", { length: 255 }).notNull(),
  monthlyPrice: varchar("monthly_price", { length: 255 }).notNull(),
  carType: carType("car_type").notNull(),
  videoUrl: varchar("video_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tips = pgTable("tips", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  tip: varchar("tip", { length: 255 }).notNull(),
})

export const moreThenCompany = pgTable("more_then_company", {
  companyName: varchar("company_name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  services: varchar("services", { length: 255 }).array(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
})

export const clientSay = pgTable("client_say", {
  quote: varchar("quote", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  job: varchar("job", { length: 255 }).notNull(),
  starRating: integer("star_rating").notNull(),
})

export const team = pgTable("team", {
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  job: varchar("job", { length: 255 }).notNull(),

  coverImageUrl: varchar("cover_image_url", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  services: varchar("services", { length: 255 }).array(),
  biography: varchar("biography", { length: 255 }).notNull(),
  education: varchar("education", { length: 255 }).notNull(),
  awards: varchar("awards", { length: 255 }).array(),

  facebook: varchar("facebook", { length: 255 }),
  instagram: varchar("instagram", { length: 255 }),
  linkedin: varchar("linkedin", { length: 255 }),
  whatsapp: varchar("whatsapp", { length: 255 }),
  mail: varchar("mail", { length: 255 }),

  teamLevel: teamLevel("team_level").default("junior"),
})

export const carBrandCarousel = pgTable("car_brand_carousel", {
  carLogo: varchar("car_logo", { length: 255 }).notNull(),
})

export const contact = pgTable("contact", {
  icon: varchar("icon", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  info: varchar("info", { length: 255 }).notNull(),
  
})

export const getInTouch = pgTable("get_in_touch", {
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: varchar("message", { length: 1000 }).notNull(),
})