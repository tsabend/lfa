var BookGrid = React.createClass({
  handleClick: function() {
    React.render(
      <BookView book={this.props.book} viewType="grid" scrollPosition={window.scrollY} />,
      document.getElementById('books')
    )
  },
  render: function() {
    var chompedName
    if(this.props.book.name.length > 19){
      chompedName = this.props.book.name.substring(0,19) + "..."
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
      <div className="mt3 py2 px4" onClick={this.handleClick}>
        <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <h4 className="center">{chompedName}</h4>
              <img className="fit thumbnail mx4 border point" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
            </div>
            <div className="back">
              <h4 className="center">{chompedName}</h4>
              <p className="center white py1 thumbnail point border bg-blue">{backOfBook}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
