Version 1.2.0

# JOBHUB

JobHub is career management tool made for professional career tracking. 

It is made with candidates in mind, it is a recruirtment tool on the side of the candidate, as opposed to most tools on Internet that are made for recruiters tracking candidates. It comes from years of training and experience from dealing with all the requests coming from recruitment. This tool basically has the following features:

- CV section. Handling multiple CVs for different roles and different jobs, is often quite demanding. Different companies have different requirements, recruiters teaches us to shape our CV to the role, so here we manage different CVs using multiple categories, different versions (short or long format by demand from the recruiter) printed in PDF (no word support)

- Cover letter section. One area I missed from LinkedIn, is the possibility of writing your own Cover letters per request from the applied company. This application allows management of Cover letters, copying and keeping a registration of the Cover letter, with a PDF printing option.

- Portfolio section. Higher flexibility for uploading work, with an area describing project details and technologies used. As this application, as of now, it is focused more on Development work, it is fitted to include simple pictures and links for project work for showcase. There are plans to include permissions, to give temporary accounts for recruiters or proseptive employers to see private project work.

- Job application tracking. A table that keeps tracking on all active applications, which are previously added by the candidate. Also it features a system of stages (which also comes from recruiters most common stages), a stage can be a "Initial call" or a "Technical test". Keeping track of this will help the candidate get the most out of the selection processes, collecting data on probabilities and reasons of success/failure, to keep improving job matching odds.

....

And more coming. If you like this application, please star it and let me know what you think. Upcoming plans: 

- Graphic section to keep track of rates of success and indicators of possible reasons of rejection (time, skills).
- Master contact registration, to create a database of recruiter contact data.
- Possibility of integration with some API to automatically apply and keep track of jobs, inside of the application


## TECHNICAL DETAILS

This is a full stack application made with:

- Back-end: MongoDB, as the database, Mongoose as the ODM. Expressjs for rest management, Jwt and bcrypt for authentication.
- Front-end website: Reactjs, Redux. This is a showcase website, available for public access to show restricted content to recruiters, prospective employers and google search.
- Front-end admin panel: Reactjs, Redux. This is an internal application, made for managing all the recruitment data and the professional profile showed in the website.

## INSTALLATION
- `yarn install && yarn start`
- Npm does not work with Docker setup. 

## DEVELOPMENT AND DEBUGGING

1. Edit `.env` and `docker-compose.yml` files and adjust to each environment
2. Start dev database `docker-compose up -d`
3. Execute debugger in .vscode F5 back, to start back-end endpoint application
- `cd hub && yarn start` to start hub application
- `cd web && yarn start` to start web application

> Actions and reducers should be exactly the same for both web and hub

## DEPLOYMENT

- Try docker make sure the image works:
`docker build --tag jobhub . && docker-compose up`

- Build and deploy image to hub.docker and test docker-compose (this cannot be done in a GH action because of lack of .env with secrets) `docker build --tag jobhub .`
- Once it's tested and ready `docker tag jobhub carloswufei/jobhub:latest && docker push carloswufei/jobhub`

- Go to the server:
1. If database has changed replace new database and `docker-compose stop` and `docker-compose rm` containers to clean up database
2. Pull and start new containers `docker-compose pull && docker-compose up -d`

## PORTS

Both prod and dev:
- Hub 8081
- Web 8080
- Back 8082


## PDF generator
Uses puppeeter to render an HTML page and then generate PDF from it
- `type` field supports currently only `"cv" or "cl"` (Curriculum Vitae or Cover Letter). Any other type will fallback to CV
- To add new types
  1 Add new endpoint that supports the new type
  2 Create template with styling as `type.jsx`
  3 Modify `/generate/pdf` function to add this new type