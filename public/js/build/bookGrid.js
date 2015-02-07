var BookGrid = React.createClass({displayName: "BookGrid",
  render: function() {
    return (
      React.createElement("div", {className: "py4 py2 px4"}, 
        React.createElement("p", {className: "center"}, this.props.book.name.substring(0,10), "..."), 
        React.createElement("img", {className: "fit thumbnail mx4 border", src: "../thumbnails/"+ this.props.book.bookId +".jpg"})
      )
    )
  }
})
