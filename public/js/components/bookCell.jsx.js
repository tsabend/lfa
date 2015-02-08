var BookCell = React.createClass({
  handleClick: function() {
    React.render(
      <BookView book={this.props.book} viewType="list" scrollPosition={window.scrollY} />,
      document.getElementById('books')
    )
  },
  render: function() {
    return (
      <div className="table border point" onClick={this.handleClick}>
        <div className="table-cell pr2">
          <img className="fit thumbnail" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
        </div>
        <div className="table-cell full-width">
          <h1 className="m0 py2">{this.props.book.name}</h1>
          <Authors authors={this.props.book.authors} />
        </div>
      </div>
    )
  }

})
