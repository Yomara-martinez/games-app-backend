require("dotenv").config();

const { dbConnection, User, GameReview, WishList } = require("./modules");


const reviewTemplates = [
  {
    title: "Elden Ring",
    description: `
I went into Elden Ring expecting a frustrating game that would punish every mistake, 
but I was surprised by how rewarding exploration felt. The game trusts the player 
to discover things naturally, and every hidden area feels like a real discovery.

The combat is challenging but fair. Some bosses took many attempts, but finally 
defeating them felt incredibly satisfying. The world design is easily the strongest 
part because every location feels carefully created.

My biggest complaint is that the story can be confusing if you do not spend time 
learning about the characters and the world.

Overall, this is the type of game that makes you want to keep exploring. I would 
recommend it to anyone who enjoys adventure, discovery, and challenging gameplay.
`,
    genre: "Role-Playing",
    duration: 80,
    rating: 5
  },


  {
    title: "Cyberpunk 2077",
    description: `
Cyberpunk 2077 took me some time to appreciate. The beginning can feel overwhelming, 
but once the story starts developing, the characters become the main reason to keep 
playing.

The best part of the game is Night City. Walking through the different areas creates 
an atmosphere that feels unique, especially at night when the city feels alive.

The side missions are some of the strongest parts of the game because they introduce 
interesting characters and stories.

Some gameplay systems could have been deeper, but the overall experience is memorable 
and worth playing for anyone who enjoys story-focused games.
`,
    genre: "Action-Adventure",
    duration: 60,
    rating: 4
  },


  {
    title: "Hades",
    description: `
I usually do not enjoy games where you repeat the same areas, but Hades completely 
changed my opinion about the genre.

Every attempt feels meaningful because even when you fail, you unlock new abilities, 
learn enemy patterns, and discover more about the characters.

The combat feels fast and satisfying, and experimenting with different weapons keeps 
the experience fresh.

After many hours it can become repetitive, but the writing, characters, and gameplay 
make it easy to keep coming back.
`,
    genre: "Action",
    duration: 25,
    rating: 5
  },


  {
    title: "Resident Evil 4 Remake",
    description: `
Resident Evil 4 Remake does an excellent job mixing action and horror. The game keeps 
you tense without making the experience frustrating.

The updated combat feels smooth, and every location has a great atmosphere. The pacing 
is one of the strongest parts because the game constantly introduces something new.

Some sections could have been longer, but the overall experience is one of the best 
single-player horror adventures available.

I would recommend this to anyone who enjoys exciting combat mixed with a strong story.
`,
    genre: "Horror",
    duration: 20,
    rating: 4
  },


  {
    title: "The Legend of Zelda: Breath of the Wild",
    description: `
Breath of the Wild is one of those games where exploration feels completely natural. 
Instead of following a strict path, the game encourages creativity and experimentation.

Some of my favorite moments came from random discoveries rather than completing 
objectives. The freedom the game provides makes every player's experience different.

The weapon durability system can be frustrating, but the world design makes up for it.

This is a game I would recommend to anyone who enjoys adventure and exploration.
`,
    genre: "Adventure",
    duration: 100,
    rating: 5
  }
];



async function seed() {

  try {

    console.log("Starting seed...");


    await dbConnection.sync({ force: true });



    // ---------------- USERS ----------------

    console.log("Creating users...");


    const users = [];


    for (let i = 1; i <= 1000; i++) {

      users.push({

        username: `gamer${i}`,

        email: `gamer${i}@example.com`,

        password: "password123"

      });

    }



    const createdUsers =
      await User.bulkCreate(users);



    console.log(`${createdUsers.length} users created`);




    // ---------------- GAME REVIEWS ----------------


    console.log("Creating reviews...");


    const reviews = [];


    for (let i = 1; i <= 5000; i++) {


      const randomUser =
        createdUsers[
          Math.floor(Math.random() * createdUsers.length)
        ];


      const randomReview =
        reviewTemplates[
          Math.floor(Math.random() * reviewTemplates.length)
        ];



      reviews.push({

        title: randomReview.title,

        description: randomReview.description,

        genre: randomReview.genre,

        duration: randomReview.duration,

        rating: randomReview.rating,

        userId: randomUser.id

      });

    }



    const createdReviews =
      await GameReview.bulkCreate(reviews);



    console.log(`${createdReviews.length} reviews created`);





    // ---------------- WISHLIST ----------------


    console.log("Creating wishlists...");


    const wishlist = [];


    for (let i = 0; i < 10000; i++) {


      const randomUser =
        createdUsers[
          Math.floor(Math.random() * createdUsers.length)
        ];


      const randomReview =
        createdReviews[
          Math.floor(Math.random() * createdReviews.length)
        ];



      wishlist.push({

        userId: randomUser.id,

        gameReviewId: randomReview.id

      });

    }



    await WishList.bulkCreate(wishlist);



    console.log(`${wishlist.length} wishlist items created`);



    console.log("🌱 Database seeded successfully!");

    process.exit();



  } catch(error) {

    console.error("Seed failed:", error);

    process.exit(1);

  }

}



seed();