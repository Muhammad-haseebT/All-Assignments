import Dexie from "dexie";

// Create database
export const db = new Dexie("IndexeDB");

// Define tables
db.version(2).stores({
  // products: "++id, name, categoryId, price, quantity, description",
  // categories: "++id, name" ,
  // students: "++id,name,section,cgpa",
  students: "++id,name,age,cgpa,class,section",
  sections: "++id,className,sectionName",
  users: "++id,fullName,email,password,type,contact,address,isAgree",
  asignSection: "++id,teacherName,sectionId",
  // BookCategory: "++CategoryID, CategoryName",
  // Books: "++BookID, BookName, Price, CategoryID"
});
// db.version(2).stores({
//   // products: "++id, name, categoryId, price, quantity, description",
//   // categories: "++id, name" ,
//   // students: "++id,name,section,cgpa",
//   // students: "++id,name,age,cgpa,class,section",
//   // sections: "++id,className,sectionName",
//   // users: "++id,fullName,email,password,type,contact,address,isAgree",
//   BookCategory: "++CategoryID, CategoryName",
//   Books: "++BookID, BookName, Price, CategoryID"
// });

export const initDB = async () => {
  const count = await db.BookCategory.count();
  if (count === 0) {
    await db.BookCategory.bulkAdd([
      { CategoryName: "Fiction" },
      { CategoryName: "Science" },
      { CategoryName: "History" },
    ]);
  }
};

// Seed categories if not exist
// async function seedCategories() {
//   const count = await db.categories.count();
//   if (count === 0) {
//     await db.categories.bulkAdd([
//       { name: "Electronics" },
//       { name: "Groceries" },
//       { name: "Clothing" },
//       { name: "Stationery" },
//       { name: "Beverages" }
//     ]);
//     console.log("Categories seeded successfully!");
//   }
// }

// seedCategories();
