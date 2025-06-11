import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  timestamp,
  boolean,
  integer,
  index,
  date,
} from "drizzle-orm/pg-core";

export const carType = pgEnum("car_type", ["premium", "economy", "luxury"]);
export const teamLevel = pgEnum("team_level", ["senior", "expert", "junior"]);

export const admin = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});
export const service = pgTable("service", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  description2: varchar("description2", { length: 255 }).notNull(),
  description3: varchar("description3", { length: 255 }).notNull(),
  description4: varchar("description4", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
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

  createdAt: timestamp("created_at").defaultNow(),
});

export const moreThenCompany = pgTable("more_then_company", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  services: varchar("services", { length: 255 }).array(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const clientSay = pgTable("client_say", {
  id: uuid("id").primaryKey().defaultRandom(),
  quote: varchar("quote", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  job: varchar("job", { length: 255 }).notNull(),
  starRating: integer("star_rating").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const team = pgTable("team", {
  id: uuid("id").primaryKey().defaultRandom(),
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

  createdAt: timestamp("created_at").defaultNow(),
});

export const carBrandCarousel = pgTable("car_brand_carousel", {
  id: uuid("id").primaryKey().defaultRandom(),
  carLogo: varchar("car_logo", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const contact = pgTable("contact", {
  id: uuid("id").primaryKey().defaultRandom(),
  icon: varchar("icon", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  info: varchar("info", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const getInTouch = pgTable("get_in_touch", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: varchar("message", { length: 1000 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const car = pgTable(
  "car",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    brand: varchar("brand", { length: 255 }).notNull(),
    model: varchar("model", { length: 255 }).notNull(),
    year: integer("year").notNull(),
    price: integer("price").notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    rentPday: integer("rent_pday").notNull(),
    doors: integer("doors").notNull(),
    passangers: integer("passangers").notNull(),
    transmission: varchar("transmission", { length: 255 }).notNull(),
    luggage: integer("luggage").notNull(),
    airConditioning: boolean("air_conditioning").notNull(),
    age: integer("age").notNull(),

    whatsapp: varchar("whatsapp", { length: 255 }).notNull(),
    gallery: varchar("gallery", { length: 255 }).array().notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("idx_car_brand").on(t.brand),
    index("idx_car_model").on(t.model),
    index("idx_car_year").on(t.year),
  ]
);

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const carTypeCategory = pgTable("car_type_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  carId: uuid("car_id")
    .notNull()
    .references(() => car.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const pickupLocation = pgTable("pickup_location", {
  id: uuid("id").primaryKey().defaultRandom(),
  city: varchar("city", { length: 255 }).notNull(),
  carId: uuid("car_id")
    .notNull()
    .references(() => car.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const pickupDate = pgTable("pickup_date", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date").notNull(),
  carId: uuid("car_id")
    .notNull()
    .references(() => car.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const dropoffLocation = pgTable("dropoff_location", {
  id: uuid("id").primaryKey().defaultRandom(),
  city: varchar("city", { length: 255 }).notNull(),
  carId: uuid("car_id")
    .notNull()
    .references(() => car.id),
});

export const returnDate = pgTable("return_date", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date").notNull(),
  carId: uuid("car_id")
    .notNull()
    .references(() => car.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const bookingForm = pgTable("booking_form", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  carType: carType("car_type_category").notNull(),
  pickupLocation: varchar("pickup_location", { length: 255 }).notNull(),
  dropoffLocation: varchar("dropoff_location", { length: 255 }).notNull(),
  pickupDate: date("pickup_date").notNull(),
  returnDate: date("return_date").notNull(),
  note: varchar("note", { length: 1500 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  planType: varchar("plan_type", { length: 255 }).notNull(),
  dayPlan: varchar("day_plan", { length: 255 }).notNull(),
  serviceOffers: varchar("service_offers", { length: 255 }).array().notNull(),
  price: integer("price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const blog = pgTable(
  "blog",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    tags: varchar("tags", { length: 255 }).array().notNull(),

    coverImageUrl: varchar("cover_image_url", { length: 255 }).notNull(),
    content: varchar("content", { length: 255 }).notNull(),
    gallery: varchar("gallery", { length: 255 }).array().notNull(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("idx_blog_category").on(t.category),
    index("idx_blog_title").on(t.title),
  ]
);

export const replay = pgTable("replay", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  comment: varchar("comment", { length: 255 }).notNull(),
  blogId: uuid("blog_id")
    .notNull()
    .references(() => blog.id),
});
