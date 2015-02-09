var BookView = React.createClass({
  backToAllBooks: function() {
    React.render(
      <AllBooks viewType={this.props.viewType} />,
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
    window.scrollTo(0, 0)
    this.handleBack()
  },
  render: function() {
    var summary = this.props.book.blurb || "No summary available"
    return (
      <div id="bookView">
        <div className="px4 col col-12">
          <span className="left point center">
            <h4>Back To Library</h4>
            <i className="fa-large fa fa-chevron-circle-left"
              onClick={this.backToAllBooks}></i>
          </span>
          <span className="right point center">
            <h4>Read This Book</h4>
            <i onClick={this.backToAllBooks} className="fa fa-large fa-book"></i>
          </span>
        </div>
        <div className="container clearfix p2">
          <div className="col md-col-6 sm-col-12 p2">
            <img className="large-image border"
              src={"../thumbnails/"+ this.props.book.bookId +".jpg"}>
            </img>
          </div>
          <div className="col md-col-6 sm-col-12">
            <h1 className="blue">{this.props.book.name}</h1>
            <h4>Summary</h4>
            <p>{summary}</p>
            <h4>Written By</h4>
            <Authors authors={this.props.book.authors} />
            <h4>Languages</h4>
            <StringArray array={this.props.book.languages} />
            <h4>Subjects</h4>
            <StringArray array={this.props.book.subjects} />
            <h4>Edited By</h4>
            <p>{this.props.book.editor}</p>
            <h4>Tags</h4>
            <StringArray array={this.props.book.tags} />
          </div>
        </div>
      </div>
    )
  }
})
