const {shell} = require('electron');


function httpGet(theUrl) {

    return new Promise(function(resolve,reject) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", theUrl, false);

        xmlhttp.onload = function() {
            if(xmlhttp.status == 200) {
                resolve(JSON.parse(xmlhttp.response));
            }else {
                reject(Err(xmlhttp.statusText));
            }
        }

        xmlhttp.onerror = function() {
            reject(Error("network error"));
        }

        xmlhttp.send();
    })
}

document.body.style.background = 'whitesmoke';

let schedule;
let classes;


Promise.all([httpGet('https://dimigo-timetable.herokuapp.com/getschedule'), httpGet('https://dimigo-timetable.herokuapp.com/getClasses')]).then((values) => {



    let loading = document.getElementsByClassName("loading-container")[0];
    loading.remove();


    let table = document.createElement(`table`);
    document.body.appendChild(table);

    table.setAttribute("id", "timetable");

    let time = table.appendChild(document.createElement(`tr`));
    time.setAttribute("class", "time")

    let d = ["월", "화", "수", "목", "금"]

    d.forEach((value) => {
        let tr = document.createElement(`tr`);
        let temp = table.appendChild(tr);
        temp.setAttribute("id", value);
    })

    schedule = values[0];
    classes = values[1];

    setTimeTable();

document.querySelectorAll('.class td').forEach(td => {
    td.addEventListener('click', () => {
        redirect(classes[td.className].cid, classes[td.className].pwd);
    });
});

document.getElementById('home').addEventListener('click', () => {
    redirect(schedule.home.cid);
})

})





function redirect(cid) {
    shell.openExternal(`zoommtg://zoom.us/join?action=join&confno=${cid}&pwd=${pwd}`);
}

function setTimeTable() {
    document.querySelectorAll('#timetable tr').forEach(tr => {

        // 교시
        if (tr.classList.contains('time')) {
            tr.innerHTML = `<th id="home"><div class="out">담임<div class="in">${schedule.home.t}</div></div></th>`;
            schedule.dur.forEach(ct => tr.innerHTML += `
                <td id="_${schedule.dur.indexOf(ct) + 1}"><div class="out">${schedule.dur.indexOf(ct) + 1}<div class="in">${ct}</div></div></td>
            `);
        }

        // 요일
        else {
            tr.classList.add('class');

            let day = tr.id;
            tr.innerHTML = `<th>${day}</th>`;

            schedule[day].forEach(ct => {
                if (ct == 'CA' || ct == 'HR' || ct == ' ') tr.innerHTML += `<td><div class="out">${ct}</div></td>`;
                else tr.innerHTML += `
                    <td class="${ct}">
                        <div class="out">${ct}<div class="in">${classes[ct].t}</div></div>
                    </td>
                `;
            });
        }
    })
}