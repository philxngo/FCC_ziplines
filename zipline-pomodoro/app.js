/*
 *  Variables
 */

console.log("Welcome");
var audio = new Audio("http://www.soundjay.com/button/beep-01a.wav");
var brkTime = parseInt($(".break-time-text").html());
var sessTime = parseInt($(".session-time-text").html());
var clockInterval, clockTime, totalTime;
var clockSet = false;
var clockTicking = false;
var inSession = false;


/*
 *  Break/Session buttons
 */

$("#brk-left").on("click", function() {
    if(brkTime !== 1) {
        brkTime = brkTime - 1;
        $(".break-time-text").html(brkTime);
    }
});

$("#session-left").on("click", function() {
    if(sessTime !== 1) {
        sessTime = sessTime - 1;
        $(".session-time-text").html(sessTime);
        $(".clock-text").html(sessTime + ":00");
    }
});

$("#brk-right").on("click", function() {
    brkTime = brkTime + 1;
    $(".break-time-text").html(brkTime);
});

$("#session-right").on("click", function() {
    sessTime = sessTime + 1;
    $(".session-time-text").html(sessTime);
    $(".clock-text").html(sessTime + ":00");
});

/*
 *  Clock control buttons
 *  (Start/Pause/Resume & Reset)
 */

$("#clk-btn").on("click", function() {
    // Resume
    if(clockSet && !clockTicking) {
        clockTicking = true;
        runClock();
        $("#clk-btn").html("Pause");
    }
    // Pause
    else if(clockSet && clockTicking) {
        clockTicking = false;
        clearInterval(clockInterval);
        $("#clk-btn").html("Resume");
    }
    // Start
    else if(!clockSet) {
        clockSet = true;
        clockTicking = true;
        changeStatus();
        clockTime = sessTime * 60;
        totalTime = clockTime;
        runClock();
        $("#clk-btn").html("Pause");
        $('.btn-default').prop('disabled', true);
    }
});

$("#rst-btn").on("click", function() {
    // Clock is set
    // Pressing reset will stop the clock, reset numbers and timer
    if(clockSet) {
        //stop clock;
        //reset everything;
        //transform pause/resume button to start button;
        clearInterval(clockInterval);
        $(".clock-text").html("25:00");
        clockSet = false;
        clockTicking = false;
        changeStatus();
        $("#clk-btn").html("Start");
        $(".progress-bar").css("width", "0%");
        $('.btn-default').prop('disabled', false);
    }

    // Reset break/session
    brkTime = 5;
    sessTime = 25;
    $(".session-time-text").html(sessTime);
    $(".break-time-text").html(brkTime);
});

/*
 *  Clock
 */

function runClock() {
    tick();
    clockInterval = setInterval(tick, 1000);
}

function tick() {
    clockTime--;
    var progressTime = 100 * (totalTime - clockTime) / totalTime;
    console.log(progressTime);
    var minutes = Math.floor(clockTime / 60).toString();
    var seconds = (clockTime % 60).toString();

    $(".clock-text").html(minutes + ":" +
                         (seconds < 10 ? "0" : "") +
                          String(seconds));

    $(".progress-bar").css("width", progressTime.toString() + "%");

    if(clockTime <= 0) {
        audio.play();
        if(inSession) {
            // Take a break
            clockTime = brkTime * 60;
        } else {
            // Return to session
            clockTime = sessTime * 60;
        }
        totalTime = clockTime;
        $(".progress-bar").css("width", "0%");
        changeStatus();
        clearInterval(clockInterval);
        runClock();
    }
}

function changeStatus() {
    if(!clockSet) {
        inSession = false;
        $(".status-text").html("Session");
    } else if(inSession) {
        inSession = false;
        $(".status-text").html("Break");
    } else if (!inSession) {
        inSession = true;
        $(".status-text").html("Session");
    }
}
