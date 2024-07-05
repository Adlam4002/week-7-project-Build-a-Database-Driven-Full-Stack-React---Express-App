import { database } from "./server.js";
database.query(`
    CREATE TABLE IF NOT EXISTS Anime 
    (
    "anime_id" SERIAL PRIMARY KEY,
    "anime_name" TEXT NOT NULL,
    UNIQUE ("anime_name")
);
`);

database.query(`CREATE TABLE IF NOT EXISTS Reviews
    (
    "review_id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "comment" TEXT NOT NULL,
    "anime_name" TEXT NOT NULL,
    "rating" INTEGER,
    FOREIGN KEY ("anime_name") REFERENCES "Anime" ("anime_name")
)
`);

database.query(` 
INSERT INTO Anime (anime_name)
 VALUES ('Mashle: Magic and Muscles'),
 ('Attack on Titan'),
 ('Jujutsu Kaisen'),
 ('Demon Slayer'),
 ('Chainsaw Man');
`);
database.query(`
    INSERT INTO Reviews (username, comment, anime_name, rating)
    VALUES (
    'Adlam4002',
    'Probably the best show I have ever seen',
    'Attack on Titan',
    5
    ),
    (
    'Adlam4002',
    'Tanjiro is the nicest character I have ever seen,
    he deserves to get strong',
    'Demon Slayer',
    5
    ),
    (
    'Adlam4002',
    'I can not wait for Yuji to power up and sort Sukuna out 👊🏻',
    'Jujutsu Kaisen',
    5
    ),
    (
    'Adlam4002',
    'Mash is great but this show always leaves me wanting cream puffs',
    'Mashle: Magic and Muscles',
    4
    ),
    (
    'Adlam4002',
    'Wow, I cannot believe what Makima was up to. What a snake',
    'Chainsaw Man',
    4
    ),
    (
    'Benston', 'I stand with Eren', 'Attack on Titan', 5);
    
    
    `);
