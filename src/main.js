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
async function main() {
    const products = await getProducts();

    let html = "";

    products.forEach(function ({
        category,
        description,
        id,
        image,
        name,
        price,
        quantity

    }) {
        console.log({
            category,
            description,
            id,
            image,
            name,
            price,
            quantity,
        });

        html += `
        <div class="product">
            <div class="product__img">
                <img src="${image}" alt="">
            </div>
            <h3>${name}</h3>
        </div>
            
        `;


    });

    document.querySelector(".products").innerHTML = html;
}

main();