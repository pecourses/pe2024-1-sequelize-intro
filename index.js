const { Op, where } = require('sequelize');
const {
  sequelize,
  User,
  Group,
  Subject,
  StudentSubjects,
} = require('./models');

// ! DELETE ALL DATA:
// DROP TABLE IF EXISTS "Users" CASCADE - { force: true }

// CREATE TABLE IF NOT EXISTS "Users" ("id"   SERIAL , ...
// sequelize
//   .sync({ force: true })
//   .then(() => console.log('Sync OK'))
//   .catch(err => console.log(err));

// CRUD
// (async function () {
//   try {
//     // C - INSERT - create
//     const user = {
//       firstName: 'Ivoa',
//       lastName: 'Ivovycha',
//       email: 'mail5@mail.com',
//       birthday: '2002-09-21',
//       isMale: false,
//       activitiesCount: 0,
//     };

//     // INSERT INTO "Users" ("id","firstName","lastName","email","birthday","isMale","activitiesCount","createdAt","updatedAt")
//     // VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8)
//     // RETURNING "id","firstName","lastName","email","birthday","isMale","activitiesCount","createdAt","updatedAt"

//     const createdUser = await User.create(user); // model instance
//     console.log(createdUser.get()); // get() -> plain object

//     // R - SELECT - findAll / findOne / findByPk ---------------------------------

//     // SELECT "id", "firstName", "lastName", "email", "birthday", "isMale", "activitiesCount", "createdAt", "updatedAt"
//     // FROM "Users" AS "User"

//     const foundUsers = await User.findAll({ raw: true }); // { raw: true } -> plain object
//     console.log(foundUsers);

//     const foundUser1 = await User.findByPk(2, { raw: true });
//     console.log(foundUser1);

//     // Проєкція - attributes -----
//     // SELECT firstName, email ...

//     const foundUsers = await User.findAll({
//       attributes: ['firstName', 'email'],
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Проєкція "навпаки" - exclude

//     // вивести все окрім 'createdAt', 'updatedAt'
//     const foundUsers = await User.findAll({
//       attributes: { exclude: ['createdAt', 'updatedAt'] },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Пагінація + сортування -----
//     //
//     // сортування - ORDER BY - order
//     // пагінація - LIMIT OFFSET - limit offset

//     // Відобразити 2 сторінку при перегляді по 2 впорядкувати по id
//     // SELECT "id", "firstName", "lastName", "email", "birthday", "isMale", "activitiesCount", "createdAt", "updatedAt"
//     // FROM "Users" AS "User"
//     // ORDER BY "User"."id" DESC
//     // LIMIT 2 OFFSET 2;

//     const foundUsers = await User.findAll({
//       order: [['id', 'DESC']],
//       limit: 2,
//       offset: 2,
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Task: Додати дані в таблицю
//     // і отримати другу сторінку при перегляді по 3 рядки,
//     // впорядкувавши за іменем
//     const foundUsers = await User.findAll({
//       order: ['firstName'],
//       limit: 3,
//       offset: 3,
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Фільтрація -----
//     // WHERE - where

//     // firstName = 'Test' AND email = mail1@mail.com
//     // SELECT "id", "firstName", "lastName", "email", "birthday", "isMale", "activitiesCount", "createdAt", "updatedAt"
//     // FROM "Users" AS "User"
//     // WHERE "User"."firstName" = 'Test';

//     const foundUsers = await User.findAll({
//       where: { firstName: 'Test', email: 'mail1@mail.com' },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // const { Op } = require('sequelize'); - операції <>, <, <=, IN, OR ...

//     // firstName = 'Test' OR email = mail1@mail.com
//     const foundUsers = await User.findAll({
//       where: { [Op.or]: [{ firstName: 'Test' }, { email: 'mail1@mail.com' }] },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Вивести у кого активностей > 0
//     const foundUsers = await User.findAll({
//       where: { activitiesCount: { [Op.gt]: 0 } },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Task: Вивести чоловіків або у кого кількість активностей = 0
//     const foundUsers = await User.findAll({
//       where: {
//         [Op.or]: [{ activitiesCount: { [Op.eq]: 0 } }, { isMale: true }],
//       },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // або

//     const foundUsers = await User.findAll({
//       where: {
//         [Op.or]: [{ activitiesCount: 0 }, { isMale: true }],
//       },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // *Task: Вивести чоловіків або у кого кількість активностей != 0
//     const foundUsers = await User.findAll({
//       where: {
//         [Op.or]: [{ activitiesCount: { [Op.ne]: 0 } }, { isMale: true }],
//       },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Використання функцій -----
//     // sequelize.fn('ФУНКЦІЯ', sequelize.col('СТОВПЧИК'))

//     const foundUsers = await User.findAll({
//       attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'amount']],
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Task: Порахувати сумарну кількість активностей
//     const foundUsers = await User.findAll({
//       attributes: [sequelize.fn('SUM', sequelize.col('activitiesCount'))],
//       raw: true,
//     });

//     console.log(foundUsers);

//     // + Додавання стовпчика - include

//     // Додати стовпчик з віком
//     const foundUsers = await User.findAll({
//       attributes: {
//         include: [[sequelize.fn('AGE', sequelize.col('birthday')), 'age']],
//         exclude: ['updatedAt'], // можна комбінувати
//       },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // Нестандартні для sequelize операції прописуються чистим SQL:
//     // sequelize.literal('SQL-код')

//     // EXTRACT(YEAR FROM age(birthday))
//     const foundUsers = await User.findAll({
//       attributes: {
//         include: [
//           [sequelize.literal('EXTRACT(YEAR FROM age(birthday))'), 'age'],
//         ],
//       },
//       raw: true,
//     });

//     console.log(foundUsers);

//     // *GROUP BY - group -----
//     // Середні активності по гендерах
//     const foundUsers = await User.findAll({
//       attributes: [
//         'isMale',
//         sequelize.fn('AVG', sequelize.col('activitiesCount')),
//       ],
//       group: 'isMale',
//       raw: true,
//     });

//     console.log(foundUsers);

//     // *GROUP BY + HAVING - group + having -----

//     // Відобразити гендери з >=1 кількістю активностей
//     const foundUsers = await User.findAll({
//       attributes: [
//         'isMale',
//         sequelize.fn('AVG', sequelize.col('activitiesCount')),
//       ],
//       group: 'isMale',
//       having: sequelize.literal('avg("activitiesCount") >= 1'),
//       raw: true,
//     });

//     console.log(foundUsers);

//     // U - UPDATE - update (як, опції)
//     // => [ кількість_оновлених ]                без returning: true
//     // => [ кількість_оновлених, масив оновлених ] з returning: true

//     // id = 1
//     const updatedUsers = await User.update(
//       { email: 'newmail@mail.com' },
//       {
//         where: { id: 1 },
//         returning: true,
//         raw: true,
//       }
//     );

//     console.log(updatedUsers[1][0]);

//     // D - DELETE - destroy
//     // => кількість оновлених

//     const deletedUsersCount = await User.destroy({ where: { id: 3 } });

//     console.log(deletedUsersCount);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// Associations
(async function () {
  // const group1 = { title: 'gr1', enteredAt: 2023 };
  // const group2 = { title: 'gr2', enteredAt: 2024 };
  // const createdGroup1 = await Group.create(group1); // model instance
  // const createdGroup2 = await Group.create(group2);
  // const user1 = {
  //   firstName: 'Ivoa',
  //   lastName: 'Ivovycha',
  //   email: 'mail1@mail.com',
  //   birthday: '2002-09-21',
  //   isMale: false,
  //   activitiesCount: 0,
  //   groupId: 1,
  // };
  // const user2 = {
  //   firstName: 'Ivoa',
  //   lastName: 'Ivovycha',
  //   email: 'mail2@mail.com',
  //   birthday: '2002-09-21',
  //   isMale: false,
  //   activitiesCount: 0,
  //   groupId: 1,
  // };
  // const user3 = {
  //   firstName: 'Ivoa',
  //   lastName: 'Ivovycha',
  //   email: 'mail3@mail.com',
  //   birthday: '2002-09-21',
  //   isMale: false,
  //   activitiesCount: 0,
  //   groupId: 2,
  // };
  // const createdUser1 = await User.create(user1); // model instance
  // const createdUser2 = await User.create(user2); // model instance
  // const createdUser3 = await User.create(user3); // model instance
  // Eager Loading - LEFT JOIN
  // const usersWithGroups = await User.findAll({ include: Group, raw: true });
  // console.log(usersWithGroups);
  // групу і дописати студентів, якщо вони є в групі
  // const groupWithUsers = await Group.findAll({
  //   where: { id: 1 },
  //   include: {
  //     model: User,
  //   },
  //   raw: true,
  // });
  // console.log(groupWithUsers);
  // Lazy Loading - hasMany, belongsTo, ,,,
  // Group.hasMany(User) - group1.getUsers(), ...
  // const group1 = await Group.findByPk(1);
  // const usersInGr1 = await group1.getUsers({ raw: true });
  // console.log(usersInGr1);
  // // User.belongsTo(Group) - user1.getGroup(), ...
  // const user1 = await User.findByPk(1);
  // const groupByUser1 = await user1.getGroup({ raw: true });
  // console.log(groupByUser1);
})();

// many-to-many
(async function () {
  // const subject1 = { title: 'Data Bases', hours: 100 };
  // const subject2 = { title: 'Web-programming', hours: 150 };

  // const userSubj1 = { userId: 1, subjectId: 1, mark: 100 };
  // const userSubj2 = { userId: 1, subjectId: 2, mark: 90 };
  // const userSubj3 = { userId: 2, subjectId: 1, mark: 85 };
  // const userSubj4 = { userId: 2, subjectId: 2, mark: 88 };

  // await Subject.create(subject1);
  // await Subject.create(subject2);
  // await StudentSubjects.create(userSubj1);
  // await StudentSubjects.create(userSubj2);
  // await StudentSubjects.create(userSubj3);
  // await StudentSubjects.create(userSubj4);

  // Eager Loading
  // const usersWithSubjects = await User.findAll({
  //   include: Subject,
  //   raw: true,
  // });

  // console.log(usersWithSubjects);

  // const usersWithSubjects = await User.findAll({
  //   include: [
  //     {
  //       model: Subject,
  //       through: { where: { mark: 100 } },
  //     },
  //   ],
  //   raw: true,
  // });

  // console.log(usersWithSubjects);

  // const usersWithSubjects = await User.findAll({
  //   include: [{ model: Subject }, { model: Group }],
  //   raw: true,
  // });

  // console.log(usersWithSubjects);

  // Lazy Loading
  // belongsToMany - student1.getSubjects()

  // const user1 = await User.findByPk(1);
  // const subjOfUser1 = await user1.getSubjects({ raw: true });
  // console.log(subjOfUser1);

  // отримати студентів, які прослухали предмет 1
  // const subject1 = await Subject.findByPk(1);
  // const studentsForSubject = await subject1.getUsers({ raw: true });

  // console.log(studentsForSubject);

  // отримати кількість студентів, які прослухали предмет 1
  const subject1 = await Subject.findByPk(1);
  const studentCount = await subject1.countUsers();
  console.log(`Кількість студентів, які прослухали предмет 1: ${studentCount}`);
})();
