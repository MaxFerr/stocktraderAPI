const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex = require('knex');
const app=express();
app.use(bodyParser.json());
app.use(cors());

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'aaaazz1989',
    database : 'stocktrader'
  }
});

app.get('/',(req,res)=>{
	db.select('*').from('stocks')
	.then(stock=>{
		return res.json(stock) 
	})	
})

app.post('/savedstocks',(req,res)=>{				
	const { payload } = req.body;

	db('savedstocks').del()
	.then(()=>{
		for (var i = 0; i < payload.length; i++) {			
			db('savedstocks')
			.returning('*')
			.insert({
			stock_id_foreign:payload[i].id,
		    saved_name: payload[i].name,
		    saved_quantity: payload[i].quantity,
		    saved_price: payload[i].price	
		})
			.then(test=>{
				res.json('data insert')
			})			
		}
		
		res.json('delete')
	})
	//updating article's info
	/*.update({
		stock_id_foreign:stock_id,
	    saved_name: name,
	    saved_quantity: quantity,
	    saved_price: price	    
	  	})
	.returning('*')
	.then(article=>{		
		res.json(article[0])
	})
	.catch(err=>res.status(400).json('Unable to get that article.'))*/
	
})

app.get('/loadstocks',(req,res)=>{
	db.select('*').from('savedstocks')
	.then(stock=>{
		return res.json(stock) 
	})	
})



app.listen(3001);


/* 
get
signin => post success/fail
register => post users
image => put entries
profile/:id =>get user

*/