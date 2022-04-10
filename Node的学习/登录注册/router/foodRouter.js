const express=require('express');
const router=express.Router();
const foodModel=require('../../crud/foodModel');
/**
 * @api {post} /food/add 添加菜品
 * @apiName addfood
 * @apiGroup Food
 *
 * @apiParam {String} name 用户名
 * @apiParam {String} price 用户密码.
 * @apiParam {String} desc 验证码.
 * @apiParam {String} typename 用户名
 * @apiParam {String} typeid 用户密码.
 * @apiParam {String} img 验证码.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add',(req,res)=>{
    let data={
        name:'火山飘雪',
        price:'9999',
        desc:'难吃',
        typename:'凉菜',
        typeid:1,
        img:'https://www.baidu.com/link?url=IuuRgeQc61ROECyNmiONdUR-1Qxu8R-N0pplsgXiJXr_KDMyhlwZoczYV-Sgy7JV5fQ2f-O7Bhnseh5_GW5pODqI3PevrZPb-fziFdCOoWF490AOvPGfIGtYHeOuCvVTOFegWxabr-kdTVI867W1YjejVZLanxUKIF5xy_PvSteHkDU77a6gO_FqVAowAGHGBdCoIOWKR-Woxc12tiNBn3AycDrpLNBfjT5GgekJporo4Sh-8n71wvlNvZAQrcJy557y3mppFzH9o6NURTr68HlBJob44mG_h2Eq5G5GV1GPRrvLa_sa4oClT9FNzFVNeyQO3Js5l0WAsjm0ExrG5LD7RYS_0TVEtg8SHSJGGcvUqHRIxxIjvuU_2_jpWXwMWiUMTEtamCS-og3zdB7BqSI13uk9K0s6FNOflIi4LooBWw1fIUPBnFE7SgEoL8jL_CYUlf5B3SqikhT7Gup7CdsNUbescwCykkT6YjZfArQzXg0YwEn5BZS4zjHKe_p7XfknLQWoCWWad4i6T3cmvgtN3K_40Kj_iI0rnywEa1LGCrbxZ6e8L1t-ZGuNmcPOwH9BqqnQddq6Bl-Ds9Pv99K8lbZbJImObyJo3h7yEIAHa-vyPcZcfKLRVVJTeGVG-ls-V8l6EgU7ihBObNnJHa&timg=&click_t=1602887793287&s_info=1349_624&wd=&eqid=f3fa9d400000e376000000065f8a206d',
    }
    foodModel.inserMany(data)
    .then((data)=>{
        res.send({err:0,msg:'添加成功'})
    })
    .catch(()=>{
        res.send({err:-1,msg:"添加失败"})
    })
})





module.exports=router;