import { CardTemplateController } from "../controllers/cardTemplate.controller.js";
import { BooksController } from "../controllers/books.controller.js";

const URL_BOOKS: string = "http://190.147.64.47:5155";

const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;
const prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const nextPage = document.getElementById("next-page") as HTMLButtonElement;
const token = localStorage.getItem("authToken");
let currentPage: number = 1;
const limit: number = 10;

btnLogout.addEventListener("click", (e: Event) => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
});

if (!token) {
    alert("Authentication token is missing. Please log in.");
    window.location.href = "index.html";
} else {
    const containerBooks = document.querySelector(".containerBooks") as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const publicationDate = document.getElementById("publication-date") as HTMLInputElement;
    let idCatche: undefined | string;

    const cardTemplete = new CardTemplateController(containerBooks);

    prevPage.addEventListener("click", async (e: Event) => {
        if (currentPage > 1) {
            currentPage--;
            await AllBooks(limit, currentPage);
        }
    });

    nextPage.addEventListener("click", async (e: Event) => {
        currentPage++;
        await AllBooks(limit, currentPage);
    });

    async function AllBooks(limit: number, currentPage: number) {
        const crudBooks = new BooksController(URL_BOOKS);
        try {
            const response = await crudBooks.allBooks(token as string, limit, currentPage);
            console.log(`Respuesta de AllBooks:`, response);
            const books = response.data;
            containerBooks.innerHTML = '';

            for (const book of books) {
                cardTemplete.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
            }

        } catch (error) {
            console.log("Error fetching books:", error);
        }
    }

    AllBooks(limit, currentPage);

    form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);

        if (idCatche === undefined) {
            await crudBooks.create(title, author, description, summary, publicationDate, token as string);
        } else {
            await crudBooks.update(idCatche, title, author, description, summary, publicationDate, token, idCatche as string);
            idCatche = undefined;
        }

        form.reset();
        await AllBooks(limit, currentPage);
    });

    containerBooks.addEventListener("click", async (e: Event) => {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);

            if (e.target.classList.contains("btn-warning")) {
                idCatche = e.target.dataset.id;

                if (idCatche) {
                    const book = await crudBooks.getId(idCatche, token as string);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            } else if (e.target.classList.contains("btn-danger")) {
                const bookId = e.target.dataset.id;

                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delete?");
                    if (confirmDelete) {
                        await crudBooks.delete(bookId, token as string);
                        idCatche = undefined;
                        await AllBooks(limit, currentPage);
                    }
                }
            }
        }
    });
}
