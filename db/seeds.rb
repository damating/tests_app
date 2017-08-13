# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

groups = Group.create([
  { name: 'Group 1', description: 'Description 1' },
  { name: 'Group 2', description: 'Description 2' },
  { name: 'Group 3', description: 'Description 3' },
  { name: 'Group 4', description: 'Description 4' },
])

User.create(name: 'User1', surname: 'Surname1', email: 'user1@gmail.com', groups: [groups[0], groups[1]])
User.create(name: 'User2', surname: 'Surname2', email: 'user2@gmail.com', groups: [groups[2]])

Test.create(name: 'Test1', description: 'Description 1', duration_in_secs: 540,  start_date: Date.today, end_date: Date.today + 4.months, group: groups[0])
Test.create(name: 'Test2', description: 'Description 2', duration_in_secs: 660,  start_date: Date.today, end_date: Date.today + 3.months, group: groups[0])
