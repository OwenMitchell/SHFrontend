export default function Merch({ items, addToCart }){
    return (
        <div className="merch">
            <h2>Merch</h2>
            <div className="merch_items">
                {items.map(item => (<Item  
                    item={item} 
                    addToCart={addToCart}/>
                ))}
            </div>   
        </div>
    )
}


function Item({ item, addToCart}){
    console.log(item)
    return (
        <div className="item">
            <img onClick={() => addToCart(item)} className="item_image" src={item.image} />
            <p className="item_name">{item.name}</p>
            <p className="item_price">{item.price}</p>
            <select id={`size_${item.id}`} >{item.sizes.map(size => (<option value={size}>{size}</option>))}</select>
        </div>
    )
}