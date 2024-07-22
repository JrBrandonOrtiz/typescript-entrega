import {UsersCrud} from "./controllers/controllers.user.js"

const URL_USERS:string = "http://190.147.64.47:5155/api/v1";

const form = document.querySelector("form") as HTMLFormElement;
const email= document.querySelector("#email") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;

form.addEventListener("submit", async(e:Event) => {
    e.preventDefault();
    const crudUsers = new UsersCrud(URL_USERS);
    const respuesta = await crudUsers.login(email,password);
    
    const token:string | null = respuesta.data.token;

    if(token){
        localStorage.setItem('authToken', token);
        window.location.href = "book.html";
        
    }else {
    console.log("login fallo");
    // limpiar el formulario
    form.reset();
    }
})

