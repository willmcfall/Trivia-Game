
$(document).ready(function () {

    $.ajax({
        url: "https://opentdb.com/api.php?amount=40&category=12&difficulty=hard&type=multiple",
        method: "GET"
    }).then(function (triviaData) {

        // initiate global variables

        var numCorrect = 0;
        var numIncorrect = 0;
        var userChoice = 0;

        // present start page and wait for click of start button

        $("#start").click(function() {
        
        // hides the start page and unhides the question page 
        $("#first_page").addClass('d-none');
        $("#second_page").removeClass('d-none');

        // randomly presents question

        var randQuestion = Math.floor(Math.random() * triviaData.results.length);
        console.log(triviaData.results.length);
        console.log(randQuestion);

        $(".question").html("Question: " + triviaData.results[randQuestion].question);
        $("#1").html("1: " + triviaData.results[randQuestion].correct_answer);


        // randomly orders answer options

        var randAnswer = Math.floor(Math.random() * 4);
        console.log(randAnswer);

        $("#2").html("2: " + triviaData.results[randQuestion].incorrect_answers[0]);
        $("#3").html("3: " + triviaData.results[randQuestion].incorrect_answers[1]);
        $("#4").html("4: " + triviaData.results[randQuestion].incorrect_answers[2]);

        // wait for user to select answer option 
        $(".answer").on("click", function () {
            $(this).val = userChoice;
        });

        // wait for user to select submit


        // check if user selection is the correct answer and count correct responses and incorrect responses



        // present restart screen





        // start button closing tag
        });

    // API closing tag
    });

// document ready closing tag
});