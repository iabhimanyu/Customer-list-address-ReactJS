import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import CustomerDetails from './CustomerDetails'
import axios from 'axios'

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      this.setState({customerList: response})
    })
  };

  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div className="addmargin">
      <div style={{marginLeft:"60px",marginRight:"50px"}} className="col-md-4">
        {

          this.state.customerList.data.map(customer => <Panel bsStyle="info" key={customer.id} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">ID : {customer.id}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <div style={{textAlign:"justify",margin:"auto"}}>
              <p>Name: {customer.name}</p>
              <p>Age: {customer.age}</p>
              <p>Sex: {customer.sex}</p>
              </div>
              <Button bsStyle="info" onClick={() => this.setState({selectedCustomer: customer.id})}>

                Click to View Details

              </Button>

            </Panel.Body>
          </Panel>)
        }
      </div>
      <div className="col-md-6">
        <CustomerDetails val={this.state.selectedCustomer}/>
      </div>
    </div>)
  }

}
