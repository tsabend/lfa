var StringArray = React.createClass({displayName: "StringArray",
  render: function() {
    var nodes = this.props.array.join(", ")
    return (
      React.createElement("span", null, 
        nodes
      )
    )
  }
})
