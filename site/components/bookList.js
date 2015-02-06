var BookList = React.createClass({
  render: function() {
    var that = this
    var bookNodes = this.props.books.map(function(book, index){
      if(that.props.viewType === "list"){
        return (
          <li key={index}>
            <BookCell book={book} />
          </li>
        )
      } else {
        return (
          <div className="col sm-col-6 md-col-4 lg-col-3" key={index}>
            <BookGrid book={book} />
          </div>
        )
      }
    })
    var bookView
    if(this.props.viewType === "list") {
      bookView = (<ul className="bookList">{bookNodes}</ul>)
    } else {
      bookView = (<div className="container clearfix">{bookNodes}</div>)
    }
    return (
      <div>
        {bookView}
      </div>
    )
  }
})
