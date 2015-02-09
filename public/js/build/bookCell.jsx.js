var BookCell = React.createClass({displayName: "BookCell",
  handleClick: function() {
    React.render(
      React.createElement(BookView, {
        book: this.props.book, 
        viewType: "list", 
        scrollPosition: window.scrollY}),
      document.getElementById('books')
    )
  },
  render: function() {
    return (
      React.createElement("div", {className: "table border point", onClick: this.handleClick}, 
        React.createElement("div", {className: "table-cell pr2"}, 
          React.createElement("img", {className: "fit thumbnail", 
            src: "../thumbnails/"+ this.props.book.bookId +".jpg"}
          )
        ), 
        React.createElement("div", {className: "table-cell full-width"}, 
          React.createElement("h1", {className: "m0 py2"}, this.props.book.name), 
          React.createElement(Authors, {authors: this.props.book.authors}), 
          React.createElement("span", {className: "small"}, 
            React.createElement(StringArray, {array: this.props.book.subjects})
          )
        )
      )
    )
  }

})
