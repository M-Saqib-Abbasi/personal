// ========================================
// Browser Developer Tools Protection
// ========================================
// Note: This is not 100% foolproof but deters casual users

(function() {
    'use strict';

    // 1. Disable Right-Click Context Menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityAlert('Right-click is disabled on this page.');
        return false;
    });

    // 2. Disable Common Keyboard Shortcuts for DevTools
    document.addEventListener('keydown', function(e) {
        // F12 - Developer Tools
        if (e.keyCode === 123) {
            e.preventDefault();
            showSecurityAlert('Developer tools are disabled.');
            return false;
        }
        
        // Ctrl+Shift+I - Developer Tools
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showSecurityAlert('Developer tools are disabled.');
            return false;
        }
        
        // Ctrl+Shift+J - Console
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showSecurityAlert('Developer tools are disabled.');
            return false;
        }
        
        // Ctrl+Shift+C - Inspect Element
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showSecurityAlert('Developer tools are disabled.');
            return false;
        }
        
        // Ctrl+U - View Source
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showSecurityAlert('Viewing page source is disabled.');
            return false;
        }
        
        // Ctrl+S - Save Page
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showSecurityAlert('Saving page is disabled.');
            return false;
        }
        
        // Ctrl+P - Print (optional, uncomment if you want to disable)
        // if (e.ctrlKey && e.keyCode === 80) {
        //     e.preventDefault();
        //     return false;
        // }
    });

    // 3. Detect DevTools Open (using timing attack)
    let devtoolsOpen = false;
    const element = new Image();
    let checkInterval;
    
    Object.defineProperty(element, 'id', {
        get: function() {
            devtoolsOpen = true;
            handleDevToolsOpen();
            throw new Error('DevTools detected');
        }
    });

    function checkDevTools() {
        devtoolsOpen = false;
        console.log(element);
        console.clear();
    }

    function handleDevToolsOpen() {
        if (devtoolsOpen) {
            // Option 1: Show alert and redirect
            alert('⚠️ Developer tools detected!\n\nFor security reasons, this page cannot be accessed with developer tools open.\n\nThe page will now reload.');
            window.location.reload();
            
            // Option 2: Just show warning (uncomment below, comment above)
            // showSecurityAlert('Developer tools detected! Please close them to continue.');
        }
    }

    // Check every 1 second
    checkInterval = setInterval(checkDevTools, 1000);

    // 4. Detect DevTools by Window Size (another method)
    let devToolsDetected = false;
    const threshold = 160;
    
    function detectDevToolsBySize() {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            if (!devToolsDetected) {
                devToolsDetected = true;
                // Uncomment below to show alert when DevTools detected by size
                // alert('⚠️ Developer tools detected!');
                // window.location.reload();
            }
        } else {
            devToolsDetected = false;
        }
    }
    
    // Check on resize
    window.addEventListener('resize', detectDevToolsBySize);
    detectDevToolsBySize();

    // 5. Disable Text Selection (optional - uncomment if needed)
    // document.addEventListener('selectstart', function(e) {
    //     e.preventDefault();
    //     return false;
    // });

    // 6. Disable Copy (optional - uncomment if needed)
    // document.addEventListener('copy', function(e) {
    //     e.preventDefault();
    //     showSecurityAlert('Copying is disabled on this page.');
    //     return false;
    // });

    // 7. Disable Cut (optional - uncomment if needed)
    // document.addEventListener('cut', function(e) {
    //     e.preventDefault();
    //     return false;
    // });

    // 8. Disable Drag (optional - uncomment if needed)
    // document.addEventListener('dragstart', function(e) {
    //     e.preventDefault();
    //     return false;
    // });

    // 9. Clear Console Periodically
    setInterval(function() {
        console.clear();
    }, 2000);

    // 10. Override console methods (optional - makes debugging harder)
    // if (!window.console) window.console = {};
    // const methods = ['log', 'debug', 'warn', 'info', 'error'];
    // methods.forEach(function(method) {
    //     console[method] = function() {};
    // });

    // 11. Detect if running in iframe (security measure)
    if (window.top !== window.self) {
        // Page is in iframe - you might want to prevent this
        // Uncomment below to break out of iframe
        // window.top.location = window.self.location;
    }

    // Helper function to show security alerts
    function showSecurityAlert(message) {
        // Try to use existing modal if available
        if (typeof showModal === 'function') {
            showModal(message, 'error');
        } else {
            // Fallback to browser alert
            // alert(message);
            console.log(message); // Just log instead of alert to avoid annoying users
        }
    }

    // 12. Prevent printing (optional - uncomment if needed)
    // window.addEventListener('beforeprint', function(e) {
    //     e.preventDefault();
    //     alert('Printing is disabled on this page.');
    //     return false;
    // });

    // 13. Debugger trap (will pause if DevTools is open)
    // This is aggressive and may annoy users
    // setInterval(function() {
    //     debugger;
    // }, 100);

    // 14. Detect Chrome DevTools via console.profiles
    // const devtools = /./;
    // devtools.toString = function() {
    //     handleDevToolsOpen();
    // };
    // setInterval(function() {
    //     console.log(devtools);
    // }, 1000);

    // Log message for legitimate inspection
    console.log('%c⚠️ STOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers.', 'font-size: 18px;');
    console.log('%cIf someone told you to copy/paste something here, it is a scam.', 'font-size: 16px; color: red;');
    console.log('%c\nFor support, contact: 0307-3044150 (WhatsApp)', 'font-size: 14px; color: green;');

})();

// Prevent access to this script
Object.freeze(this);

