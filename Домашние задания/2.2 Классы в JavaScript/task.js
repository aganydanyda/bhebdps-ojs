class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state = this.state * 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const book = this.books.find((item) => item[type] === value);
    return book || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((item) => item.name === bookName);
    if (index === -1) {
      return null;
    }
    // splice возвращает массив удалённых элементов, берём первый
    return this.books.splice(index, 1)[0];
  }
}

// Тестовый сценарий
const library = new Library("Городская библиотека");

library.addBook(new DetectiveBook("Артур Конан Дойл", "Собрание рассказов о Шерлоке Холмсе", 2019, 1008));
library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

// Книги 1919 года нет, поэтому создаём и добавляем
console.log(library.findBookBy("releaseDate", 1919)); // null
library.addBook(new NovelBook("Герман Гессе", "Демиан", 1919, 200));
console.log(library.findBookBy("releaseDate", 1919).name); // "Демиан"

const issued = library.giveBookByName("Демиан");
console.log("Книг в библиотеке:", library.books.length); // 4

issued.state = 40;
console.log("После повреждения:", issued.state); // 40

issued.fix();
console.log("После восстановления:", issued.state); // 60

library.addBook(issued);
console.log("Книг после возврата:", library.books.length); // 5