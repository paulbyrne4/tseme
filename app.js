$(document).ready(function () {
    // Boot Intercom
    $('#boot').click(function () {
        const appId = $('#app_id').val();
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (!appId || !userId) {
            alert('App ID and User ID are required to boot Intercom.');
            return;
        }

        const intercomSettings = {
            app_id: appId,
            user_id: userId,
        };

        if (email) intercomSettings.email = email;

        console.log('Attempting to boot Intercom with:', intercomSettings);

        try {
            Intercom('shutdown'); // Ensure clean state
            Intercom('boot', intercomSettings);
            Intercom('trackEvent', 'boot_clicked', { user_id: userId }); // Track boot event
        } catch (error) {
            console.error('Error booting Intercom:', error);
        }
    });

    // Update Intercom
    $('#update').click(function () {
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (!userId && !email) {
            alert('Please provide User ID or Email to update Intercom settings.');
            return;
        }

        const updatedSettings = {};
        if (userId) updatedSettings.user_id = userId;
        if (email) updatedSettings.email = email;

        console.log('Attempting to update Intercom with:', updatedSettings);

        try {
            Intercom('update', updatedSettings);
            Intercom('trackEvent', 'user_updated', updatedSettings); // Track update event
        } catch (error) {
            console.error('Error updating Intercom settings:', error);
        }
    });

    // Shutdown Intercom
    $('#shutdown').click(function () {
        console.log('Shutdown button clicked');
        try {
            Intercom('shutdown');
            console.log('Intercom has been shut down');
        } catch (error) {
            console.error('Error during shutdown:', error);
        }
    });

    // Start New Conversation
    $('#new-conversation').click(function () {
        const message = 'Hello! How can we assist you today?';
        Intercom('showNewMessage', message);
        console.log('Opened a new conversation with message:', message);

        // Track new conversation event
        Intercom('trackEvent', 'new_conversation_started', { custom_message: message });
    });

    // Trigger on Messenger Open
    Intercom('onShow', function () {
        console.log('Messenger opened!');
        Intercom('trackEvent', 'messenger_opened', { timestamp: new Date().toISOString() });
    });
});
