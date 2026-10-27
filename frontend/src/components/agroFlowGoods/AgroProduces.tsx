type ProductResponse = {
    products: Product[],
    total: number,
    skip:number,
    limit:number
}

type Product = {
    id: number,
    title: string,
    price: number,
    thumbnail: string
}

export default async function AgroProduces(){
    const response = await fetch("https://dummyjson.com/products/category/groceries");

    const data: ProductResponse = await response.json();

    return(
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 p-5 bg-green-600">
            {data.products.map((produce)=>(
                <div key={produce.id} className="bg-white p-5 border border-agro-dark rounded text-center">
                    <img src={produce.thumbnail} alt="" />
                    <p>{produce.title}</p>
                    <p>{produce.price}</p>
                </div>
            ))}
        </div>
    )
}