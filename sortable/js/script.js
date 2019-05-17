$(document).ready(function () {
		var okButton = document.getElementById("conformValue");
		var okValue = document.getElementById("value");
		var questions = document.getElementById("questionOptions");
		var answers = document.getElementById("answerOptions");
		var repeat = document.getElementById("onceAgain");
		var showAnswer = document.getElementById("showAnswer");
		var maxValue,val;
		var count =0;
		$('#btnCheck').addClass("hold");
			repeat.classList.add("hold");
			showAnswer.classList.add("hold");
            $.ajax({
                url: 'data/content.json',
                dataType: "json",
                method: 'post',
                success: function (data) {
					console.log(data);
                    $('#question').text(data.QuestionText)
                    $('#Notes').text(data.Note)
					okButton.addEventListener("click", function(){
						
						val =okValue.value;
						if(val > 0 && val < 11){
							okButton.classList.add("hold");
						okValue.classList.add("hold");
						$('#btnCheck').removeClass("hold");
			console.log("works");
			maxValue =val;
			questions.innerHTML ="";
			answers.innerHTML ="";
			
					for(let i= 0; i< maxValue;i++){
						
						/* var back = ["#ff0000", "green", "gray"];
						var rand = back[Math.floor(Math.random() * back.length)]; */

						let question =data.QuestionOptions[i];
						$('#questionOptions').append('<li id=' + i + '>' + question + '</li>');
					}
						data.ActualAnswer.length = maxValue; 
						let checkers =data.ActualAnswer.sort(function() { return 0.5 - Math.random() });
						
						for(let k= 0; k< maxValue;k++){
							let checker = checkers[k];
						$('#answerOptions').append('<li id=' + k + '>' + checker + '</li>');
						
						console.log(checkers);
					}
					}
					else{
						 var person = prompt("Please enter your name:", "");
						alert("Hi " + person +", Please give value between 1 to 10.")
					}
                   	});
                    $('#answerOptions').sortable({
                        placeholder: 'placeholder',
                        axis: 'y',
                        start: function () {
                            $('#answerOptions li').removeClass('wrongAnswer correctAnswer');
                        }
                    });
                },
                error: function (err) {
                    alert(err.statusText);
                }
				
				
            });
			repeat.addEventListener("click", function(){
				$('#btnCheck').removeClass("hold");
				repeat.classList.add("hold");
				$.ajax({
                url: 'data/content.json',
                dataType: "json",
                method: 'post',
                success: function (data) {
				maxValue =okValue.value;
			answers.innerHTML ="";
			data.ActualAnswer.length = maxValue; 
						let checkers =data.ActualAnswer.sort(function() { return 0.5 - Math.random() });
						
						for(let k= 0; k< maxValue;k++){
							let checker = checkers[k];
						$('#answerOptions').append('<li id=' + k + '>' + checker + '</li>');
						
						console.log(checkers);
					}
					}
				});
			});
			showAnswer.addEventListener("click", function(){
				
				$('#btnCheck').addClass("hold");
				$.ajax({
                url: 'data/content.json',
                dataType: "json",
                method: 'post',
                success: function (data) {
				maxValue =okValue.value;
			answers.innerHTML ="";
			data.ActualAnswer.length = maxValue; 
						let checkers =data.ActualAnswer;
						
						for(let k= 0; k< maxValue;k++){
							let checker = checkers[k];
						$('#answerOptions').append('<li id=' + k + '>' + checker + '</li>');
						 
                        $('#answerOptions li').addClass('correctAnswer');
						
					}
					}
				});
			});

            $('#btnCheck').click(function () {
				$('#btnCheck').addClass("hold");
				repeat.classList.remove("hold");
                $.ajax({
                    url: 'data/content.json',
                    dataType: "json",
                    method: 'post',
                    success: function (data) {
						var ans= answerOptions.children;
						console.log(count);
						
						for(let x= 0; x< data.ActualAnswer.length;x++){
								if(count == 1 && data.ActualAnswer[x] == ans[x].innerHTML){
									alert("Congratulation...!!! you answered correctly.");
									repeat.classList.add("hold");
								}
							if(data.ActualAnswer[x] == ans[x].innerText){
								ans[x].style.border = "2px solid green";
								
							}
							else{
								ans[x].style.border ="2px solid red";
							}
							
						}
                    },
                    error: function (err) {
                        alert(err.statusText);
                    }
                });
				
				count++;
				
				if(count == 2){
					repeat.classList.add("hold");
					showAnswer.classList.remove("hold");
					/* if(data.ActualAnswer[x] == ans[x].innerText){
						alert("you answered correctly.");
					} */
				}
            });
        });