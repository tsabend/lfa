var Authors = React.createClass({
  render: function() {
    var authorNodes = this.props.authors.map(function(author, index){
      return (
        <li key={index}>
          {author.full_name}
        </li>
      )
    })
    return (
      <ul>
        {authorNodes}
      </ul>
    )
  }
})
