import userModel from '../api/users/userModel';

const users = [{
    'email': 'user1@qq.com',
    'username':'daniel',
    'password': 'test1',
    'type':'personal'

  },
  {
    'email': 'user2@qq.com',
    'password': 'test2',
    'username':'danny',
    'type':'personal'
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}
