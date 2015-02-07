var BookView = React.createClass({
  handleClick: function() {
    React.render(
      <AllBooksView />,
      document.getElementById('books')
    )
    document.getElementById(this.props.book.bookId).scrollIntoView()
  },
  render: function() {
    return (
      <div className="container clearfix center py2">
        <img className="fit thumbnail border" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
        <h1>{this.props.book.name}</h1>
        <h3>{this.props.book.authors}</h3>
        <p>{this.props.book.subjects}</p>
        <p>{this.props.book.blurb}</p>
        <p>{this.props.book.authors}</p>
        <button onClick={this.handleClick}>Back</button>
      </div>
    )
  }
})
