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

        // Create Intercom settings object
        const intercomSettings = {
            app_id: appId,
        };

        // Add user_id if provided
        if (userId) {
            intercomSettings.user_id = userId;
        }

        // Add email if provided
        if (email) {
            intercomSettings.email = email;
        }

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
        const message = 'Pre-typed message, Hello! How can we assist you today?';
        Intercom('showNewMessage', message);
        console.log('Opened a new conversation with message:', message);
    });
});


