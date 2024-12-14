$(document).ready(function () {
    // Boot Intercom
    $('#boot').click(function () {
        const appId = $('#app_id').val();
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (!appId) {
            alert('App ID is required to boot Intercom.');
            return;
        }

        // If no user_id is provided, use an anonymous session or random ID
        const intercomSettings = {
            app_id: appId,
        };

        if (userId) {
            intercomSettings.user_id = userId; // For specific user
        } else {
            intercomSettings.user_id = `temp-${Math.random().toString(36).substr(2, 9)}`; // Temporary ID for anonymity
        }

        if (email) intercomSettings.email = email;

        console.log('Booting Intercom with settings:', intercomSettings);

        try {
            Intercom('shutdown'); // Ensure clean state
            Intercom('boot', intercomSettings);
            console.log('Intercom booted successfully.');
        } catch (error) {
            console.error('Error booting Intercom:', error);
        }
    });

    // Shutdown Intercom
    $('#shutdown').click(function () {
        console.log('Shutting down Intercom...');
        try {
            Intercom('shutdown');
            console.log('Intercom has been shut down.');
        } catch (error) {
            console.error('Error during shutdown:', error);
        }
    });

    // Open New Conversation
    $('#new-conversation').click(function () {
        const message = 'Hello! How can we assist you today?';
        Intercom('showNewMessage', message);
        console.log('Opened a new conversation with message:', message);
    });
});


