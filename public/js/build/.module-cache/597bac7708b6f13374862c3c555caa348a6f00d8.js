var BookView = React.createClass({displayName: "BookView",
  handleClick: function() {
    React.render(
      React.createElement(AllBooks, null),
      document.getElementById('books')
    )
    document.getElementById(this.props.book.bookId).scrollIntoView()
  },
  render: function() {
    return (
      React.createElement("div", {className: "container clearfix center py2"},
        React.createElement("img", {className: "fit thumbnail border", src: "../thumbnails/"+ this.props.book.bookId +".jpg"}),
        React.createElement("h1", null, this.props.book.name),
        React.createElement("h3", null, this.props.book.authors),
        React.createElement("p", null, this.props.book.subjects),
        React.createElement("p", null, this.props.book.blurb),
        React.createElement("p", null, this.props.book.authors),
        React.createElement("button", {onClick: this.handleClick}, "Back")
      )
    )
  }
})
