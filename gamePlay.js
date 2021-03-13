$(document).ready(function(){
    MakeGrid();
    let numOfClicks =10;
    let numOfBones = 0;

    function Guess()
    {
        let clickedSpan = $(this);
        if(numOfBones === 5){
            gameOver();

        }
        if(numOfClicks <= 0)
        {
            $("p#clicksLeft").text("OUT OF CLICKS");
            clickedSpan.off("click");
            progressBar();
            gameOver();
        }else{
            let isSurprise = clickedSpan.hasClass("surprise");

            if (isSurprise === true)
            {
                clickedSpan.addClass("foundBone");
                clickedSpan.off("click");
                numOfBones ++;
                progressBar();
            }else{
                clickedSpan.addClass("dugout");
                clickedSpan.off("click");
                progressBar();
            }
            $("p#clicksLeft").text(`Number of Clicks Left: ${numOfClicks}`);
            $("p#remainingBones").text(`Number of Bones found!: ${numOfBones}`);
            numOfClicks--;
        }

    }



    function MakeSquare(number){
        let board = $("div#board");
        let square = $("<span>");
        let Width = Math.round(window.innerWidth/(5+2))
        let Height = Math.round(window.innerHeight/(5+2));
        let Dimension = Math.min(Width,Height)
        board.append(square);
        square.height(Dimension);
        square.width(Dimension);
        square.addClass("square");
        square.text(`${number}`);
        square.click(Guess);


    }
    function MakeGrid()
    {
        let boxNum = 0;

        for(let j = 0; j < 5; j++)
        {

            for(let i = 0; i < 5; i++)
            {
                boxNum++;
                MakeSquare(boxNum);
            }
            let breaktag = $("<br>");
            $("div#board").append(breaktag)
        }
        for(let NUM_BONES = 0; NUM_BONES < 5; NUM_BONES++)
        {
            let randomNumber = Math.floor(Math.random() * 25);

            let randomSquare = $("span.square").eq(randomNumber);

            if(!randomSquare.hasClass("surprise"))
            {
                randomSquare.addClass("surprise")
            }
        }

    }
    function progressBar(){
        let initial = $('#Bar').width();
        let update = initial += 75;
        $('div#Bar').width(update);
    }

    function gameOver()
    {
        let square = $("*span");
        square.off("click");
        if(numOfBones === 5)
        {
            $("p#Message").text(`YAY! You found all the Bones!`);
        }else{
            $("p#Message").text(`BAD BOY! GET OFF MY LAWN!`);
        }

    }


});