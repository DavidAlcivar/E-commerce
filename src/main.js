const BASE__URL = "https://ecommercebackend.fundamentos-29.repl.co/";

async function getProducts() {
    try {
        const data = await fetch(BASE__URL);
        const response = await data.json();
        console.log(response);

    } catch (error) {
        console.log(error);

    }

}
getProducts()