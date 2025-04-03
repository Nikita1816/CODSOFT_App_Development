/* script.js */
function updateClock() {
    let now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString();
    setTimeout(updateClock, 1000);
}
updateClock();

let alarms = [];
let alarmTimeout;
let alarmCounter = 1;

function setAlarm() {
    let alarmTime = document.getElementById("alarmTime").value;
    let alarmTone = document.getElementById("alarmTone").value;
    let alarmDescription = document.getElementById("alarmDescription").value;
    let alarmName = `Alarm ${alarmCounter++}`;

    if (alarmTime) {
        alarms.push({ name: alarmName, time: alarmTime, tone: alarmTone, description: alarmDescription || "No description", active: true });
        updateAlarms();
    }
}

function updateAlarms() {
    let list = document.getElementById("alarmList");
    list.innerHTML = "";
    alarms.forEach((alarm, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${alarm.name}</strong> - ${alarm.time} <br> ${alarm.description} 
                        <button onclick="toggleAlarm(${index})">${alarm.active ? "On" : "Off"}</button> 
                        <button onclick="deleteAlarm(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    updateAlarms();
}

function toggleAlarm(index) {
    alarms[index].active = !alarms[index].active;
    updateAlarms();
}

function showSnoozeDismiss() {
    document.getElementById("snoozeDismiss").style.display = "block";
}

function hideSnoozeDismiss() {
    document.getElementById("snoozeDismiss").style.display = "none";
}

function snoozeAlarm() {
    hideSnoozeDismiss();
    setTimeout(() => {
        showSnoozeDismiss();
    }, 300000); // Snooze for 5 minutes
}

function dismissAlarm() {
    hideSnoozeDismiss();
    clearTimeout(alarmTimeout);
    document.getElementById("alarmSound").pause();
}

setInterval(() => {
    let now = new Date().toTimeString().slice(0, 5);
    alarms.forEach(alarm => {
        if (alarm.active && alarm.time === now) {
            let sound = document.getElementById("alarmSound");
            sound.src = alarm.tone;
            sound.play();
            showSnoozeDismiss();
        }
    });
}, 60000);
