//Problem : user interaction doesn'T provide desired results
//solution : add interactivity so the user can manage daily tasks


var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

var createNewTaskElement = function(taskString){
	'use strict';
	//Create list item
	var listItem = document.createElement('li');
	//input (checkbox)
	var checkBox = document.createElement('input');
	//label
	var label = document.createElement('label');
	//input (text)
	var editInput = document.createElement('input');
	//button.edit
	var editButton = document.createElement('button');
	//button.delete
	var deleteButton = document.createElement('button');
	//Each elements, needs modifying
	checkBox.type = 'checkBox';
	editInput.type = 'text';

	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete';

	label.innerText = taskString;

	//Each elements, needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};

//Add a new tasks
var addTask = function(){
	'use strict';
	console.log('Add task...');
	
	//Create a new list item with text from #new-task
	var listItem = createNewTaskElement(taskInput.value);
	//Append listItem to incompleteTaskHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value='';
};

//Edit a new task
var editTask = function(){
	'use strict';
	console.log('Edit task...');

	var listItem = this.parentNode;
	var editInput = listItem.querySelector('input[type=text]');
	var label = listItem.querySelector('label');
	var containsClass = listItem.classList.contains('editMode');
	//if the class of the parent is .editMode
	if (containsClass){
		//Switch from .editMore
		//label text becomethe input's value
		label.innerText = editInput.value;
	}
	else{
	//else
		//Switch to .editMode 
		//input value becomes label's text
		editInput.value = label.innerText;
	}
	//Toggle .editMode on the list item
	listItem.classList.toggle('editMode');

};

//Delete an existing task
var deleteTask = function(){
	'use strict';
	console.log('Delete task...');
	//Remove parent list item from ul
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = function(){
	'use strict';
	console.log('Task complete...');
	//Append task list item to the completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as imcomplte
var taskIncomplete = function(){
	'use strict';
	console.log('Task incomplete...');
	//Append task list to the incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents= function(taskListItem, checkBoxEventHandler){
	'use strict';
	console.log('Bind list item events');
	//select taskListItem's children
	var checkbox = taskListItem.querySelector('input[type=checkbox]');
	var editButton = taskListItem.querySelector('button.edit');
	var deleteButton = taskListItem.querySelector('button.delete');
		//bind editTask to edit button
		editButton.onclick = editTask; 
		//bind deleteTask to delete button
		deleteButton.onclick = deleteTask;
		//bind checkBoxEventHandler to the checkbox
		checkbox.onchange = checkBoxEventHandler;
};

var ajaxRequest = function(){
	'use strict';
	console.log('AJAX request');
};

//Set the click handler to the addTask function

addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);
//Cycle over incompleteTaskHolder ul list items
	for (var i = 0; i < incompleteTasksHolder.children.length; i++){
		//bind events to list item's children (taskCompleted)
		bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
	}

//Cycle over completeTaskHolder ul list items
	for (var i = 0; i < completedTasksHolder.children.length; i++){
		//bind events to list item's children (taskIncomplete)
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
	}
