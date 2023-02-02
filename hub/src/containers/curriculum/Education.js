import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import Editor from "../../components/Editor";
import { educObj } from "../../reducers/cv";

const Education = ({ educ, addSkillItem, removeSkill, update, descChange }) => {
  const [toggle, setToggle] = useState(false);

  const pushSkill = (e) => {
    e.preventDefault();
    addSkillItem("educ", educObj);
    if (!toggle) {
      setToggle(true);
    }
  };

  return (
    <div className="courseRepeater section">
      <Header sub className="u-space-between u-align-baseline">
        <div>
          <span>EDUCATION</span>
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

      {toggle && educ
        ? educ.map((course, i) => (
            <div className="single" key={course.id}>
              {i > 0 ? (
                <button
                  className="btn btn-close-repeat"
                  onClick={() => removeSkill("educ", i)}
                >
                  <Icon className="red large" name="window close"></Icon>
                </button>
              ) : (
                ""
              )}
              <Grid columns={12}>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <label>Date </label>
                    <input
                      type="text"
                      name="date"
                      onChange={(e) => update("educ", i, e)}
                      value={course.date}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Certificate/Degree </label>
                    <input
                      type="text"
                      name="diploma"
                      onChange={(e) => update("educ", i, e)}
                      value={course.diploma}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Institution </label>
                    <input
                      type="text"
                      name="institution"
                      onChange={(e) => update("educ", i, e)}
                      value={course.institution}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <div className="block">
                      <label>Description </label>
                      <br />
                      <Editor
                        value={course.desc}
                        onChange={(v) => descChange("educ", v, i)}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Education;
