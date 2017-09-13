TODO:

- Add initial focus to AddNew.js 
- Details.js fill input fields with cv content (Edit page)
- List.js search: use React semantic ui input datalist https://react.semantic-ui.com/elements/input#input-example-ref-focus
- List.js fetchCVs by DESC (lastest created) by default
- Change fetch to Axios, fetch API not supported by IE (support available in Edge)

INSTALL MONGOD

sudo apt-get install -y mongodb-org
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
chmod a+x mongod