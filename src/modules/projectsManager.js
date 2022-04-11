import { storageAvailable } from './checkLibrary';

let projects = [];
projects = getProjects();

function pushProject(name) {
	if (storageAvailable('localStorage')) {
		if (checkCopy(name)) {
			projects.push(name);
			localStorage.setItem('list', JSON.stringify(projects));
		}
	}
}
function checkCopy(name) {
	let newArray = projects.filter((x) => {
		return x == name;
	});

	return newArray <= 0 ? true : false;
}
function getProjects() {
	if (storageAvailable('localStorage')) {
		return JSON.parse(localStorage.getItem('list') || '[]');
	}
}
function removeProject(name) {
	if (storageAvailable('localStorage')) {
		let temp = projects.filter((x) => {
			return x != name;
		});
		projects = temp;

		localStorage.setItem('list', JSON.stringify(projects));
	}
}

function editProject(oldName, newName) {
	if (storageAvailable('localStorage') && checkCopy(newName)) {
		let temp = projects.map((x) => {
			return x == oldName ? newName : x;
		});
		projects = temp;

		localStorage.setItem('list', JSON.stringify(projects));
	}
}

export { pushProject, getProjects, removeProject, editProject, checkCopy };
