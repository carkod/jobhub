TO-DO
======

### Detail.js


- Detail.js: Editable
- Detail.js: dynamic notification after save

### SERVER

- Live Mongodb configure authorization
- Production Build back

### List.js

- List.js search: use React semantic ui input datalist [https://react.semantic-ui.com/elements/input#input-example-ref-focus]


### Actions.js

- Change fetch to Axios, fetch API not supported by IE (support available in Edge)

### Others

- Add initial focus to AddNew.js 

***

### INSTALL MONGOD

sudo apt-get install -y mongodb-org
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
chmod a+x mongod

***

LOG
======

- Details.js fill input fields with cv content (Edit page)
- List.js fetchCVs by DESC (lastest created) by default