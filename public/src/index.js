//On load event
document.addEventListener("DOMContentLoaded", () =>{
    commitsTable();
});

//Datatable render with post petition to server
const commitsTable = async () => {
    ServiciosDataTable = $('#tblCommits').DataTable({
        processing: false,
        scrollCollapse: true,
        order: [[0, "desc"]],
        ajax: {
            //Method
            type: 'post',
            //Controller
            url: location.protocol + '//' + location.hostname + (location.port ? ":" + location.port : "")+"/",
            crossDomain: true,
            dataSrc: function (json) {
                //Make your callback here.
                if (json.errno == 500) {
                    alert("Authentication failed")
                }
                else {
                    return json.data;
                }
            }
        }
    })
}