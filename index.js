/*jshint esversion:6*/
$(document).one('pageinit', function(){
  $(function(){
    $('.date').each(function(){
      $(this).datepicker();
    });
  });
  let todos;
  showTodos();
  $('#submitAdd').on('tap', addTask);
  $('#todos').on('tap', '#editLink', setCurrent);
  $('#submitEdit').on('tap', editTask);
  $('#todos').on('tap', '#deleteLink', deleteTask);

  function showTodos(){
    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      $('#todos').append('<li class="ui-body-inherit ui-li-static">' + todos[i].task + '<br>' + todos[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + todos[i].task + '" data-date="' + todos[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + todos[i].task + '" data-date="' + todos[i].date + '">Kustuta</a></div></li>');
    }
  }

  function setCurrent(){
    console.log("setCurrent");
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    $('#editTask').val(localStorage.getItem('currentTask'));
    $('#editDate').val(localStorage.getItem('currentDate'));
  }
  function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      if(currentDate == todos[i].date && currentTask == todos[i].task){
        todos.splice(i, 1);
      }

      localStorage.setItem('todos', JSON.stringify(todos));
    }

    window.location.href = "index.html";
    return false;
  }


  function editTask(){
    console.log("editTask");
    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      if(currentDate == todos[i].date && currentTask == todos[i].task){
        todos.splice(i, 1);
      }

      localStorage.setItem('todos', JSON.stringify(todos));
    }


    let task = $('#editTask').val();
    let date = $('#editDate').val();

    let todo = {
      task: task,
      date: date
    };


    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
    return false;
  }

  function addTask(){
    let task = $('#addTask').val();
    let date = $('#addDate').val();

    let todo = {
      task: task,
      date: date
    };

    todos = getTodoObject();
    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
    return false;
  }

  function getTodoObject(){
    let currentTodos = localStorage.getItem('todos');

    if(currentTodos != null){
      todos = JSON.parse(currentTodos);
    } else{
      todos = [];
    }

    return todos.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });

  }


});

let clockContainer;
let dayContainer;
window.onload = function(){
  init();

};



function startClock(){

  clockContainer = document.querySelector('#clockContainer');
  updateClock();
  window.setInterval(function(){
    updateClock();
  }, 1000);
}

function updateClock(){
  const date = new Date();
  clockContainer.innerHTML = date;
  dayContainer = document.querySelector("#dayContainer");
  let day;
  switch(new Date().getDay()){
    case 0:
    day = "Sunday";
    break;
    case 1:
    day = "Monday"
    break;
    case 2:
    day = "Tuesday"
    break;
    case 3:
    day = "Wednesday"
    break;
    case 4:
    day = "Thursday"
    break;
    case 5:
    day = "Friday"
    break;
    case 6:
    day = "Saturday"
    break;
    default:
    day = "Wait a minute, this ain't a date!"
  }
  dayContainer.innerHTML = day;
}
self.addEventListener("fetch", function(event){

});
