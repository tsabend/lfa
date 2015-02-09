var StringArray = React.createClass({
  render: function() {
    var nodes = this.props.array.join(", ")
    return (
      <span>
        {nodes}
      </span>
    )
  }
})
