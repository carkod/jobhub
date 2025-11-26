import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Card, Icon, Image } from "semantic-ui-react";
import profilePic from "../../carlos.jpg";
import Metatags from "../../components/Metatags";
import produce from "immer";
import { fetchCVNav } from "../../actions/cv";


class Home extends Component {
  constructor(props) {
    super(props);
    const mobileSize = typeof window !== 'undefined' && window.innerWidth < 765;
    this.state = {
      theposition: -10,
      mobile: mobileSize,
    };
  }

  componentDidMount = async () => {
    try {
      const navigationCvs = await fetchCVNav();
      this.setState(
        produce((draft) => {
          draft.cvs = navigationCvs;
        })
      );
    } catch (e) {
      if (e) throw e;
    }
  };

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
    const yearsExp = new Date().getFullYear() - 2015;
    const rotationStyles = {
      transform: `rotate(${this.state.theposition}deg) translate(0em, -1em)`,
    }
  
    return (
      <div id="home" className="home container">
        <Metatags
          title="Professional profile"
          description="Full-stack developer, business analyst, investor"
        />

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
                  <span className="u-emphasize-text">London, UK</span>. I have
                  been working for the Web for about {yearsExp} years now
                </p>
                <p className="u-home-text">
                  I am experienced in a breadth of technologies. Front-end development such as{" "}
                  <span className="u-emphasize-text">React</span>, Angular 2+,
                  Sass as well infrastructure and back-end{" "}
                  <span className="u-emphasize-text">Docker</span>, Kubernetes
                  and <span className="u-emphasize-text">Python</span> (Flask) and Node.js, with some experience in DB management
                  (Postgres and MongoDB). Additionally, due to my background in Business and Economics,{" "}
                  I've managed projects and offshore teams.
                </p>
                <p className="u-home-text">
                  In my free time, I like to work on a number of{" "}
                  <a href="https://github.com/carkod/" target="_blank">
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
                  <a href="mailto:disendaweb@gmail.com">
                    disendaweb@gmail.com
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
              {this.state.cvs && this.state.cvs.length > 0 && (
                <Link href={`/cv/en-GB/${this.state.cvs[0].slug || this.state.cvs[0].id}`}>
                  <button className="btn-feeling-lucky">Get my latest CV/Resume</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
