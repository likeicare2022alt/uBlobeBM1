(function() {
    'use strict';
    if (window.inPageConsoleLoaded) { return; }
    window.inPageConsoleLoaded = true;

    function initializeInPageConsole() {
        // ... (CSS and HTML Injection code is the same as before) ...

        const style = document.createElement('style');
        style.textContent = `
            #consoleWindowJS {
                position: fixed; bottom: 20px; right: 20px; width: 400px; height: 300px;
                background-color: #f4f4f4; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 10000; display: none; flex-direction: column; resize: both; overflow: hidden;
                font-family: sans-serif;
            }
            #consoleHeaderJS { padding: 8px; background-color: #e0e0e0; cursor: move; font-weight: bold;
                display: flex; justify-content: space-between; align-items: center; }
            #consoleHeaderJS button { cursor: pointer; background: none; border: none; font-size: 16px; }
            #consoleLogsJS { flex-grow: 1; padding: 10px; overflow-y: auto; background-color: #fff;
                font-family: monospace; font-size: 12px; white-space: pre-wrap; }
            #consoleInputAreaJS { padding: 10px; border-top: 1px solid #ccc; }
            #consoleInputJS { width: 100%; padding: 5px; box-sizing: border-box; border: 1px solid #ccc; }
        `;
        document.head.appendChild(style);

        const consoleWindow = document.createElement('div');
        consoleWindow.id = 'consoleWindowJS';
        consoleWindow.innerHTML = `
            <div id="consoleHeaderJS">Mini Console<button onclick="document.getElementById('consoleWindowJS').style.display = 'none';">×</button></div>
            <div id="consoleLogsJS"></div>
            <div id="consoleInputAreaJS"><input type="text" id="consoleInputJS" placeholder="Enter JS code and press Enter..."></div>
        `;
        document.body.appendChild(consoleWindow);

        const consoleLogs = document.getElementById('consoleLogsJS');
        const consoleInput = document.getElementById('consoleInputJS');

        function logToConsole(message, type = 'log') {
            const logEntry = document.createElement('div');
            logEntry.textContent = `> ${message}`;
            logEntry.style.color = type === 'error' ? 'red' : (type === 'result' ? 'blue' : 'black');
            consoleLogs.appendChild(logEntry);
            consoleLogs.scrollTop = consoleLogs.scrollHeight;
        }

        // --- Execution Method using a Function Constructor (Alternative to eval) ---
        consoleInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const code = consoleInput.value;
                if (!code) return;

                logToConsole(`CMD: ${code}`, 'log');
                try {
                    // Use Function constructor for execution (safer than direct eval)
                    // The code runs in the global scope.
                    const dynamicFunction = new Function(code);
                    let result = dynamicFunction();
                    logToConsole(`Result: ${result}`, 'result');
                } catch (error) {
                    logToConsole(`ERROR: ${error.message}`, 'error');
                }
                consoleInput.value = '';
            }
        });

        // --- Toggle Visibility (Ctrl+Shift+`) ---
        document.addEventListener('keydown', function(event) {
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === '`') {
                event.preventDefault();
                if (consoleWindow.style.display === 'none' || consoleWindow.style.display === '') {
                    consoleWindow.style.display = 'flex';
                    consoleInput.focus();
                } else {
                    consoleWindow.style.display = 'none';
                }
            }
        });
        
        console.log("In-Page Console Script Initialized. Press Ctrl+Shift+` to toggle visibility.");
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInPageConsole);
    } else {
        initializeInPageConsole();
    }
})();
