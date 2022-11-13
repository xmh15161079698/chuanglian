$(function () {

    $("#F_Goods_NameId").change(function () {

        var key = $(this).text();
        if (key != "==请选择==") {

            $.ajax({
                url: '/KR_CodeModule/WD_Goods/GetGoodsIdByName',
                data: {
                    "key": key
                },
                type: "post",
                dataType: "json",
                success: function (data) {
                    var typeId = data.data.WD_Goods.F_Id;
                    $.ajax({
                        url: '/KR_CodeModule/WD_ColorCard/GetCardIdByTypeId',
                        data: {
                            "key": typeId
                        },
                        type: "post",
                        dataType: "json",
                        async:false,
                        success: function (data) {
                            var cardList = data.data.value;
                            console.log("cardList", cardList);
                            $("#F_Goods_ColorCardId").empty();
                            
                            if (cardList.length > 0) {
                                var html = '';
                                for (var i = 0; i < cardList.length; i++) {

                                    var card = cardList[i];
                                    html+='<option value='+card.F_Id+'>'+card.F_ColorCard_Name+'</option>'
                                    
                                }
                                $("#F_Goods_ColorCardId").append($(html));
                            } else {

                            }
                           
                           
                        }


                    })
                    $.ajax({
                        url: top.$.rootUrl + '/KR_CodeModule/WD_Goods/GetColorCardByGoodsId?keyValue=' + keyValue,
                        type: "get",
                        dataType: "json",
                        async: false,
                        success: function (datas) {
                            //console.log("CardEnt",datas.data.WD_Goods.F_Goods_ColorCardId);
                            var id = datas.data.WD_Goods.F_Goods_ColorCardId;
                            console.log($("#F_Goods_ColorCardId option").length)
                            $("#F_Goods_ColorCardId option").each(function (index, item) {
                                //console.log("id=", item)

                                $(item).prop("selected", ($(item).val() == id))

                            })
                        }

                    })

                }


            })
        }
        
    })

})