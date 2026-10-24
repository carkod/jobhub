import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Grid, Icon, Search } from "semantic-ui-react";
import TrackingTable from "./Table.js";
import { showArchiveOptions } from "./Tracker.data";

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterStatus: "active",
      companies: [],
      companySelected: "",
      gmailEmail: null,
    };
  }

  handleChangeFilter = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleSearchChange = (e) => {
    if (this.state.filterStatus !== "all") {
      this.setState({ filterStatus: "all" });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  setGmailEmail = (gmailEmail) => this.setState({ gmailEmail });

  render() {
    const addNewBtn = (
      <button className="btn__add-new">
        <Link to={`/new-tracker`}>
          <Icon name="plus square" color="green" />
        </Link>
      </button>
    );
    return (
      <div id="tracker">
        <h1>Application tracking {addNewBtn}</h1>
        {/*Three tabs: tracking table, add stage, contact book*/}
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Dropdown
                name="filterStatus"
                options={showArchiveOptions}
                onChange={this.handleChangeFilter}
                defaultValue={this.state.filterStatus}
              />
            </Grid.Column>
            <Grid.Column>
              <Search
                name="companySelected"
                fluid={true}
                open={false}
                onSearchChange={this.handleSearchChange}
                resultRenderer={null}
                results={this.state.companies}
                value={this.state.companySelected}
              />
            </Grid.Column>
            <Grid.Column>
              <Button onClick={() => this.scanEmails()}>Scan emails</Button>
              <Dropdown text="Email account" pointing="top left">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text={
                      this.state.gmailEmail
                        ? `Currently using: ${this.state.gmailEmail}`
                        : "No email connected"
                    }
                    disabled
                  />
                  <Dropdown.Divider />
                  <Dropdown.Item
                    text={
                      this.state.gmailEmail
                        ? "Choose another email"
                        : "Choose an email"
                    }
                    onClick={() => this.chooseGmailAccount()}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TrackingTable
          {...this.props}
          filterStatus={this.state.filterStatus}
          companySelected={this.state.companySelected}
          scanEmails={(handleGmailAuth) => (this.scanEmails = handleGmailAuth)}
          chooseGmailAccount={(chooseGmailAccount) =>
            (this.chooseGmailAccount = chooseGmailAccount)
          }
          onGmailEmailChange={this.setGmailEmail}
        />
      </div>
    );
  }
}

export default Tracker;
