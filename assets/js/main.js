let url = location.host; //so it works locally and online

$("table").rtResponsiveTables(); //for the responsive tables plugin

$("#add_drug").submit(function(event) { //on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!"); //alert this in the browser
})



$("#update_drug").submit(function(event) {
    event.preventDefault(); // ngăn submit mặc định

    // lấy dữ liệu từ form
    const unindexed_array = $(this).serializeArray();
    const data = {};

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    // gửi request PUT bằng JSON
    $.ajax({
        url: `/api/drugs/${data.id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            alert(data.name + " updated successfully!");
            window.location.href = "/manage"; // redirect về trang manage
        },
        error: function(xhr, status, error) {
            alert("Error updating drug: " + xhr.responseText || error);
        }
    });
});

if (window.location.pathname == "/manage") { // since items are listed on manage
    const $ondelete = $("table tbody td a.delete"); // select the anchor with class delete

    $ondelete.click(function(e) {
        e.preventDefault(); // ngăn reload khi click link

        const id = $(this).attr("data-id"); // pick the value from the data-id

        const request = { // save API request in variable
            url: `/api/drugs/${id}`, // dùng đường dẫn tương đối thay vì https://url
            method: "DELETE"
        };

        if (confirm("Do you really want to delete this drug?")) {
            $.ajax(request).done(function(response) {
                alert("Drug deleted Successfully!");
                location.reload(); // reload the page
            }).fail(function(xhr, status, error) {
                alert("Error deleting drug: " + error);
            });
        }
    });
}

if (window.location.pathname == "/purchase") {
    //$("#purchase_table").hide();

    $("#drug_days").submit(function(event) { //on a submit event on the element with id add_drug
        event.preventDefault(); //prevent default submit behaviour
        $("#purchase_table").show();
        days = +$("#days").val();
        alert("Drugs for " + days + " days!"); //alert this in the browser
    })

}