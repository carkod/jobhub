import { handleResponse } from "./actions.config";

export const SET_PROJECTS = "SET_PROJECTS";

export function setProjects(project) {
  return {
    type: SET_PROJECTS,
    project: project.data,
  };
}

export function fetchProjects() {
  return fetch(`${process.env.REACT_APP_API_URL}/portfolio`)
    .then(handleResponse)
    .then((res) => res)
    
}

export function fetchProjectApi(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/project/${id}`)
    .then(handleResponse)
    .then((res) => res)
}