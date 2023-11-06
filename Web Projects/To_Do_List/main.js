window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	let list_el = document.querySelector("#tasks");
		let tasks = []; //tasks array for localStorage

		// Retrieve tasks from local storage if they exist
		const storedTasks = localStorage.getItem('tasks');
		if (storedTasks) {
		  tasks = JSON.parse(storedTasks);
	  
		  // Populate the tasks list with the stored tasks
		  for (const task of tasks) {
			addTaskToList(task);
		  }
		}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		tasks.push(task); // add task to array tasks

		localStorage.setItem('tasks', JSON.stringify(tasks)); // save the updated tasks array to local storage
		addTaskToList(task);

		input.value = '';
		});

		function addTaskToList(task) {
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);
		

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);


		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}

			//	Update the task in the tasks array
				tasks[list_el.children.length - 1] = task_input_el.value;
      			localStorage.setItem('tasks', JSON.stringify(tasks));
		});
		

		task_delete_el.addEventListener('click', (e) => {
			

			//	Remove the task from the tasks array and update localStorage
				const index = Array.from(list_el.children).indexOf(task_el);
     				if (index !== -1) {
        			tasks.splice(index, 1);
					list_el.removeChild(task_el);
       				localStorage.setItem('tasks', JSON.stringify(tasks));
      		}
		});
	}
});