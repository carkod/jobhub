import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import { skillsObjGenerator } from "../../reducers/cv";

const WebdevSkills = ({ webdevSkills, addSkillItem, removeSkill, update }) => {
  const [toggle, setToggle] = useState(false);

  const pushSkill = (e) => {
    e.preventDefault();
    addSkillItem("webdevSkills", skillsObjGenerator("webdevSkills"));
    if (!toggle) {
      setToggle(!toggle);
    }
  };

  return (
    <div className="webdevSkills section">
      <Header sub className="u-space-between u-align-baseline">
        <div>
          <span>Web Development skills</span>
          <button
            className="btn"
            type="button"
            aria-label="Add web development skill"
            onClick={pushSkill}
          >
            <Icon className="green" name="plus"></Icon>
          </button>
        </div>
        <div>
          <button
            className="btn"
            type="button"
            onClick={() => setToggle(!toggle)}
            aria-label={
              toggle
                ? "Collapse web development skill"
                : "Expand web development skill"
            }
            aria-expanded={toggle}
          >
            <Icon
              className="blue large"
              fitted
              name={toggle ? "chevron up" : "chevron down"}
            />
          </button>
        </div>
      </Header>

      {toggle && webdevSkills
        ? webdevSkills.map((webdev, i) => (
            <div className="single" key={webdev.id}>
              <button
                className="btn btn-close-repeat"
                type="button"
                aria-label="Remove web development skill"
                onClick={() => removeSkill("webdevSkills", i)}
              >
                <Icon className="red large" name="times" />
              </button>
              <Grid columns={12}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Grid.Row>
                      <Grid.Column>
                        <label>Name </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => update("webdevSkills", i, e)}
                          value={webdev.name}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="pos-bottom">
                        <label>Level </label>
                        <input
                          type="text"
                          name="level"
                          onChange={(e) => update("webdevSkills", i, e)}
                          value={webdev.level}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>

                  <Grid.Column>
                    <label>Brief description </label>
                    <textarea
                      style={{ width: "100%" }}
                      rows="5"
                      type="text"
                      name="desc"
                      onChange={(e) => update("webdevSkills", i, e)}
                      value={webdev.desc}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          ))
        : ""}
    </div>
  );
};

export default WebdevSkills;
