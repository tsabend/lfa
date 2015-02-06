/** @jsx React.DOM */

var BookView = React.createClass({
  handleClick: function() {
    React.render(
      <AllBooksView />,
      document.getElementById('books')
    )
    document.getElementById(this.props.book.bookId).scrollIntoView()
  },
  render: function() {
    return (
      <div className="container clearfix center py2">
        <img className="fit thumbnail border" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
        <h1>{this.props.book.name}</h1>
        <h3>{this.props.book.authors}</h3>
        <p>{this.props.book.subjects}</p>
        <p>{this.props.book.blurb}</p>
        <p>{this.props.book.authors}</p>
        <button onClick={this.handleClick}>Back</button>
      </div>
    )
  }
})

var AllBooksView = React.createClass({
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
    return {initialBooks: books, books: []}
  },
  componentWillMount: function(){
    this.sortTitles()
  },
  render: function() {
    var mainView;
    if(this.state.books.length === 0) {
      mainView = <h1>No books match this filter!</h1>
    } else {
      mainView = <BookList books={this.state.books} />
    }
    return (
      <section>
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

var BookList = React.createClass({
  render: function() {
    var bookNodes = this.props.books.map(function(book, index){
      return (
        <li key={index}>
          <BookCell book={book} />
        </li>
      )
    })
    return (
      <ul className="bookList">
        {bookNodes}
      </ul>
    )
  }
})

var BookCell = React.createClass({
  handleClick: function() {
    React.render(
      <BookView book={this.props.book} />,
      document.getElementById('books')
    )
  },
  render: function() {
    var authorsList = this.props.book.authors.map(function(author, index){
      return (
        <li className="authors" key={index}>
          <Author fullName={author["full_name"]} />
        </li>
      )
    })
    return (
      <div className="table bookCell" onClick={this.handleClick}>
        <div className="table-cell pr4">
          <img className="fit thumbnail" src={"../thumbnails/"+ this.props.book.bookId +".jpg"}></img>
        </div>
        <div className="table-cell full-width">
          <h1 className="m0">{this.props.book.name}</h1>
          <h5 className="m0">{this.props.book.subjects}</h5>
          <ul className="m0 py4">{authorsList}</ul>
        </div>
      </div>
    )
  }

})

var Author = React.createClass({
  render: function() {
    return (
      <span>{this.props.fullName}</span>
    )
  }
})


React.render(
  <AllBooksView />,
  document.getElementById('books')
)
