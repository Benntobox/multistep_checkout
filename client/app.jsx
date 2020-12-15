class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
  }

  next() {
    this.setState({step: this.state.step > 3 ? 0 : this.state.step + 1});
  }

  accountSubmit(e) {
    let app = this;
    e.preventDefault();
    $.ajax({
      url: '/account',
      method: 'POST',
      data: {
        name: e.target.name.value, 
        email: e.target.email.value, 
        password: e.target.password.value
      },
      success: function (data) {
        app.next();
      }
    })
  }

  shippingSubmit(e) {
    let app = this;
    e.preventDefault();
    $.ajax({
      url: '/shipping',
      method: 'POST',
      data: {
        address1: e.target.address1.value,
        address2: e.target.address2.value,
        city: e.target.city.value,
        state: e.target.state.value,
        zipcode: e.target.zipcode.value,
        phone: e.target.phone.value
      },
      success: function (data) {
        app.next();
      }
    })
  }

  billingSubmit(e) {
    let app = this;
    e.preventDefault();
    $.ajax({
      url: '/billing',
      method: 'POST',
      data: {
        cc: e.target.cc.value,
        expire: e.target.expire.value,
        cvv: e.target.cvv.value,
        billzip: e.target.billzip.value
      },
      success: function (data) {
        app.next();
      }
    })
  }

  render() {
    if (this.state.step === 0) { return (<F1 submit={this.accountSubmit.bind(this)}/>)}
    if (this.state.step === 1) { return (<F2 submit={this.shippingSubmit.bind(this)}/>)}
    if (this.state.step === 2) { return (<F3 submit={this.billingSubmit.bind(this)}/>)}
    if (this.state.step === 3) { return (<Summary />)}
  }
}

const F1 = (props) => (
  <div>
    <div>Enter Account Information</div>
    <form onSubmit={props.submit.bind(this)}>
      <label>Name:</label>
      <input type="text" name="name"></input><br></br>
      <label>Email:</label>
      <input type="text" name="email"></input><br></br>
      <label>Password:</label>
      <input type="text" name="password"></input><br></br>
      <input type="submit" name="Submit" value="submit"></input>
    </form>
  </div>
)

const F2 = (props) => (
  <div>
    <div>Enter Shipping Information:</div>
    <form onSubmit={props.submit.bind(this)}>
      <label>Address:</label>
      <input type="text" name="address1"></input><br></br>
      <label>Address Cont:</label>
      <input type="text" name="address2"></input><br></br>
      <label>City:</label>
      <input type="text" name="city"></input><br></br>
      <label>State:</label>
      <input type="text" name="state"></input><br></br>
      <label>Zipcode:</label>
      <input type="text" name="zipcode"></input><br></br>
      <label>Phone Number:</label>
      <input type="text" name="phone"></input><br></br>
      <input type="submit" name="Submit" value="submit"></input>
    </form>
  </div>
)

const F3 = (props) => (
  <div>
    <div>Enter Payment Information:</div>
    <form onSubmit={props.submit.bind(this)}>
      <label>Credit Card Number:</label>
      <input type="text" name="cc"></input><br></br>
      <label>Expiration:</label>
      <input type="text" name="expire"></input><br></br>
      <label>CVV:</label>
      <input type="text" name="cvv"></input><br></br>
      <label>Billing Zip Code:</label>
      <input type="text" name="billzip"></input><br></br>
      <input type="submit" name="Submit" value="submit"></input>
    </form>
  </div>
)

const Summary = (props) => (
  <div>Successfull submitted all data!</div>
)

ReactDOM.render(<App />, document.getElementById('app'));