var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    allBooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const reqOptions = {
                method: "GET",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al obtener libros:${response.status}: ${response.statusText}`);
            }
            const responseBodyGetAllBooks = yield response.json();
            return responseBodyGetAllBooks;
        });
    }
    create(title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const reqOption = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(NewBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books`);
            if (!response.ok) {
                throw new Error(`Error al obtener libros:${response.status}: ${response.statusText}`);
            }
            const responseBodyCreateBook = yield response.json();
            return responseBodyCreateBook;
        });
    }
    getId(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const reqOptions = {
                method: "GET",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
            const responseBodyGetById = yield response.json();
            return responseBodyGetById;
        });
    }
    update(idCatche, title, author, description, summary, publicationDate, token, catche) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const reqOption = {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(updateBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${idCatche}`, reqOption);
            if (!response.ok) {
                throw new Error(`Error al obtener libros:${response.status}: ${response.statusText}`);
            }
            const responseBodyUpdateBook = yield response.json();
            return responseBodyUpdateBook;
        });
    }
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const reqOptions = {
                method: "DELETE",
                headers: headers
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
            }
            const responseBodyDeleteBook = yield response.json();
            return responseBodyDeleteBook;
        });
    }
}
