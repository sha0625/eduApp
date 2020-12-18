/**
 * Created by ROG STRIX S5 on 2017/7/9.
 */
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let fs = require("fs");
let path = require("path");
let router = express.Router();
var fileUpload = require('express-fileupload');
// var multer = require('multer');
// var objMulter = multer({dest: '../src/www/upload/'});
var mysql = require('mysql');
app.use(fileUpload());
const pathLib = require('path');
const jwt = require('jsonwebtoken'); 
var https = require('https');
var http = require('http');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
// app.use(objMulter.any());
// var connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '3306',
//     user: 'root',
//     password: 'Sarmusliu136883',
//     database: 'Sarmus',
//     multipleStatements: true
// });



// connection.connect();

// var sql = 'select * from t_category where id=1';

// connection.query(sql,function(err,res,filed){
//     console.log(err);
//     console.log('-------------');
//     console.log(res);
//     console.log('---------------');
//     console.log(filed);
// })

// var options = {
//     key: fs.readFileSync('/usr/local/nginx/conf/2_campus.unclesarmus.com.key'),
//     cert: fs.readFileSync('/usr/local/nginx/conf/1_campus.unclesarmus.com_bundle.crt')
//   };
// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(options, app);

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.get('/', function (req, res) {
//     res.send('Hello World');
// });


// /**
//  * admin系统相关
//  */
// //登录接口
// app.post('/admin/login', function (req, res) {
//     console.log(req.body);
//     if (!req.body) {
//         res.json({
//             code: -1,
//             msg: '登录参数异常111',
//             data: {}
//         });
//         return;
//     }
//     var userName = req.body.username;
//     var password = req.body.password;
//     if (!userName || !password) {
//         res.json({
//             code: -1,
//             msg: '登录参数异常2222',
//             data: {}
//         });
//         return;
//     }
//     connection.query('SELECT * FROM t_admin WHERE name = ? AND password = ?', [userName, password], function (err, rows) {
//         if (err) {
//             res.json({
//                 code: -1,
//                 msg: '登录失败',
//                 data: false
//             });
//         } else {
//             if (rows && rows.length > 0) {
//                 res.json({
//                     code: 1,
//                     msg: '登录成功',
//                     data: true
//                 });
//             } else {
//                 res.json({
//                     code: -1,
//                     msg: '用户不存在',
//                     data: false
//                 });
//             }
//         }
//     })
// });

/**
 * admin系统相关
 */
//登录接口
app.get('/admin/Login', function (req, res) {
    console.log(req.query);
    var userName = req.query.username;
    var password = req.query.password;
    if (!req.query) {
        res.json({
            code: -1,
            msg: '登录参数异常111',
            data: {}
        });
        return;
    }
    if (!userName || !password) {
        res.json({
            code: -1,
            msg: '登录参数异常2222',
            data: {}
        });
        return;
    }
    var phoneReg = /^1[3-578]\d{9}$/;
    var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    function isPhoneAvailable(phonevalue){
       if(phoneReg.test(phonevalue)){
           return true;
       }else{
           return false;
       }
    }
    function isEmailAvailable(emailvalue){
        if(mailReg.test(emailvalue)){
            return true;
        }else{
            return false;
        }
     }
    if(isPhoneAvailable(userName))
    {
        connection.query('SELECT realname,userid,type FROM user_list WHERE phone = ? AND password = ?', [userName, password], function (err, rows) {
            if (err) {
                res.json({
                    code: -1,
                    msg: '登录失败',
                    data: false
                });
            } else {
                if (rows && rows.length > 0) {
                    // let content ={name:userName}; // 要生成token的主题信息
                    // let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
                    // let token = jwt.sign(content, secretOrPrivateKey, {
                    //     expiresIn: 60*60*1  // 1小时过期
                    // });
                    // rows[0].token=token
                    res.json({
                        code: 1,
                        msg: '登录成功',
                        data: rows
                    });
                } else {
                    res.json({
                        code: -1,
                        msg: '用户不存在',
                        data: false
                    });
                }
            }
        })
    }
    else if (isEmailAvailable(userName))
    {
        connection.query('SELECT realname,userid,type FROM user_list WHERE email = ? AND password = ?', [userName, password], function (err, rows) {
            if (err) {
                res.json({
                    code: -1,
                    msg: '登录失败',
                    data: false
                });
            } else {
                if (rows && rows.length > 0) {
                    // let content ={name:userName}; // 要生成token的主题信息
                    // let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
                    // let token = jwt.sign(content, secretOrPrivateKey, {
                    //     expiresIn: 60*60*1  // 1小时过期
                    // });
                    // rows[0].token=token
                    res.json({
                        code: 1,
                        msg: '登录成功',
                        data: rows
                    });
                } else {
                    res.json({
                        code: -1,
                        msg: '用户不存在',
                        data: false
                    });
                }
            }
        })
    }
    else{
        connection.query('SELECT realname,userid,type FROM user_list WHERE username = ? AND password = ?', [userName, password], function (err, rows) {
            if (err) {
                res.json({
                    code: -1,
                    msg: '登录失败',
                    data: false
                });
            } else {
                if (rows && rows.length > 0) {
                    // let content ={name:userName}; // 要生成token的主题信息
                    // let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
                    // let token = jwt.sign(content, secretOrPrivateKey, {
                    //     expiresIn: 60*60*1  // 1小时过期
                    // });
                    // rows[0].token=token
                    res.json({
                        code: 1,
                        msg: '登录成功',
                        data: rows
                    });
                } else {
                    res.json({
                        code: -1,
                        msg: '用户不存在',
                        data: false
                    });
                }
            }
        })
    }
});

//用户注册前准备
app.get('/admin/signup_ready', function (req, res) {
    connection.query('SELECT phone,code,child_name FROM user_list WHERE ISNULL(password) AND child_name <> ""', function (err, rows) {
            if (!err) {
                res.json({
                    code: 1,
                    msg: '查询成功',
                    data: rows
                });
            } else {
                res.json({
                    code: -1,
                    msg: '查询失败',
                    data: true
                });
            }
        });
});
//用户注册
app.post('/admin/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phone = req.body.phone;
    var code = req.body.code;
    var qq =req.body.qq;
    var city = req.body.city;
    var id_card = req.body.id_card
    connection.query('UPDATE user_list SET username = ? , phone = ? , email = ? , password = ? , qq = ? WHERE code = ? ; UPDATE students_list SET city = ? , id_card = ? WHERE id in (SELECT userid from user_list WHERE code = ?)',
        [username,phone,email,password,qq,code,city,id_card,code]
        , function (err, rows) {
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: rows
                });
            } else {
                res.json({
                    code: -1,
                    msg: '邀请码错误',
                    data: msg
                });
            }
        });
});
//某老师的学生列表
app.get('/admin/mystudent', function (req, res) {
    let teacher = req.query.teacher
    connection.query('SELECT * FROM students_class WHERE TEACHER_NAME = ? order by STUDENT_ID',[teacher], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教师所教的课程
app.get('/admin/teacherscourse', function (req, res) {
    var teachername = req.query.teachername
    console.log(req.body);
    connection.query('SELECT COURSE1,COURSE2,COURSE3 FROM teachers_list WHERE LOGIN_NAME = ?', [teachername], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教师排课记录（教学-教学日历）
app.get('/admin/teacher_allevents', function (req, res) {
    var id = req.query.id;
    console.log(id)
    connection.query('SELECT * FROM course_plan where STATE=1 and TEACHER_ID=? ORDER BY COURSE_TIME DESC;SELECT * FROM homework_list where  TEACHER_ID=? ORDER BY SUBMISSION_DATE DESC',[id,id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//学员列表查询接口
app.get('/admin/studentslist', function (req, res) {
    connection.query('SELECT * FROM students_list ORDER BY id ASC;SELECT STUDENT_ID , SUM(TOTAL) AS TOTAL , SUM(CONSUMED) AS CONSUMED , SUM(ARRANGED) AS ARRANGED FROM students_class GROUP BY STUDENT_ID',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});


//获取改课记录
app.get('/admin/getcoursechangerecord', function (req, res) {
    connection.query('SELECT * FROM coursechange_record ORDER BY id DESC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});


//开班列表查询接口
app.get('/admin/classlist', function (req, res) {
    connection.query('SELECT * FROM class_list ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//班型设置查询接口
app.get('/admin/classtype', function (req, res) {
    connection.query('SELECT * FROM class_type ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//校区列表查询接口
app.get('/admin/campus', function (req, res) {
    connection.query('SELECT * FROM campus_list ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//教室列表查询接口
app.get('/admin/room', function (req, res) {
    let campus = req.query.campus
    connection.query('SELECT * FROM room_list WHERE CAMPUS = ? ORDER BY id ASC',[campus],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//新增教室
app.post('/admin/addroom', function (req, res) {
    let newRoom = req.body.newRoom
    let teacher = req.body.teacher
    let campus = req.body.campus
    console.log(req.body)
    connection.query('INSERT INTO room_list SET CAMPUS = ? , TEACHER = ? , NAME = ?',[campus,teacher,newRoom],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//作业统计
app.get('/admin/gethomework', function (req, res) {
    connection.query('SELECT * FROM homework_list ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//查询所有学生姓名
app.get('/admin/allstudentname', function (req, res) {
    connection.query('SELECT DISTINCT STUDENT_ID,STUDENT_NAME FROM students_class ORDER BY STUDENT_ID ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//查询所有学生姓名
app.get('/admin/allstudentnamesubject', function (req, res) {
    connection.query('SELECT STUDENT_ID,STUDENT_NAME,SUBJECT_B FROM students_class ORDER BY STUDENT_ID ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});


//查询所有督导
app.get('/admin/allsupervisor', function (req, res) {
    connection.query('SELECT id,NAME,BREAK_DAY FROM supervisors_list ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//获取老师信息列表（教室）
app.get('/admin/allteachers', function (req, res) {
    connection.query('SELECT * FROM teachers_list ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//获取排课信息(未完成)
app.get('/admin/allevents', function (req, res) {
    connection.query('SELECT * FROM course_plan where STATE=1 ORDER BY COURSE_TIME DESC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//获取排课信息(未完成、已完成)
app.get('/admin/realallevents', function (req, res) {
    connection.query('SELECT * FROM course_plan WHERE STATE = 0 OR STATE = 1 ORDER BY id ASC',function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//排课查询接口
app.get('/admin/classplan', function (req, res) {
    var studentid =req.query.studentid;
    connection.query('SELECT * FROM students_class where STUDENT_ID=?',[studentid],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});
//排课日历学生排课安排
app.get('/admin/courseplan', function (req, res) {
    var studentid = req.query.studentid;
    connection.query('SELECT * FROM course_plan where STUDENT_ID=? and STATE>-1',[studentid],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});
//排课日历老师排课安排
app.get('/admin/courseplanteacher', function (req, res) {
    var teachername = req.query.teachername;
    console.log(teachername)
    connection.query('SELECT * FROM course_plan where TEACHER_NAME in (?) and STATE>-1',[teachername],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});
//排课确认
app.post('/admin/updatecourseplan', function (req, res) {
        var studentid = req.body.studentid;
        var studentname = req.body.studentname;
        var timerankid = req.body.timerankid;
        // var courseid = req.body.courseid;
        // var subjectid = req.body.subjectid;
        var coursetime = req.body.coursetime;
        var teachername = req.body.teachername;
        var teacherid = req.body.teacherid;
        var subjectname = req.body.subjectname;
        var roomid = req.body.roomid;
        var type = req.body.type;
        var supervisorname = req.body.supervisorname;
        var supervisorid = req.body.supervisorid;
        // console.log(timerankid)
        // console.log(courseid)
        // console.log(subjectid)
        // console.log(coursetime)
        console.log(studentname)
        connection.query('INSERT INTO course_plan (STUDENT_ID,STUDENT_NAME,SUBJECT_NAME,TIMERANK_ID,COURSE_TIME,TEACHER_NAME,TEACHER_ID,ROOM_ID,TYPE,SUPERVISOR_NAME,SUPERVISOR_ID,STATE)  VALUES  (?,?,?,?,?,?,?,?,?,?,?,1);UPDATE students_class SET ARRANGED=ARRANGED+2 WHERE STUDENT_ID=? AND SUBJECT_B=?',
            [studentid,studentname,subjectname,timerankid,coursetime,teachername,teacherid,roomid,type,supervisorname,supervisorid,studentid,subjectname]
            , function (err, rows) {
                if (!err) {
                    res.json({
                        code: 1,
                        msg: '更新成功',
                        data: true
                    });
                } else {
                    res.json({
                        code: -1,
                        msg: '执行失败',
                        data: true
                    });
                }
            });
});

//按课程类型更改排课时间
app.post('/admin/updatecoursetime', function (req, res) {
    var id = req.body.id;
    var ytime = req.body.ytime;
    var subjectname = req.body.subjectname;
    console.log(req.body)
          connection.query('UPDATE students_class SET ARRANGED=? WHERE STUDENT_ID=? AND SUBJECT_B=?',
          [ytime,id,subjectname]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//更改课
app.post('/admin/coursechange', function (req, res) {
    var id = req.body.eventid;
    var newdate = req.body.newdate;
    var newtimerank = req.body.newtimerank
    connection.query('UPDATE course_plan SET STATE=-2 WHERE id=? ;INSERT INTO course_plan (STUDENT_ID,STUDENT_NAME,SUBJECT_NAME,TIMERANK_ID,COURSE_ID,SUBJECT_ID,COURSE_TIME,TEACHER_NAME,ROOM_ID,TYPE,STATE) SELECT STUDENT_ID,STUDENT_NAME,SUBJECT_NAME,? AS TIMERANK_ID,COURSE_ID,SUBJECT_ID,? AS COURSE_TIME,TEACHER_NAME,ROOM_ID,TYPE,1 AS STATE FROM course_plan WHERE id=?',
          [id,newtimerank,newdate,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//取消课
app.post('/admin/coursecancel', function (req, res) {
    var eventid = req.body.eventid;
    console.log(eventid)
    connection.query('UPDATE course_plan SET STATE=-1 where id=?',[eventid], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//更新改课记录
app.post('/admin/coursechangerecord', function (req, res) {
    console.log(req.body)
    var reason = req.body.reason;
    var studentname = req.body.studentname;
    var studentid = req.body.studentid;
    var teachername = req.body.teachername;
    var teacherid = req.body.teacherid;
    var subjectname = req.body.subjectname;
    var ori_date = req.body.ori_date;
    var ori_timerank = req.body.ori_timerank;
    var type = req.body.type;
    var port = req.body.port;
    var date = req.body.date;
    var applytype = req.body.applytype;
    var result = req.body.result;
    var newdate = req.body.newdate;
    var newtimerank = req.body.newtimerank;
    var ifConsume = req.body.ifConsume
    if(ifConsume == '消耗'){
        connection.query("set @IF_CONSUME=?;INSERT INTO coursechange_record (STUDENT,STUDENT_ID,TEACHER,TEACHER_ID,SUBJECT,ORI_DATE,ORI_TIMERANK,TYPE,PORT,DATE,REASON,APPLY_TYPE,RESULT,NEW_DATE,NEW_TIMERANK,IF_CONSUME)  VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@IF_CONSUME);UPDATE students_class SET CONSUMED = CONSUMED+2 WHERE STUDENT_ID=? AND SUBJECT_B=?",[ifConsume,studentname,studentid,teachername,teacherid,subjectname,ori_date,ori_timerank,type,port,date,reason,applytype,result,newdate,newtimerank,studentid,subjectname], function (err, rows) {   
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: true
                });
            } else {
                res.json({
                    code: -1,
                    msg: '执行失败',
                    data: true
                });
            }
        });
    }
    else{
        connection.query("set @IF_CONSUME=?;INSERT INTO coursechange_record (STUDENT,STUDENT_ID,TEACHER,TEACHER_ID,SUBJECT,ORI_DATE,ORI_TIMERANK,TYPE,PORT,DATE,REASON,APPLY_TYPE,RESULT,NEW_DATE,NEW_TIMERANK,IF_CONSUME)  VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@IF_CONSUME);UPDATE students_class SET ARRANGED=ARRANGED-2 WHERE STUDENT_ID=? AND SUBJECT_B=?",[ifConsume,studentname,studentid,teachername,teacherid,subjectname,ori_date,ori_timerank,type,port,date,reason,applytype,result,newdate,newtimerank,studentid,subjectname], function (err, rows) {   
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: true
                });
            } else {
                res.json({
                    code: -1,
                    msg: '执行失败',
                    data: true
                });
            }
        });
    }
});
// SET @sql = CONCAT("UPDATE class_plan SET ",tof_read_t," = ? WHERE id=?")

// SET @col = CONCAT("?");SET @sql = CONCAT("UPDATE class_plan SET ",@col," = ",?," WHERE id = 1");PREPARE stmt FROM @sql;EXECUTE stmt;DEALLOCATE PREPARE stmt;

//批量更改教师
// app.post('/admin/multichangeteacher', function (req, res) {
//     var studentid = req.body.studentid;
//     var teacher = req.body.teacher;
//     var subject = req.body.subject;
//     var teachersum = req.body.teachersum;
//     var field = req.body.field;
//     var port = req.body.port;
//     var reason = req.body.reason;
//     var date = req.body.date;
//     console.log(subject)
//     console.log(field)
//     console.log(teachersum)
//     console.log(studentid)
//     console.log(date)
//     connection.query('INSERT INTO coursechange_record (STUDENT,TEACHER,SUBJECT,ORI_DATE,ORI_TIMERANK,TYPE,PORT,DATE,REASON,APPLY_TYPE,NEW_TEACHER,RESULT) SELECT STUDENT_NAME,TEACHER_NAME, SUBJECT_NAME,COURSE_TIME,TIMERANK_ID,TYPE,?,?,?,"更换教师",?,"更换成功" FROM course_plan WHERE STUDENT_ID = ? and SUBJECT_NAME = ? and STATE = 1;UPDATE course_plan SET TEACHER_NAME = ? where STUDENT_ID = ? and SUBJECT_NAME = ? and STATE = 1;SET @col = CONCAT(?);SET @sql = CONCAT("UPDATE class_plan SET ",@col," = ? WHERE id = 1");PREPARE stmt FROM @sql;EXECUTE stmt;DEALLOCATE PREPARE stmt',[port,date,reason,teacher,studentid,subject,teacher,studentid,subject,field,teachersum], function (err, rows) {
//               if (!err) {
//                   res.json({
//                       code: 1,
//                       msg: '更新成功',
//                       data: true
//                   });
//               } else {
//                   res.json({
//                       code: -1,
//                       msg: '执行失败',
//                       data: true
//                   });
//               }
//           });
// });

//批量更改教师
app.post('/admin/multichangeteacher', function (req, res) {
    var teacher = req.body.teacher;
    var port = req.body.port;
    var reason = req.body.reason;
    var date = req.body.date;
    var id = req.body.id;
    connection.query('INSERT INTO coursechange_record (STUDENT,TEACHER,SUBJECT,ORI_DATE,ORI_TIMERANK,TYPE,PORT,DATE,REASON,APPLY_TYPE,NEW_TEACHER,RESULT) SELECT STUDENT_NAME,TEACHER_NAME, SUBJECT_NAME,COURSE_TIME,TIMERANK_ID,TYPE,?,?,?,"更换教师",?,"更换成功" FROM course_plan WHERE id = ?;UPDATE course_plan SET TEACHER_NAME = ? where id = ?',[port,date,reason,teacher,id,teacher,id], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//批量更改督导
app.post('/admin/multichangesupervisor', function (req, res) {
    console.log(req.body)
    var supervisorname = req.body.supervisorname;
    var supervisorid = req.body.supervisorid;
    var port = req.body.port;
    var reason = req.body.reason;
    var date = req.body.date;
    var eventid = req.body.eventid;
    connection.query('INSERT INTO coursechange_record (STUDENT,TEACHER,SUPERVISOR,SUBJECT,ORI_DATE,ORI_TIMERANK,TYPE,PORT,DATE,REASON,APPLY_TYPE,NEW_SUPERVISOR,RESULT) SELECT STUDENT_NAME,TEACHER_NAME,SUPERVISOR_NAME,SUBJECT_NAME,COURSE_TIME,TIMERANK_ID,TYPE,?,?,?,"更换督导",?,"更换成功" FROM course_plan WHERE id = ? ;UPDATE course_plan SET SUPERVISOR_NAME = ?,SUPERVISOR_ID = ? where id = ?',[port,date,reason,supervisorname,eventid,supervisorname,supervisorid,eventid], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//批量更改学生类型
app.post('/admin/multichangetype', function (req, res) {
    console.log(req.body)
    var type = req.body.type;
    var port = req.body.port;
    var reason = req.body.reason;
    var date = req.body.date;
    var eventid = req.body.eventid;
    connection.query('INSERT INTO coursechange_record (STUDENT,TEACHER,SUPERVISOR,SUBJECT,ORI_DATE,ORI_TIMERANK,TYPE,PORT,DATE,REASON,APPLY_TYPE,NEW_TYPE,RESULT) SELECT STUDENT_NAME,TEACHER_NAME,SUPERVISOR_NAME,SUBJECT_NAME,COURSE_TIME,TIMERANK_ID,TYPE,?,?,?,"更换学生类型",?,"更换成功" FROM course_plan WHERE id = ? ;UPDATE course_plan SET TYPE = ? where id = ?',[port,date,reason,type,eventid,type,eventid], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});
//查询某学生和某老师已完成的课时
app.get('/admin/student_teacher_time', function (req, res) {
    var teacher = req.query.teacher
    var studentid = +req.query.studentid
    console.log(studentid)
    console.log(teacher)
    connection.query('SELECT COUNT(*) FROM course_plan WHERE STUDENT_ID = ? AND TEACHER_NAME = ? AND STATE = 0', [studentid,teacher], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//批量更改时段
app.post('/admin/multichangetimerank', function (req, res) {
    var eventid = req.body.eventid;
    var timerank = req.body.timerank;
    var time = req.body.time
    connection.query('UPDATE course_plan SET TIMERANK_ID=?,COURSE_TIME=? where id=?',[timerank,time,eventid], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//批量更改课程
app.post('/admin/multichangesubject', function (req, res) {
    var eventid = req.body.eventid;
    var subject = req.body.subject;
    connection.query('UPDATE course_plan SET SUBJECT_NAME=? where id=?',[subject,eventid], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//教务-查看某学生作业列表
app.get('/admin/adminhomework', function (req, res) {
    var studentid = req.query.studentid
    console.log(req.query)
    connection.query('SELECT * FROM homework_list WHERE STUDENT_ID = ?', [studentid], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教务-查看某学生作业列表
app.get('/admin/studentchangerecord', function (req, res) {
    var studentid = req.query.studentid
    console.log(req.query)
    connection.query('SELECT * FROM coursechange_record WHERE STUDENT_ID = ? AND PORT = "学生端"', [studentid], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学-确认布置作业
app.post('/admin/homeworkconfirm', function (req, res) {
    console.log(req.body)
    var eventid = req.body.eventid;
    var teachername = req.body.teachername;
    var teacherid = req.body.teacherid;
    var studentname =  req.body.studentname;
    var studentid =  req.body.studentid;
    var subjectname =  req.body.subjectname;
    var homeworkid =  req.body.homeworkid;
    var content = req.body.content;
    var arrangementdate = req.body.arrangementdate;
    var submissiondate = req.body.submissiondate;
    var objective = req.body.objective;
    var usetime = req.body.usetime;
    var supervisorname = req.body.supervisorname;
    var supervisorid = req.body.supervisorid;
    var type = req.body.type;
    connection.query('INSERT INTO homework_list (HOMEWORK_ID,STUDENT_NAME,TEACHER_NAME,SUBJECT_NAME,COURSE_EVENT_ID,CONTENT,ARRANGEMENT_DATE,SUBMISSION_DATE,OBJECTIVE,USE_TIME,STUDENT_ID,SUPERVISOR_ID,SUPERVISOR_NAME,TEACHER_ID,TYPE) VALUES (?,?,?,?,?,?,now(),?,?,?,?,?,?,?,?);UPDATE course_plan SET HOMEWORK_STATE=1 WHERE id=?',
          [homeworkid,studentname,teachername,subjectname,eventid,content,submissiondate,objective,usetime,studentid,supervisorid,supervisorname,teacherid,type,eventid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//督导-安排作业，生成未完成作业列表
app.get('/admin/homeworkarrange', function (req, res) {
    var studentid = req.query.studentid
    connection.query('SELECT id,HOMEWORK_ID,TEACHER_NAME,SUBJECT_NAME,ARRANGEMENT_DATE,SUBMISSION_DATE,CONTENT,OBJECTIVE,USE_TIME FROM homework_list WHERE STUDENT_ID = ? AND TYPE = "SVIP"', [studentid], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学、教务-获取授课反馈
app.get('/admin/coursefeedbackget', function (req, res) {
    var eventid = req.query.eventid
    connection.query('SELECT COURSE_CONTENT , COURSE_PERFORMANCE , HMPROBLEM , PROPOSAL , FEEDBACK_STATE FROM course_plan WHERE id = ?', [eventid], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学-布置作业时查看学生当天可用时间
app.get('/admin/homework_time_surplus', function (req, res) {
    console.log(req.query)
    var studentid = req.query.studentid
    var time = req.query.time
    connection.query('SELECT COUNT(*) FROM word_test WHERE STUDENT_ID = ? AND ( datediff ( DATE , ? ) = 0 );SELECT COUNT(*) FROM course_plan WHERE STUDENT_ID = ? AND ( datediff ( COURSE_TIME , ? ) = 0 );SELECT USE_TIME FROM homework_list WHERE STUDENT_ID = ? AND ( datediff ( SUBMISSION_DATE , ? ) = 0 )', [studentid,time,studentid,time,studentid,time], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});


//教学-我的改课记录
app.get('/admin/teachergetcoursechangerecord', function (req, res) {
    var id = req.query.id
    connection.query('SELECT * FROM coursechange_record WHERE TEACHER_ID = ? and PORT = "教师端"',[id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//教学-提交授课反馈
app.post('/admin/coursefeedbackpost', function (req, res) {
    var eventid = req.body.eventid;
    var CourseContent = req.body.CourseContent;
    var CoursePerformance = req.body.CoursePerformance;
    var HMProblem =  req.body.HMProblem;
    var Proposal =  req.body.Proposal;
    connection.query('UPDATE course_plan SET COURSE_CONTENT = ? , COURSE_PERFORMANCE = ? , HMPROBLEM = ? , PROPOSAL = ? , FEEDBACK_STATE = 1 WHERE id = ?',
          [CourseContent,CoursePerformance,HMProblem,Proposal,eventid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});



//教学、教师-获取作业事件
app.get('/admin/teacher_homework', function (req, res) {
    var id = parseInt(req.query.id) 
    connection.query('SELECT * FROM homework_list WHERE TEACHER_ID = ? ORDER BY id ASC', [id], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学-日历直接点击作业事件
app.get('/admin/calendarclickhomework', function (req, res) {
    var eventid = req.query.eventid
    console.log(req.query)
    connection.query('SELECT * FROM homework_list WHERE id = ?', [eventid], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学-我的统计 月
app.get('/admin/teachermystatisticmonth', function (req, res) {
    var teachername = req.query.teachername
    console.log(req.query)
    connection.query('SELECT COUNT(*) FROM course_plan WHERE TEACHER_NAME = ? and DATE_FORMAT(COURSE_TIME, "%Y%m" ) = DATE_FORMAT( CURDATE( ) , "%Y%m" ) UNION SELECT COUNT(*) FROM coursechange_record WHERE TEACHER = ? and PORT = "教师端" and DATE_FORMAT(DATE, "%Y%m" ) = DATE_FORMAT( CURDATE( ) , "%Y%m" ) UNION SELECT COUNT(*) FROM homework_list WHERE TEACHER_NAME = ? and DATE_FORMAT(ARRANGEMENT_DATE, "%Y%m" ) = DATE_FORMAT( CURDATE( ) , "%Y%m" )', [teachername,teachername,teachername], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学-我的统计 季度
app.get('/admin/teachermystatisticseason', function (req, res) {
    var teachername = req.query.teachername
    console.log(req.query)
    connection.query('SELECT COUNT(*) FROM course_plan WHERE TEACHER_NAME = ? and QUARTER(COURSE_TIME)=QUARTER(now()) UNION SELECT COUNT(*) FROM coursechange_record WHERE TEACHER = ? and PORT = "教师端" and QUARTER(DATE)=QUARTER(now()) UNION SELECT COUNT(*) FROM homework_list WHERE TEACHER_NAME = ? and QUARTER(ARRANGEMENT_DATE)=QUARTER(now())', [teachername,teachername,teachername], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//教学-留言板发送留言
app.post('/admin/postmessage', function (req, res) {
    var homeworkid = req.body.homeworkid;
    var username = req.body.username;
    var userid = req.body.userid;
    var type = req.body.type;
    var msg = req.body.msg;
    var time = req.body.time;
    console.log(req.body)
    connection.query('INSERT INTO message (HOMEWORK_ID,USER_NAME,USER_ID,USER_TYPE,MSG,TIME) VALUES (?,?,?,?,?,?)',
    [homeworkid,username,userid,type,msg,time]
    , function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '更新成功',
                data: true
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: true
            });
        }
    });
});

//教学-提交作业反馈
app.post('/admin/correctsubmit', function (req, res) {
    var date = req.body.date
    var feedback = req.body.feedback
    var homeworkname = req.body.homeworkname
    connection.query('UPDATE homework_list SET CORRECTION_TIME = ?,CORRECTION_FEEDBACK = ?,STATE = 3 WHERE HOMEWORK_ID = ?',[date,feedback,homeworkname], function (err, rows) {
      if (!err) {
          res.json({
              code: 1,
              msg: '更新成功',
              data: true
          });
      } else {
          res.json({
              code: -1,
              msg: '执行失败',
              data: true
          });
      }
    });
});

//教学-留言板获取留言
app.get('/admin/getmessage', function (req, res) {
    var homeworkid = req.query.homeworkid
    console.log(req.query)
    connection.query('SELECT * FROM message WHERE HOMEWORK_ID = ?', [homeworkid], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});
//督导-我的学生
app.get('/admin/supervisormystudents', function (req, res) {
    var supervisorname = req.query.supervisorname
    console.log(req.query)
    connection.query('SELECT * FROM students_list WHERE admin_les = ?', [supervisorname], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//督导-更改作业日期
app.post('/admin/homeworkchange', function (req, res) {
    var id = req.body.eventid;
    var newdate = req.body.newdate;
    var reason = req.body.reason
    connection.query('UPDATE homework_list SET SUBMISSION_DATE=?,SUPERVISOR_REMARK=? WHERE id=?',
          [newdate,reason,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});


//督导-作业信息
app.get('/admin/homework', function (req, res) {
    var id = req.query.id
    connection.query('SELECT * FROM homework_list WHERE id = ?', [id], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//督导-暂停/完成后时间变更
app.post('/admin/homeworkpause', function (req, res) {
    var id = req.body.eventid;
    var newdate = req.body.newdate;
    var reason = req.body.reason
    connection.query('UPDATE homework_list SET SUBMISSION_DATE=?,SUPERVISOR_REMARK=? WHERE id=?',
          [newdate,reason,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-作业开始
app.post('/admin/homeworkstart', function (req, res) {
    var id = req.body.homeworkid;
    var time = req.body.time;
    var supervisorname = req.body.supervisorname;
    var supervisorid = req.body.supervisorid;
    connection.query('UPDATE homework_list SET SUPERVISOR_NAME = ?,SUPERVISOR_ID = ?,REAL_START_TIME=?,STATE = 0 WHERE id=?',
          [time,id,supervisorname,supervisorid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-作业暂停
app.post('/admin/homeworkstop', function (req, res) {
    var id = req.body.homeworkid;
    var time = req.body.time;
    connection.query('UPDATE homework_list SET REAL_CONSUME_TIME=?,STATE = 1 WHERE id=?',
          [time,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-作业完成
app.post('/admin/homeworkfinish', function (req, res) {
    var id = req.body.homeworkid;
    var time = req.body.time;
    var finishtime = req.body.finishtime;
    connection.query('UPDATE homework_list SET REAL_CONSUME_TIME=?,REAL_FINISH_TIME=?,STATE = 2 WHERE id=?',
          [time,finishtime,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-获取单词任务
app.get('/admin/wordplan', function (req, res) {
    var studentid = req.query.studentid;
    connection.query('SELECT * FROM word_test where STUDENT_ID=? and STATE>-1',[studentid],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//督导-安排单词任务确认
app.post('/admin/updateword', function (req, res) {
    var studentid = req.body.studentid;
    var studentname = req.body.studentname;
    var timerankid = req.body.timerankid;
    var time = req.body.time;
    var supervisorid = req.body.supervisorid;
    var supervisorname = req.body.supervisorname;
    var subjectname = req.body.subjectname;
    var content = req.body.content;
    var target = req.body.target;
    console.log(req.body)
    connection.query('INSERT INTO word_test (STUDENT_ID,STUDENT_NAME,SUPERVISOR_ID,SUPERVISOR_NAME,SUBJECT_NAME,TIMERANK_ID,DATE,CONTENT,TARGET,STATE)  VALUES  (?,?,?,?,?,?,?,?,?,1)',
        [studentid,studentname,supervisorid,supervisorname,subjectname,timerankid,time,content,target]
        , function (err, rows) {
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: true
                });
            } else {
                res.json({
                    code: -1,
                    msg: '执行失败',
                    data: true
                });
            }
        });
});

//督导-取消单词
app.post('/admin/wordcancel', function (req, res) {
    var eventid = req.body.eventid;
    console.log(eventid)
    connection.query('UPDATE word_test SET STATE=-1 where id=?',[eventid], function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//督导-更改单词
app.post('/admin/wordchange', function (req, res) {
    var id = req.body.eventid;
    var newdate = req.body.newdate;
    var newtimerank = req.body.newtimerank
    connection.query('UPDATE word_test SET STATE=-2 WHERE id=? ;INSERT INTO word_test (STUDENT_ID,STUDENT_NAME,SUBJECT_NAME,TIMERANK_ID,DATE,STATE) SELECT STUDENT_ID,STUDENT_NAME,SUBJECT_NAME,? AS TIMERANK_ID,? AS COURSE_TIME,1 AS STATE FROM word_test WHERE id=?',
          [id,newtimerank,newdate,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-当天课程 用于签到
app.get('/admin/gettodaycourse', function (req, res) {
    var teachername = req.query.teachername;
    connection.query('SELECT * FROM course_plan where STATE=1 and to_days(COURSE_TIME) = to_days(now()) ORDER BY id ASC',[teachername],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//督导-学生签课
app.post('/admin/studentsign', function (req, res) {
    var id = req.body.id;
    var time = req.body.time;
    connection.query('UPDATE course_plan SET STUDENT_SIGNTIME=? WHERE id=?',
          [time,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-教师签课
app.post('/admin/teachersign', function (req, res) {
    var id = req.body.id;
    var time = req.body.time;
    connection.query('UPDATE course_plan SET TEACHER_SIGNTIME=? WHERE id=?',
          [time,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    // console.log(timerankid)
    // console.log(courseid)
    // console.log(subjectid)
    // console.log(coursetime)
    // console.log(teachername)
});

//督导-督导签课
app.post('/admin/supervisorsign', function (req, res) {
    var id = req.body.id;
    var time = req.body.time;
    connection.query('UPDATE course_plan SET SUPERVISOR_SIGNTIME=? WHERE id=?',
          [time,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//督导-查看考勤
app.get('/admin/supervisor_get_attendance', function (req, res) {
    var studentid = req.query.studentid;
    connection.query('SELECT * FROM attendance WHERE to_days(START) = to_days(now()) AND STUDENT_ID = ?',
          [studentid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: rows
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
});

//督导-更新考勤
app.post('/admin/supervisor_post_attendance', function (req, res) {
    var supervisorid = req.body.supervisorid;
    var supervisorname = req.body.supervisorname;
    var studentid = req.body.studentid;
    var studentname = req.body.studentname;
    var time = req.body.time;
    var state = req.body.state;
    if(state == 1){
        connection.query('INSERT INTO attendance SET START = ? , SUPERVISOR_ID = ? , SUPERVISOR_NAME = ? , STUDENT_ID = ? , STUDENT_NAME = ?',
          [time,supervisorid,supervisorname,studentid,studentname]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    }
    if(state == 2){
        connection.query('UPDATE attendance SET END = ? WHERE to_days(START) = to_days(now()) AND STUDENT_ID = ?',
          [time,studentid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: true
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: true
                  });
              }
          });
    }
});

//督导-督导提交作业
app.post('/admin/homeworksubmit', function (req, res) {
    var supervisorname = req.body.supervisorname
    var submissiondate = req.body.submissiondate
    var homeworkname = req.body.homeworkname
    // connection.query('UPDATE homework_list SET REAL_SUBMISSION_DATE = ?,STATE = 2 WHERE HOMEWORK_ID = ?',[submissiondate,homeworkname], function (err, rows) {
    //   if (!err) {
    //       res.json({
    //           code: 1,
    //           msg: '更新成功',
    //           data: true
    //       });
    //   } else {
    //       res.json({
    //           code: -1,
    //           msg: '执行失败',
    //           data: true
    //       });
    //   }
    // });
});

//督导-全部事件
app.get('/admin/supervisor_allevents', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM course_plan where STATE=1 and SUPERVISOR_ID=? ORDER BY id ASC;SELECT * FROM homework_list where STATE<2 and SUPERVISOR_ID=? ORDER BY id ASC',[id,id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//督导-今日任务
app.get('/admin/supervisor_today', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM course_plan WHERE STATE=1 AND SUPERVISOR_ID=? AND to_days(COURSE_TIME) = to_days(now()) GROUP BY COURSE_TIME ASC,id ASC;SELECT * FROM homework_list where STATE<2 and SUPERVISOR_ID=? AND to_days(SUBMISSION_DATE) = to_days(now()) GROUP BY SUBMISSION_DATE ASC,id ASC',[id,id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//督导-上传作业
// app.post('/admin/uploadhomework', function(req, res,next) {
//     console.log(req.files); // the uploaded file object
//     let file = req.files.file;
    
//     // Use the mv() method to place the file somewhere on your server
//     file.mv('/upload', function(err) {
//      if (err)
//       return res.status(500).send(err);
    
//      res.send('File uploaded!');
//     });
//    })
app.post('/admin/uploadhomework', function (req, res) {
        console.log(req.body)
        console.log(req.files)
        // console.log(req.body)
        //新文件名
        // 这是重点，  新文件名 = path + 后缀名
        var newName ='./upload/'+req.body.studentid+req.body.studentname+'/'+req.body.subjectname+'/'+req.body.name+'.jpeg';
        console.log(newName)
        //使用fs模块的rename重命名方法重名字保存的文件，才能正常使用
        //rename('旧文件名，新文件， 回调 ')
        fs.rename(req.files.file.name,newName, function (err) {
            if(err) {
                res.send('上传失败')
            }else{
                res.send('上传成功')
            }
            res.end();
        })
        console.log(req.files)
    })

//学生排课记录（学生-学习日历）
app.get('/admin/student_allevents', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM course_plan where STATE=1 and STUDENT_ID=? ORDER BY COURSE_TIME DESC',[id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//督导-今日任务
app.get('/admin/student_today', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM course_plan WHERE STATE=1 AND STUDENT_ID=? AND to_days(COURSE_TIME) = to_days(now()) GROUP BY COURSE_TIME ASC,id ASC;SELECT * FROM homework_list where STATE<2 and STUDENT_ID=? AND to_days(SUBMISSION_DATE) = to_days(now()) GROUP BY SUBMISSION_DATE ASC,id ASC',[id,id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//学生-日历获取作业事件
app.get('/admin/student_homework', function (req, res) {
    var id = req.query.id
    console.log(req.query)
    connection.query('SELECT * FROM homework_list WHERE STUDENT_ID = ? ORDER BY SUBMISSION_DATE DESC', [id], function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    })
});

//学生排课记录（学生-我的课表）
app.get('/admin/student_course', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM course_plan where STUDENT_ID = ? and STATE>-1',[id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//学生-改课记录
app.get('/admin/student_change', function (req, res) {
    var id = req.query.id
    console.log(id)
    connection.query('SELECT * FROM coursechange_record WHERE STUDENT_ID = ? AND PORT = "学生端" AND APPLY_TYPE = "更改"',[id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//学生-取消课记录
app.get('/admin/student_cancel', function (req, res) {
    var id = req.query.id
    connection.query('SELECT * FROM coursechange_record WHERE STUDENT_ID = ? AND PORT = "学生端" AND APPLY_TYPE = "取消"',[id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//学生-签课记录
app.get('/admin/student_sign', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM course_plan where STUDENT_ID = ? and STUDENT_SIGNTIME <> ""',[id],function (err, rows) {
        if (!err) {
            res.json({
                code: 1,
                msg: '查询成功',
                data: rows
            });
        } else {
            res.json({
                code: -1,
                msg: '执行失败',
                data: {}
            });
        }
    });
});

//学生-日历点击
app.get('/admin/coursecheck', function (req, res) {
    var eventid = req.query.eventid;
    connection.query('SELECT * FROM course_plan WHERE id = ?',
          [eventid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: rows
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: rows
                  });
              }
          });
});

//学生-获取作业信息
app.get('/admin/eventhomework', function (req, res) {
    var eventid = req.query.eventid;
    console.log(eventid)
    connection.query('SELECT SQL_CALC_FOUND_ROWS * FROM homework_list WHERE COURSE_EVENT_ID = ?',
          [eventid]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: rows
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: rows
                  });
              }
          });
});

//学生-获取课时规划
app.get('/admin/student_plan', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT * FROM students_class WHERE STUDENT_ID = ? order by SUBJECT_A desc',
          [id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: rows
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: rows
                  });
              }
          });
});

//学生-获取个人信息
app.get('/admin/student_personal', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT name , campus , city , id_card FROM students_list WHERE id = ?; SELECT phone , email FROM user_list WHERE type = "student" AND userid = ?',
          [id,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: rows
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: rows
                  });
              }
          });
});

//学生-获取个人信息
app.get('/admin/student_account', function (req, res) {
    var id = req.query.id;
    connection.query('SELECT username , phone , email FROM user_list WHERE type = "student" AND userid = ?',
          [id,id]
          , function (err, rows) {
              if (!err) {
                  res.json({
                      code: 1,
                      msg: '更新成功',
                      data: rows
                  });
              } else {
                  res.json({
                      code: -1,
                      msg: '执行失败',
                      data: rows
                  });
              }
          });
});

//学生，教师-获取作业文件
app.use('./upload', express.static(__dirname + './upload'));
app.get('/admin/homeworkfile', function (req, res) {
    var name = req.query.name;
    console.log(name)
    // fs.readFile(name,  function  (err,  data)  {
    //     if  (err)  {
    //         console.log(err);
    //     }else{
    //         res.send(data);;
    //     }
    // });
    res.writeHead(200,  {'Content-Type':'image/jpeg'});  
    fs.readFile(name,'binary',function(err,file){
        if(err){
            console.log(err);
            return ;
        }else{
            res.write(file,'binary');
            res.end();
        }
    });
});
//教务-新增学生
app.post('/admin/addstudent', function (req, res) {
    var studentname = req.body.studentname;
    var campus=req.body.campus;
    var admin_les=req.body.admin_les;
    var admin_ed=req.body.admin_ed;
    var adviser=req.body.adviser;
    var intime=req.body.intime;
    var code1 = req.body.code1;
    var code2 = req.body.code2;
    var code3 = req.body.code3;
    var parent1 = req.body.parent1;
    var parent1_phone = req.body.parent1_phone;
    var parent2 = req.body.parent2;
    var parent2_phone = req.body.parent2_phone;
    if(parent2 != ''){
        connection.query('INSERT INTO students_list (name,campus,intime,admin_les,admin_ed,adviser) VALUES (?,?,?,?,?,?);INSERT INTO user_list (userid,realname,type,code) select id,?,"student",? from students_list order by id desc limit 0,1 ; INSERT INTO user_list (userid,realname,type,code,child_name,phone) select id,?,"parent",?,?,? from students_list order by id desc limit 0,1 ; INSERT INTO user_list (userid,realname,type,code,child_name,phone) select id,?,"parent",?,?,? from students_list order by id desc limit 0,1',
        [studentname,campus,intime,admin_les,admin_ed,adviser,studentname,code1,parent1,code2,studentname,parent1_phone,parent2,code3,studentname,parent2_phone]
        , function (err, rows) {
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: true
                });
                // // console.log(rows)
                // let address = "../src/www/upload/"+rows[0].id+rows[0].name+'/'+rows[0].subject
                // // console.log(address)
                // fs.mkdir(address, (err) => {
                //     if(err){
                //       console.log(err);
                //       return;
                //     }
                //     else{
                //         console.log('新建学生文件夹成功')
                //     }
                //   });
            } else {
                res.json({
                    code: -1,
                    msg: '执行失败',
                    data: true
                });
            }
        });
    }
    else {
        connection.query('INSERT INTO students_list (name,campus,intime,admin_les,admin_ed,adviser) VALUES (?,?,?,?,?,?);INSERT INTO user_list (userid,realname,type,code) select id,?,"student",? from students_list order by id desc limit 0,1 ; INSERT INTO user_list (userid,realname,type,code,child_name,phone) select id,?,"parent",?,?,? from students_list order by id desc limit 0,1 ;',
        [studentname,campus,intime,admin_les,admin_ed,adviser,studentname,code1,parent1,code2,studentname,parent1_phone]
        , function (err, rows) {
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: true
                });
                // // console.log(rows)
                // let address = "../src/www/upload/"+rows[0].id+rows[0].name+'/'+rows[0].subject
                // // console.log(address)
                // fs.mkdir(address, (err) => {
                //     if(err){
                //       console.log(err);
                //       return;
                //     }
                //     else{
                //         console.log('新建学生文件夹成功')
                //     }
                //   });
            } else {
                res.json({
                    code: -1,
                    msg: '执行失败',
                    data: true
                });
            }
        });
    }
    
});

//教务-新增课时规划
app.post('/admin/addcourseplan', function (req, res) {
    var subjectA = req.body.subjectA;
    var subjectB = req.body.subjectB;
    var teacherName = req.body.teacherName;
    var teacherID = req.body.teacherID;
    var supervisorName = req.body.supervisorName;
    var supervisorID = req.body.supervisorID;
    var total = req.body.total;
    var studentname = req.body.studentname;
    var studentid = req.body.studentid;
    connection.query('INSERT INTO students_class (STUDENT_NAME,STUDENT_ID,TEACHER_NAME,TEACHER_ID,SUPERVISOR_NAME,SUPERVISOR_ID,SUBJECT_A,SUBJECT_B,TOTAL,CREATED_TIME) VALUES (?,?,?,?,?,?,?,?,?,now())',
        [studentname,studentid,teacherName,teacherID,supervisorName,supervisorID,subjectA,subjectB,total]
        , function (err, rows) {
            if (!err) {
                res.json({
                    code: 1,
                    msg: '更新成功',
                    data: true
                });
            } else {
                res.json({
                    code: -1,
                    msg: '执行失败',
                    data: true
                });
            }
        });
        var newName ='./upload/'+req.body.studentid+req.body.studentname+'/'
        console.log(newName)
        //req.body.subjectB+'/';
        //使用fs模块的rename重命名方法重名字保存的文件，才能正常使用
        //rename('旧文件名，新文件， 回调 ')
        fs.mkdir(newName,function(err){
            if (err) {       
                return console.error(err);       
            }       
            console.log("一级目录创建成功。"); 
            newName =  newName +  req.body.subjectB+'/' 
            fs.mkdir(newName,function(err){         
                if (err) {         
                    return console.error(err);         
                }         
                console.log("二级目录创建成功。");         
             });        
         });
});

/**
 * client系统相关
 */
//登录接口
app.post('/client/login', function (req, res) {
    console.log(req.body);
    if (!req.body) {
        res.json({
            code: -1,
            msg: '登录参数异常111',
            data: {}
        });
        return;
    }
    var userName = req.body.username;
    var password = req.body.password;
    if (!userName || !password) {
        res.json({
            code: -1,
            msg: '登录参数异常2222',
            data: {}
        });
        return;
    }
    connection.query('SELECT * FROM `t_user` WHERE `username` = ? AND `password` = ?', [userName, password], function (err, rows) {
        if (err) {
            res.json({
                code: -1,
                msg: '登录失败',
                data: false
            });
        } else {
            if (rows && rows.length > 0) {
                res.json({
                    code: 1,
                    msg: '登录成功',
                    data: true
                });
            } else {
                res.json({
                    code: -1,
                    msg: '用户不存在',
                    data: false
                });
            }
        }
    })
});

// httpServer.listen(8081, function() {
//     console.log('HTTP Server is running on: http://localhost:%s', 8081);
// });
// httpsServer.listen(8080, function() {
//     console.log('HTTPS Server is running on: https://localhost:%s', 8080);
// });


//安全-修改密码
app.post('/admin/safe_password', function (req, res) {
    var pswd_old = req.body.pswd_old
    var pswd_new = req.body.pswd_new
    var type = req.body.type
    var id = req.body.id
    connection.query('UPDATE user_list SET password = ? WHERE password = ? AND type = ? AND userid = ?',[pswd_new,pswd_old,type,id], function (err, rows) {
      if (!err) {
          res.json({
              code: 1,
              msg: '更新成功',
              data: true
          });
      } else {
          res.json({
              code: -1,
              msg: '执行失败',
              data: true
          });
      }
    });
});


app.listen(9528,() => {
    console.log('app listening on port 8080.')
})