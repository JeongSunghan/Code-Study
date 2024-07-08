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
                // todo상에서의 id의 상태가 completed를 누른게 참이면 todos 리스트 상에서 제외 거짓일 경우 그대로 리스트에 표시
            );
            renderTodos();
            // Todos 화면을 렌더링 한다.
        }
    });

    filterButtons.forEach(button => {
        // filterButtons변수상에서의 button을 요소를 찾으면서 순회
        button.addEventListener('click', () => {
            // button에서 click이라는 이벤트가 발생하면        
            filter = button.dataset.filter;
            // filter = 버튼 상에 표시되어있는 data목록으로 필터처리
            renderTodos();
            // 필터처리가된 투두리스트를 화면에 렌더링 한다.
        });
    });

    // 투두리스트 렌더링 함수
    function renderTodos() {        
        const filteredTodos = todos.filter(todo => {
            // filteedTodos변수는 todos라는 배열로부터 필처를 처리한다.
            if (filter === 'ACTIVE') return !todo.completed;
            // 만약 필터가 acitive, 즉 활동중인 상태면, 완료가 안된 화면으로 값을 반환
            if (filter === 'COMPLETED') return todo.completed;
            // 만약 필터가 completed, 즉 활동이 완료된 상태면, 완료가된 화면으로 값을 반환
            return true;
            // 그 후 함수에 true를 반환        
        });

        todoList.innerHTML = '';
        // todolist에서 콘텐츠를 빈 문장열로 불러온다.    
        filteredTodos.forEach(todo => {
            // filteredTodos를 순회하여 todo에서
            const li = document.createElement('li');
            // li라는 변수는 = HTML상에서 li요소를 생성
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            // li의 변수 이름은 투두리스트 아이템이고, 아이템의 활동 상태가 완료가 된 상태이면, 완료 상태로, 아니라면 빈값으로
            li.innerHTML = `
                <span>${todo.content}</span>
                <button class="toggle-todo" data-id="${todo.id}">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
            `;
            // li의 콘텐츠는 todo에서 내가 입력한 값을 span 태그로 만들고, button의 상태가 토글이 가능한걸로 만들며
            // todo상태가 완료된 것에 따른 참 거짓 으로 버튼에 보여지는 내용을 변경

            todoList.appendChild(li);
            // appendChild = 개념 숙지 할것
            
        });
    }
});
