
lottery_initial_datas = [];
zhongjiang_initial_datas = [];
canchoujiang_datas = [];
award_log = null;
lottery_data = null;
$.ajax({
    url: "/KR_CodeModule/WD_XingYunChouJiangPage/GetBaoMingAllInfoList",
    type: "get",
    dataType: "json",
    success: function (datas) {
        // alert(datas.data.length)
        for (var i = 0; i < datas.data.length; i++) {

            lottery_initial_datas[i] = { "nameen": "avatar" + (i + 1), "namezh": datas.data[i].F_NickName, "touxiang": datas.data[i].F_AvatarUrl, "openId": datas.data[i].F_OpenId }
        }

         var data_str = JSON.stringify(lottery_initial_datas);

        localStorage.setItem('lottery_initial', data_str);
        var lottery_storage = window.localStorage.getItem('lottery_initial');
        lottery_data = JSON.parse(lottery_storage);
        $('#lottery-wrap').html(_.template($('#lotterycon-tpl').html(), lottery_data));
        
        $('#lottery-wrap').html($('#lottery-wrap').html() + $('#lottery-wrap').html());
       
    }
})
$.ajax({
    url: "/KR_CodeModule/WD_XingYunChouJiangPage/GetAwardList",
    type: "get",
    dataType: "json",
    success: function (datas) {
        // alert(datas.data.length)
        var award99 = 0;
        for (var i = 0; i < datas.data.length; i++) {
            var out = "";
            var awardInfo = datas.data[i];
            if (awardInfo.F_LeiBie == 99) {
                award99 += awardInfo.F_Number;
                out += "<div class='award-con'><h3 class='award-title'>" + awardInfo.F_Name + "</h3><ul class='win' ><li class='clearfix win-li'>" +
                    "<div class='f-l name'>" + awardInfo.F_Name + "&nbsp&nbsp&nbsp&nbsp&nbsp<span>x&nbsp" + awardInfo.F_Number + "</span></div>" +
                    "</li></ul></div>"
                var divEle1 = $(out)[0];
                $("#allAwardList").append(divEle1)
            }
        }
        award_config = {
            "award99": award99,
            
        };
        localStorage.removeItem('award_initial');
        if (!localStorage.getItem('award_initial')) {
            var award_str = JSON.stringify(award_config);
            localStorage.setItem('award_initial', award_str);
        }
        $.ajax({
            url: "/KR_CodeModule/WD_XingYunChouJiangPage/ContinueChouJiang",
            type: "get",
            dataType: "json",
            success: function (datas) {
                // alert(datas.data.length)
                //console.log("datas.data=", datas.data)
                var award_99 = null;
                for (var i = 0; i < datas.data.length; i++) {
                    if (datas.data[i].F_LeiBie == 99) {
                        award_99 = datas.data[i].LeiBieNum;
                    }
                }

                if (award_99 == null) {
                    award_99 = award_config.award99;    
                } else {
                    award_99 = award_config.award99 - award_99
                    //if (award001 == 0) {
                    //    local_handle.set('select_award', 3);
                    //}
                }
                if (award_99 > 0) {
                    local_handle.set('select_award', 99);
                }
                var award_logObj = {
                    "award099": award_99
                    
                };
                award_log = JSON.stringify(award_logObj);
                local_handle.set("award_now_count", award_log);
                //award_log = JSON.parse(award_log);
                //console.log("award_log=", award_log)

                var zhongjiang_datas = window.localStorage.getItem("zhongjiang_initial")
                zhongjiang_datas = JSON.parse(zhongjiang_datas)
                if (zhongjiang_datas.length == 0) {
                    award_log = localStorage.getItem('award_initial')
                    local_handle.set("award_now_count", award_log);
                }

                //console.log("elesaward_log=", award_log)


                //award_log = local_handle.get('award_log');
                //console.log("award_log=", award_log)
            }
        })
    }
})
$.ajax({
    url: "/KR_CodeModule/WD_XingYunChouJiangPage/GetZhongJiangList",
    type: "get",
    dataType: "json",
    success: function (datas) {
        // alert(datas.data.length)

        for (var i = 0; i < datas.data.length; i++) {
            zhongjiang_initial_datas[i] = { "namezh": datas.data[i].F_NickName, "touxiang": datas.data[i].F_AvatarUrl, "award": datas.data[i].F_LeiBie }
        }
        localStorage.removeItem('zhongjiang_initial');
        if (!localStorage.getItem('zhongjiang_initial')) {

            var data_str = JSON.stringify(zhongjiang_initial_datas);

            localStorage.setItem('zhongjiang_initial', data_str);
        }
        if (local_handle.get("zhongjiang_initial")) {
            var zhongjingInfo = local_handle.get("zhongjiang_initial");
            zhongjingInfo = JSON.parse(zhongjingInfo)
            //console.log("zhongjingInfo", zhongjingInfo)
            for (var i = 0; i < zhongjingInfo.length; i++) {
                var zhongjiangStr = zhongjingInfo[i];
                if (zhongjiangStr.award == 99) {
                    $('#award-01').show();

                    var award_tpl = $('#awardcon-tpl').html();
                    var award_dom = substitute(award_tpl, zhongjiangStr);
                    $('#award-01 .win').append(award_dom);
                }
            }
        }

    }
})



