// ANNOTATION CONTROLLER
var AnnotationCtrl = (function () {
    var cxr_template = {
        "col": [
            "Major Anatomic Regions",
            "Subanatomy",
            "Laterality Modifier",
            "Location Modifier",
            "Findings",
            "Character Modifiers",
            "Number of anomalies",
            "Size Modifiers"
        ],
        "annotation-rows": [
            {
                row: [
                    { "col-title": "Major Anatomic Regions", "value": "Lungs" },
                    { "col-title": "Subanatomy", "value": "Upper lung zone" },
                    { "col-title": "Laterality Modifier", "value": "Bilateral" },
                    { "col-title": "Location Modifier", "value": "Peripheral" },
                    { "col-title": "Findings", "value": "Alveolar Opacity" },
                    { "col-title": "Character Modifiers", "value": "No, faint, moderately dense,  very dense" },
                    { "col-title": "Number of anomalies", "value": "NA" },
                    { "col-title": "Size Modifiers", "value": "Small, Medium, Large" }
                ]
            },
            {
                row: [
                    { "col-title": "Major Anatomic Regions", "value": "Lungs" },
                    { "col-title": "Subanatomy", "value": "Upper lung zone" },
                    { "col-title": "Laterality Modifier", "value": "Bilateral" },
                    { "col-title": "Location Modifier", "value": "Central" },
                    { "col-title": "Findings", "value": "Alveolar Opacity" },
                    { "col-title": "Character Modifiers", "value": "No, faint, moderately dense,  very dense" },
                    { "col-title": "Number of anomalies", "value": "NA" },
                    { "col-title": "Size Modifiers", "value": "Small, Medium, Large" }
                ]
            },
            {
                row: [
                    { "col-title": "Major Anatomic Regions", "value": "Lungs" },
                    { "col-title": "Subanatomy", "value": "Upper lung zone" },
                    { "col-title": "Laterality Modifier", "value": "Bilateral" },
                    { "col-title": "Location Modifier", "value": "None" },
                    { "col-title": "Findings", "value": "Alveolar Opacity" },
                    { "col-title": "Character Modifiers", "value": "No, faint, moderately dense,  very dense" },
                    { "col-title": "Number of anomalies", "value": "NA" },
                    { "col-title": "Size Modifiers", "value": "Small, Medium, Large" }
                ]
            },
        ]
    };

    return {
        getColumns: function () {
            return cxr_template.col;
        },
        getRows: function () {
            return cxr_template['annotation-rows'];
        }
    }
})();

// UI CONTROLLER
var UICtrl = (function () {

    var body, table, thead, tbody, tr, td;

    var DOMstrings = {
        body: 'body',
        table: 'table',
        thead: 'thead',
        tbody: 'tbody',
        th: 'th',
        tr: 'tr',
        td: 'td',
        tableDiv: '.annotation-table'
    };

    var createTblHeading = function (colNames) {
        body = document.getElementsByTagName(DOMstrings.body)[0];
        table = document.createElement(DOMstrings.table);
        thead = document.createElement(DOMstrings.thead);
        tr = document.createElement(DOMstrings.tr);

        for (var i = 0; i < colNames.length; i++) {
            var th = document.createElement(DOMstrings.th);
            var cellText = document.createTextNode(colNames[i]);
            th.appendChild(cellText);
            tr.appendChild(th);
        }

        thead.appendChild(tr);
        // table.appendChild(tr);
        table.appendChild(thead);
        table.classList.add('table');
        table.classList.add('table-bordered');
    };

    var createTblBody = function (annotationRows) {
        tbody = document.createElement(DOMstrings.tbody);
        tbody.id = 'myTable';

        var singleRowElements;
        for (var i = 0; i < annotationRows.length; i++) {

            singleRowElements = annotationRows[i]['row'];
            tr = document.createElement(DOMstrings.tr);

            for (var j = 0; j < singleRowElements.length; j++) {
                td = document.createElement(DOMstrings.td);
                var cellText = document.createTextNode(singleRowElements[j]['value']);

                td.appendChild(cellText);
                tr.appendChild(td);
            }
            // Adding row one by one to tbody
            tbody.appendChild(tr);
        }
        // Adding tbody to table
        table.appendChild(tbody);
        body.appendChild(table);
    };

    var createDT = function () {
        var table = $(DOMstrings.table).DataTable();

        // Setup click event on rows for row selection
        $('.table tbody').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });

        $('.btn').click(function () {
            alert(table.rows('.selected').data().length + 'rows selected');
        });
    };

    return {
        createTbl: function (colNames, annotationRows) {
            createTblHeading(colNames);
            createTblBody(annotationRows);
            console.log(table);
        },
        createDataTable: function () {
            createDT();
        },
        placeDT: function () {
            // Inserting data table element inside annotation-table div
            var dataTable = document.querySelector('.dataTables_wrapper');
            document.querySelector('.annotation-table').insertAdjacentElement('afterbegin', dataTable);
        },
        jQueryTranspose: function () {
            $("table").each(function () {
                var $this = $(this);
                var newrows = [];
                $this.find("tr").each(function () {
                    var i = 0;
                    $(this).find("td, th").each(function () {
                        i++;
                        if (newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                        if (i == 1)
                            newrows[i].append("<th>" + this.innerHTML + "</th>");
                        else
                            newrows[i].append("<td>" + this.innerHTML + "</td>");
                    });
                });
                $this.find("tr").remove();
                $.each(newrows, function () {
                    $this.append(this);
                });
            });
        },
        setupTblSearch: function () {
            $('#myInput').keyup(function () {
                var input, filter, table, tr, td, i;
                input = document.getElementById("myInput");
                filter = input.value.toUpperCase();
                table = document.getElementById("myTable");
                tr = table.querySelectorAll("tr");
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[0];
                    if (td) {
                        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            });
            // $('#myInput').on("keyup", function () {
            //     var value = $(this).val().toLowerCase();
            //     $('#myTable td').filter(function () {
            //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            //     });
            // });
        }
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function () {

    return {
        init: function () {
            console.log('Application started');
            UICtrl.createTbl(AnnotationCtrl.getColumns(), AnnotationCtrl.getRows());
            // UICtrl.createDataTable();
            // UICtrl.placeDT();

            // Transposing simple table
            UICtrl.setupTblSearch();
            UICtrl.jQueryTranspose();
        }
    }

})(AnnotationCtrl, UICtrl);

controller.init();