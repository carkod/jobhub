import shortid from 'shortid'
import moment from 'moment';

export const columns = ['Company', 'Status', 'Role', 'Contact', 'Current Stage', 'Application', 'Location', 'Description', ''];
export const stages = [
	// (1) Use default stages and (2) allow for adding additional stages
	{ order: 0, complete: false, name: 'First contact', dept: 'HR', startDate: moment().format('DD MMMM YYYY'), endDate: '' },
	{ order: 1, complete: false, name: 'Telephone', dept: 'HR', startDate: '', endDate: '' },
	{ order: 2, complete: false, name: 'Videocall', dept: 'Senior Developer', startDate: '', endDate: '' },
	{ order: 3, complete: false, name: 'Face2Face', dept: 'Developer', startDate: '', endDate: '' },
	{ order: 3, complete: false, name: 'Test', dept: 'Technical', startDate: '', endDate: '' },
];
export const roles = [
	'Front-end developer', 'JavaScript developer', 'Business analyst', 'Project manager', 'Full stack Javascript Developer'];
export const status = [
	{ key: 0, value: 0, text: "Applied" },
	{ key: 1, value: 1, text: "In progress" },
	{ key: 2, value: 2, text: "Rejected" },
	{ key: 3, value: 3, text: "Success" },
]
// export const roleSeniority = ['Junior', 'Mid-level', 'Senior'];
export const appliedCompanies = [
	{
		company: "Capgemini",
		status: { value: 0, name: "Not started" },
		role: "Front-end developer",
		contact: {
			name: "Maria Zambrano",
			email: "maria@recruitment.com",

		},
		stage: { order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
		applicationUrl: "https://www.linkedin.com/jobs/view/1331562981/",
		location: "Madrid",
		description: "Angular 6, Spanish. Needed knowledge in JIRA and agile methodologies",
		files: null
	},
	{
		company: "Indra",
		status: { value: 0, name: "Not started" },
		role: "Front-end developer",
		contact: {
			name: "Maria Zambrano",
			email: "maria@recruitment.com",

		},
		stage: { order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
		applicationUrl: "https://www.linkedin.com/jobs/view/1331562981/",
		location: "Madrid",
		description: "Angular 6, Spanish. Needed knowledge in JIRA and agile methodologies",
		files: null
	}
]
export const actions = [
	{ key: 0, icon: 'eye', text: 'View more', value: 'view' },
	{ key: 1, icon: 'play', text: 'Next stage', value: 'next' },
	{ key: 2, icon: 'edit', text: 'Edit', value: 'edit' },
	{ key: 3, icon: 'delete', text: 'Remove', value: 'delete' },
	{ key: 4, icon: 'hide', text: 'Close status', value: 'close' },
]

export const formFields = [
	{
		id: shortid.generate(), key: 0, name: 'Company name', value: 'companyName', placeholder: 'Enter company name', fieldType: 'text'
	},
	{
		id: shortid.generate(), key: 1, name: 'Status', value: 'status', placeholder: 'Select status', fieldType: 'select', items: status
	},
	{
		id: shortid.generate(), key: 2, name: 'Role', value: 'role', placeholder: 'Select role', fieldType: 'select', items: roles
	},
	{
		id: shortid.generate(), key: 3, name: 'Contact', value: 'contact', placeholder: 'Select stage', fieldType: 'select', items: stages
	},
	{
		id: shortid.generate(), key: 2, name: 'Role', value: 'role', placeholder: 'Select role', fieldType: 'select', items: roles
	},
	{
		id: shortid.generate(), key: 0, name: 'Application url', value: 'application', placeholder: 'Enter application url', fieldType: 'text'
	},
	
]