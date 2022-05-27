
/* CopyRight (c) 2010 Baidu */
/*
* progam for bank loan
* @author: hongwei of beyondsoft ,ITO
* @email: dhw_0912@163.com
* @namespace: App
* @version: 2010-12-14
*/
if (location.search.indexOf('canvas_pos=search') >= 0) {
    document.body.id = 'search';
}
else {
    document.body.id = 'single';
}
if (!window.App) {
    window.App = {};
}
window.App.LoanAJ = {
    LoanView: function () {
        var doc = document;
        var pager = App.Pager();

        /*---------source data and trigger-----------*/
        var payTypeList = doc.getElementsByName('payType'),
                principal = doc.getElementById('principal'),
                year = doc.getElementById('year'),
                rate = doc.getElementById('rate'),
                lowPeriod1 = doc.getElementById('cal-low-1'),
                highPeriod1 = doc.getElementById('cal-high-1'),
                lowPeriod2 = doc.getElementById('cal-low-2'),
                highPeriod2 = doc.getElementById('cal-high-2'),

                calculateBtn = doc.getElementById('calculate'),
                resetBtn = doc.getElementById('reset'),
                inputContainer = doc.getElementById('tab1'),
                outContainer = doc.getElementById('tab2'),
                backBtn = doc.getElementById('goBack'),
                monPayTitle = doc.getElementById('monPayTitle'),
                monPaySum = doc.getElementById('monPaySum'),
                outTotal = doc.getElementById('result'),
                outList = doc.getElementById('details'),
                yearText = doc.getElementById('year-text'),
                yearContent = doc.getElementById('year-content'),
                yearSelect = doc.getElementById('year-select'),
                calDetail1 = doc.getElementById('calDetail1'),
                calDetail2 = doc.getElementById('calDetail2'),
                seeDetail1 = doc.getElementById('seeDetail1'),
                principalError = doc.getElementById('principalError'),
                rateError = doc.getElementById('rateError'),
                calDetailError1 = doc.getElementById('calDetailError1'),
                calDetailError2 = doc.getElementById('calDetailError2'),
                yearError = doc.getElementById('yearError'),
                period, lowPeriod, highPeriod, lowPeriodForTotal, highPeriodForTotal, currentPageIndex;


        var outTotalCaption = outTotal.getElementsByTagName('caption'),
                outListCaption = outList.getElementsByTagName('caption'),
                outTotalTds = outTotal.getElementsByTagName('td'),
                outListTbody = outList.getElementsByTagName('TBODY');
        var modelResult = null;
        if (outListTbody) {
            outListTbody = outListTbody[0];
        }
        backBtn.onclick = function () {
            inputContainer.style.display = 'block';
            outContainer.style.display = 'none';
        };

        lowPeriod1.onkeydown = lowPeriod2.onkeydown = highPeriod1.onkeydown = highPeriod2.onkeydown = function (event) {
            var keyCode = 0;

            if (window.event) {
                keyCode = window.event.keyCode;
            }
            else {
                keyCode = event.which;
            }
            if (keyCode == 190 || keyCode == 110) {

                return false;
            }
        }
        //override onblur in checker
        lowPeriod1.onblur = lowPeriod2.onblur = highPeriod1.onblur = highPeriod2.onblur = function () {

        }
        //override onblur in checker, these override code should be rebuilded,this way is not good
        lowPeriod1.onkeyup = lowPeriod2.onkeyup = highPeriod1.onkeyup = highPeriod2.onkeyup = function (event) {
            var keyCode = 0;

            if (window.event) {
                keyCode = window.event.keyCode;
            }
            else {
                keyCode = event.which;
            }
            this.value = getNValue(this.value);

            function getNValue(s) {

                var v = parseFloat(s);
                if (isNaN(v)) {
                    return '';
                }
                else if (v < 0) {
                    return -v;
                }
                else if (v == 0) {
                    return '';
                }
                else {
                    return v;
                }
            }
        }
        function checkForm() {
            var isOK = true;
            if (principal.value == '') {
                principal.className = 'error';
                principalError.innerHTML = "不能为空";
                isOK = false;
            }
            if (rate.value == '') {
                rate.className = 'error';
                rateError.innerHTML = '不能为空';
                isOK = false;
            }
            if (rate.value != '' && parseFloat(rate.value) > 100) {
                rate.className = 'error';
                rateError.innerHTML = '不能大于100';
                isOK = false;
            }
            if (yearText.getAttribute('value') == 0) {
                yearError.innerHTML = '请选择贷款利率';
                isOK = false;
            }
            if (!isOK) { return false; }
            else { return true; }
        }
        calculateBtn.onclick = function () {
            //-------check----------

            if (!checkForm()) { return false; }
            //----------------------
            period = yearText.getAttribute('value') - 0;
            var nType = getPayType();
            if (nType == '0') {
                modelResult = loaModal.calEqual({
                    principal: principal.value,
                    period: period,
                    rate: rate.value / 100
                });

                viewEqualTotal();
            }
            else {
                modelResult = loaModal.calReduce({
                    principal: principal.value,
                    period: period,
                    rate: rate.value / 100
                });
                viewReducetotal();
            }
            return false;
        };
        calDetail1.onclick = function () {
            if (!checkForm()) { return false; }
            period = yearText.getAttribute('value') - 0;
            lowPeriodForTotal = lowPeriod1.value - 0;
            highPeriodForTotal = highPeriod1.value - 0;
            //----check-------------

            if (lowPeriod1.value == '') {
                calDetailError1.innerHTML = '请输入起始期数';
                lowPeriod1.className = 'error';
                return false;
            }

            if (lowPeriod1.value - 0 > period) {
                calDetailError1.innerHTML = '起始期数不能大于总期数';
                lowPeriod1.className = 'error';
                return false;
            }
            lowPeriod1.className = '';
            if (highPeriod1.value == '') {
                calDetailError1.innerHTML = '请输入结束期数';
                highPeriod1.className = 'error';
                return false;
            }
            if (highPeriod1.value - 0 > period) {
                calDetailError1.innerHTML = '结束期数不能大于总期数';
                highPeriod1.className = 'error';
                return false;
            }
            if (highPeriod1.value - 0 < lowPeriod1.value - 0) {
                calDetailError1.innerHTML = '结束期数不能小于起始期数';
                highPeriod1.className = 'error';
                return false;
            }

            calDetailError1.innerHTML = '';
            calDetailError2.innerHTML = '';
            highPeriod1.className = '';
            lowPeriod2.className = '';
            highPeriod2.className = '';
            var nType = getPayType();
            lowPeriod2.value = lowPeriod1.value;
            highPeriod2.value = highPeriod1.value;

            pager.showInitPager({ totalItems: highPeriod1.value - lowPeriod1.value + 1, callBack: function (pageIndex) {

                currentPageIndex = pageIndex;
                lowPeriod = lowPeriod1.value - 0 + pager.itemsPerPage * pageIndex;
                highPeriod = lowPeriod + pager.itemsPerPage - 1;
                if (highPeriod > highPeriod1.value - 0) {
                    highPeriod = highPeriod1.value;
                }
                if (nType == '0') {
                    modelResult = loaModal.calEqual({
                        principal: principal.value,
                        period: period,
                        rate: rate.value / 100
                    });
                    viewEqualDetail();
                }
                else {
                    modelResult = loaModal.calReduce({
                        principal: principal.value,
                        period: period,
                        rate: rate.value / 100
                    });
                    viewReduceDetail();
                }
            }
            });
            inputContainer.style.display = 'none';
            outContainer.style.display = 'block';
            return false;
        };
        calDetail2.onclick = function () {
            if (!checkForm()) { return false; }
            lowPeriodForTotal = lowPeriod2.value - 0;
            highPeriodForTotal = highPeriod2.value - 0;

            if (lowPeriod2.value == '') {
                calDetailError2.innerHTML = '请输入起始期数';
                lowPeriod2.className = 'error';
                return false;
            }

            if (lowPeriod2.value - 0 > period) {
                calDetailError2.innerHTML = '起始期数不能大于总期数';
                lowPeriod2.className = 'error';
                return false;
            }

            lowPeriod2.className = '';
            if (highPeriod2.value == '') {
                calDetailError2.innerHTML = '请输入结束期数';
                highPeriod2.className = 'error';
                return false;
            }
            if (highPeriod2.value - 0 > period) {
                calDetailError2.innerHTML = '结束期数不能大于总期数';
                highPeriod2.className = 'error';
                return false;
            }
            if (highPeriod2.value - 0 < lowPeriod2.value - 0) {
                calDetailError2.innerHTML = '结束期数不能小于起始期数';
                highPeriod2.className = 'error';
                return false;
            }

            calDetailError2.innerHTML = '';

            highPeriod2.className = '';


            var nType = getPayType();

            pager.showInitPager({ totalItems: highPeriod2.value - lowPeriod2.value + 1, callBack: function (pageIndex) {

                currentPageIndex = pageIndex;
                lowPeriod = lowPeriod2.value - 0 + pager.itemsPerPage * pageIndex;
                highPeriod = lowPeriod + pager.itemsPerPage - 1;
                if (highPeriod > highPeriod2.value - 0) {
                    highPeriod = highPeriod2.value;
                }
                if (nType == '0') {

                    viewEqualDetail();
                }
                else {
                    viewReduceDetail();
                }
            }
            });
            return false;
        }
        yearContent.onclick = function (arg) {
            var srcObj;
            if (window.event) {
                srcObj = window.event.srcElement;
            }
            else {
                srcObj = arg.target;
            }

            if (srcObj.tagName.toLowerCase() != 'li') {
                return;
            }
            yearText.innerHTML = srcObj.innerHTML;
            var months = srcObj.getAttribute('value') - 0;
            yearText.setAttribute('value', months);
            yearContent.style.display = 'none';
            lowPeriod1.value = lowPeriod2.value = highPeriod1.value = highPeriod2.value = '';
            //update ratre app.loanRate
            switch (months) {
                case 6:
                    rate.value = loanRate[0];
                    break;
                case 12:
                    rate.value = loanRate[1];
                    break;
                case 12:
                case 24:
                case 36:
                    rate.value = loanRate[2];
                    break;
                case 48:
                case 60:
                    rate.value = loanRate[3];
                    break;
                default:
                    rate.value = loanRate[4];
                    break;
            }
            yearError.innerHTML = '';
            rate.className = 'text';
            rateError.innerHTML = '';
            calculateBtn.onclick();
        };
        yearSelect.onclick = function () {

            if (yearContent.style.display == 'block') {
                yearContent.style.display = 'none';
            }
            else {
                yearContent.style.display = 'block';
            }
            return false;
        }
        resetBtn.onclick = function () {
            //if it must reset after form's reset ,use setTimeout.
            yearText.innerHTML = '-请选择-';
            yearText.setAttribute('value', 0);
            seeDetail1.style.display = 'none';
            for (var i = 0; i < outTotalTds.length; i++) {
                outTotalTds[i].innerHTML = '';
            }
            rate.className = 'text';
            principal.className = 'text';
            rateError.innerHTML = '';
            principalError.innerHTML = '';
            yearError.innerHTML = '';
            lowPeriod1.value = highPeriod1.value = '';

        };
        /*----------view data -----------*/
        var loaModal = this.LoanModal();

        var viewEqualTotal = function () {
            outTotalCaption.innerHTML = '等额还款汇总';
            outTotalTds[0].innerHTML = period / 12 + '年';
            outTotalTds[1].innerHTML = period + '期';
            outTotalTds[2].innerHTML = rate.value + '%';
            outTotalTds[3].innerHTML = (rate.value / 12 * 10).toFixed(12) + '‰';
            outTotalTds[4].innerHTML = principal.value + '元';
            outTotalTds[5].innerHTML = modelResult.monthPayList[0].toFixed(2) + '元';
            if (monPayTitle.style.display == 'none') {
                monPayTitle.style.display = '';
                monPaySum.style.display = '';
            }
            seeDetail1.style.display = 'block';
        };
        var viewEqualDetail = function () {

            while (outListTbody.childNodes[0]) {
                outListTbody.removeChild(outListTbody.childNodes[0]);
            }
            if (currentPageIndex == 0) {
                outListTbody.appendChild(makeTotal(modelResult));
            }
            makeList(modelResult);

        };
        var viewReducetotal = function () {
            outTotalCaption.innerHTML = '按月递减还款汇总';
            outTotalTds[0].innerHTML = period / 12 + '年';
            outTotalTds[1].innerHTML = period + '期';
            outTotalTds[2].innerHTML = rate.value + '%';
            outTotalTds[3].innerHTML = (rate.value / 12 * 10).toFixed(12) + '‰';
            outTotalTds[4].innerHTML = principal.value + '元人民币';

            monPayTitle.style.display = 'none';
            monPaySum.style.display = 'none';
            seeDetail1.style.display = 'block';
        };
        var viewReduceDetail = function () {
            while (outListTbody.childNodes[0]) {
                outListTbody.removeChild(outListTbody.childNodes[0]);
            }
            outListTbody.appendChild(makeTotal(modelResult));
            makeList(modelResult);
        };

        /*-----------private functions----------------*/
        function getPayType() {
            if (payTypeList[0].checked) {
                return "0";
            }
            else {
                return "1";
            }
        }
        function calMonthList() {
            var list = [], totalInterest = 0, totalPay = 0;
            for (var i = 0; i < arg.period; i++) {
                list[i] = {
                    period: i,
                    pay: calResult.monthPay,
                    principal: function () {
                        this.pay - this.interest
                    },
                    interest: calResult.interestList[i],
                    leftPrincipal: function () {
                        return arg.principal - (totalPay - totalInterest);
                    }
                };
                totalInterest += list[i].interest;
                totalPay += calResult.monthPay;
            }
            return list;
        }
        function makeList(modelResult) {
            var fragment = doc.createDocumentFragment();

            for (var i = 0; i < period; i++) {

                if (i + 1 < lowPeriod - 0 || i + 1 > highPeriod - 0) {

                    continue;
                }
                fragment.appendChild(makeTR(i));
            }

            outListTbody.appendChild(fragment);

            function makeTR(n) {

                var tr = doc.createElement('tr'),
                        td = doc.createElement('td');

                //period
                td.innerHTML = n + 1;
                tr.appendChild(td);

                //monthPay
                td = doc.createElement('td');
                td.innerHTML = modelResult.monthPayList[n].toFixed(2);
                tr.appendChild(td);

                //monthPrincipal
                td = doc.createElement('td');
                td.innerHTML = modelResult.principalList[n].toFixed(2);
                tr.appendChild(td);

                //monthInterest
                td = doc.createElement('td');
                td.innerHTML = modelResult.interestList[n].toFixed(2);
                tr.appendChild(td);

                //principalLeftList
                td = doc.createElement('td');
                td.innerHTML = modelResult.principalLeftList[n].toFixed(2);
                tr.appendChild(td);

                return tr;
            }
        }
        function makeTotal(modelResult) {
            var tr = doc.createElement('tr'),
                        td = doc.createElement('td');

            td.innerHTML = '合计';
            tr.appendChild(td);


            //monthPay total
            var monthPayTotal = calMonthPay();
            td = doc.createElement('td');
            td.innerHTML = monthPayTotal.toFixed(2);
            tr.appendChild(td);

            //principal total
            var principalTotal = calPrincipal();
            td = doc.createElement('td');
            td.innerHTML = principalTotal.toFixed(2);
            tr.appendChild(td);

            //interest total
            td = doc.createElement('td');
            td.innerHTML = (monthPayTotal - principalTotal).toFixed(2);
            tr.appendChild(td);

            //left total
            td = doc.createElement('td');
            //td.innerHTML = '/';
            tr.appendChild(td);

            tr.className = 'total';

            return tr;
            /*----inner function-------*/
            function calMonthPay() {
                var low = lowPeriodForTotal,
                        hight = highPeriodForTotal,
                        total = 0;
                for (var i = low; i <= hight; i++) {
                    total += modelResult.monthPayList[i - 1];
                }
                return total;
            }
            function calPrincipal() {
                var low = lowPeriodForTotal,
                        hight = highPeriodForTotal,
                        total = 0;
                for (var i = low; i <= hight; i++) {
                    total += modelResult.principalList[i - 1];
                }
                return total;
            }
        }
    },
    LoanModal: function () {
        //var arg = { principal: 0, period: 0, rate: 0 },
        var that = {};

        that.calEqual = function (arg) {
            var result = { monthPayList: [], interestList: [], principalLeftList: [], principalList: [] },
                    monthRate = arg.rate / 12,
                    principalLeft = arg.principal;

            var monthPay;

            if (arg.rate == 0) {
                monthPay = arg.principal / arg.period;
            }
            else {
                monthPay = arg.principal * monthRate * Math.pow(1 + monthRate, arg.period) / (Math.pow(1 + monthRate, arg.period) - 1);
            }
            for (var i = 0; i < arg.period; i++) {
                var interest = principalLeft * monthRate;
                result.interestList[i] = interest;
                principalLeft = principalLeft - (monthPay - interest);
                result.principalLeftList[i] = principalLeft;
                result.principalList[i] = monthPay - interest;
                result.monthPayList[i] = monthPay;
            }
            if (result.principalLeftList[i - 1] < 0) {
                result.principalLeftList[i - 1] = -result.principalLeftList[i - 1];
            }

            return result;
        };
        that.calReduce = function (arg) {
            var result = { monthPayList: [], interestList: [], principalLeftList: [], principalList: [] },
                    monthRate = arg.rate / 12,
                    principalLeft = arg.principal;

            var monthPrincipal = arg.principal / arg.period;

            for (var i = 0; i < arg.period; i++) {
                result.interestList[i] = monthPrincipal * (arg.period - i) * monthRate;
                result.monthPayList[i] = monthPrincipal + result.interestList[i];
                principalLeft -= monthPrincipal;
                result.principalLeftList[i] = principalLeft;
                result.principalList[i] = monthPrincipal;
            }
            if (result.principalLeftList[i - 1] < 0) {
                result.principalLeftList[i - 1] = -result.principalLeftList[i - 1];
            }
            return result;
        };
        return that;
    }
};

window.App.Checker = function (scopId) {

    var doc = document;
    var inputList = function () {
        var List;
        if (scopId) {
            List = doc.getElementById(scopId).getElementsByTagName('input');
        } else {
            List = doc.getElementsByTagName('input');
        }
        var listLength = List.length;
        var returnList = [];
        for (var i = 0; i < listLength; i++) {
            if (List[i].type == 'text') {
                returnList.push(List[i]);
            }
        }
        return returnList;
    } ();
    var inputLength = inputList.length;
    for (var i = 0; i < inputLength; i++) {
        inputList[i].onkeyup = function (event) {
            var keyCode = 0;

            if (window.event) {
                keyCode = window.event.keyCode;
            }
            else {
                keyCode = event.which;
            }
            if (keyCode > 47 && keyCode < 58 || keyCode == 190||keyCode==8) {

            }
            else {
                this.value = getNValue(this.value);
            }
        }
        inputList[i].onblur = function () {
            this.value = getNValue(this.value);
            if (this.value != '') {
                this.parentNode.parentNode.lastChild.innerHTML = '';
                this.className = 'text';
            }
        }
        function getNValue(s) {
            var v = parseFloat(s);
            if (isNaN(v)) {
                return '';
            }
            else if (v < 0) {
                return -v;
            }
            else {
                return v;
            }
        }
    }
};

window.App.Pager = function () {
    var container = document.getElementById('pager'),
        currentPage = 0,
        totalPages = 0,
        totalItems = 0,
        itemsPerPage = 12,
        pageMaxShow = 5,
        callBack = null,
        that = {};
    that.showInitPager = function (arg) {
        totalItems = arg.totalItems;

        callBack = arg.callBack;
        totalPages = parseInt(totalItems / itemsPerPage);
        if (totalItems % itemsPerPage > 0) {
            totalPages++;
        }

        currentPage = 0;
        show();
    };

    that.itemsPerPage = itemsPerPage;
    return that;
    /*----------------------------*/
    function show() {

        if (itemsPerPage >= totalItems) {
            container.innerHTML = '';
            callBack(currentPage);
            return;
        }
        var pagerBodyHTML = '';


        if (currentPage != 0) {
            pagerBodyHTML += getBackPageHTML();
        }
        var count = 0;

        var backN = 5 - (totalPages - currentPage);
        if (backN < 2) {
            backN = 2;
        }
        while (backN > 0) {
            if (currentPage - backN >= 0) {
                pagerBodyHTML += getItemPageHTML(currentPage - backN);
                count++;
            }
            backN--;
        }
        pagerBodyHTML += getItemPageHTML(currentPage);
        count++;
        var nextN = 1;

        while (count < 5) {
            if (nextN + currentPage < totalPages) {
                pagerBodyHTML += getItemPageHTML(nextN + currentPage);
                nextN++;
                count++;
            }
            else {
                break;
            }
        }
        if (currentPage + 1 < totalPages) {
            pagerBodyHTML += getNexPageHTML();
        }
        container.innerHTML = pagerBodyHTML;
        window.setTimeout(function () {
            var pageItems = container.getElementsByTagName('li');
            for (var k = 0; k < pageItems.length; k++) {

                pageItems[k].onclick = function () {

                    var index = this.getAttribute('index');

                    index -= 0;
                    if (index == -1) {
                        currentPage--;
                    }
                    else if (index == -2) {
                        currentPage++;
                    }
                    else {
                        currentPage = index;
                    }
                    show();
                };
            }
        }, 50);
        callBack(currentPage);
    }

    function getBackPageHTML() {
        return "<li style='width:38px' index='-1' >上一页</a></li>";
    }
    function getNexPageHTML() {
        return "<li style='width:38px' index='-2' >下一页</li>";
    }
    function getItemPageHTML(pageIndex) {
        if (pageIndex == currentPage) {
            return "<li index='" + pageIndex + "' class='pager-item-selected' >" + (pageIndex + 1) + "</li>"
        }
        else {
            return "<li index='" + pageIndex + "'>" + (pageIndex + 1) + "</li>"
        }

    }

};
window.App.CustomHint = function () {
    var inputList = document.getElementsByTagName('input'),
        layContent = document.getElementById('layer-content'),
        layer = document.getElementById('layer');
    var inputLength = inputList.length;

    for (var i = 0; i < inputLength; i++) {

        var title = inputList[i].getAttribute('custom-title');
        if (title) {

            inputList[i].onmouseover = function () {
                var position = getPosition(this);
                layer.style.display = 'block';
                layer.style.left = position.left + this.offsetWidth + 13 + 'px';
                layer.style.top = position.top - this.offsetHeight / 2 + 'px';
                layContent.innerHTML = this.getAttribute('custom-title');
            }
            inputList[i].onmouseout = function () {
                    layer.style.display = 'none';
                    layContent.innerHTML = '';
            }
        }
    }
    function getPosition(obj) {
        var position = { left: 0, top: 0 };
        while (obj) {
            if (obj.style && obj.style.position == 'relative') {
                break;
            }

            position.left += obj.offsetLeft;
            position.top += obj.offsetTop;
            obj = obj.offsetParent;
        }

        return position;
    }
};

if(!window.console){
    window.console = (function () {
        var logList = [], that = {};
        that.log = function (log) {
            if (logList.length > 20) {
                logList = [];
            }
            logList.push(log);
        }
        that.show = function () {
            alert(logList.join());
        }
        return that;
    })();
}
window.App.Checker();
window.App.CustomHint();
var loanView = App.LoanAJ.LoanView();