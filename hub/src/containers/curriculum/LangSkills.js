import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import { skillsObjGenerator } from "../../reducers/cv";

const LangSkills = ({ langSkills, addSkillItem, removeSkill, update }) => {
  const [toggle, setToggle] = useState(false);

  const pushSkill = (e) => {
    e.preventDefault();
    addSkillItem("langSkills", skillsObjGenerator("langSkills"));
    if (!toggle) {
      setToggle(!toggle);
    }
  };

  return (
    <div className="langSkills section">
      <Header sub className="u-space-between u-align-baseline">
        <div>
          <span>Languages</span>
          <button
            className="btn"
            type="button"
            aria-label="Add language"
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
            aria-label={toggle ? "Collapse language" : "Expand language"}
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

      {toggle && langSkills
        ? langSkills.map((lang, i) => (
            <div className="single" key={lang.id}>
              {i > 0 ? (
                <button
                  className="btn btn-close-repeat"
                  type="button"
                  aria-label="Remove language"
                  onClick={() => removeSkill("langSkills", i)}
                >
                  <Icon className="red large" name="times"></Icon>
                </button>
              ) : (
                ""
              )}
              <Grid columns={12}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Grid.Row>
                      <Grid.Column>
                        <label>Name </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => update("langSkills", i, e)}
                          value={lang.name}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="pos-bottom">
                        <label>Level </label>
                        <input
                          type="text"
                          name="level"
                          onChange={(e) => update("langSkills", i, e)}
                          value={lang.level}
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
                      onChange={(e) => update("langSkills", i, e)}
                      value={lang.desc}
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

export default LangSkills;
