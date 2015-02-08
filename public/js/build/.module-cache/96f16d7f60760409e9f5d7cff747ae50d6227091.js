var BookCell = React.createClass({displayName: "BookCell",
  handleClick: function() {
    React.render(
      React.createElement(BookView, {book: this.props.book, viewType:"list"}),
      document.getElementById('books')
    )
  },
  render: function() {
    var authorsList = this.props.book.authors.map(function(author, index){
      return (
        React.createElement("li", {className: "authors", key: index},
          React.createElement(Author, {fullName: author["full_name"]})
        )
      )
    })
    return (
      React.createElement("div", {className: "table border", onClick: this.handleClick},
        React.createElement("div", {className: "table-cell pr4"},
          React.createElement("img", {className: "fit thumbnail", src: "../thumbnails/"+ this.props.book.bookId +".jpg"})
        ),
        React.createElement("div", {className: "table-cell full-width"},
          React.createElement("h1", {className: "m0"}, this.props.book.name),
          React.createElement("h5", {className: "m0"}, this.props.book.subjects),
          React.createElement("ul", {className: "m0 py4"}, authorsList)
        )
      )
    )
  }

})


var Author = React.createClass({displayName: "Author",
  render: function() {
    return (
      React.createElement("span", null, this.props.fullName)
    )
  }
})
