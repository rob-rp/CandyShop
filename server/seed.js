require('dotenv').config();
const { Pool } = require('pg');
const { red, green } = require('chalk');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const candies = [
  {
    name: 'Skittles',
    description: 'Taste the rainbow',
    quantity: 2,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3d2a8073-36e6-4cec-8c8c-872639105820?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: 'KitKat',
    description: 'Make the most of your break',
    quantity: 5,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_9766bfa7-3fcb-4f4c-9576-15e17ccc1044?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: 'M&M',
    description: 'Melts in your mouth, not in your hand',
    quantity: 4,
    imageUrl: 'https://images.heb.com/is/image/HEBGrocery/000121396'
  },
  {
    name: 'Hersheys Cookies N Cream',
    description: 'Cookies in every bite!',
    quantity: 3,
    imageUrl: 'https://s7d2.scene7.com/is/image/hersheysassets/0_34000_00239_9_701_23900_043_Item_Front?fmt=png-alpha&hei=2253'
  },
  {
    name: 'Sour Patch Kids',
    description: 'Sour then sweet!',
    quantity: 3,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_4133e923-63d4-46b6-a34c-78559176ca69?wid=1200&hei=1200&qlt=80&fmt=webp'
  },
  {
    name: "Reese's Miniature Cups",
    description: 'Milk Chocolate & Peanut Butter',
    quantity: 2,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_96049f8f-03bd-4fc9-9e03-c1a3522c110b?wid=1200&hei=1200&qlt=80&fmt=webp'
  },
  {
    name: 'Sour Gummi Worms',
    description: 'Shareable OR Not',
    quantity: 1,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_0daf5c03-4515-4403-85aa-b677226631e7?wid=1200&hei=1200&qlt=80&fmt=webp'
  },
  {
    name: 'Peach Rings',
    description: 'Midday Pick Me Up',
    quantity: 4,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_e802799d-791f-4aac-b604-8e3fa89319c1?wid=1200&hei=1200&qlt=80&fmt=webp'
  }
];

const seed = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS candies');
    await pool.query(`
      CREATE TABLE candies (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        quantity INTEGER,
        imageurl TEXT 
      );
    `);

    // Inserting all the candies here
    for (const candy of candies) {
      await pool.query(
        'INSERT INTO candies (name, description, quantity, imageurl) VALUES ($1, $2, $3, $4)',
        [candy.name, candy.description, candy.quantity, candy.imageUrl]
      );
    }

    console.log(green('Seeding successful!'));
    await pool.end();
  } catch (err) {
    console.error(red('Seeding failed!'), err);
    await pool.end();
  }
};

seed();