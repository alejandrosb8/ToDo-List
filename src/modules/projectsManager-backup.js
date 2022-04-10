import { storageAvailable } from './checkLibrary';

function pushProject(name) {
	if (storageAvailable('localStorage')) {
		localStorage.setItem(name, 'project');
	}
}
function getProjects() {
	if (storageAvailable('localStorage')) {
		let archive = {},
			keys = Object.keys(localStorage);
		for (let i = 0; i < localStorage.length; i++) {
			archive[keys[i]] = localStorage.getItem(keys[i]);
		}
		return archive;
	}
}
function removeProject(name) {
	if (storageAvailable('localStorage')) {
		localStorage.removeItem(name);
	}
}

export { pushProject, getProjects, removeProject };
