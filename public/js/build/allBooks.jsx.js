var AllBooks = React.createClass({displayName: "AllBooks",
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
      // Filter by tag
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
      sortedList.reverse()
    } 
    this.setState({books: sortedList})
    this.direction = (this.direction === "desc")
      ? "asc"
      : "desc"
  },
  sortTitles: function() {
    var comparator = function(a,b) {return a.name.localeCompare(b.name) }
    this.sortList(comparator, "titles")
  },
  sortAuthors: function() {
    var comparator = function(a, b) {
      return a.authors[0].full_name.trim().localeCompare(b.authors[0].full_name)
    }
    this.sortList(comparator, "authors")
  },
  sortSubjects: function() {
    var comparator = function(a, b) {
      return a.subjects[0].localeCompare(b.subjects[0])
    }
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
    return {
      initialBooks: books,
      books: [],
      viewType: this.props.viewType || "list"
    }
  },
  componentWillMount: function(){
    this.sortTitles()
  },
  render: function() {
    var mainView = (this.state.books.length === 0)
      ? React.createElement("h1", null, "No books match this filter!")
      : React.createElement(BookList, {viewType: this.state.viewType, books: this.state.books})
    var viewTypeButton
    if(this.state.viewType === "list") {
      viewTypeButton =
        React.createElement("span", null, 
          React.createElement("i", {className: "fa fa-th-list blue mr1"}), 
          React.createElement("i", {className: "fa fa-th-large"})
        )
    } else {
      viewTypeButton =
        React.createElement("span", null, 
          React.createElement("i", {className: "fa fa-th-list mr1"}), 
          React.createElement("i", {className: "fa fa-th-large blue"})
        )
    }
    var searchStyle = {
      fontFamily: 'FontAwesome'
    }
    return (
      React.createElement("section", null, 
      /* TOP NAVBAR */
      React.createElement("nav", {className: "full-width"}, 
      React.createElement("span", {className: "h1 logo white"}, "My Books"), 
      React.createElement("div", {className: "clearfix white bg-dark-gray"}, 
        React.createElement("div", {className: "left"}, 
          React.createElement("span", {className: "button m0 button-nav-dark point"}, 
          React.createElement("i", {className: "fa fa-align-justify", 
            onClick: this.toggleNavBar})
          )
        ), 
        React.createElement("div", {className: "right"}, 
          React.createElement("span", {className: "button m0 button-nav-dark", 
            onClick: this.toggleViewType}, viewTypeButton)
        ), 
        React.createElement("div", {className: "clearfix sm-hide"})
      )
      ), 
      /* POP-OUT SIDEBAR */
      React.createElement("div", {id: "sortBar", className: "sidebar hidden"}, 
        React.createElement("div", {className: "p1 bg-dark-gray full-height"}, 
          React.createElement("input", {type: "text", className: "mb0 mt2 fit field-dark", 
            placeholder: " Search", 
            style: searchStyle, 
            onChange: this.filterList}), 
          React.createElement("select", {className: "mb0 fit field-light", onChange: this.changeFilterType}, 
            React.createElement("option", {value: "title"}, "Title"), 
            React.createElement("option", {value: "author"}, "Author"), 
            React.createElement("option", {value: "tag"}, "Tag"), 
            React.createElement("option", {value: "subject"}, "Subject")
          ), 
          React.createElement("h3", {className: "pt2 blue center"}, "SORT BY"), 
          React.createElement("button", {className: "button button-blue-outline center full-width", 
            onClick: this.sortTitles}, "Titles"), 
          React.createElement("button", {className: "button button-blue-outline center full-width", 
            onClick: this.sortAuthors}, "Authors"), 
          React.createElement("button", {className: "button button-blue-outline center full-width", 
            onClick: this.sortSubjects}, "Subjects")
        )
      ), 
      /* MAIN LIBRARY VIEW */
        React.createElement("div", {id: "navbar-offset"}, 
          mainView
        )
      )
    )
  }
})
