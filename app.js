$(document).ready(function () {
    // Boot Intercom
    $('#boot').click(function () {
        const appId = $('#app_id').val(); // Fix: Correct selector for App ID input
        const userId = $('#user_id').val(); // Fix: Correct selector for User ID input
        const email = $('#email').val();

        if (!appId) {
            alert('App ID is required to boot Intercom.');
            return;
        }

        // Validate User ID
        if (userId && !/^\w+$/.test(userId)) {
            alert('User ID contains invalid characters.');
            return;
        }

        // Validate Email
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            alert('Invalid email address format.');
            return;
        }

        // Create Intercom settings object
        const intercomSettings = {
            app_id: appId,
        };

        // Add user_id and user_hash if provided
        if (userId) {
            intercomSettings.user_id = userId;
            intercomSettings.user_hash = "wi8qGeJaVgQuoeMZT0x-q6aZSy0cQHNL_CkhOWsj"; // Replace with server-generated HMAC
        }

        // Add email if provided
        if (email) {
            intercomSettings.email = email;
        }

        console.log('Booting Intercom with settings:', JSON.stringify(intercomSettings, null, 2));

        try {
            Intercom('shutdown'); // Ensure clean state
            Intercom('boot', intercomSettings);
            console.log('Intercom booted successfully.');
        } catch (error) {
            alert('Failed to boot Intercom. Check the console for details.');
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
            alert('Failed to shut down Intercom. Check the console for details.');
            console.error('Error during shutdown:', error);
        }
    });

    // Open New Conversation
    $('#new-conversation').click(function () {
        const message = 'Hello! How can we assist you today? (pre-typed)';
        try {
            Intercom('showNewMessage', message);
            console.log('Opened a new conversation with message:', message);
        } catch (error) {
            alert('Failed to start a new conversation. Check the console for details.');
            console.error('Error opening new conversation:', error);
        }
    });
});





