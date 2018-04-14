$('document').ready(function() {
    app.init();
})

app = {
    init: function() {
        app.loadUser()
    },

    loadUser: function() {
        $.get({
            url: '/command_log'
        }).done(function(data) {
            app.onLoadUser(data);
        })
    },

    onLoadUser: function(data) {
        $('#commandLogTable').DataTable({
            searching: false,
            bDestroy: true,
            paging: false,
            order: [[0, 'desc']],
            lengthMenu: [[-1, 10, 25, 50, 100], ['All', 10, 25, 50, 100]],
            data: data,
            columnDefs: [{ targets: [0, 1, 2, 3, 4], className: 'text-left' }],
            columns: [
                { data: 'user_name' },
                { data: 'user_id' },
                { data: 'command' },
                { data: 'args' },
                { 
                    data: 'date',
                    render: function(data) {
                        console.log(data);
                        return new Date(data);
                    }
                 }
            ]
        });
    }
}