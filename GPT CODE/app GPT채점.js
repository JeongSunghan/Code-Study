
document.addEventListener('DOMContentLoaded', () => {
    // HTML이 온전히 로드가 된 상태에서 람다함수 실행
    // 평가: 10점
    // 설명이 정확합니다. HTML이 온전히 로드된 후에 함수를 실행한다는 점이 잘 표현되었습니다.

    // 각각의 실행 되는 변수들
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    // 평가: 9점
    // 설명이 대체로 맞습니다. 단, '실행 되는 변수들'보다는 'DOM 요소를 가리키는 변수들'이라는 표현이 더 정확할 수 있습니다.

    // 위에서부터 차래로 인풋 ,추가 ,투두리스트, 필터 버튼 변수를 지정
    // 평가: 9점
    // 설명이 대체로 맞습니다. 단, '차례로'의 오타를 '차례로'로 수정하면 더 좋겠습니다.

    let todos = [];
    // 배열 초기화 후 빈 배열로 선언
    // 평가: 10점
    // 설명이 정확합니다.

    let filter = 'ALL';
    // 필터 초기화 후 'ALL'로 선언
    // 평가: 10점
    // 설명이 정확합니다.
});

    addTodoButton.addEventListener('click', () => {
        // addTodoButton에 클릭 이벤트를 추가 클릭하면 다음 함수를 실행
        // 평가: 9점
        // 설명이 대체로 맞습니다. 단, '클릭 이벤트 리스너를 추가한다'는 점을 명확히 하면 좋겠습니다.
    
        const content = todoInput.value.trim();
        // content라는 변수는 todoinput에 입력한 필드에서의 value(값)을 trim(양 끝의 빈 공백공간을 제거후 표현)
        // 평가: 9점
        // 설명이 거의 맞습니다. '양 끝의 빈 공백 공간을 제거한 후'라는 부분이 정확히 맞습니다.
        // '표현'보다는 '저장'이라는 단어가 더 적절합니다.
    
        if (content) {
            // 만약 content라는 변수가 todos라는 배열을 추가했을 때
            // 평가: 6점
            // 설명이 다소 부정확합니다. 정확히는 'content가 비어 있지 않으면' 조건문이 실행된다는 의미입니다.
            
            todos.push({ id: Date.now(), content, completed: false });
            // id값은 시간은 현재, 컨텐츠에 입력한 내용, completed상태는 완료가 안된상태로 추가
            // 평가: 10점
            // 설명이 정확합니다.
    
            todoInput.value = '';
            // 인풋의 밸류값은 문자열로선언
            // 평가: 8점
            // 설명이 다소 모호합니다. 정확히는 '입력 필드의 값을 빈 문자열로 초기화한다'가 더 적절합니다.
    
            renderTodos();
            // renderTodos();에 추가한다?
            // 평가: 7점
            // 설명이 다소 불명확합니다. 정확히는 'renderTodos 함수를 호출하여 화면을 갱신한다'가 더 적절합니다.
        }
    });
    

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-todo')) {
            const id = parseInt(e.target.dataset.id, 10);
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            renderTodos();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filter = button.dataset.filter;
            renderTodos();
        });
    });

    function renderTodos() {
        const filteredTodos = todos.filter(todo => {
            if (filter === 'ACTIVE') return !todo.completed;
            if (filter === 'COMPLETED') return todo.completed;
            return true;
        });

        todoList.innerHTML = '';
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${todo.content}</span>
                <button class="toggle-todo" data-id="${todo.id}">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
            `;
            todoList.appendChild(li);
        });
    }
});
