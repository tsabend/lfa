var BookList = React.createClass({displayName: "BookList",
  render: function() {
    var bookNodes = this.props.books.map(function(book, index){
      if(this.props.viewType === "list"){
        return (
          React.createElement("li", {key: index}, 
            React.createElement(BookCell, {book: book})
          )
        )
      } else {
        return (
          React.createElement("div", {className: "col sm-col-6 md-col-4 lg-col-3", key: index}, 
            React.createElement(BookGrid, {book: book})
          )
        )
      }
    }, this)
    var bookView
    if(this.props.viewType === "list") {
      bookView = (React.createElement("ul", {className: "bookList"}, bookNodes))
    } else {
      bookView = (React.createElement("div", {className: "container clearfix"}, bookNodes))
    }
    return (
      React.createElement("div", null, 
        bookView
      )
    )
  }
})
