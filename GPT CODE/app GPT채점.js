document.addEventListener('DOMContentLoaded', () => {
    // HTML이 온전히 로드가 된 상태에서 람다함수 실행 -> HTML이 완전히 로드된 후 익명 함수를 실행
    // 채점: 8/10

    // 각각의 실행 되는 변수들 -> 각 요소를 가리키는 변수를 선언
    // 채점: 7/10

    const todoInput = document.getElementById('todo-input'); // 할 일 입력 필드
    // 채점: 10/10

    const addTodoButton = document.getElementById('add-todo'); // 할 일 추가 버튼
    // 채점: 10/10

    const todoList = document.getElementById('todo-list'); // 할 일 목록
    // 채점: 10/10

    const filterButtons = document.querySelectorAll('.filter-btn'); // 필터 버튼들
    // 채점: 10/10

    let todos = []; // 배열 초기화 후 빈 배열로 선언 -> 할 일 목록 배열을 빈 배열로 초기화
    // 채점: 9/10

    let filter = 'ALL'; // 필터 초기화 후 'ALL'로 선언 -> 필터 상태를 'ALL'로 초기화
    // 채점: 9/10

    addTodoButton.addEventListener('click', () => {
        // addTodoButton에 클릭 이벤트를 추가 클릭하면 다음 함수를 실행 -> addTodoButton에 클릭 이벤트를 추가, 클릭하면 익명 함수 실행
        // 채점: 9/10

        const content = todoInput.value.trim();
        // content라는 변수는 todoInput에 입력한 필드에서의 value(값)을 trim(양 끝의 빈 공백공간을 제거 후 표현)
        // 채점: 10/10

        if (content) {
            // 만약 content라는 변수가 todos라는 배열을 추가했을 때 -> content가 빈 문자열이 아닐 경우
            // 채점: 6/10

            todos.push({ id: Date.now(), content, completed: false });
            // id값은 현재 시간, 컨텐츠에 입력한 내용, completed상태는 완료가 안된 상태로 추가
            // 채점: 10/10

            todoInput.value = '';
            // 인풋의 밸류값은 문자열로 선언 -> 입력 필드를 빈 문자열로 초기화
            // 채점: 7/10

            renderTodos();
            // renderTodos();에 추가한다? -> 할 일 목록을 다시 렌더링
            // 채점: 5/10
        }
    });

    todoList.addEventListener('click', (e) => {
        // todoList를 클릭 했을 때, 다음 event에 대해서 실행 -> todoList를 클릭 했을 때 이벤트 핸들러 실행
        // 채점: 9/10

        if (e.target.classList.contains('toggle-todo')) {
            // classList의 이벤트를 toggle-todo에 지정한다. -> 클릭한 요소가 'toggle-todo' 클래스를 포함하고 있는지 확인
            // 채점: 8/10

            const id = parseInt(e.target.dataset.id, 10);
            // id라는 변수는 정수형태인(dataset에서의 id를 지정 후 10을 부여한다? -> data-id 속성에서 id를 가져와 정수로 변환
            // 채점: 6/10

            todos = todos.map(todo => 
                // todos를 map으로 변환 -> todos 배열을 순회하며 각 요소를 변환
                // 채점: 8/10

                todo.id === id ? { ...todo, completed: !todo.completed } : todo
                // todo 상에서의 id의 상태가 completed를 누른 게 참이면 todos 리스트 상에서 제외, 거짓일 경우 그대로 리스트에 표시 -> 클릭한 요소의 id와 동일한 todo의 completed 상태를 토글
                // 채점: 6/10
            );

            renderTodos();
            // Todos 화면을 렌더링 한다. -> 변경된 할 일 목록을 다시 렌더링
            // 채점: 7/10
        }
    });

    filterButtons.forEach(button => {
        // filterButtons 변수 상에서의 button을 요소를 찾으면서 순회 -> 모든 필터 버튼에 대해
        // 채점: 8/10

        button.addEventListener('click', () => {
            // button에서 click이라는 이벤트가 발생하면 -> 버튼에 클릭 이벤트를 추가
            // 채점: 8/10

            filter = button.dataset.filter;
            // filter = 버튼 상에 표시되어있는 data목록으로 필터 처리 -> 클릭한 버튼의 data-filter 값을 필터 상태로 설정
            // 채점: 7/10

            renderTodos();
            // 필터 처리가 된 투두리스트를 화면에 렌더링 한다. -> 필터가 적용된 할 일 목록을 다시 렌더링
            // 채점: 8/10
        });
    });

    // 투두리스트 렌더링 함수
    function renderTodos() {        
        const filteredTodos = todos.filter(todo => {
            // filteredTodos 변수는 todos라는 배열로부터 필터를 처리한다. -> 현재 필터 상태에 따라 할 일 목록을 필터링
            // 채점: 7/10

            if (filter === 'ACTIVE') return !todo.completed;
            // 만약 필터가 ACTIVE, 즉 활동중인 상태면, 완료가 안된 화면으로 값을 반환 -> 필터가 'ACTIVE'면 완료되지 않은 할 일만 반환
            // 채점: 9/10

            if (filter === 'COMPLETED') return todo.completed;
            // 만약 필터가 COMPLETED, 즉 활동이 완료된 상태면, 완료가 된 화면으로 값을 반환 -> 필터가 'COMPLETED'면 완료된 할 일만 반환
            // 채점: 9/10

            return true;
            // 그 후 함수에 true를 반환 -> 필터가 'ALL'이면 모든 할 일 반환
            // 채점: 9/10
        });

        todoList.innerHTML = '';
        // todoList에서 콘텐츠를 빈 문자열로 불러온다. -> 기존 할 일 목록을 비움
        // 채점: 8/10

        filteredTodos.forEach(todo => {
            // filteredTodos를 순회하여 todo에서 -> 필터링된 할 일 목록을 순회하여
            // 채점: 8/10

            const li = document.createElement('li');
            // li라는 변수는 HTML상에서 li 요소를 생성 -> 새로운 li 요소 생성
            // 채점: 9/10

            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            // li의 변수 이름은 투두리스트 아이템이고, 아이템의 활동 상태가 완료가 된 상태이면, 완료 상태로, 아니라면 빈 값으로 -> 할 일이 완료된 경우 'completed' 클래스를 추가
            // 채점: 7/10

            li.innerHTML = `
                <span>${todo.content}</span>
                <button class="toggle-todo" data-id="${todo.id}">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
            `;
            // li의 콘텐츠는 todo에서 내가 입력한 값을 span 태그로 만들고, button의 상태가 토글이 가능한걸로 만들며 -> 할 일 내용과 토글 버튼을 li 요소에 추가
            // todo 상태가 완료된 것에 따른 참 거짓으로 버튼에 보여지는 내용을 변경 -> 할 일 상태에 따라 버튼 텍스트를 'Undo' 또는 'Complete'로 설정
            // 채점: 7/10

            todoList.appendChild(li);
            // appendChild = 개념 숙지 할것 -> li 요소를 할 일 목록에 추가
            // 채점: 7/10
        });
    }
});

// 종합 평가
// 주석의 대부분은 코드의 의도를 설명하는데 충분하지만, 몇몇 부분은 다소 부정확하거나 불명확합니다.
// 특히, parseInt(e.target.dataset.id, 10) 부분과 todos.map의 동작에 대한 설명이 다소 혼란스러웠습니다.
// 각 변수와 함수의 목적과 동작을 더 명확히 설명하는 주석을 추가하여 이해를 돕는 것이 좋습니다.
// 총점 (각 줄의 평균 점수): 7.97/10