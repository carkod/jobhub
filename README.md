TO-DO
======


- Restrict creat-react-app apps /* URLs


### WEB

- Homogenize language URL structure (smallcase All for URL pathname)

### SERVER

- Live Mongodb configure authorization

### ISSUES

- Resources/Portfolio: Must set one portfolio as public per category
    +  If no projects set status = public -> error
    +  If one project has set status = public, but doesn't match sidebar category -> error
    +  If category has no items -> error
    +  

### Others

- Refactor SysMessage component. Use Redux actions {type: actionName, data: ...} to pass notification messages, reducer format (switch and return) - single component for all sysmessages



***
NEXT VERSION:

- Consider uploading files to Google Drive API or Dropbox API to save server storage space.
- Component state actions (e.g. removeWork, pushSkill...) should pass through reducer? Currently mutating component data state (as oppossed to UI state) -> Immutable component data state
- Better vectorized favicon

### Actions.js

- Change fetch to Axios, fetch API not supported by IE (support available in Edge)

***

Log
======
- Production Build back
- Create slug for CVModel - used external package mongoose-slug-generator
- Download files /uploads with spaces in filename - removed all spaces
- Known vulnerability back app -> slug package - fixed
- Add link to Web CV
- Add favicon