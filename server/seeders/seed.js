const db = require('../config/connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Statues' },
    { name: 'Silver Ornament' },
    { name: 'Ritual Items' },
    { name: 'Thangka' },
    { name: 'Ghau and Pendant' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Shakyamuni Buddha Statue',
      description:
        'Shakyamuni is the Buddha of our time. He is  the glorious root teacher of all the diverse lineages that make up Buddhism as we know it. Born Siddhartha Gautama more than 2500 years ago, he was the crown prince of the Shakya kingdom located in the Himalayan foothills of what is now southern Nepal. He left luxurious palace life behind him, however, in pursuit of the truth of   the origin of suffering and the cessation of fear. His astounding courage, determination, wisdom and compassion led to his perfect enlightenment despite seemingly insurmountable obstacles. His teachings have transformed individuals   and nations throughout the world and still speak to us today.',
      image: 'buddha.jpg',
      category: categories[0]._id,
      price: 999.99,
      quantity: 5
    },
    {
      name: 'Guru Padmasambhava Statue',
      description:
        'This statue is a beautiful representation of the beloved Guru Rinpoche. Expertly sculpted from copper alloy and fully gilded with 24 karat gold, the statue has been finely carved with detail images of dragon and other images and has hand face painted. This sculpture was individually handcrafted in Patan, Nepal by master artisans of the Shakya clan who are considered among the best in the world. These craftsmen are the modern heirs to a centuries-old tradition of creating sacred art for use in temples and monasteries. The fine metalworking techniques have been passed down from generation to generation since ancient times.',
      image: 'guru.jpg',
      category: categories[0]._id,
      price: 799.99,
      quantity: 5
    },
    {
      name: 'Turquoise, Coral, Lapis Om Pendant',
      category: categories[1]._id,
      description:
        'This listing is for a hand crafted crushed lapis and turquoise pendant with an OM symbol and beautiful scrolling detail. This pendant measures approximately 1 inch and was handmade in Kathmandu Nepal. In Tibetan Buddhism, "OM" is the supreme and most sacred syllable, consisting in Sanskrit of three sounds (A, U, M) representing body, speech, mind and other various fundamental triads. OM is believed to be the spoken essence of the universe; it is often understood as symbolizing the true "empty" character of reality, as that truth has been communicated by various historical Buddhas. Due to the handmade nature of this item, each pendant may differ slightly. Please contact me with any further questions.',
      image: 'om-pendant.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Silver Ring',
      category: categories[1]._id,
      description:
        "This listing is for a handmade Tibetan healing ring with carved Om mani pad hum mantra.  There are four options to choose from.  Two hand crafted Buddha of compasion three metal rings, one silver plated Buddha of compassion mantra ring and one with yak bone dzi bead.  This ring is adjustable and handmade in Kathmandu Nepal. <br /> <br /> The script is the mantra of Avalokteshwara the Buddha of compasstion and it means 'hail to the jewel in the lotus'. Mani means jewel and pema means lotus. OM includes three letters which are AH, O and MA and it is also Om Ah and the last letter HUM together makes the word OM AH HUM. This word is a blessing word, because whenever we bless something whether we are blessing the earth or food or whatever Tibetan people say OM AH HUM. After that you visualize that it is purified. So this mantra is very powerful mantra. There is no Tibetan people who don't know OM MANI PADME HUM mantra. We say this mantra every time when you see a dead being, sick person or animal. We visualize that this mantra will help the being. That is why Tibetan people wear wrist malas with these designs. ",
      image: 'silver-ring.jpg',
      price: 9.99,
      quantity: 50
    },
    {
      name: 'Bhumpa',
      category: categories[2]._id,
      description:
        'These two matching Tibetan Ritual Bhumpa Set is made of copper alloy with Fine Hand Carvings and Decorated with Coral and Turquoise Semiprecious Stones. The carving details are done very finely throughout. The vases are identical except for the sacred syllables and other symbols inscribed around their rims. These finely carved Bhumpas are hand crafted by the  master artisans of Patan, Nepal.',
      image: 'bhumpa.jpg',
      price: 149.99,
      quantity: 25
    },
    {
      name: 'Bajra & Bell Set',
      category: categories[2]._id,
      description:
        'This beautiful quality Bajra & Bell set is made of bronze alloy with gold plated and with beautifully carved images. The carving details are done very finely. This finely carved rare Vajra & Bell set is crafted by the master artisans of Bouddha, Nepal.',
      image: 'bajra-bell.jpg',
      price: 99.99,
      quantity: 30
    },
    {
      name: 'Chenrezig Thangka',
      category: categories[3]._id,
      description:
        'On Chenrezig’s left side, at the level of his heart, is the gentle face of a wild deer; the deer’s skin is draped over his shoulder. The deerskin is an ancient symbol of renunciation, as wandering mendicants often took the skin of a deer as a meditation seat, and sometimes as a garment and blanket. This symbolic meaning applies, as Chenrezig, a Bodhisattva, has renounced the snares of worldly existence, but here it further symbolizes his boundless compassion for sentient beings.  According to legend, Chenrezig once took rebirth as a wild deer, but he had such heartfelt compassion for the hunter who chased him that he willingly laid down his life.',
      image: 'chengrisi.jpg',
      price: 399.99,
      quantity: 5
    },
    {
      name: 'Kalachakra Mandala Thanka',
      category: categories[3]._id,
      description:
        'Kalachakra is a Sanskrit word meaning Wheel of Time or Cycle of Time. It is a complete and elaborately detailed cosmology that explains the creation and structure of all. In this sacred explanation, the microcosm that is man is not different from the macrocosm that is the Universe. The two very complex “maps” provided by the Kalachakra – one outside us, the other inside us – include methods for applying the knowledge that leads to true freedom and lasting happiness.<br /><br />The Kalachakra tradition of Tantric Buddhism focuses on the concepts of time and the ever-present cycles that pervade all life, from the movements of the planets to the intake and outflow of the breath. These teachings provide powerful techniques for harnessing and developing the subtle energies within the body, ultimately enabling practitioners to emerge victorious from the battle with the delusions that are the source of all suffering.<br /><br />The mandala itself depicts a sacred residence that is the abode of hundreds of meditational deities. This residence is an intricately-detailed three-dimensional five-storied palace where every detail has multiple layers of symbolic meaning. Each element of the mandala, from each individual deity to every single adornment of the palace, refers simultaneously to an aspect of the universe (outer Kalachakra), an aspect of the body/mind (inner Kalachakra), and an aspect of the Kalachakra Tantric practice.<br /><br />The practitioner strives to visualize every detail of the palace and the deities within it to a level of perfect life-like realism and imagines walking through the building and encountering all who dwell within it. Through developing the power of meditative concentration to such a degree, the practitioner skillfully trains the mind and approaches the state of enlightenment.',
      image: 'mandala-thanka.jpg',
      price: 599.99,
      quantity: 3
    },
    {
      name: 'Aparmita Silver Ghau',
      category: categories[4]._id,
      description: 'Ghau is a small prayer box worn as pendant by Buddhists as portable shrines where prayers and sacred relics are kept and used during their travel to hold their sacred deity inside. Now, Ghau or Prayer Box pendants are often used as jewelry or personal adornment. They are used to carry prayers or prayer concerns or photos, poems, small items, or memories. Ghau pendants can carry your prayers near to your heart throughout the day. They are jewelry that has a history. The Ghau opens to a concealed inner space, and is traditionally used by Tibetan Buddhists to hold a picture of their favorite deity or Lama, a folded up scroll of sacred mantras, special herbs or sacred relics. The Ghau is used as an amulet to help the wearer to ward off negative energy and attract blessings. A Ghau are also used as a portable shrine and are worn on a cord around the neck and hung close to the heart.',
      image: 'ghau1.jpg',
      price: 199.99,
      quantity: 40
    },
    {
      name: 'Tibeaten Ghau Box',
      category: categories[4]._id,
      description: 'Ghau is a small prayer box worn as pendant by Buddhists as portable shrines where prayers and sacred relics are kept and used during their travel to hold their sacred deity inside. Now, Ghau or Prayer Box pendants are often used as jewelry or personal adornment. They are used to carry prayers or prayer concerns or photos, poems, small items, or memories. Ghau pendants can carry your prayers near to your heart throughout the day. They are jewelry that has a history. The Ghau opens to a concealed inner space, and is traditionally used by Tibetan Buddhists to hold a picture of their favorite deity or Lama, a folded up scroll of sacred mantras, special herbs or sacred relics. The Ghau is used as an amulet to help the wearer to ward off negative energy and attract blessings. A Ghau are also used as a portable shrine and are worn on a cord around the neck and hung close to the heart.',
      image: 'ghau2.jpg',
      price: 149.99,
      quantity: 1000
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Ersa',
    lastName: 'Shakya Bajracharya',
    email: 'ersa@email.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Elsa',
    lastName: 'Shakya',
    email: 'elsa@email.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Roshan',
    lastName: 'Bajracharya',
    email: 'roshan@email.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
