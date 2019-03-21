
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
        var userChoice = "";
        var answer = "";

        // present start page and wait for click of start button
        $("#start").click(function () {

            // hides the start page and unhides the question page 
            $("#first_page").addClass('d-none');
            $("#second_page").removeClass('d-none');

            // generates 10 rounds of question pages
            function newPage() {

                // starts a timer that runs for thirty seconds


                // randomly draws a question from the larger array question
                var randQuestion = Math.floor(Math.random() * triviaData.results.length);
                console.log(triviaData.results.length);
                console.log(randQuestion);

                var question = triviaData.results[randQuestion].question;
                $(".question").html("Question: " + question);

                // randomly orders answer options
                var shuffledArray = triviaData.results[randQuestion].incorrect_answers;
                shuffledArray.push(triviaData.results[randQuestion].correct_answer);
                function shuffle(a) {
                    var j, x, i;
                    for (i = a.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        x = a[i];
                        a[i] = a[j];
                        a[j] = x;
                    }
                    return a;
                };
                shuffle(shuffledArray);
                console.log(shuffledArray);
                $("#1").html("1: " + shuffledArray[0]);
                $("#2").html("2: " + shuffledArray[1]);
                $("#3").html("3: " + shuffledArray[2]);
                $("#4").html("4: " + shuffledArray[3]);

                // wait for user to select answer option 
                $(".answer").click(function () {
                    userChoice = $(this).html();
                    userChoice = userChoice.replace("1: ", "");
                    userChoice = userChoice.replace("2: ", "");
                    userChoice = userChoice.replace("3: ", "");
                    userChoice = userChoice.replace("4: ", "");
                    answer = triviaData.results[randQuestion].correct_answer;
                });
                
                // new page function closing tag
            };

            // wait for user to select submit
            $("#submit").click(function () {

                console.log(userChoice);
                console.log(answer);
                // check if user selection is the correct answer and count correct responses and incorrect responses
               
                if (userChoice == answer) {
                    alert("Correct!");
                    userChoice="";
                    answer="";
                    number=0;
                    numCorrect++;
                    console.log("Number correct = " + numCorrect);
                    newPage();
                }
                else if (userChoice !== answer) {

                    alert("Incorrect! The correct response is " + answer);
                    userChoice="";
                    answer="";
                    number=0;
                    numIncorrect++;
                    console.log("Number incorrect = " + numIncorrect);
                    newPage();
                };

            });

            newPage();
            // start function closing tag
        });

        // API function closing tag
    });

    // document ready function closing tag
});