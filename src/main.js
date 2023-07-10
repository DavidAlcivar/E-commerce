const BASE__URL = "https://ecommercebackend.fundamentos-29.repl.co/";

async function getProducts() {
    try {
        const data = await fetch(BASE__URL);
        const response = await data.json();
        return response

    } catch (error) {
        console.log(error);

    }

}
function printProducts(store) {
    let html = "";

    store.products.forEach(function ({
        category,
        description,
        id,
        image,
        name,
        price,
        quantity

    }) {

        html += `
        <div class="product">
            <div class="product__img">
                <img src="${image}" alt="">
            </div>
            <h3>${name}</h3>
            <p>$${price}.0 - ${quantity} unidades</p>
            <button class="product__btn" id= "${id}">Agregar</button>

        </div>
            
        `;
    });

    document.querySelector(".products").innerHTML = html;

}
async function main() {
    const store = {
        products: await getProducts(),
        bag: {}
    }
    printProducts(store)


}

main();