var BookGrid = React.createClass({
  handleClick: function() {
    React.render(
      <BookView book={this.props.book} viewType="grid" scrollPosition={window.scrollY} />,
      document.getElementById('books')
    )
  },
  render: function() {
    return (
      <div className="py4 py2 px4" onClick={this.handleClick}>
        <p className="center">{this.props.book.name.substring(0,10)}...</p>
        <img className="fit thumbnail mx4 border" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
      </div>
    )
  }
})
