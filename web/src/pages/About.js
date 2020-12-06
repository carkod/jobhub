import React from 'react';
import { Helmet } from "react-helmet";

export default function About() {
    
    return (
      <div id="mainCV" className="container">
        <Helmet>
          <title>{`Carlos Wu - About`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Carlos Wu - Professional Profile | About carloswu.xyz`}/>
          <link rel="canonical" href={process.env.REACT_APP_HOME_URL} />
        </Helmet>
        
        <main className="about">
            <section id="me">
                <h1>FAQs about me</h1>
                <h2>What is your name?</h2>
                <p>My name is Carlos. In the UK, I usually go by Carlos Wu. But because I am a Spanish citizen, I have two surnames:</p>
                <ul>
                    <li>First name: Carlos</li>
                    <li>First surname: Wu</li>
                    <li>Second surname: Fei</li>
                    <li>I do not have a second name.</li>
                </ul>
                
                <p>As a funny anecdote, I was in Boots pharmacy one day, and they wrote my first surname as my second name and my second surname as my first surname, thinking that my first surname was my second name ok, did that make sense?</p>
                
                <h2>What is your academic background?</h2>
                <p>I graduated in University Carlos III in Madrid, Spain, with a degree in Business Management. Afterwards, I took a Master's degree in Management Consulting, where I was trained basically to become a business analyst. Therefore, I believe I can easily take on busines tasks, such as Presentations of project proposals, drawing flowchart of business processes, diagnosis of business problems with business cases, using Excel to analyze account/financial/business data, are things that academically I have been doing for years.</p>
                
                <h2>Where do you live? Will you consider relocating?</h2>
                <p>As I found out from several recruiters, one of the early parameters used to filter out candidates for a role is location. My situation at the moment, as opposed to most other people, is what I call <a href="https://en.wikipedia.org/wiki/Digital_nomad" target="_blank">digital nomad</a>. In my case, as opposed to the Wikipedia definition, I do not have to work remotely, but I go wherever professional opportunities appear. There are 2 basic conditions that have to be met, (1) I must be valued for my work (if you believe that my work is dispensable, that I do not add value to your organization, therefore I am not respected, there is no point in working together). (2) Monetary compensation must meet standard (local market) at least. And I will go wherever you need to me to go. Pretty simple? You'll be surprised how many companies do not meet these minimum requirements.</p> 
                
                <h2>What are your professional goals?</h2>
                <p>I do not have very clear professional goals, as I am a realistic person, I think it depends on market demand. I love web technologies and there is a lot of demand worldwide, so that's why I started a web development career. In the short-term, I would like to become a Full Stack Javascript developer. Although in the long-term, if I must choose an ideal role, I would say that I would be most useful as a coordination link between developers writing business logic, and the actual business operation analyses. </p>
                
                <h2>Case: How would you describe your ideal role?</h2>
                <p>I quite often see advertised roles where a developer is asked to be able to work with business analysts, but I believe the mentality of a developer is completely different to a business person. One side is worried about system effiency, writing clean code (minimizing bugs) and ensuring output quality, while the other party is focused on satisfying deadlines, making sure all features "add value" to the final product, and as a result making a profit that minimizes cost and maximizes sales. An example of conflict would be, development maintanance tasks are quite normal and very necessary to keep bugs out of the software, apart from the fact that technologies improve constantly, and better ways to do things come up progressively. However, these tasks are not added value tasks for a business, and businesses are encouraged to remove them from the process, because they add cost to the final product. Conflicts as these, are usually hidden from developers, until the day the meeting happens or the product is launched, when reverting back is not an option. Therefore to solve them, one must forsee and prevent these conflicts before they become a problem. Business goals must be aligned with development goals. </p>
                
                
                <p>I believe I could smooth out these differences, as I understand development better than business analysts, and I understand business better than developers. It is quite easy for me to put myself in the shoes of the other party, and therefore reach a more complete solution for daily problems.</p>
                
                
            </section>
            <section id="site">
                <h1>About - The site</h1>
                
                <p>This site has 3 web applications in it. You can find the source code in Github, but as a summary for non-coders (TL;DR):</p>
                <ul>
                  <li><strong>Back</strong> application: This is the back-end that creates the server and uses Expressjs to connect with databases, santise server requests, connect third party APIs... that is the BACK-END</li>
                  <li><strong>Hub</strong> application: This is the front-end admin application. It works as a content mangement portal, that modifies the data as in a typical Content Management system and sends back the new or modified data to Back application.</li>
                  <li><strong>Web</strong> application: This is the front-end website that you actually are seeing right now. As opposed to Hub, it does has minimal state management (in terms of React.js this means most of the data is populated using props instead of state).</li>
                </ul>
                
                <p>If you want to know more, keep reading.</p>
                
                <h2>The logic</h2>
                <p>The back-end application is developed using Node.js and Express.js. It handles CRUD for the database which is a MongoDB that uses and ODM called Mongoose. Most database queries are automated, that is, with CRUD and the few REST requests it is enough to create any front-end application using Mongoose. For specific database changes, I use the MongoDB shell, in which case I use the methods provided by MongoDB instead of Mongoose. But I have a basic understanding of both.</p>
                
                
                <h2>UX</h2>
                <p>The front-end Web application, it is your typical informational website. The purpose of it is to show information that I keep sending out to prospective employers, recruiters and other interested third parties. Because a lot of times it requires repetition and finding the files, I decided to make some of this information public. Therefore, this site is quite straight-forward, having speed in mind, not only in terms of performance but also navigation. It tries to get to the point in 1 click, skipping index pages, filters or duplicated menus, and leaving enough space to read whilst at the same time, taking up all the space in your screen without leaving empty sides.</p>
                <p>The design tries to break out of the typical square, rounded shapes that have become the mainstream in the last decade on the web. It uses inspirational magazine layout as a starting point. The problem I found was that screens are usually squared or rectangular, therefore unusual shapes such as triangles that are creative and popular in magazine-style layout do not fit the responsive paradigm. Therefore, I used a mix of triangles and rectangles: trapezoids. As a former WordPress theme developer, we name all our designs, I named this "Trapezoidal" which gives to this geometrically ugly, asymmetric shape a new life. Furthermore, blue color, which is a cold color, is used to give it a professional trait, transparecy unveils my name under it and adds an "atmospheric" feeling to it.</p>
                
                <h2>Hub: The integrated career management tool</h2>
                
                <p>The front-end application Hub is intended to be used as a central "hub" for everything. It is built using React, as I believe it is great for increasingly scalable (features are added progressively) applications such as this one. The application has many containers and this is convenient for several reasons:</p>
                <ul>
                  <li>Over time, more features are added. Every new feature uses a component, which could be seen as a WordPress plugin. Therefore, I do not need to dig into the complexity of the old application and see where it fits, I just write a new component and hook it inside. I could use the index component or a parent/presentational component (which does not have or has very little logic) to do this.</li>
                  <li>Data convenience. Usually a document based database such as MongoDB in this case, is an Object, which has several levels depth. The way I do it, each level of depth (objects and arrays of objects) are split into a children containers, which keeps data structure simple (one level of depth per component). When you log it into the browser console you are not going to see an endless nested Object, you will see one or two levels of depth only. And this could be made available across the application with Redux (also used in this application)</li>
                </ul>
                <p>Regarding the uses of Hub, it goes far more complex than the back end or the Web application. My intial idea was to make it a "integrated career management tool", which comprises of: </p>
                <ul>
                  <li>Analytics (web analytics, and career analytics, which would be jobs length, roles, type of companies, number of employees... to analyze which is the best type of company for me -or the candidate, over the years)</li>
                  <li>Job site integration (e.g. LinkedIn jobs with matched roles, although this is no longer possible for the free API version)</li>
                  <li>CV builder. Which is the feature already in. The plan would be to make it drag-and-dropable and be able to create and copy multiple instances of CVs and link portfolio of projects to difference CVs using categories.</li>
                </ul>
                
            </section>
        </main>
        
      </div>
    );
  }