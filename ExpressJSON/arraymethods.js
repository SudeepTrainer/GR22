const numbers = [1, 3, 5, 11, 2, 34];
// map method
// const doubledArray = numbers.map((number) => {
//   return number * 2;
// });

const doubledArray = numbers.map((number) => number * 2);
console.log(doubledArray);

const names = [
  { name: "Mark" },
  { name: "Jeff" },
  { name: "Elon" },
  { name: "Bill" },
];
const mappedNames = names.map((obj) => {
  return `<h3>${obj.name}</h3>`;
});
console.log(mappedNames);
const studentData = [
  { id: 1, name: "Mark", grade: 86 },
  { id: 2, name: "Bill", grade: 96 },
  { id: 3, name: "Jeff", grade: 79 },
  { id: 4, name: "Elon", grade: 98 },
];
const sortedStudents = studentData.map((student) => {
  return `${student.name} scored ${student.grade}`;
});
console.log(sortedStudents);

// find method
const numberFound = numbers.find((number) => {
  return number > 20;
});
console.log(numberFound);

const studentFound = studentData.find((student) => {
  return student.name === "Mark";
});
console.log(studentFound);

// filter method
const moreThanTen = numbers.filter((number) => {
  return number > 10;
});
console.log(moreThanTen);

const highGradeStudents = studentData.filter((student) => {
  return student.grade > 90;
});
console.log(highGradeStudents);

// find student whose name starts with 'B' and grade >90
studentData
  .filter((student) => student.grade > 90)
  .find((student) => student.name.startsWith("B"));
