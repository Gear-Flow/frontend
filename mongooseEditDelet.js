
const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { ReturnDocument } = require('mongodb');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyparser.urlencoded({extended:false}));
app.use(logger('dev'));


let database;
let UserSchema;
let UserModel;


router.route('/list').get((req, res) => {
    if(database){
        UserModel.findAll((err, result) => {
            if(err){
                console.log('리스트 조회 실패');
                return;
            }else{
                if(result){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원 리스트</h2>');
                    res.write('<div><ul>');
                    for(let i=0; i<result.length; i++){
                        const userid = result[i].userid;
                        const name = result[i].name;
                        const gender = result[i].gender;
                        res.write(`<li>${i} : ${userid} / ${name} / ${gender}</li>`);
                    }
                    res.write('</ul></div>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원 정보가 없음</h2>');
                    res.end();
                }
            }
        });
    }
});


// 127.0.0.1:3000/edit (post)
router.route('/edit').post((req, res) => {

    const useridx = req.body.useridx;
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    if(database){
        UserModel.findAll((err, result) => {
            if(err){
                console.log('해당 사용자가 없습니다. 조회 실패');
                return;
            }else{
                if(result){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>해당 사용자가 있습니다.</h2>');
                    res.write('<div><ul>');
                    for(let i=0; i<result.length; i++){
                        const userid = result[i].userid;
                        const name = result[i].name;
                        const gender = result[i].gender;
                        res.write(`<li>${i} : ${userid} / ${name} / ${gender}</li>`);
                    }

                    editUser(useridx,userid, userpw,name,gender, (err, result) => {
                        if(err){
                            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                            res.write('<h2>정보수정 실패 1번째</h2>');
                            res.end();
                        }else{
                            if(result){
                                console.dir(result);
                             
                                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                                res.write(`<p>아이디 : ${userid}</p>`);
                                res.write(`<p>비밀번호 : ${userpw}</p>`);
                                res.write(`<p>이름 : ${name}</p>`);
                                res.write(`<p>성별 : ${gender}</p>`);
                                res.write(`<p>위와같이 수정되었습니다.</p>`);
                                res.end();
                            }else{
                                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                                res.write('<h2>정보수정 실패 2번째</h2>');
                                res.end();
                            }
                        }
                    });

                    res.write('</ul></div>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원 정보가 없음</h2>');
                    res.end();
                }
            }
        }
    )};
   
// 127.0.0.1:3000/edit (post)
router.route('/delete').post((req, res) => {


    const userid = req.body.userid;
    const name = req.body.name;
 

    if(database){
        UserModel.findAll((err, result) => {
            if(err){
                console.log('해당 사용자가 없습니다. 조회 실패');
                return;
            }else{
                if(result){     
                //회원 삭제하는 함수
                deleteUser(userid,name,(err,result)=>{
                    console.log('삭제했습니다.');
                });
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
                    res.write('<h2>회원 정보가 없음</h2>');
                    res.end();
                }
            }
        }
    )};


//회원 삭제하는 함수
    const deleteUser = function(userid,name){
        UserModel.findOne({userid:userid},{name:name}, function(err, result) { 
        if ( result ) { result.name = name; 
    result.remove(function(err, product) { console.log('삭제했습니다'); }); } });
 }

 

  
const editUser = function(useridx,userid, userpw, name, gender, callback){ //기존의 아이디를 인덱스 삼아 회원정보를 수정합니다.
    UserModel.findById(useridx, (err,user)=>{ 
        if(err){   
            console.log(err);
            console.log('유저모델 파인드 실패');
            callback(err, null);
            return;
        }
        user.userid = userid;
        user.userpw = userpw;
        user.name = name;
        user.gender = gender;

        user.save((err)=>{
            if(err){
                console.log(err);
                callback(err, null);
                return;
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
                res.write('<h2>회원 정보수정</h2>');
                res.end();
            }
        });
    });
}
  



  function connectDB(){
    const uri = "mongodb://127.0.0.1:27017/frontend";
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    database = mongoose.connection;
    database.on('error', console.error.bind(console, "mongoose 연결 실패!"));
    database.on('open', () => {
        console.log('데이터베이스 연결 성공!');
        UserSchema = mongoose.Schema({
            userid:String,
            userpw:String,
            name:String,
            gender:String
        });
        console.log('UserSchema 생성 완료!');

        UserSchema.static('findAll', function(callback){
            return this.find({}, callback);
        });

        UserModel = mongoose.model('user', UserSchema);
        console.log('UserModel이 정의됨!');
    });
}


app.use('/', router);

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중 ... `);
    connectDB();
});
