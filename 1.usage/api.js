
let express = require('express');
const app = express();
app.get('/users',(req,res)=>{
    res.json([
        {id:1,name:'bob'}
    ]);
});
app.listen(3000,()=>console.log('3000'));