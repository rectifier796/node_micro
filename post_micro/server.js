import express from 'express';
import cors from 'cors';
import Routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 5002;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/",(req,res)=>{
    return res.json({message: "It's working ..."});
})

app.use(Routes);

app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`));