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
