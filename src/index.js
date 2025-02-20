import {toDoItem, createToDoItem, updateToDoItem} from './toDoItem'

const testOne = createToDoItem("test note 2", "this is a test note", "9/7/24","low");

updateToDoItem(testOne, {title: "New", priority: "Hgh"});
console.log("after update:", testOne);