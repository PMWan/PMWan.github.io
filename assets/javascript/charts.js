$(() => $('table').floatThead({
    responsiveContainer: function($table){
        return $table.closest(".table-responsive");
    }
}));