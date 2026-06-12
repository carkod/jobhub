import { handleResponse, headers, formdataHeaders, buildBackUrl } from './actions.config';

export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const SAVED_PROJECT = 'SAVED_PROJECT';
export const PROJECT_FETCHED = 'PROJECT_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const PROJECT_DELETED = 'PROJECT_DELETED';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const FILE_REMOVED = 'FILE_REMOVED';
export const SET_CATS = 'SET_CATS';

export function setCats(cats) { return { type: SET_CATS, cats }; }
export function setProjects(projects) { return { type: SET_PROJECTS, projects }; }
export function projectDeleted(project) { return { type: PROJECT_DELETED, project }; }
export function projectFetched(project) { return { type: PROJECT_FETCHED, project }; }
export function addProject(data) { return { type: ADD_PROJECT, data }; }
export function savedProject(data) { return { type: SAVED_PROJECT, data }; }
export function deletedProject(id) { return { type: PROJECT_DELETED, id }; }
export function pastedProject(id) { return { type: PROJECT_DELETED, id }; }
export function uploadFail(file) { return { type: UPLOAD_FAIL, file }; }
export function uploadSuccess(file) { return { type: UPLOAD_SUCCESS, file }; }
export function fileRemoved(file) { return { type: FILE_REMOVED, file }; }
