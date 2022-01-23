//1 اي شي احمله وبسوي له استدعاء
const express =require ("express")
const cors =require ("cors")
const dotenv =require ('dotenv')
const morgan=require ("morgan")
require("./db/index");

//اعدادات الملف

dotenv.config();


// 2 بدء التشغل 
const app =express ();




// جميع الراوترات يلي سويته 
const userRouter = require("./routers/routes/user");
const servicesRouter =require ('./routers/routes/services')
const commentRouter =require ('./routers/routes/comments')
const roleRouter=require ('./routers/routes/role')
//const businessRouter=require ('./routers/routes/business')
// 3 middleware اي شي حملته او بنيته وابغى استخدمه لازم اكتبه هينا
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
app.use(userRouter)
app.use(servicesRouter)
app.use(commentRouter)
app.use(roleRouter)
//app.use(businessRouter)



// 4  اعدادات البورت
const PORT = process.env.PORT || 5000;

//4 يشغل لي السرفير
app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});