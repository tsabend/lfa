var AllBooks = React.createClass({displayName: "AllBooks",
  toggleViewType: function() {
    this.state.viewType === "list" ?
    this.setState({viewType: "grid"}) :
    this.setState({viewType: "list"})
  },
  toggleNavBar: function() {
    var searchBar = document.getElementById('sortBar')
    sortBar.classList.contains("display-none") ?
    sortBar.classList.remove("display-none") :
    sortBar.classList.add("display-none")
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
    var mainView
    if(this.state.books.length === 0) {
      mainView = React.createElement("h1", null, "No books match this filter!")
    } else {
      mainView = React.createElement(BookList, {viewType: this.state.viewType, books: this.state.books})
    }
    var viewTypeButton
    if(this.state.viewType === "list") {
      viewTypeButton = React.createElement("span", null, React.createElement("i", {className: "fa fa-th-list blue mr1"}), React.createElement("i", {className: "fa fa-th-large"}))
    } else {
      viewTypeButton = React.createElement("span", null, React.createElement("i", {className: "fa fa-th-list mr1"}), React.createElement("i", {className: "fa fa-th-large blue"}))
    }
    return (
      React.createElement("section", null, 
        React.createElement("div", {className: "right"}, 
          React.createElement("button", {className: "bg-white", onClick: this.toggleViewType}, viewTypeButton)
        ), 
        React.createElement("div", {id: "searchBar"}, 
          React.createElement("input", {type: "text", placeholder: "Search", onChange: this.filterList}), 
          React.createElement("select", {onChange: this.changeFilterType}, 
            React.createElement("option", {value: "title"}, "Title"), 
            React.createElement("option", {value: "author"}, "Author"), 
            React.createElement("option", {value: "subject"}, "Subject")
          )
        ), 
        React.createElement("div", {className: "clearfix border-bottom"}, 
          React.createElement("h1", null, "Sort By"), 
          React.createElement("span", {className: "left button button-nav-tab", onClick: this.sortTitles}, "Titles"), 
          React.createElement("span", {className: "left button button-nav-tab", onClick: this.sortAuthors}, "Authors"), 
          React.createElement("span", {className: "left button button-nav-tab", onClick: this.sortSubjects}, "Subjects")
        ), 
        mainView
      )
    )
  }
})
