$(document).ready(function () {
    const intercomSettings = {};

    // Boot Intercom
    $('#boot').click(function () {
        intercomSettings.app_id = $('#app_id').val();
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (userId) intercomSettings.user_id = userId;
        if (email) intercomSettings.email = email;

        console.log('Booting Intercom with settings:', intercomSettings);
        Intercom('boot', intercomSettings);
        Intercom('showNewMessage', 'Hello! How can we help you today?');
    });

    // Update Intercom
    $('#update').click(function () {
        const updatedSettings = {};
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (userId) updatedSettings.user_id = userId;
        if (email) updatedSettings.email = email;

        console.log('Updating Intercom with settings:', updatedSettings);
        Intercom('update', updatedSettings);
    });

    // Shutdown Intercom
    $('#shutdown').click(function () {
        console.log('Shutdown button clicked');
        Intercom('shutdown');
        console.log('Intercom has been shut down');

        // Test if Intercom is available after shutdown
        if (typeof Intercom === 'function') {
            console.log('Intercom object still exists. Shutdown cleared the session but Intercom remains available.');
        } else {
            console.log('Intercom object is no longer available.');
        }
    });

    // Track Messenger Open Event
    Intercom('onShow', function () {
        console.log('Messenger opened');
        Intercom('trackEvent', 'messenger_opened');
    });

    // Track Messenger Close Event
    Intercom('onHide', function () {
        console.log('Messenger closed');
        Intercom('trackEvent', 'messenger_closed');
    });
});
