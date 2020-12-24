import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import shortid from 'shortid';
import { fetchCats } from '../../actions/cats';
import { fetchProjects } from '../../actions/res';
import HtmlText from '../../components/HtmlText';
import Documents from './Documents';
import Links from './Links';


class ProjectDetail extends Component {
    
    constructor(props) {
    super(props);    
    this.state = {};
    
  }

  componentDidMount = () => {
    this.props.fetchProjects();
  }
  
  componentDidUpdate = (props) => {
    if (this.props.portfolio !== props.portfolio) {
      const {portfolio} = props;
      this.setState({portfolio: portfolio});
    }
  }
  
  render() {
    const {portfolio} = !!Object.keys(this.state).length ? this.state : this.props;
    const {position} = this.props.match.params;

    const title = position || 'Professional Profile';
    return (
      <div id="mainportfolio" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${title}`}</title>
          <meta charSet="utf-8" /> 
          <meta name="description" content={`Portfolio and projects by Carlos Wu - ${title}`}/>
          <link rel="canonical" href={`http://carloswu.xyz/en-GB/${position}/resources`} />
        </Helmet>
        
        <main className="portfolioContent ui grid">
        <Header as='h1'>{`You are viewing ${title} projects`}</Header>
          {portfolio.map((project, i) =>
          <div key={project.id || shortid.generate()} className="row one column wide">
            <section id="project" className="column ui grid">
            <Header as='h2' dividing>{project.name}</Header>
                <div className="row two column wide">
                  <div className="left column" style={{backgroundImage: project.imgURL}}>
                    <HtmlText text={project.desc} />
                  </div>
                  <div className="right column">
                    <div className="description">
                      <Links links={project.links}/>
                    </div>
                    <div className="description">
                      <Documents documents={project.documents}/>
                    </div>
                  </div>
              </div>
            </section>            
          </div>
          )}
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  const {portfolio} = state;
  const {position, language} = props.match.params;
  let cats = state.cats.data, urlCategory = [], positions;
  if (portfolio[0]._id !== '') {
    urlCategory = portfolio.filter(cv => {
      const matchPos = cv.cats.position.toLowerCase() === position;
      const matchStatus = cv.cats.status !== undefined ? cv.cats.status.toLowerCase() === 'public' : false;
      const matchLang = cv.cats.locale === language;
      return matchPos && matchStatus && matchLang;
    })
  
    return {
      portfolio: urlCategory,
    }
  } else {
    return {
      portfolio: portfolio,
    }
  }
  
}


export default connect(mapStateToProps, { fetchProjects, fetchCats })(ProjectDetail);