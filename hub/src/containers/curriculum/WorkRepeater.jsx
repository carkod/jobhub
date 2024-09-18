import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import Editor from "../../components/Editor";
import { expObj } from "../../reducers/cv";
const WorkRepeater = ({
  workExp,
  addSkillItem,
  removeSkill,
  update,
  descChange,
}) => {
  const [toggle, setToggle] = useState(false);

  const pushSkill = (e) => {
    e.preventDefault();
    addSkillItem("workExp", expObj);
    if (!toggle) {
      setToggle(true);
    }
  };

  return (
    <div className="workRepeater section">
      <Header sub className="u-space-between u-align-baseline">
        <div>
          <span>WORK EXPERIENCE</span>
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

      {toggle && workExp
        ? workExp.map((work, i) => (
            <div className="single" key={work.id}>
              {i > 0 && (
                <button
                  className="btn btn-close-repeat"
                  onClick={() => removeSkill("workExp", i)}
                >
                  <Icon className="red large" name="window close"></Icon>
                </button>
              )}
              <Grid columns={12}>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <label>Date </label>
                    <input
                      type="text"
                      name="date"
                      onChange={(e) => update("workExp", i, e)}
                      value={work.date}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Position </label>
                    <input
                      type="text"
                      name="position"
                      onChange={(e) => update("workExp", i, e)}
                      value={work.position}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Company </label>
                    <input
                      type="text"
                      name="company"
                      onChange={(e) => update("workExp", i, e)}
                      value={work.company}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <div className="block">
                      <label>Description </label>
                      <br />
                      <Editor
                        value={work.desc}
                        onChange={(v) => descChange("workExp", v, i)}
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

export default WorkRepeater;
