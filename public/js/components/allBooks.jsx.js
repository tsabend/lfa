var AllBooks = React.createClass({
  toggleViewType: function() {
    this.state.viewType === "list" ? this.setState({viewType: "grid"}) : this.setState({viewType: "list"})
  },
  changeFilterType: function(event) {
    this.filterType = event.target.value
  },
  filterType: "title",
  filterList: function(event) {
    var that = this
    var filteredList = this.state.initialBooks
    filteredList = filteredList.filter(function(book){
      // Filter by title
      if(that.filterType === "title"){
        return book.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
      }
      // Filter by author
      else if(that.filterType === "author") {
        var numMatches = book.authors.filter(function(author) {
          return author.full_name.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1
        }).length
        return numMatches > 0
      // Filter by subject
      } else if(that.filterType === "subject") {
        var numMatches = book.subjects.filter(function(subject) {
          return subject.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1
        }).length
        return numMatches > 0
      }
    })
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
    var comparator = function(a, b) { return a.authors[0].full_name.localeCompare(b.authors[0].full_name) }
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
        editor: bookData[book]["doc"]["editor"],
        authors: bookData[book]["doc"]["authors"],
        name: bookData[book]["doc"]["name"],
        tags: bookData[book]["doc"]["tags"],
        subjects: bookData[book]["doc"]["subjects"],
        languages: bookData[book]["doc"]["languages"]
      })
    }
    return {initialBooks: books, books: [], viewType: "list"}
  },
  componentWillMount: function(){
    this.sortTitles()
  },
  render: function() {
    var mainView;
    if(this.state.books.length === 0) {
      mainView = <h1>No books match this filter!</h1>
    } else {
      mainView = <BookList viewType={this.state.viewType} books={this.state.books} />
    }
    return (
      <section>
        <div className="right">
          <button onClick={this.toggleViewType}>{this.state.viewType}</button>
        </div>
        <div id="searchBar">
          <input type="text" placeholder="Search" onChange={this.filterList}/>
          <select onChange={this.changeFilterType}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
          </select>
        </div>
        <div className="clearfix border-bottom">
          <h1>Sort By</h1>
          <span className="left button button-nav-tab" onClick={this.sortTitles}>Titles</span>
          <span className="left button button-nav-tab" onClick={this.sortAuthors}>Authors</span>
          <span className="left button button-nav-tab" onClick={this.sortSubjects}>Subjects</span>
        </div>
        {mainView}
      </section>
    )
  }
})
