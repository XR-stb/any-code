// ==UserScript==
// @name         问卷星脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  可定制每个选项比例概率，刷问卷前需要改代码，目前模板支持单选,多选,填空，
// @author       xiaoran
// @include     https://www.wjx.cn/*
// ==/UserScript==

(function () {
    'use strict';
    // 测试问卷：https://www.wjx.cn/vm/evhqCAf.aspx
    Init();

    //获取题块列表
    var question_lists = document.querySelectorAll('.ulradiocheck')
    var quesion_idx = 0; // from zero
    var probability; // 每个选项的概率，总和为：100
    var answer_contents; // 填空题答案
    var min_options;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    probability = [40, 30, 20, 10];
    handleQuestion('single', probability);
    // Multiple Choice
    probability = [35, 35, 30, 0];
    min_options = 1;
    handleQuestion('multiple', probability, min_options);

    // Fill-in-the-Blank
    answer_contents = ['王翠花', '小明', '小红'];
    probability = [33, 33, 34];
    HandleFillInBlankTemplate(answer_contents, probability);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function yanzhen() {
        var event = document.createEvent('MouseEvents');
        event.initEvent('mousedown', true, false);
        document.querySelector("#nc_1_n1z").dispatchEvent(event);
        event = document.createEvent('MouseEvents');
        event.initEvent('mousemove', true, false);
        Object.defineProperty(event, 'clientX', { get() { return 260; } })
        document.querySelector("#nc_1_n1z").dispatchEvent(event);
    }

    // submit
    let retryCount = 0;
    setTimeout(function () {
        document.querySelector('#submit_button').click();
        setTimeout(function () {
            document.querySelector('#rectTop').click();
            setInterval(function () {
                try {
                    yanzhen();
                    retryCount += 1;
                } catch (err) {
                    if (retryCount >= 6) {
                        location.reload();
                    }
                }
            }, 500);
        }, 0.1 * 1000);
    }, 0.1 * 1000);

    // 获取题目选项
    function GetOptions() {
        return question_lists[quesion_idx].querySelectorAll('li')
    }

    // 单选
    function HandleSingleChoiceTemplate(probability) {
        var choose_idx = SingleChooseIdx(probability);
        var options = GetOptions();
        options[choose_idx].click();
        quesion_idx += 1;
    }

    // 多选
    function HandleMultipleChoiceTemplate(probability, min_options = 1) {
        var choosed_options = 0;
        var options = GetOptions();
        while (choosed_options < min_options) {
            let choose_idx = [];
            for (let idx = 0; idx < probability.length; idx++) {
                if (IsChoose(probability[idx])) {
                    choose_idx.push(idx);
                    choosed_options += 1;
                }
                if (idx === probability.length - 1) {
                    if (choosed_options < min_options) {
                        // TODO: 可能会出现没选够的情况
                        // 特别是min_options变大后，每个选项的概率变小
                        choosed_options = 0;
                    } else {
                        for (let idx = 0; idx < choose_idx.length; idx++) {
                            options[choose_idx[idx]].click();
                        }
                    }
                }
            }
        }
        quesion_idx += 1;
    }

    // 填空
    function HandleFillInBlankTemplate(answers, probability) {
        var content = answers[SingleChooseIdx(probability)];
        quesion_idx += 1; // 填空题是选择是id，并且加题号，所以下标要提前+1，对标自然题号
        document.querySelector('#q' + quesion_idx).value = content;
    }

    function handleQuestion(type, probability, min_options = 1) {
        switch (type) {
            case 'single':
                HandleSingleChoiceTemplate(probability);
                break;
            case 'multiple':
                HandleMultipleChoiceTemplate(probability, min_options);
                break;
            // Add more cases for other question types as needed
            default:
                console.error('Invalid question type');
        }
    }

    //返回随机概率数组，参数为选项个数
    function RandomProbability(num) {
        let a = Math.floor(100 / num);
        let yu = 100 - a * num;
        let list = [];
        for (let i = 0; i < num; i++) {
            list.push(a)
        }
        for (let i = 0; i < yu; i++) {
            list[i] = list[i] + 1
        }
        return list;
    }
    //计算list前n项的和
    function Accumulate(list, n) {
        var sum = 0
        for (var i = 0; i < n; i++) {
            sum += list[i];
        }
        return sum;
    }

    //生成从minNum到maxNum的随机数
    function randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }
    //判断num是否在指定区间内
    function isInRange(num, start, end) {
        if (num >= start && num <= end) {
            return true;
        } else {
            return false;
        }
    }
    // 返回单选题随机下标
    function SingleChooseIdx(probability) {
        var pp = randomNum(1, 100)
        for (var i = 1; i <= probability.length; i++) {
            var start = 0;
            if (i != 1) {
                start = Accumulate(probability, i - 1)
            }
            var end = Accumulate(probability, i);
            if (isInRange(pp, start, end)) {
                return i - 1;
                break;
            }
        }
    }
    //多选题：判断是否选择该选项
    function IsChoose(probability) {
        var flag = false;
        var i = randomNum(1, 100);
        if (isInRange(i, 1, probability)) {
            flag = true;
        }
        return flag;
    }

    //清楚cookie
    function clearCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
                document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
                document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
            }
        }
    }

    //滚动到末尾函数
    function scrollToBottom() {
        (function () {
            var y = document.body.scrollTop;
            var step = 500;
            window.scroll(0, y);
            function f() {
                if (y < document.body.scrollHeight) {
                    y += step;
                    window.scroll(0, y);
                    setTimeout(f, 50);
                }
                else {
                    window.scroll(0, y);
                    document.title += "scroll-done";
                }
            }
            setTimeout(f, 1000);
        })();
    }

    function ReplaceVmWithVj(url) {
        if (url.includes("/vm/")) {
            // Replace "/vm/" with "/vj/"
            return url.replace("/vm/", "/vj/");
        } else {
            // If "/vm/" is not found, return the original URL
            return url;
        }
    }

    function GetCurUrl() {
        return window.location.href;
    }

    function RedirectVmToVj() {
        // Get the current URL
        let currentUrl = GetCurUrl();

        // Check if the current URL starts with "https://www.wjx.cn/vm/"
        if (currentUrl.startsWith("https://www.wjx.cn/vm/")) {
            // Replace "/vm/" with "/vj/"
            let newUrl = currentUrl.replace("/vm/", "/vj/");

            // Redirect to the new URL
            window.location.href = newUrl;
        }
    }

    function Init() {
        RedirectVmToVj();
        clearCookie();
        var wenjuan_url = GetCurUrl();
        wenjuan_url = ReplaceVmWithVj(wenjuan_url)

        //下边的网址不要改, 用于提交完问卷后返回
        if (window.location.href.indexOf('https://www.wjx.cn/wjx/join/complete.aspx') != -1) {
            window.location.href = wenjuan_url;
        } else if (window.location.href == wenjuan_url) {
        } else {
            return
        }

        //滚动到末尾
        window.scrollTo(0, document.body.scrollHeight)
    }
})();
