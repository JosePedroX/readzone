const books = [
  {
    title: "É assim que acaba",
    author: "Colleen Hoover",
    description: "É assim que acaba é o romance mais pessoal da carreira de Colleen Hoover, discutindo temas como violência doméstica e abuso psicológico de forma sensível e direta. ",
    cover: "/imagens/acaba.jpeg",
    category: "Romance",
  },
  {
    title: "A ilha do Tesouro",
    author: "Robert Louis Stevenson",
    description: "Treasure Island é um dos clássicos da literatura infanto-juvenil escrito por Robert Louis Stevenson em 1883, livro sobre piratas e tesouros enterrados",
    cover: "/imagens/ailhadotesouro.jpeg",
    category: "Aventura",
  },
  {
    title: "Jogos vorazes ",
    author: "Suzanne Collins",
    description: "The Hunger Games é um livro de aventura, ação, distópico e pós-apocalíptico para jovens e adultos escrito pela norte-americana Suzanne Collins.",
    cover: "/imagens/jogos vorazes.jpeg",
    category: "Ficção científica",
  },
  {
    title: "Conjurador: O aprendiz",
    author: "Taran Matharu",
    description: "Primeiro volume da série Conjurador, O aprendiz é um prato cheio para os fãs de Harry Potter, O Senhor dos Anéis e outros clássicos da fantasia. Com referências a jogos de RPG, Pokémon e Skyrim, o romance mescla a magia dos mundos fantásticos com criaturas poderosas em duelos de tirar o fôlego.",
    cover: "/images/conjurador.jpeg",
    category: "Aventura",
    
  },

  {
    title: "O Senhor dos Anéis ",
    author: "	J. R. R. Tolkien",
    description: "O Senhor dos Anéis é um livro de alta fantasia, escrito pelo escritor britânico J. R. R. Tolkien. Escrita entre 1937 e 1949, com muitas partes criadas durante a Segunda Guerra Mundial, a saga é uma continuação de O Hobbit.",
    cover: "/images/anel.jpeg",
    category: "Aventura",
  },
];

let favorites = [];
let selectedCategory = "Todos";

const categoriesDiv = document.getElementById("categories");
const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const toggleDarkBtn = document.getElementById("toggleDark");

toggleDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDarkBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";
});

function renderCategories() {
  const categories = ["Todos", ...new Set(books.map(b => b.category))];
  categoriesDiv.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.add("category-btn");
    if (cat === selectedCategory) btn.classList.add("active");
    btn.addEventListener("click", () => {
      selectedCategory = cat;
      renderCategories();
      renderBooks();
    });
    categoriesDiv.appendChild(btn);
  });
}

function toggleFavorite(title) {
  if (favorites.includes(title)) {
    favorites = favorites.filter(t => t !== title);
  } else {
    favorites.push(title);
  }
  renderBooks();
}

function renderBooks() {
  const filteredBooks = selectedCategory === "Todos"
    ? books
    : books.filter(b => b.category === selectedCategory);

  const searchTerm = searchInput.value.trim().toLowerCase();
  const searchedBooks = filteredBooks.filter(b =>
    b.title.toLowerCase().includes(searchTerm) ||
    b.author.toLowerCase().includes(searchTerm)
  );

  booksContainer.innerHTML = "";

  searchedBooks.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="book-cover" />
      <div class="book-content">
        <h2 class="book-title">
          ${book.title}
          <span class="favorite" title="Favoritar">&#9733;</span>
        </h2>
        <p class="book-author">${book.author}</p>
        <p class="book-category">Categoria: ${book.category}</p>
        <p class="book-description">${book.description}</p>
      </div>
    `;

    card.querySelector("img").addEventListener("click", () => {
        localStorage.setItem("livroSelecionado", JSON.stringify(book));
        window.location.href = "livro.html";
      });

    booksContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => renderBooks());
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") renderBooks();
});

// Inicializa
renderCategories();
renderBooks();