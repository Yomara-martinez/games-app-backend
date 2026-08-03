require("dotenv").config();

const { dbConnection, User, GameReview, WishList , Likes, Dislikes} = require("./modules");


// ---------------- GAME DATABASE ----------------

const games = [
  { title: "Elden Ring", genre: "Role-Playing" },
  { title: "Cyberpunk 2077", genre: "Action-Adventure" },
  { title: "Hades", genre: "Action" },
  { title: "Resident Evil 4 Remake", genre: "Horror" },
  { title: "The Legend of Zelda: Breath of the Wild", genre: "Adventure" },
  { title: "Baldur's Gate 3", genre: "Role-Playing" },
  { title: "God of War Ragnarok", genre: "Action-Adventure" },
  { title: "Spider-Man 2", genre: "Action" },
  { title: "Hollow Knight", genre: "Adventure" },
  { title: "Stardew Valley", genre: "Simulation" },
  { title: "Minecraft", genre: "Simulation" },
  { title: "The Witcher 3", genre: "Role-Playing" },
  { title: "Final Fantasy VII Rebirth", genre: "Role-Playing" },
  { title: "Dead Space Remake", genre: "Horror" },
  { title: "Alan Wake 2", genre: "Horror" },
  { title: "Super Mario Odyssey", genre: "Adventure" },
  { title: "Sekiro: Shadows Die Twice", genre: "Action" },
  { title: "Ghost of Tsushima", genre: "Action-Adventure" },
  { title: "Persona 5 Royal", genre: "Role-Playing" },
  { title: "Red Dead Redemption 2", genre: "Action-Adventure" },
  { title: "God of War", genre: "Action-Adventure" },
  { title: "The Last of Us Part I", genre: "Adventure" },
  { title: "The Last of Us Part II", genre: "Adventure" },
  { title: "Dark Souls III", genre: "Role-Playing" },
  { title: "Monster Hunter World", genre: "Action" },
  { title: "Control", genre: "Action-Adventure" },
  { title: "Death Stranding", genre: "Adventure" },
  { title: "Doom Eternal", genre: "Shooter" },
  { title: "Forza Horizon 5", genre: "Sports" },
  { title: "Resident Evil Village", genre: "Horror" },
  { title: "It Takes Two", genre: "Adventure" },
  { title: "Overwatch 2", genre: "Shooter" },
  { title: "Valorant", genre: "Shooter" },
  { title: "League of Legends", genre: "MMO" },
  { title: "Final Fantasy XIV", genre: "MMO" },
  { title: "Animal Crossing New Horizons", genre: "Simulation" },
  { title: "The Sims 4", genre: "Simulation" },
  { title: "Celeste", genre: "Adventure" },
  { title: "Cuphead", genre: "Action" },
  { title: "Ori and the Will of the Wisps", genre: "Adventure" },
  { title: "Terraria", genre: "Simulation" },
  { title: "No Man's Sky", genre: "Adventure" },
  { title: "Assassin's Creed Mirage", genre: "Action-Adventure" },
  { title: "Far Cry 6", genre: "Shooter" },
  { title: "Grand Theft Auto V", genre: "Action-Adventure" },
  { title: "Hogwarts Legacy", genre: "Role-Playing" },
  { title: "Starfield", genre: "Role-Playing" },
  { title: "Lies of P", genre: "Role-Playing" },
  { title: "Armored Core VI", genre: "Action" },
  { title: "Street Fighter 6", genre: "Fighting" }
];


// ---------------- REVIEW GENERATOR ----------------


const beginnings = [
  "I did not expect this game to leave such a strong impression on me.",
  "After spending a lot of time with this game, I finally understand why people talk about it so much.",
  "This was one of those games where I kept saying I would stop playing, but I always wanted one more session.",
  "I started this game with normal expectations, but it ended up being a much better experience than I imagined.",
  "What surprised me most about this game is how quickly I became invested in it."
];


const gameplay = [
  "The gameplay is easily the strongest part. Everything feels responsive and satisfying once you understand the mechanics.",
  "The combat and controls feel polished, making every victory feel earned instead of automatic.",
  "The main gameplay loop is addictive and gives you a reason to keep improving.",
  "Exploring the world is what kept me playing because every area felt like there was something new to discover.",
  "The mechanics are simple at first, but they become much deeper the longer you play."
];


const story = [
  "The story was the biggest reason I stayed interested because the characters felt memorable.",
  "The writing is not perfect, but the important moments have enough emotion to make them stand out.",
  "The characters are what make the experience special and give the player a reason to care.",
  "The world feels full of details, and learning more about it made the experience better.",
  "The narrative slowly builds instead of giving everything away immediately, which I enjoyed."
];


const complaints = [
  "My biggest issue is that some sections feel repetitive after playing for many hours.",
  "A few mechanics could have been explained better for new players.",
  "The pacing is not perfect, especially during some slower moments.",
  "There are some small problems, but they did not completely ruin my experience.",
  "I wish some parts received more attention because the potential was there."
];


const endings = [
  "I would recommend this game to anyone who enjoys this type of experience.",
  "Even with its flaws, this is a game I think most players should try.",
  "It is not a perfect game, but it is one that I will remember.",
  "This is definitely a game worth adding to your list.",
  "Overall, it was an enjoyable experience that was worth my time."
];


const usedReviews = new Set();


function createReview(game, rating) {

  let review;


  do {

    const parts = [
      beginnings[Math.floor(Math.random()*beginnings.length)],
      gameplay[Math.floor(Math.random()*gameplay.length)],
      story[Math.floor(Math.random()*story.length)],
      complaints[Math.floor(Math.random()*complaints.length)],
      endings[Math.floor(Math.random()*endings.length)]
    ];


    review = parts.join("\n\n");


  } while (usedReviews.has(review));


  usedReviews.add(review);


  return review;

}
// ---------------- SEED FUNCTION ----------------


async function seed() {

  try {

    console.log("🌱 Starting database seed...");


    await dbConnection.sync({ force: true });


    // ---------------- USERS ----------------


    console.log("Creating users...");


    const users = [];


    for (let i = 1; i <= 100; i++) {

      users.push({

        username: `gamer${i}`,

        email: `gamer${i}@example.com`,

        password: "password123"

      });

    }


    const createdUsers = await User.bulkCreate(users);


    console.log(`${createdUsers.length} users created`);




    // ---------------- REVIEWS ----------------


    console.log("Creating reviews...");


    const reviews = [];

    const shuffledGames = [...games].sort(
      () => Math.random() - 0.5
    );


    for (let i = 0; i < 500; i++) {


      // Mix games instead of having the same one repeated many times

      const game =
        shuffledGames[i % shuffledGames.length];


      const user =
        createdUsers[
          Math.floor(Math.random() * createdUsers.length)
        ];


      const rating =
        Math.floor(Math.random() * 5) + 1;



      reviews.push({

        title: game.title,

        genre: game.genre,

        description: createReview(game, rating),

        duration:
          Math.floor(Math.random() * 90) + 5,

        rating,

        userId: user.id

      });

    }


    const createdReviews =
      await GameReview.bulkCreate(reviews);


    console.log(`${createdReviews.length} reviews created`);






// ---------------- LIKES ----------------

console.log("Creating likes...");

const likes = [];
const usedLikes = new Set();

for (const review of createdReviews) {

  const usersForReview = [...createdUsers]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 31) + 20);
    // 20-50 random users

  usersForReview.forEach(user => {

    const key = `${user.id}-${review.id}`;

    usedLikes.add(key);

    likes.push({
      userId: user.id,
      gameReviewId: review.id
    });

  });

}

await Likes.bulkCreate(likes);

console.log(`${likes.length} likes created`);



// ---------------- DISLIKES ----------------

console.log("Creating dislikes...");

const dislikes = [];
const usedDislikes = new Set();

for (const review of createdReviews) {

  const alreadyReacted = new Set(
    likes
      .filter(like => like.gameReviewId === review.id)
      .map(like => like.userId)
  );


  const availableUsers = createdUsers
    .filter(user => !alreadyReacted.has(user.id))
    .sort(() => Math.random() - 0.5);


  const amount = Math.floor(Math.random() * 6) + 5;
  // 5-10 dislikes


  availableUsers
    .slice(0, amount)
    .forEach(user => {

      const key = `${user.id}-${review.id}`;

      if (!usedDislikes.has(key)) {

        usedDislikes.add(key);

        dislikes.push({
          userId: user.id,
          gameReviewId: review.id
        });

      }

    });

}


await Dislikes.bulkCreate(dislikes);

console.log(`${dislikes.length} dislikes created`);

    console.log("✅ Database seeded successfully!");


    process.exit();


  } catch(error) {


    console.error("❌ Seed failed:", error);


    process.exit(1);

  }

}



seed();