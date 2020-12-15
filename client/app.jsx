class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
    console.log("CREATED")
    this.finish();
  }

  finish() { 
    let app = this;
    $.ajax({
      url: '/',
      method: 'GET',
      success: function(data) {
        console.log('Loaded')
      }
    })
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
      data: {name: e.target.value},
      success: function (data) {
        app.next();
      }
    })
  }

  render() {
    if (this.state.step === 0) { return (<F1 submit={this.accountSubmit.bind(this)}/>)}
    if (this.state.step === 1) { return (<F2 />)}
    if (this.state.step === 2) { return (<F3 />)}
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
    <form action="/shipping" method="post">
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

ReactDOM.render(<App />, document.getElementById('app'));