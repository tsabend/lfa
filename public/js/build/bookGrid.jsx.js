var BookGrid = React.createClass({displayName: "BookGrid",
  handleClick: function() {
    React.render(
      React.createElement(BookView, {book: this.props.book, viewType: "grid", scrollPosition: window.scrollY}),
      document.getElementById('books')
    )
  },
  render: function() {
    var chompedName
    if(this.props.book.name.length > 20){
      chompedName = this.props.book.name.substring(0,20) + "..."
    } else {
      chompedName = this.props.book.name
    }
    var backOfBook
    if(this.props.book.blurb.length > 0) {
      if(this.props.book.blurb.length > 230) {
        backOfBook = this.props.book.blurb.substring(0, 230) + "..."
      } else {
        backOfBook = this.props.book.blurb
      }
    } else {
      backOfBook = "Click for more information"
    }
    return (
      React.createElement("div", {className: "mt3 py2 px4", onClick: this.handleClick}, 
        React.createElement("div", {className: "flip-container"}, 
          React.createElement("div", {className: "flipper"}, 
            React.createElement("div", {className: "front"}, 
              React.createElement("h4", {className: "center"}, chompedName), 
              React.createElement("img", {className: "fit thumbnail mx4 border point", src: "../thumbnails/"+ this.props.book.bookId +".jpg"})
            ), 
            React.createElement("div", {className: "back"}, 
              React.createElement("h4", {className: "center"}, chompedName), 
              React.createElement("p", {className: "center thumbnail point border bg-blue"}, backOfBook)
            )
          )
        )
      )
    )
  }
})
