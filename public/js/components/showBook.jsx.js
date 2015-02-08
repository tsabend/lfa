var BookView = React.createClass({
  backToAllBooks: function() {
    React.render(
      <AllBooks viewType={this.props.viewType} />,
      document.getElementById('books')
    )
    window.scrollTo(0, this.props.scrollPosition)
  },
  handleBack: function() {
    document.onkeydown = function (e) {
        if(e.keyCode === 8) {
          this.backToAllBooks()
          document.onkeydown = null
          return false
        }
      }.bind(this)
  },
  componentDidMount: function() {
    this.handleBack()
  },
  render: function() {
    return (
      <div>
        <i onClick={this.handleClick} className="fa fa-chevron-circle-left"></i>
        <i onClick={this.handleClick} className="fa fa-book h1"></i>
        <div className="container clearfix center p2">
          <div className="col md-col-6 sm-col-12 p2">
            <img className="large-image border" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
          </div>
          <div className="col md-col-6 sm-col-12">
            <h1>{this.props.book.name}</h1>
            <h3>{this.props.book.authors}</h3>
            <p>{this.props.book.languages}</p>
            <p>{this.props.book.subjects}</p>
            <p>{this.props.book.blurb}</p>
            <p>{this.props.book.editor}</p>
            <p>{this.props.book.tags}</p>
          </div>
        </div>
      </div>
    )
  }
})

var StringArray = React.createClass({
  render: function() {
    var nodes = this.props.array.join(", ")
    return (
      <p>
        {nodes}
      </p>
    )
  }
})

var Authors = React.createClass({
  render: function() {
    var authorNodes = this.props.authors.map(function(author, index){
      return (
        <li key={index}>
          {author.full_name}
        </li>
      )
    })
    return (
      <ul>
        {authorNodes}
      </ul>
    )
  }
})
