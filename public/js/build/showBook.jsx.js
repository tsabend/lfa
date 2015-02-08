var BookView = React.createClass({displayName: "BookView",
  backToAllBooks: function() {
    React.render(
      React.createElement(AllBooks, {viewType: this.props.viewType}),
      document.getElementById('books')
    )
    window.scrollTo(0, this.props.scrollPosition)
  },
  handleBack: function() {
    document.onkeydown = function (e) {
        if(e.keyCode === 8) {
          this.backToAllBooks()
          document.onkeydown = null
          return false
        }
      }.bind(this)
  },
  componentDidMount: function() {
    this.handleBack()
  },
  render: function() {
    var summary
    this.props.book.blurb ? summary = this.props.book.blurb : summary = "No summary available"

    return (
      React.createElement("div", {id: "bookView"}, 
        React.createElement("i", {onClick: this.backToAllBooks, className: "fa fa-chevron-circle-left"}), 
        React.createElement("div", {className: "container clearfix p2"}, 
          React.createElement("div", {className: "col md-col-6 sm-col-12 p2"}, 
            React.createElement("img", {className: "large-image border", src: "../thumbnails/"+ this.props.book.bookId +".jpg"})
          ), 
          React.createElement("div", {className: "col md-col-6 sm-col-12"}, 
            React.createElement("h1", {className: "blue"}, this.props.book.name), 
            React.createElement("h4", null, "Summary"), 
            React.createElement("p", null, summary), 
            React.createElement("h4", null, "Written By"), 
            React.createElement(Authors, {authors: this.props.book.authors}), 
            React.createElement("h4", null, "Languages"), 
            React.createElement(StringArray, {array: this.props.book.languages}), 
            React.createElement("h4", null, "Subjects"), 
            React.createElement(StringArray, {array: this.props.book.subjects}), 
            React.createElement("h4", null, "Edited By"), 
            React.createElement("p", null, this.props.book.editor), 
            React.createElement("h4", null, "Tags"), 
            React.createElement(StringArray, {array: this.props.book.tags}), 
            React.createElement("i", {onClick: this.backToAllBooks, className: "fa fa-book h1 point"})
          )
        )
      )
    )
  }
})

var StringArray = React.createClass({displayName: "StringArray",
  render: function() {
    var nodes = this.props.array.join(", ")
    return (
      React.createElement("p", null, 
        nodes
      )
    )
  }
})

var Authors = React.createClass({displayName: "Authors",
  render: function() {
    var authorNodes = this.props.authors.map(function(author, index){
      return (
        React.createElement("li", {key: index}, 
          author.full_name
        )
      )
    })
    return (
      React.createElement("ul", null, 
        authorNodes
      )
    )
  }
})
