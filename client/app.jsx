class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log("CREATED")
    this.finish();
  }

  finish() {
    $.ajax({
      url: '/',
      method: 'GET',
      success: function() {
        console.log('Got data')
      }
    })
    console.log('FINISHED')
  }

  render() {
    return (<div>TESTING IF IT WORKS MANG</div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));