//1 اي شي احمله وبسوي له استدعاء
const express =require ("express")
const cors =require ("cors")
const dotenv =require ('dotenv')
const morgan=require ("morgan")

//اعدادات الملف
dotenv.config();
// 2 بدء التشغل 
const app =express ();


// 3 middleware اي شي حملته وبسوي وابغى استخدمه لازم اكتبه هينا
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))






// 4  اعدادات البورت
const PORT = process.env.PORT || 3000;

//4 يشغل لي السرفير
app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});