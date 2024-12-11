$(document).ready(function () {
    const intercomSettings = {};

    // Boot Intercom
    $('#boot').click(function () {
        intercomSettings.app_id = $('#app_id').val();
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (userId) intercomSettings.user_id = userId;
        if (email) intercomSettings.email = email;

        console.log('Attempting to boot Intercom with:', intercomSettings);
        Intercom('boot', intercomSettings);
    });

    // Update Intercom
    $('#update').click(function () {
        const updatedSettings = {};
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (userId) updatedSettings.user_id = userId;
        if (email) updatedSettings.email = email;

        console.log('Attempting to update Intercom with:', updatedSettings);
        Intercom('update', updatedSettings);
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

        // Verify if Intercom is still accessible
        if (typeof Intercom === 'function') {
            console.log('Intercom object still exists. Shutdown only cleared the session.');
        } else {
            console.log('Intercom object is no longer available.');
        }
    });

    // Messenger Events
    Intercom('onShow', function () {
        console.log('Messenger opened');
    });

    Intercom('onHide', function () {
        console.log('Messenger closed');
    });
});
