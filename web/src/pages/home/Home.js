import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import profilePic from "../../carlos.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    const mobileSize = window.innerWidth < "765" ? true :false
    this.state = {
      theposition: -10,
      mobile: mobileSize
    };
  }

  componentDidMount() {

      // document.addEventListener("scroll", this.listenToScroll, true);
  }

  componentWillUnmount() {
    // document.removeEventListener("scroll", () => null, true);
  }

  componentDidUpdate = (props) => {
    if (this.props.value !== props.value) {
      this.setState({ cvs: this.props.value });
    }
  };

  listenToScroll = () => {
    const { theposition } = this.state;
    this.setState({
      theposition: theposition + 1,
    });
  };

  
  render() {
    const yearsExp = new Date().getFullYear() - 2014;
    const rotationStyles = {
      transform: `rotate(${this.state.theposition}deg) translate(0em, -1em)`,
    }
  
    return (
      <div id="home" className="home container">
        <Helmet>
          <title>Carlos Wu - Professional Profile</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Full stack developer, Front-end developer, Business analyst, Project Manager"
          />
          <link rel="canonical" href={process.env.REACT_APP_HOME_URL} />
        </Helmet>

        <div
          className="home-details"
          style={!this.state.mobile ? rotationStyles : {}}
        >
          <div className="home-details__container">
            <div className="home-details__container-top u-restore-home-layout">
              <Card>
                <Image
                  src={profilePic}
                  alt="Carlos Wu" />
                <Card.Content>
                <a href="https://goo.gl/maps/fvteJ9H1djgSH4wn8">
                  <Icon name='map marker alternate' />
                  Hyde Park, London
                </a>
              </Card.Content>
              </Card>
              <div className="home-content">
                <p className="u-home-text">
                  Hi, my name is{" "}
                  <span className="u-emphasize-text">Carlos Wu</span> and I work
                  as a{" "}
                  <span className="u-emphasize-text">Full Stack developer</span>
                  , currently based in{" "}
                  <span className="u-emphasize-text">London, UK</span> I have
                  been working in Web for about {yearsExp} years now
                </p>
                <p className="u-home-text">
                  I am experienced in a breadth of technologies such as{" "}
                  <span className="u-emphasize-text">React</span>, Angular 2+,
                  Sass for CSS as well{" "}
                  <span className="u-emphasize-text">Docker</span>, Kubernetes
                  and <span className="u-emphasize-text">Python</span> (mostly
                  using Flask) with a little experience in DB management
                  (Postgres and MongoDB)
                </p>
                <p className="u-home-text">
                  In my free time, I like to work on my{" "}
                  <a href="https://github/carkod/" target="_blank">
                    personal projects
                  </a>
                  , play music and take walks in the various parks of London!
                </p>
              </div>
            </div>

            <div className="ui list">
              <div className="item">
                <i className="mail icon" />
                <div className="content">
                  <a href="mailto:carkodesign@gmail.com">
                    carkodesign@gmail.com
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="linkedin square icon" />
                <div className="content">
                  <a
                    href="https://www.linkedin.com/in/carloswufei/"
                    title="https://www.linkedin.com/in/carloswufei/"
                    target="_blank"
                  >
                    https://www.linkedin.com/in/carloswufei/
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="github icon" />
                <div className="content">
                  <a
                    href="http://github.com/carkod/"
                    title="http://github.com/carkod/"
                    target="_blank"
                  >
                    http://github.com/carkod/
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="stack overflow icon" />
                <div className="content">
                  <a
                    href="https://stackoverflow.com/users/2454059/carkod"
                    title="https://stackoverflow.com/users/2454059/carkod"
                    target="_blank"
                  >
                    https://stackoverflow.com/users/2454059/carkod
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Link to="/cv/en-GB/5fe993de5a4d95045179151b">
                <button>I'm Feeling Lucky</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
