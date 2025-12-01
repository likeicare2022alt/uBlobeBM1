(function() {
    // Check if the script is already loaded
    if (window.inPageConsoleLoaded) {
        console.log("In-Page Console is already loaded.");
        return;
    }
    window.inPageConsoleLoaded = true;

    // A function to create all the necessary elements and logic
    function initializeInPageConsole() {
        // --- 1. Create and Inject CSS Styles ---
        const style = document.createElement('style');
        style.textContent = `
            #consoleWindowJS {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 400px;
                height: 300px;
                background-color: #f4f4f4;
                border: 1px solid #ccc;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                display: none; /* Hidden by default */
                flex-direction: column;
                resize: both;
                overflow: hidden;
                font-family: sans-serif;
            }
            #consoleHeaderJS {
                padding: 8px;
                background-color: #e0e0e0;
                cursor: move;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            #consoleHeaderJS button {
                cursor: pointer;
                background: none;
                border: none;
                font-size: 16px;
            }
            #consoleLogsJS {
                flex-grow: 1;
                padding: 10px;
                overflow-y: auto;
                background-color: #fff;
                font-family: monospace;
                font-size: 12px;
                white-space: pre-wrap;
            }
            #consoleInputAreaJS {
                padding: 10px;
                border-top: 1px solid #ccc;
            }
            #consoleInputJS {
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
                border: 1px solid #ccc;
            }
        `;
        document.head.appendChild(style);

        // --- 2. Create and Inject HTML Elements ---
        const consoleWindow = document.createElement('div');
        consoleWindow.id = 'consoleWindowJS';
        consoleWindow.innerHTML = `
            <div id="consoleHeaderJS">
                Mini Console
                <button onclick="document.getElementById('consoleWindowJS').style.display = 'none';">×</button>
            </div>
            <div id="consoleLogsJS"></div>
            <div id="consoleInputAreaJS">
                <input type="text" id="consoleInputJS" placeholder="Enter JS code and press Enter...">
            </div>
        `;
        document.body.appendChild(consoleWindow);

        // Get references to the new elements
        const consoleLogs = document.getElementById('consoleLogsJS');
        const consoleInput = document.getElementById('consoleInputJS');
        const consoleHeader = document.getElementById('consoleHeaderJS');

        // --- 3. Functionality: Logging and Execution ---

        function logToConsole(message, type = 'log') {
            const logEntry = document.createElement('div');
            logEntry.textContent = `> ${message}`;
            logEntry.style.color = type === 'error' ? 'red' : (type === 'result' ? 'blue' : 'black');
            consoleLogs.appendChild(logEntry);
            consoleLogs.scrollTop = consoleLogs.scrollHeight;
        }

        // Handle input execution on 'Enter' key press
        consoleInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const code = consoleInput.value;
                if (!code) return;

                logToConsole(`CMD: ${code}`, 'log');
                try {
                    // Use eval() for execution within the page scope
                    let result = eval(code);
                    logToConsole(`Result: ${result}`, 'result');
                } catch (error) {
                    logToConsole(`ERROR: ${error.message}`, 'error');
                }
                consoleInput.value = '';
            }
        });

        // --- 4. Functionality: Toggle Visibility (Ctrl+Shift+`) ---
        document.addEventListener('keydown', function(event) {
            // Check for Ctrl (or Cmd on Mac) + Shift + Backtick
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

        // --- 5. Functionality: Draggable Window Logic (Drag handler omitted for brevity, but can be added back from previous response if needed) ---
        // The dragging logic adds complexity and length, but the core functionality works without it.

        console.log("In-Page Console Script Initialized. Press Ctrl+Shift+` to toggle visibility.");
    }

    // Wait until the DOM is fully loaded before trying to inject elements
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInPageConsole);
    } else {
        // If the DOM is already loaded when the script runs, initialize immediately
        initializeInPageConsole();
    }
})();
