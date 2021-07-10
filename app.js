const express = require ("express")
const app = express()
const {products} = require ("./models/products")

app.use(express.json())

app.get('/products', (req, res )=>{
    res.status(200).json(products);
})

app.post('/products', (req, res) => {
  const { name , price, desc, image } = req.body
  if (!name|| !price|| !desc || !image ) {
    return res.status(400).json({ success: false, msg: 'please provide name, price,desc,image' })
  }
  const newProducts = {id:products.length + 1 , name: name, price: price, desc:desc, image: image }
  products.push( newProducts);

  res.status(200).json({ success: true, data: products })
})

app.put('/products/:id',(req, res)=>{
const {id} = req.params
const { name , price, desc, image } = req.body
const product = products.find((product)=> product.id=== Number (id))

if (!product)
return res.status(400).json({ success: false, msg:` no products with id ${id}`})

const newProduct = products.map((product)=>{
  if (product.id=== Number (id)){
  product.id=Number (id) 
  product.name = name
  product.price = price
  product.desc = desc
  product.image = image
  
  }
  return product
})
res.status(200).json({ success: true, data: newProduct })

})

app.delete ('/products/:id',(req, res)=>{
  const {id} = req.params
  
    const product = products.find((product) => product.id === Number(req.params.id))
    if (!product) {
      return res.status(404).json({ success: false, msg: `no product with id ${id}` })
    }
    const newProduct = products.filter(
      (product) => product.id !== Number(id)
    )
    return res.status(200).json({ success: true, data: newProduct})
  })
app.listen(7000, () => {
  console.log(`Express server is currently running on port 7000`)
});