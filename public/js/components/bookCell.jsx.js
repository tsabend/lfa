var BookCell = React.createClass({
  handleClick: function() {
    React.render(
      <BookView book={this.props.book} />,
      document.getElementById('books')
    )
  },
  render: function() {
    var authorsList = this.props.book.authors.map(function(author, index){
      return (
        <li className="authors" key={index}>
          <Author fullName={author["full_name"]} />
        </li>
      )
    })
    return (
      <div className="table border" onClick={this.handleClick}>
        <div className="table-cell pr4">
          <img className="fit thumbnail" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
        </div>
        <div className="table-cell full-width">
          <h1 className="m0">{this.props.book.name}</h1>
          <h5 className="m0">{this.props.book.subjects}</h5>
          <ul className="m0 py4">{authorsList}</ul>
        </div>
      </div>
    )
  }

})


var Author = React.createClass({
  render: function() {
    return (
      <span>{this.props.fullName}</span>
    )
  }
})
