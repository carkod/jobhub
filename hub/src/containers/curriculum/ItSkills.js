import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import { skillsObjGenerator } from "../../reducers/cv";

const ItSkills = ({ itSkills, addSkillItem, removeSkill, update }) => {
  const [toggle, setToggle] = useState(false);

  const pushSkill = (e) => {
    e.preventDefault();
    addSkillItem("itSkills", skillsObjGenerator("itSkills"));
    if (!toggle) {
      setToggle(!toggle);
    }
  };

  return (
    <div className="itSkills section">
      <Header sub className="u-space-between u-align-baseline">
        <div>
          <span>IT skills</span>
          <button className="btn" onClick={pushSkill}>
            <Icon className="green" name="add square"></Icon>
          </button>
        </div>
        <div>
          <button
            className="btn"
            type="button"
            onClick={() => setToggle(!toggle)}
          >
            <Icon className="blue large" fitted name="caret square down" />
          </button>
        </div>
      </Header>

      {toggle && itSkills
        ? itSkills.map((it, i) => (
            <div className="single" key={it.id}>
              <button
                className="btn btn-close-repeat"
                onClick={() => removeSkill("itSkills", i)}
              >
                <Icon className="red large" name="window close"></Icon>
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
                          onChange={(e) => update("itSkills", i, e)}
                          value={it.name}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="pos-bottom">
                        <label>Level </label>
                        <input
                          type="text"
                          name="level"
                          onChange={(e) => update("itSkills", i, e)}
                          value={it.level}
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
                      onChange={(e) => update("itSkills", i, e)}
                      value={it.desc}
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

export default ItSkills;
