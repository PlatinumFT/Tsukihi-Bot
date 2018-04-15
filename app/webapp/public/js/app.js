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
        console.log(data);
        $('#commandLogTable').DataTable({
            searching: false,
            bDestroy: true,
            paging: true,
            order: [[6, 'desc']],
            lengthMenu: [[-1, 10, 25, 50, 100], ['All', 10, 25, 50, 100]],
            data: data,
            columnDefs: [{ targets: [0, 1, 2, 3, 4], className: 'text-left' }],
            columns: [
                { data: 'data.user_name' },
                { data: 'data.user_id' },
                { 
                    data: 'channel',
                    render: function(data) {
                        if(!data) return "";
                        else return `<a href="#" data-toggle="tooltip" title="${data.guild.id}" class="tooltipID">${data.guild.name}</a>`
                    }
                },
                { 
                    data: 'channel',
                    render: function(data) {
                        if(!data) return "";
                        else return `<a href="#" data-toggle="tooltip" title="${data.id}" class="tooltipID">${data.name}</a>`
                    }
                },
                { data: 'data.command' },
                { data: 'data.args' },
                { 
                    data: 'data.date',
                    render: function(data) {
                        return new Date(data);
                    }
                 }
            ],
            initComplete: function() {
                $('.tooltipID').tooltip();
            }
        });
    }
}