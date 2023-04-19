import { createUserAndStudent } from './createUserAndStudent.js'

export function fillDB (numberOfEntries) {
  for (let i = 11; i <= numberOfEntries; i++) {
    const formData = {
      name: `John ${i}`,
      surname: 'Doe',
      age: 10,
      documentId: 123456,
      grade: Math.floor(Math.random() * 5) + 1,
      email: `john${i}@h.com`,
      password: '123456789',
      telNumber: 1234567890
    }
    createUserAndStudent({ formData })
  }
}
