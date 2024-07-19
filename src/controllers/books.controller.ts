import { BodyResponseGetAllBooks, BodyResponseCreateBook, BodyRequestCreateBook, BodyResponseGetById, BodyResponseUpdateBook, BodyRequestUpdateBook, BodyResponseDeleteBook } from '../models/books.model';

export class BooksController {
    public domain: string;
    constructor(domain: string) {
        this.domain = domain;
    }
    async allBooks(token: string, limit: number, page: number): Promise<BodyResponseGetAllBooks> {

        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers
        }
        const response: Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions);
        if (!response.ok) {
            throw new Error(`Error al obtener libros:${response.status}: ${response.statusText}`);
        }
        const responseBodyGetAllBooks: BodyResponseGetAllBooks = await response.json();
        return responseBodyGetAllBooks;
    }


    async create(title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement, summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string): Promise<BodyResponseCreateBook> {
        const NewBook: BodyRequestCreateBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        const reqOption: RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(NewBook)
        };

        const response: Response = await fetch(`${this.domain}/api/v1/books`)
        if (!response.ok) {
            throw new Error(`Error al obtener libros:${response.status}: ${response.statusText}`);
        }
        const responseBodyCreateBook: BodyResponseCreateBook = await response.json();
        return responseBodyCreateBook;
    }

    async getId(id: string, token: string): Promise<BodyResponseGetById> {
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers
        }
        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
        const responseBodyGetById: BodyResponseGetById = await response.json();
        return responseBodyGetById;

    }
    

    async update(idCatche: string, title: HTMLInputElement, author: HTMLInputElement, description: HTMLInputElement, summary: HTMLInputElement, publicationDate: HTMLInputElement, token: string, catche: string): Promise<BodyResponseUpdateBook> {
        const updateBook: BodyRequestUpdateBook ={
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        const reqOption: RequestInit = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updateBook)
        };
        const response: Response = await fetch(`${this.domain}/api/v1/books/${idCatche}`, reqOption);
        if (!response.ok) {
            throw new Error(`Error al obtener libros:${response.status}: ${response.statusText}`);
        }
        const responseBodyUpdateBook: BodyResponseCreateBook= await response.json();
        return responseBodyUpdateBook;
    }
    async delete(id:string, token:string):Promise <BodyResponseDeleteBook>{
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers
        }
        const response: Response = await fetch (`${this.domain}/api/v1/books/${id}`,reqOptions);
        if(!response.ok){
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`)
        }
        const responseBodyDeleteBook: BodyResponseDeleteBook= await response.json();
        return responseBodyDeleteBook;
    }
}
