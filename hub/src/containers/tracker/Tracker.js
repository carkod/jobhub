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
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TrackingTable
          {...this.props}
          filterStatus={this.state.filterStatus}
          companySelected={this.state.companySelected}
          scanEmails={handleGmailAuth => this.scanEmails = handleGmailAuth}
        />
      </div>
    );
  }
}

export default Tracker;
