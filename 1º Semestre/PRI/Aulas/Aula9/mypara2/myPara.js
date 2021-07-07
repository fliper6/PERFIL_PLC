$(()=> {
    $.get("http://localhost:7709/paras", (data) => {
        data.forEach(p => {
            $("#paraList").append($("<li>" + p.text + "</li>"))
        })
    })

    $("#addPara").click(()=> {
        $("#paraList").append($("<li>" + $("#paraText").val() + "</li>"))
        //$.post("https://localhost:7709/paras", { text: $("#paraText").val()})
        $.post("http://localhost:7709/paras", $("#myParaForm").serialize())

        $("#paraText").val('')
    })
})