import { handleResponse, buildBackUrl } from "./actions.config";

export const SET_PROJECTS = "SET_PROJECTS";

export function setProjects(project) {
  return {
    type: SET_PROJECTS,
    project: project.data,
  };
}

export function fetchProjects() {
  return fetch(`${buildBackUrl().apiUrl}/portfolio`)
    .then(handleResponse)
    .then((res) => res)
    
}

export function fetchProjectApi(id) {
  return fetch(`${buildBackUrl().apiUrl}/project/${id}`)
    .then(handleResponse)
    .then((res) => res)
}