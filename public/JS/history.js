// recording history
async function show_history() {
    let history;
    try {
        let response = await fetch('/api/get_all_history');
        history = await response.json();
        localStorage.setItem('allHistory', JSON.stringify(history));
    } catch {
        history = localStorage.getItem('allHistory'); 
    }
    if (history) {
        const table_head = document.getElementById('allHistory');
        let new_obj;
        for (const [i, test] of history.entries()) {
            new_obj = document.createElement('li');
            new_obj.textContent = test.player;
            table_head.prepend(new_obj);
        }
    }
}

show_history();