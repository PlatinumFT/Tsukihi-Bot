$('document').ready(function() {
    app.init();
})

app = {
    init: function() {
        app.loadUser()
    },

    loadUser: function() {
        $.get({
            url: '/user_roles/166995790416314370'
        }).done(function(data) {
            app.onLoadUser(data);
        })
    },

    onLoadUser: function(data) {
        data.forEach(e => {
            $.get({
                url: `/role/${e.guild_id}/${e.role_id}`
            }).done(function(data2) {
            let templ = $('#guildTemplate').clone();
            templ.show();
            templ.find('#pic').attr('src', data2.icon);
            templ.find('#name').html(`<p>Server - ${data2.guild.name}</p>\nRole - ${data2.role.name} (${data2.role.color})`);
            templ.appendTo($('#mainPage'));
            })
        })
    }
}