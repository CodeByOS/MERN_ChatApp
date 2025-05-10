require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const connect_DB = require("../config/db");

const users = [
  // Female Users
  {
    email: "lily.evans@example.com",
    fullName: "Lily Evans",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    email: "grace.harris@example.com",
    fullName: "Grace Harris",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    email: "ella.lewis@example.com",
    fullName: "Ella Lewis",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    email: "scarlett.walker@example.com",
    fullName: "Scarlett Walker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    email: "victoria.hall@example.com",
    fullName: "Victoria Hall",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    email: "hannah.allen@example.com",
    fullName: "Hannah Allen",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    email: "zoe.young@example.com",
    fullName: "Zoe Young",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    email: "nora.king@example.com",
    fullName: "Nora King",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/17.jpg",
  },

  // Male Users
  {
    email: "ethan.wright@example.com",
    fullName: "Ethan Wright",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    email: "logan.scott@example.com",
    fullName: "Logan Scott",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "jack.green@example.com",
    fullName: "Jack Green",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    email: "mason.baker@example.com",
    fullName: "Mason Baker",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "sebastian.adams@example.com",
    fullName: "Sebastian Adams",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    email: "leo.nelson@example.com",
    fullName: "Leo Nelson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    email: "dylan.carter@example.com",
    fullName: "Dylan Carter",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
  },
];

const seedUsersToDB = async () => {
  try {
    await connect_DB();

    // Delete old users
    await User.deleteMany();
    console.log("Old users removed.");

    const createdUsers = [];

    // Loop over each user and save (this will trigger pre-save hook)
    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // This triggers pre('save') and hashes password
      createdUsers.push(user);
    }

    console.log("Seeded Users:", createdUsers);
    process.exit();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedUsersToDB();