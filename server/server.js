let express = require('express')
let bodyParser = require('body-parser')

let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



let server = app.listen(process.env.PORT || 3000,function(){
    console.log("Express server has started on port 3000");
})

//방 데이터 {t: 선생님이름, cid : 방 id, pwd: 비밀번호}

let schedule = {
    home: { t: '', cid: '' },

    '월': [ '', '',  '',  '', '',  '', '' ],
    '화': [ '', '',  '',  '', '',  '', '' ], //각 교시별 과목 이름
    '수': [ '', '',  '',  '', '',  '', '' ],
    '목': [ '', '',  '',  '', '',  '', '' ],
    '금': [ '', '',  '',  '', '',  '', '' ],

    dur: [ //시간
        '09:00 ~ 09:50',
        '10:00 ~ 10:50',
        '11:00 ~ 11:50',
        '12:00 ~ 12:50',
        '13:50 ~ 14:40',
        '14:50 ~ 15:40',
        '15:50 ~ 16:40',
    ]
}
let classes = { //수업 데이터 과목명 : 수업 정보
    '': { t: '', cid: '' },
    '': { t: '', cid: '' }
}

app.get('/getSchedule', (req, res) => {
    res.send(schedule);
})

app.get('/getClasses', (req,res) => {
    res.send(classes)
})

