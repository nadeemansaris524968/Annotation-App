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
        table.appendChild(thead);
        table.classList.add('table');
        table.classList.add('table-bordered');
    };

    var createTblBody = function (annotationRows) {
        var rowData;
        tbody = document.createElement(DOMstrings.tbody);

        for (var i = 0; i < annotationRows.length; i++) {
            rowData = annotationRows[i].row;
            tr = document.createElement(DOMstrings.tr);

            for (var j = 0; j < rowData.length; j++) {
                td = document.createElement(DOMstrings.td);
                var cellText = document.createTextNode(rowData[j]['value']);

                td.appendChild(cellText);
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        body.appendChild(table);
    };

    var rowSelectionDT = function () {
        $('.table tbody').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });
    };

    var createDT = function () {
        var dataTable = $(DOMstrings.table).DataTable();

        // Setup row selection click event on DT
        rowSelectionDT();

        // Remove later
        $('.btn').click(function() {
            alert(dataTable.rows('.selected').data().length + 'rows selected');
        });

        // Inserting data table element inside annotation-table div
        dataTable = document.querySelector('.dataTables_wrapper');
        document.querySelector('.annotation-table').insertAdjacentElement('afterbegin', dataTable);
    };

    return {
        displayTbl: function (colNames, annotationRows) {
            createTblHeading(colNames);
            createTblBody(annotationRows);
            console.log(table);
        },
        createDataTable: function() {
            createDT();
        }
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function () {

    return {
        init: function () {
            console.log('Application started');
            UICtrl.displayTbl(AnnotationCtrl.getColumns(), AnnotationCtrl.getRows());
            UICtrl.createDataTable();
        }
    }

})(AnnotationCtrl, UICtrl);

controller.init();