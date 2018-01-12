TO-DO
======

- create status drowpdown in hub
 + Add it to all cats
 + Database
 + Reducer
 + 
 
- Then MainResources mapStateToProps()
- Print CV wkhtmltopdf


### WEB

- Homogenize language URL structure (smallcase All for URL pathname)
- Navigation control panel

### SERVER

- Download files /uploads with spaces in filename
- Create slug for CVModel
- Live Mongodb configure authorization
- Production Build back

### List.js

- List.js search: use React semantic ui input datalist [https://react.semantic-ui.com/elements/input#input-example-ref-focus]


### Others

- Full testing of CVs and Projects
- Refactor SysMessage component. Use Redux actions {type: actionName, data: ...} to pass notification messages, reducer format (switch and return) - single component for all sysmessages
- message/disable button when no file has been uploaded  (this.filename === undefined)
- Slug > Check DB for duplicates and if matched add number


***
NEXT VERSION:

- Consider uploading files to Google Drive API or Dropbox API to save server storage space.
- Component state actions (e.g. removeWork, pushSkill...) should pass through reducer? Currently mutating component data state (as oppossed to UI state) -> Immutable component data state

### Actions.js

- Change fetch to Axios, fetch API not supported by IE (support available in Edge)

***

LOG
======
- Ranking field for each element in CV (now using status)
- fix select boxes for meta cats
- Add Ctrl + S for CVs and portfolio
- add all fields for personal details
- Add initial focus to AddNew.js 
- API authentication (require credentials for CORS connection)
- Detail.js: refactor WorkExp to make it resusable for Educ - use Skills repeater
- Detail.js: Editable
- Detail.js: dynamic notification after save
- Reengineer Initial state with redux
- Details.js fill input fields with cv content (Edit page)
- List.js fetchCVs by DESC (lastest created) by default