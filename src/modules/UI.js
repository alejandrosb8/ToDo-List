import { getProjects, pushProject, removeProject, editProject, checkCopy } from './projectsManager';

let projects = getProjects();
let lastSelectedButtonId = 'homeBtn';

function menuEventsLoader() {
	const menuBtn = document.getElementById('menuButton');
	const blaked = document.getElementsByClassName('blacked')[0];
	const sidebuttons = Array.from(document.getElementsByClassName('sidebutton'));

	resetProjectButton();

	sidebuttons.forEach((button) => {
		button.addEventListener('click', (e) => switchActiveBtn(e.target));
	});

	menuBtn.addEventListener('click', () => {
		openMenu();
	});
	blaked.addEventListener('click', () => {
		closeMenu();
	});
}

function sidebarButtonsEvents() {
	const deleteButtons = document.getElementsByClassName('removeProjectButton');
	const editButtons = document.getElementsByClassName('editProjectButton');

	Array.from(deleteButtons).forEach((button) => {
		button.addEventListener('click', (e) => {
			if (e.target.parentNode.classList.contains('btnActive') == true) {
				switchActiveBtn(document.getElementById('homeBtn'));
			}

			removeProject(e.target.dataset.owner);
			projects = getProjects();
			resetProjectButton();
			openMenu();
		});
	});

	Array.from(editButtons).forEach((button) => {
		button.addEventListener('click', (e) => {
			editProjectPanel(e.target.parentNode.innerText);
		});
	});
}

function UIinfoLoader() {
	for (let i = 0; i < projects.length; i++) {
		createProjectButton(projects[i]);
	}
}

function isBlackedActive(isActive) {
	const blaked = document.getElementsByClassName('blacked')[0];

	if (isActive) {
		blaked.style.display = 'block';
	} else {
		blaked.style.display = 'none';
	}
}

function openMenu() {
	const menuBtn = document.getElementsByClassName('sidebar')[0];
	const blaked = document.getElementsByClassName('blacked')[0];

	if (menuBtn.classList.contains('navActive') == false) {
		menuBtn.classList.add('navActive');
		blaked.style.display = 'block';
	}
}

function closeMenu() {
	const menuBtn = document.getElementsByClassName('sidebar')[0];
	const blaked = document.getElementsByClassName('blacked')[0];
	const addProjectPanel = document.getElementsByClassName('addProjectPanel')[0];

	if (menuBtn.classList.contains('navActive')) {
		menuBtn.classList.remove('navActive');
		blaked.style.display = 'none';
	}

	if (addProjectPanel != null) {
		blaked.style.display = 'none';
		addProjectPanel.remove();
	}
}

function switchActiveBtn(e) {
	const activeBtn = document.getElementById(lastSelectedButtonId);

	activeBtn != null && activeBtn.classList.remove('btnActive');
	e.classList.add('btnActive');
	closeMenu();

	lastSelectedButtonId = e.id;
}

function createProjectButton(name) {
	const button = document.createElement('li');
	const list = document.getElementById('projectList');
	const text = document.createElement('p');

	text.innerText = name;
	button.classList.add('sidebutton', 'projectbtn');

	const editButton = document.createElement('button');
	const removeButton = document.createElement('button');

	editButton.classList.add('editProjectButton', 'icon');
	removeButton.classList.add('removeProjectButton', 'icon');

	removeButton.setAttribute('data-owner', name);

	button.append(text, editButton, removeButton);

	button.setAttribute('id', name);

	list.appendChild(button);

	text.addEventListener('click', () => {
		switchActiveBtn(button);
	});
}

function addProjectButton() {
	const button = document.createElement('li');
	const list = document.getElementById('projectList');

	button.innerText = '+ Add Project';
	button.classList.add('addProjectButton');

	list.appendChild(button);
}

function resetProjectButton() {
	let sidebuttons = Array.from(document.getElementsByClassName('projectbtn'));
	let button = document.getElementsByClassName('addProjectButton')[0];
	if (button != null) {
		button.remove();
	}
	sidebuttons.forEach((btn) => {
		btn.remove();
	});
	UIinfoLoader();
	addProjectButton();
	button = document.getElementsByClassName('addProjectButton')[0];
	button.addEventListener('click', () => {
		closeMenu();
		addProjectPanel();
	});
	sidebarButtonsEvents();

	switchActiveBtn(document.getElementById(lastSelectedButtonId));
}

function addProjectPanel() {
	const div = document.createElement('div');
	const textBox = document.createElement('input');
	const exit = document.createElement('button');
	const accept = document.createElement('button');
	const text = document.createElement('p');

	div.classList.add('addProjectPanel');
	exit.classList.add('exitButton');
	accept.classList.add('acceptButton');

	accept.innerText = 'Accept';
	text.innerText = "Project's name";

	textBox.setAttribute('type', 'text');
	exit.setAttribute('id', 'exitPanelProjectButton');

	div.append(exit, text, textBox, accept);

	const parent = document.getElementById('main');

	parent.appendChild(div);

	isBlackedActive(true);

	exit.addEventListener('click', () => {
		closeMenu();
	});
	accept.addEventListener('click', () => {
		if (textBox.value != '') {
			pushProject(textBox.value);
			projects = getProjects();
			createProjectButton(textBox.value);
			resetProjectButton();
			switchActiveBtn(document.getElementById(textBox.value));
		}
		closeMenu();
		openMenu();
	});
}

function editProjectPanel(projectName) {
	const div = document.createElement('div');
	const textBox = document.createElement('input');
	const exit = document.createElement('button');
	const accept = document.createElement('button');
	const text = document.createElement('p');

	div.classList.add('addProjectPanel');
	exit.classList.add('exitButton');
	accept.classList.add('acceptButton');

	accept.innerText = 'Accept';
	text.innerText = "Project's name";

	textBox.setAttribute('type', 'text');
	exit.setAttribute('id', 'exitPanelProjectButton');

	textBox.value = projectName;

	div.append(exit, text, textBox, accept);

	const parent = document.getElementById('main');

	parent.appendChild(div);

	isBlackedActive(true);

	exit.addEventListener('click', () => {
		closeMenu();
	});
	accept.addEventListener('click', () => {
		if (textBox.value != '' && checkCopy(textBox.value)) {
			editProject(projectName, textBox.value);
			let temp = projects.map((x) => {
				return x == projectName ? textBox.value : x;
			});
			projects = temp;
			resetProjectButton();
		}
		closeMenu();
		openMenu();
	});
}

export { menuEventsLoader };
