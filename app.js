$(document).ready(function () {
    const intercomSettings = {};

    // Boot Intercom
    $('#boot').click(function () {
        intercomSettings.app_id = $('#app_id').val();
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (userId) intercomSettings.user_id = userId;
        if (email) intercomSettings.email = email;

        Intercom('boot', intercomSettings);
        Intercom('showNewMessage', 'Hello! How can we help you today?');
        console.log('Intercom booted:', intercomSettings);
    });

    // Update Intercom
    $('#update').click(function () {
        const updatedSettings = {};
        const userId = $('#user_id').val();
        const email = $('#email').val();

        if (userId) updatedSettings.user_id = userId;
        if (email) updatedSettings.email = email;

        Intercom('update', updatedSettings);
        console.log('Intercom updated:', updatedSettings);
    });

    // Shutdown Intercom
    $('#shutdown').click(function () {
        Intercom('shutdown');
        console.log('Intercom shut down');
    });

    // Track Messenger Open Event
    Intercom('onShow', function () {
        Intercom('trackEvent', 'messenger_opened');
        console.log('Messenger opened');
    });
});
