document.addEventListener('DOMContentLoaded', () => {
    // HTML이 온전히 로드가 된 상태에서 람다함수 실행

    // 각각의 실행 되는 변수들
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');    
    // 위에서부터 차래로 인풋 ,추가 ,투두리스트, 필터 버튼 변수를 지정

    let todos = [];
    // 배열 초기화 후 빈 배열로 선언

    let filter = 'ALL';
    // 필터 초기화 후 'ALL'로 선언

    addTodoButton.addEventListener('click', () => {
        // addTodoButton에 클릭 이벤트를 추가 클릭하면 다음 함수를 실행
        const content = todoInput.value.trim();
        // content라는 변수는 todoinput에 입력한 필드에서의 value(값)을 trim(양 끝의 빈 공백공간을 제거후 표현)
        if (content) {
            // 만약 content라는 변수가 todos라는 배열을 추가했을 때            
            todos.push({ id: Date.now(), content, completed: false });
            // id값은 시간은 현재, 컨텐츠에 입력한 내용, completed상태는 완료가 안된상태로 추가
            todoInput.value = '';
            // 인풋의 밸류값은 문자열로선언
            renderTodos();
            // renderTodos();에 추가한다?

        }
    });

    todoList.addEventListener('click', (e) => {
        // todoList를 클릭 했을 때, 다음 event에 대해서 실행
        if (e.target.classList.contains('toggle-todo')) {
            // classList의 이벤트를 toggle-todo에 지정한다.
            const id = parseInt(e.target.dataset.id, 10);
            // id라는 변수는 정수형태인(dataset에서의 id를 지정 후 10을 부여한다? -> 잘 모르겠음)
            todos = todos.map(todo => 
                // todos를 map으로 변환
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
                // todo상서의 id의 상태가 completed를 누른게 참이면 todos 리스트 상에서 제외 거짓일 경우 그대로 리스트에 표시
            );
            renderTodos();
            // Todos 화면을 렌더링 한다.
        }
    });

    filterButtons.forEach(button => {
        // 필터 버튼
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
