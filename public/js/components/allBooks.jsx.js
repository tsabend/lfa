var AllBooks = React.createClass({
  toggleViewType: function() {
    this.state.viewType === "list" ?
    this.setState({viewType: "grid"}) :
    this.setState({viewType: "list"})
  },
  toggleNavBar: function() {
    var searchBar = document.getElementById('sortBar')
    var mainText = document.getElementById('navbar-offset')
    if(sortBar.classList.contains("hidden")) {
      sortBar.classList.remove("hidden")
      mainText.style.paddingLeft = '14rem'
    } else {
      sortBar.classList.add("hidden")
      mainText.style.paddingLeft = '0px'
    }
  },
  changeFilterType: function(event) {
    this.filterType = event.target.value
  },
  filterType: "title",
  filterList: function(event) {
    var filteredList = this.state.initialBooks
    filteredList = filteredList.filter(function(book){
      // Filter by title
      if(this.filterType === "title"){
        return book.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
      }
      // Filter by author
      else if(this.filterType === "author") {
        var numMatches = book.authors.filter(function(author) {
          return author.full_name.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1
        }).length
        return numMatches > 0
      // Filter by subject
    } else if(this.filterType === "subject") {
        var numMatches = book.subjects.filter(function(subject) {
          return subject.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1
        }).length
        return numMatches > 0
      } else if(this.filterType === "tag") {
        var numMatches = book.tags.filter(function(tag) {
          return tag.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1
        }).length
        return numMatches > 0
      }
    }, this)
    this.setState({books: filteredList})
  },
  direction: "desc",
  lastSort: "titles",
  sortList: function(comparator, field) {
    if(this.lastSort !== field) {
      this.direction = "desc"
      this.lastSort = field
    }
    var sortedList = this.state.initialBooks
    sortedList = sortedList.sort(comparator)
    if(this.direction === "asc") {
      sortedList = sortedList.reverse()
    }
    this.setState({books: sortedList})
    this.direction === "desc" ? this.direction = "asc" : this.direction = "desc"
  },
  sortTitles: function() {
    var comparator = function(a,b) {return a.name.localeCompare(b.name) }
    this.sortList(comparator, "titles")
  },
  sortAuthors: function() {
    var comparator = function(a, b) { return a.authors[0].full_name.trim().localeCompare(b.authors[0].full_name) }
    this.sortList(comparator, "authors")
  },
  sortSubjects: function() {
    var comparator = function(a, b) { return a.subjects[0].localeCompare(b.subjects[0])}
    this.sortList(comparator, "subjects")
  },
  getInitialState: function() {
    var books = []
    for(book in bookData) {
      books.push({
        bookId: book,
        blurb: bookData[book]["doc"]["blurb"],
        // This is assuming there is only one editor ever
        // the fact that this obj is an array means that
        // might not be the case, but the property name
        // indicates it's singular
        editor: bookData[book]["doc"]["editor"][0]["name"],
        authors: bookData[book]["doc"]["authors"],
        name: bookData[book]["doc"]["name"],
        tags: bookData[book]["doc"]["tags"],
        subjects: bookData[book]["doc"]["subjects"],
        languages: bookData[book]["doc"]["languages"]
      })
    }
    return {initialBooks: books, books: [], viewType: this.props.viewType || "list"}
  },
  componentWillMount: function(){
    this.sortTitles()
  },
  render: function() {
    var mainView
    if(this.state.books.length === 0) {
      mainView = <h1>No books match this filter!</h1>
    } else {
      mainView = <BookList viewType={this.state.viewType} books={this.state.books} />
    }
    var viewTypeButton
    if(this.state.viewType === "list") {
      viewTypeButton = <span><i className="fa fa-th-list blue mr1"></i><i className="fa fa-th-large"></i></span>
    } else {
      viewTypeButton = <span><i className="fa fa-th-list mr1"></i><i className="fa fa-th-large blue"></i></span>
    }
    var searchStyle = {
      fontFamily: 'FontAwesome'
    }
    return (
      <section>
      <nav className="full-width">
      <span className="h1 logo white">My Books</span>
      <div className="clearfix white bg-dark-gray">
        <div className="left">
          <span className="button m0 button-nav-dark point">
          <i className="fa fa-align-justify" onClick={this.toggleNavBar}></i>
          </span>
        </div>
        <div className="right">
          <span className="button m0 button-nav-dark" onClick={this.toggleViewType}>{viewTypeButton}</span>
        </div>
        <div className="clearfix sm-hide"></div>
      </div>
      </nav>
      <div id="sortBar" className="sidebar hidden">
        <div className="p1 bg-dark-gray full-height">
          <input type="text" className="mb0 mt2 fit field-dark" placeholder="&#xF002; Search" style={searchStyle} onChange={this.filterList}/>
          <br></br><select className="mb0 fit field-light" onChange={this.changeFilterType}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="tag">Tag</option>
            <option value="subject">Subject</option>
          </select>
          <h3 className="pt2 blue center">SORT BY</h3>
          <span className="button button-blue-outline center full-width" onClick={this.sortTitles}>Titles</span><br></br>
          <span className="button button-blue-outline center full-width" onClick={this.sortAuthors}>Authors</span><br></br>
          <span className="button button-blue-outline center full-width" onClick={this.sortSubjects}>Subjects</span><br></br>
        </div>
      </div>
        <div id="navbar-offset">
          {mainView}
        </div>
      </section>
    )
  }
})
