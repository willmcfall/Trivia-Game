
// waits for the html document to load
$(document).ready(function () {

    // loads the trivia JSON data
    $.ajax({
        url: "https://opentdb.com/api.php?amount=40&category=12&difficulty=hard&type=multiple",
        method: "GET"
    }).then(function (triviaData) {

        // initiates global variables
        var numCorrect = 0;
        var numIncorrect = 0;

        // present start page and wait for click of start button
        $("#start").click(function () {

            // hides the start page and unhides the question page 

            $("#first_page").addClass('d-none');
            $("#second_page").removeClass('d-none');

            // generates 10 rounds of question pages
            function newPage() {
                for (y = 1; y < 11; y++) {

                    var userChoice = "";
                    var randQuestion = 0;

                    // starts a timer that runs for thirty seconds
                    var number;
                    var intervalId;
                    number = 30;
                    function run() {
                        clearInterval(intervalId);
                        intervalId = setInterval(decrement, 1000);
                    }

                    function decrement() {

                        number--;

                        $(".timer").html("Time Remaining: " + number);

                        if (number === 0) {

                            stop();
                            alert("Sorry, you ran out of time!");
                        }
                    }

                    function stop() {
                        clearInterval(intervalId);
                    }

                    run();


                    // randomly presents question

                    var randQuestion = Math.floor(Math.random() * triviaData.results.length);
                    console.log(triviaData.results.length);
                    console.log(randQuestion);

                    $(".question").html("Question: " + triviaData.results[randQuestion].question);

                    // randomly orders answer options
                    var shuffledArray = triviaData.results[randQuestion].incorrect_answers;
                    shuffledArray.push(triviaData.results[randQuestion].correct_answer);
                    console.log(shuffledArray);

                    function shuffle(a) {
                        var j, x, i;
                        for (i = a.length - 1; i > 0; i--) {
                            j = Math.floor(Math.random() * (i + 1));
                            x = a[i];
                            a[i] = a[j];
                            a[j] = x;
                        }
                        return a;
                    }

                    shuffle(shuffledArray);
                    console.log(shuffledArray);
                    $("#1").html("1: " + shuffledArray[0]);
                    $("#2").html("2: " + shuffledArray[1]);
                    $("#3").html("3: " + shuffledArray[2]);
                    $("#4").html("4: " + shuffledArray[3]);


                    // wait for user to select answer option 
                    $(".answer").on("click", function () {
                        userChoice = $(this).html();
                        userChoice = userChoice.replace("1: ", "");
                        userChoice = userChoice.replace("2: ", "");
                        userChoice = userChoice.replace("3: ", "");
                        userChoice = userChoice.replace("4: ", "");
                    });


                    // wait for user to select submit
                    $("#submit").click(function () {

                        // check if user selection is the correct answer and count correct responses and incorrect responses
                        console.log(userChoice);
                        console.log(triviaData.results[randQuestion].correct_answer);

                        if (userChoice == triviaData.results[randQuestion].correct_answer) {
                            numCorrect++;
                            console.log("Number correct = " + numCorrect);
                            alert("Correct!")
                            newPage();
                        }
                        else if (userChoice !== triviaData.results[randQuestion].correct_answer || number == 0) {
                            numIncorrect++;
                            console.log("NUmber incorrect = " + numIncorrect);
                            alert("Incorrect, the correct response was " + triviaData.results[randQuestion].correct_answer + "!");
                            newPage();
                        }
                    });

                };

            // new page function closing tag
            };
            newPage();

        // start function closing tag
        });

    // API function closing tag
    });

// document ready function closing tag
});