function submit() {
    if (!document.getElementById("submitbox").getAttribute("disabled")) {
        document.getElementById("send").style.display = "none";
        document.getElementById("loader").style.display = "block";
        document.getElementById("submitbox").style.opacity = 0.8;
        document.getElementById("submitbox").setAttribute("disabled", "HSNU cnmc");
        const req = new XMLHttpRequest();
        req.open("POST", "https://127.0.0.1:5000/u");
        if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
            var params = 'user=' + document.getElementById("username").value + '&password=' + document.getElementById("password").value;
        } else {
            spinTransition("question");
            document.getElementById("message").innerText = "帳號或密碼不能為空白。";
            enable();
            return;
        }
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    if (req.responseText == "") {
                        document.getElementById("message").innerText = "帳號名稱或密碼錯誤，忘記密碼請洽資訊室。";
                        spinTransition('cross');
                        enable();
                        reutrn;
                    } else {
                        spinTransition('check');
                        document.getElementById("message").innerText = "登入成功，可關閉網頁！";
                        let iframe = document.createElement("iframe");
                        url = new URLSearchParams(window.location.search).get('url');
                        if (url == null) {
                            url = 'https://www.hs.ntnu.edu.tw'
                        }
                        iframe.src = url;
                        iframe.style.display = "none";
                        document.body.appendChild(iframe);

                        iframe.onload = () => {
                            window.location.href = url;
                        };


                        reutrn;
                    }
                } else if (req.status == 302) {
                    //Never gonna happen due to specfication on XmlHttpRequest which will automatically follow the redirect

                } else {
                    document.getElementById("message").innerText = "伺服器錯誤，請稍後再試！";
                    spinTransition("fire"); //Server Error
                    enable();
                    return;
                }
            }
        }
        req.send(params);
    }

}
function flip(status) {
    document.getElementById("rotatecircle").style.animation = "flip 1s ease-in-out";
    setTimeout(function () {
        if (status == "Check") {
            document.getElementById("circleimage").style = "filter: invert(43%) sepia(42%) saturate(686%) hue-rotate(95deg) brightness(98%) contrast(92%);";
            document.getElementById("circleimage").src = "data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20448%20512%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20pointer-events%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M438.6%20105.4c12.5%2012.5%2012.5%2032.8%200%2045.3l-256%20256c-12.5%2012.5-32.8%2012.5-45.3%200l-128-128c-12.5-12.5-12.5-32.8%200-45.3s32.8-12.5%2045.3%200L160%20338.7l233.4-233.3c12.5-12.5%2032.8-12.5%2045.3%200z%22%2F%3E%3C%2Fsvg%3E";
        } else if (status == "Cross") {
            document.getElementById("circleimage").style = "filter: invert(18%) sepia(27%) saturate(5387%) hue-rotate(336deg) brightness(92%) contrast(93%);";
            document.getElementById("circleimage").src = "data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20384%20512%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20pointer-events%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M342.6%20150.6c12.5-12.5%2012.5-32.8%200-45.3s-32.8-12.5-45.3%200L192%20210.7%2086.6%20105.4c-12.5-12.5-32.8-12.5-45.3%200s-12.5%2032.8%200%2045.3L146.7%20256%2041.4%20361.4c-12.5%2012.5-12.5%2032.8%200%2045.3s32.8%2012.5%2045.3%200L192%20301.3l105.4%20105.3c12.5%2012.5%2032.8%2012.5%2045.3%200s12.5-32.8%200-45.3L237.3%20256z%22%2F%3E%3C%2Fsvg%3E";
        } else if (status == "Fire") {
            document.getElementById("circleimage").style = "filter: invert(18%) sepia(27%) saturate(5387%) hue-rotate(336deg) brightness(92%) contrast(93%);";
            document.getElementById("circleimage").src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z'%3E%3C/path%3E%3C/svg%3E";
        } else if (status == "Question") {
            document.getElementById("circleimage").style = "filter: invert(18%) sepia(27%) saturate(5387%) hue-rotate(336deg) brightness(92%) contrast(93%);";
            document.getElementById("circleimage").src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z'%3E%3C/path%3E%3C/svg%3E";
        } else {
            document.getElementById("circleimage").src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 2C17.5228 2 22 6.47715 22 12C22 12.7266 21.9225 13.4351 21.7753 14.1177L19.9931 12.3355C19.9977 12.2242 20 12.1124 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.3023 20 14.5319 19.6888 15.6186 19.1368C15.7735 19.3828 15.958 19.6149 16.1716 19.8284C16.4739 20.1307 16.8125 20.3745 17.1734 20.5598C15.6642 21.4737 13.8936 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM19 14.1716L20.4142 15.5858C21.1953 16.3668 21.1953 17.6332 20.4142 18.4142C19.6332 19.1953 18.3668 19.1953 17.5858 18.4142C16.8402 17.6687 16.8064 16.481 17.4841 15.6952L17.5858 15.5858L19 14.1716ZM12 15C13.4664 15 14.7853 15.6312 15.6999 16.6368L14.7549 17.4961C13.965 17.1825 13.018 17 12 17C10.982 17 10.035 17.1825 9.24506 17.4961L8.30009 16.6368C9.21468 15.6312 10.5336 15 12 15ZM8.5 10C9.32843 10 10 10.6716 10 11.5C10 12.3284 9.32843 13 8.5 13C7.67157 13 7 12.3284 7 11.5C7 10.6716 7.67157 10 8.5 10ZM15.5 10C16.3284 10 17 10.6716 17 11.5C17 12.3284 16.3284 13 15.5 13C14.6716 13 14 12.3284 14 11.5C14 10.6716 14.6716 10 15.5 10Z'%3E%3C/path%3E%3C/svg%3E";
        }
        setTimeout(function () { document.getElementById("rotatecircle").style.animation = ""; }, 500);
    }, 500);


}
function spinTransition(target) {
    let imageList = [
        {
            name: "hsnu",
            data: "%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E%3Csvg width='228.51567mm' height='233.74341mm' viewBox='0 0 228.51567 233.74341' version='1.1' id='svg5' inkscape:version='1.1.1 (3bf5ae0d25, 2021-09-20)' sodipodi:docname='HSNU Logo.svg' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3E%3Csodipodi:namedview id='namedview7' pagecolor='%23505050' bordercolor='%23ffffff' borderopacity='1' inkscape:pageshadow='0' inkscape:pageopacity='0' inkscape:pagecheckerboard='1' inkscape:document-units='mm' showgrid='false' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' inkscape:zoom='0.45254834' inkscape:cx='225.39029' inkscape:cy='293.89126' inkscape:window-width='3440' inkscape:window-height='1411' inkscape:window-x='1431' inkscape:window-y='-9' inkscape:window-maximized='1' inkscape:current-layer='layer1'/%3E%3Cdefs id='defs2'/%3E%3Cg inkscape:label='圖層 1' inkscape:groupmode='layer' id='layer1' transform='translate(10.476856,-65.46906)'%3E%3Cpath style='display:inline;fill:%23610e13;fill-opacity:1;stroke-width:0.0846667' d='m 120.56922,299.17681 c -5.4888,-0.23362 -10.45868,-0.86541 -14.99756,-1.90656 l -1.15457,-0.26484 -0.0958,-0.72777 c -0.23953,-1.81892 -0.29175,-4.28495 -0.17806,-8.4072 0.0612,-2.22013 0.13948,-4.08215 0.17388,-4.13783 0.0469,-0.0759 0.51551,-0.0134 1.87086,0.24934 3.46942,0.67259 6.52577,1.06962 10.65595,1.38423 2.1681,0.16515 9.43073,0.13755 12.10733,-0.046 2.59371,-0.17788 4.77303,-0.41515 6.43407,-0.7005 6.44264,-1.10678 13.70994,-3.63292 19.1017,-6.63984 4.72142,-2.63306 9.58467,-6.04034 13.1569,-9.21795 6.75486,-6.00867 10.74943,-11.5667 15.27985,-21.26035 3.48602,-7.45894 4.74962,-11.39872 6.01487,-18.75366 0.79866,-4.64259 1.12616,-8.21798 1.21371,-13.25034 l 0.0552,-3.175 0.21918,0.0222 c 0.35547,0.0361 4.11394,1.07907 6.17315,1.71312 1.53768,0.47345 6.96587,2.27055 8.2028,2.71567 l 0.28646,0.10309 -0.0488,3.05694 c -0.0615,3.85449 -0.29433,6.42506 -0.90649,10.00771 -1.3646,7.98612 -4.08978,15.90466 -8.39595,24.39604 -3.39725,6.69907 -7.20517,12.38327 -11.66669,17.41519 -1.29859,1.4646 -4.40357,4.57659 -5.88637,5.89965 -4.87145,4.34663 -10.7124,8.48192 -16.637,11.77869 -2.9174,1.62341 -5.84932,2.88563 -11.26066,4.84785 -2.9624,1.0742 -3.76622,1.31251 -6.56167,1.94537 -1.16417,0.26355 -3.12632,0.74293 -4.36034,1.0653 -4.46337,1.16596 -5.70543,1.37034 -8.42433,1.38616 -1.85227,0.0108 -2.08817,0.0289 -2.667,0.20464 -0.45778,0.13901 -1.00124,0.21423 -1.94733,0.26953 -1.19528,0.0699 -4.39825,0.085 -5.75734,0.0271 z m -40.767005,-1.22039 c -0.8382,-0.0357 -2.80035,-0.16112 -4.36033,-0.27861 -1.55998,-0.1175 -3.59833,-0.2375 -4.52967,-0.26669 -4.28993,-0.13442 -11.5577,-1.61553 -17.526,-3.57164 -17.58452,-5.76335 -30.95962,-17.03222 -40.42754,-34.06129 -1.45655,-2.61975 -1.90072,-3.51265 -2.82184,-5.67266 -0.4865302,-1.14089 -1.1220702,-2.58869 -1.4123102,-3.21734 -2.99396,-6.48469 -4.99728,-14.20826 -6.00621,-23.15633 -0.21945,-1.94622 -0.50053,-5.343 -0.53149,-6.42294 l -0.0239,-0.83493 0.76054,-0.45579 c 1.29341,-0.77513 2.35835,-1.20815 6.60546,-2.68589 2.7986102,-0.97374 5.4152002,-1.91507 5.9027802,-2.12354 0.6567,-0.28077 0.63387,-0.32849 0.69498,1.45292 0.13191,3.84578 0.33741,6.58934 0.72865,9.72773 1.74999,14.03792 6.57009,25.9826 14.29062,35.41361 2.27228,2.7757 5.27506,5.77617 8.10097,8.09475 9.49712,7.79213 21.80333,12.75645 36.068,14.54982 3.67524,0.46205 4.46583,0.51275 8.04333,0.51579 3.513743,0.003 4.496893,-0.0491 8.082533,-0.42806 1.86708,-0.19734 5.42463,-0.65335 5.96015,-0.76397 l 0.242,-0.05 -0.0303,6.3123 -0.0303,6.31231 -0.29633,0.0421 c -0.16298,0.0232 -0.52493,0.0662 -0.80433,0.0956 -0.2794,0.0294 -1.21285,0.19901 -2.07434,0.37694 -2.46557,0.50922 -2.64077,0.52665 -5.54566,0.55145 -2.63979,0.0225 -2.7289,0.0289 -3.47134,0.24534 -0.546393,0.15932 -1.109373,0.24545 -1.989663,0.30442 -1.33801,0.0896 -1.37171,0.0896 -3.59834,-0.005 z m 39.243005,-17.49298 c -2.41628,-0.093 -6.16744,-0.50116 -8.43028,-0.91723 -2.78113,-0.51136 -6.24544,-1.40764 -6.35979,-1.64539 -0.0346,-0.072 -0.0643,-3.95003 -0.066,-8.61778 -0.003,-7.50598 0.0117,-8.48223 0.12403,-8.44703 0.42947,0.13454 5.96048,1.43503 7.15434,1.68217 6.41861,1.32874 12.42959,1.66033 17.72381,0.97773 5.19276,-0.66951 10.15899,-2.18988 15.04218,-4.60504 3.89745,-1.92762 6.84992,-4.13202 10.71278,-7.99847 4.27769,-4.28165 6.95707,-7.94142 9.42493,-12.87354 1.14462,-2.28759 1.83125,-3.94124 2.60511,-6.2741 1.19615,-3.6059 1.9164,-7.03478 2.29238,-10.91324 0.17364,-1.79116 0.14722,-7.38616 -0.0432,-9.144 -0.19295,-1.78152 -0.41016,-3.23285 -0.75048,-5.01462 -0.14879,-0.77896 -0.24949,-1.43732 -0.2238,-1.46303 0.0257,-0.0257 0.69013,0.16146 1.4765,0.41592 0.78637,0.25446 3.60146,1.13407 6.25576,1.9547 2.6543,0.82063 5.75945,1.8042 6.90033,2.1857 l 2.07433,0.69366 0.0684,0.635 c 0.11277,1.04654 0.01,7.8889 -0.14412,9.56734 -1.13391,12.37324 -4.95311,23.50434 -11.72172,34.163 -2.74977,4.3301 -5.22735,7.1468 -9.19991,10.45909 -4.17069,3.47748 -10.69411,7.50857 -16.35161,10.1043 -7.92381,3.63554 -18.25825,5.47162 -28.56406,5.07486 z m -37.041665,-0.5386 c -3.00117,-0.0986 -5.54802,-0.35224 -8.55134,-0.85154 -2.27718,-0.37858 -3.63359,-0.69589 -5.5955,-1.30897 -0.97377,-0.3043 -2.2658,-0.64891 -2.87116,-0.7658 -3.15128,-0.6085 -3.35719,-0.6744 -7.37642,-2.36096 -4.64484,-1.94907 -6.206,-2.6881 -8.4853,-4.01679 -9.47412,-5.52286 -17.09529,-14.28144 -21.93648,-25.21038 -0.37539,-0.84743 -0.91825,-1.9508 -1.20635,-2.45194 -0.71353,-1.24112 -0.94889,-1.83476 -1.29153,-3.25752 -2.49147,-10.34561 -3.2303,-14.64443 -3.42884,-19.95032 -0.066,-1.76381 0.006,-5.26489 0.12845,-6.26166 l 0.0544,-0.44221 1.53569,-0.60447 c 3.13231,-1.23291 14.47276,-5.32676 14.75576,-5.32676 0.1695,0 0.13968,0.3351 -0.29011,3.25966 l -0.31107,2.11667 -10e-4,3.175 c -0.001,2.51445 0.0307,3.46565 0.15309,4.57201 0.69252,6.26056 2.45728,12.20657 5.39015,18.161 2.58476,5.2477 5.34565,8.81155 9.65232,12.45957 4.35606,3.68986 11.21921,7.65597 16.70399,9.65297 4.93576,1.7971 10.42764,2.68008 15.80801,2.54157 3.289753,-0.0847 5.836263,-0.47195 11.176003,-1.69962 0.90805,-0.20877 1.67545,-0.35354 1.70534,-0.3217 0.11589,0.12344 0.25258,4.08118 0.25297,7.32449 8.5e-4,3.72319 -0.15199,9.39757 -0.25971,9.66772 -0.0535,0.13425 -0.31683,0.2368 -1.2431,0.4842 -2.10359,0.56185 -4.32832,0.95189 -6.87049,1.20457 -1.16606,0.1159 -1.98766,0.15746 -4.845683,0.24514 -0.48895,0.015 -1.7272,0 -2.75167,-0.0339 z m -9.56734,-51.21706 c -0.6985,-0.0358 -1.48345,-0.07 -1.74433,-0.076 l -0.47434,-0.0109 -0.0439,-13.72543 c -0.0333,-10.4136 -0.068,-13.74032 -0.14381,-13.78716 -0.32839,-0.20296 -14.26835,-0.40552 -15.60368,-0.22673 -0.4727,0.0633 -0.48564,0.0721 -0.55034,0.37656 -0.0364,0.17146 -0.0549,1.15506 -0.041,2.18579 l 0.0252,1.87403 -2.52292,0.0634 c -2.48793,0.0625 -4.59542,0.0162 -5.72582,-0.12576 -0.31804,-0.04 -0.59299,-0.0874 -0.61102,-0.1054 -0.018,-0.018 -0.0436,-9.17487 -0.0568,-20.34853 -0.0182,-15.41038 0.003,-21.12279 0.0868,-23.65805 0.061,-1.83825 0.13077,-3.36225 0.15513,-3.38666 0.0688,-0.0689 6.83433,-0.10755 7.70591,-0.044 0.69538,0.0507 0.78114,0.0754 0.83284,0.23973 0.0317,0.10075 0.0839,1.25862 0.11604,2.57303 0.0331,1.35419 0.0941,2.42489 0.14083,2.47074 0.13463,0.13213 5.39785,0.26184 10.57498,0.2606 2.65766,-8.5e-4 4.91512,-0.0234 5.01657,-0.0506 0.21043,-0.0564 0.22495,-0.12147 0.38563,-1.72622 0.0781,-0.77993 0.10652,-3.67539 0.10807,-11.00667 0.002,-9.61554 0.0231,-10.62399 0.26418,-12.68721 l 0.0529,-0.45287 3.8627,0.0426 c 2.12448,0.0234 3.96576,0.0694 4.09171,0.10218 0.27758,0.0723 0.28095,0.0918 0.42407,2.45435 0.0705,1.1637 0.10357,5.0344 0.10574,12.37532 0.002,5.87509 0.0237,10.70259 0.0488,10.72776 0.0251,0.0252 0.93951,0.0871 2.032,0.13755 1.87457,0.0866 11.409273,0.0374 11.511353,-0.0594 0.0233,-0.0221 0.043,-1.03683 0.0438,-2.25501 8.4e-4,-1.21817 0.0103,-2.31964 0.0212,-2.44769 l 0.0197,-0.23284 h 4.39279 4.392792 l 0.0559,0.1905 c 0.1654,0.56352 0.12979,46.92148 -0.0362,47.08001 -0.12316,0.11765 -8.780072,0.41667 -8.816662,0.30454 -0.006,-0.0191 -0.0348,-1.08246 -0.0635,-2.36305 l -0.0522,-2.32833 -1.016,-0.1081 c -0.65516,-0.0697 -3.0036,-0.12557 -6.612343,-0.15729 l -5.59633,-0.0492 -0.0541,0.74996 c -0.21317,2.9523 -0.24562,5.08017 -0.19608,12.85729 0.0472,7.41518 -0.003,11.69727 -0.16096,13.59865 l -0.0534,0.64464 -0.64837,0.0526 c -1.13561,0.0922 -4.32929,0.12467 -5.64371,0.0573 z m 19.651613,-37.04999 0.26293,-0.0519 0.0543,-3.06135 c 0.18205,-10.257 0.16654,-13.13767 -0.0836,-15.5308 l -0.0551,-0.52689 h -6.58157 c -6.018983,0 -6.591503,0.012 -6.697773,0.14002 -0.0973,0.11725 -0.1118,1.65593 -0.0891,9.4615 0.0149,5.12682 0.053,9.34702 0.0847,9.37822 0.0497,0.049 0.48642,0.0931 2.72461,0.27498 0.61242,0.0498 10.091583,-0.0267 10.380613,-0.0838 z m -24.349423,-0.0372 c 1.09367,-0.0471 2.0742,-0.10496 2.17898,-0.12862 l 0.1905,-0.043 v -9.38895 -9.38894 l -0.3175,-0.0474 c -0.47729,-0.0712 -2.33434,-0.21462 -4.0005,-0.30893 -2.42253,-0.13711 -11.64456,0.0198 -11.82597,0.20118 -0.062,0.062 -0.12858,15.80821 -0.0729,17.26196 l 0.0639,1.67005 0.26599,0.0444 c 0.97203,0.1623 10.60372,0.25366 13.51752,0.12822 z m 38.860815,36.41498 -0.46566,-0.0497 -0.0539,-0.55034 c -0.27003,-2.75484 -0.3844,-20.81702 -0.3265,-51.562 0.014,-7.42739 0.0291,-19.02263 0.0336,-25.76722 0.008,-12.26008 0.008,-12.26292 0.18193,-12.40367 0.16022,-0.12981 1.05788,-0.14004 11.51467,-0.13131 8.92529,0.008 11.62043,0.0345 12.65324,0.127 1.23267,0.11039 1.31073,0.12781 1.28603,0.28686 -0.0552,0.35574 -1.11948,2.41106 -1.70977,3.302 -0.33938,0.51224 -1.14713,1.64803 -1.795,2.52398 -1.49982,2.02784 -2.22923,3.09755 -3.15734,4.63036 -1.59491,2.63404 -4.63477,7.44629 -5.16113,8.17033 -0.86208,1.18583 -0.89961,1.56068 -0.22227,2.21967 0.30276,0.29455 1.39821,0.9521 1.58971,0.95421 0.22571,0.002 3.87307,-4.67127 9.38152,-12.02155 5.39672,-7.20121 7.4702,-9.85741 7.61142,-9.75049 0.0512,0.0388 0.49321,0.36862 0.98216,0.73297 1.21434,0.90486 4.13712,3.2817 4.90127,3.98576 0.20136,0.18552 -0.23354,0.85107 -2.09848,3.21143 -0.62547,0.79163 -1.39252,1.72508 -1.70455,2.07433 -0.8072,0.90349 -1.43213,1.7507 -1.66474,2.25685 -0.46585,1.01371 -0.56514,2.8571 -0.32305,5.99815 0.0682,0.88477 0.12478,2.14856 0.12576,2.80844 l 0.002,1.19978 0.23283,0.0453 c 0.86467,0.16831 11.57918,0.29209 11.73539,0.13556 0.0243,-0.0243 0.0931,-0.51963 0.15282,-1.10067 0.0806,-0.78333 0.10993,-3.32175 0.1135,-9.81943 0.004,-6.47364 0.0327,-9.00535 0.1115,-9.69065 0.0587,-0.51021 0.11551,-0.93645 0.12627,-0.94721 0.0847,-0.0847 3.21957,-0.19947 5.44769,-0.19947 h 2.72521 l 0.0462,0.23283 c 0.24428,1.23037 0.31229,6.00503 0.1981,13.9065 -0.0676,4.68031 -0.004,7.28784 0.18191,7.47406 0.0765,0.0766 0.99149,0.11631 3.50721,0.1523 1.87202,0.0268 3.46641,0.077 3.54307,0.11153 0.21668,0.0977 0.24325,0.40616 0.29606,3.43811 0.0426,2.44403 -0.0489,5.44133 -0.16974,5.56218 -0.0168,0.0168 -1.60684,0.0689 -3.5335,0.11579 -1.92667,0.0469 -3.5288,0.11255 -3.5603,0.14584 -0.0315,0.0333 -0.10389,3.07042 -0.16088,6.74919 -0.0754,4.86457 -0.0874,12.66318 -0.0442,28.59617 l 0.0594,21.90751 -0.32314,0.002 c -0.17774,9.3e-4 -0.9899,0.0409 -1.80482,0.0889 -1.65612,0.0976 -10.70052,0.11778 -12.6365,0.0282 l -1.24883,-0.0578 v -4.2215 c 0,-2.32183 0.01,-4.22776 0.0212,-4.2354 0.0116,-0.008 1.60868,-0.0362 3.54898,-0.0635 1.9403,-0.0273 3.55521,-0.077 3.5887,-0.11052 0.10017,-0.10024 0.15002,-22.12778 0.0812,-35.89409 l -0.0642,-12.84101 -0.18013,-0.0623 c -0.0991,-0.0343 -2.79474,-0.0787 -5.99037,-0.0988 l -5.81024,-0.0365 -0.0529,0.79015 c -0.17852,2.66632 -0.24251,14.39648 -0.19049,34.92142 l 0.0556,21.93929 -0.69987,0.11639 c -0.77151,0.12831 -5.9805,0.16181 -6.85081,0.0441 l -0.47828,-0.0647 -0.0721,-1.24381 c -0.0396,-0.68409 -0.0616,-11.20697 -0.0488,-23.38415 0.0131,-12.45816 -0.0141,-24.47294 -0.0622,-27.47433 -0.10337,-6.44924 -0.25024,-11.86803 -0.32882,-12.13178 l -0.0577,-0.19377 -0.52145,0.26057 c -0.6821,0.34085 -1.36551,1.0758 -2.09637,2.2545 -0.31391,0.50626 -0.71651,1.11098 -0.89467,1.34381 l -0.32391,0.42333 0.41595,1.69334 c 0.81304,3.3099 1.17897,6.14583 1.17897,9.13694 0,2.77906 -0.26087,4.60447 -1.01756,7.12049 -0.68512,2.27804 -1.11161,3.20848 -2.29076,4.99756 -2.21149,3.35545 -4.78647,6.00728 -8.5327,8.78741 l -1.04602,0.77626 0.0602,3.3604 c 0.0796,4.44641 0.0789,18.96215 -10e-4,22.35711 l -0.0633,2.68817 -3.69314,-0.0138 c -2.03123,-0.008 -3.90269,-0.0362 -4.15881,-0.0635 z m 8.68067,-40.27135 c 3.20654,-1.93088 5.02849,-6.18338 4.84053,-11.29803 -0.0265,-0.72178 -0.12612,-1.75923 -0.22131,-2.30544 -0.49359,-2.83201 -1.97695,-5.87043 -3.76092,-7.70363 -0.59109,-0.60739 -1.55089,-1.3939 -1.6185,-1.32628 -0.0185,0.0185 0,1.30975 0.0405,2.86936 0.0451,1.72546 0.0404,5.23891 -0.012,8.97399 -0.0775,5.51813 -0.0481,10.54602 0.064,10.94317 0.0567,0.20107 0.0935,0.19263 0.66774,-0.15314 z m 1.37743,-37.03669 c 0.62829,-0.95462 1.39709,-2.04047 1.70843,-2.413 1.34564,-1.61013 1.74207,-2.51137 1.44657,-3.28859 -0.0795,-0.20904 -0.0811,-0.20931 -1.4605,-0.23835 -2.72473,-0.0573 -3.62716,-0.0349 -3.70571,0.0922 -0.21525,0.34829 -0.21478,5.77401 8.5e-4,7.5363 l 0.10809,0.88421 0.38006,-0.41854 c 0.20902,-0.2302 0.89411,-1.19959 1.5224,-2.15421 z M 0.25600484,213.14696 c -0.82674,-0.93922 -1.71656004,-2.55698 -2.41321004,-4.3874 -0.21122,-0.55497 -0.70983,-2.05679 -1.10802,-3.33737 -0.40614,-1.30613 -1.0911,-3.24419 -1.56018,-4.41441 -1.0072801,-2.51291 -1.2203401,-3.21046 -1.7316101,-5.66931 -0.2169,-1.04314 -0.5266,-2.44907 -0.68823,-3.12429 -1.83979,-7.68602 -2.8284297,-14.34783 -3.1726397,-21.37833 -0.10859,-2.21805 -0.0606,-7.12992 0.0898,-9.18633 0.7272197,-9.94338 3.0723897,-18.50145 7.4127998,-27.05101 3.01911004,-5.94693 7.03803,-11.92022 11.35436,-16.87593 1.32661,-1.52312 4.8327702,-5.04904 6.3814302,-6.41741 6.05067,-5.34625 12.68428,-9.76158 20.65023,-13.744793 l 1.89656,-0.948335 0.7576,0.747568 c 2.6497,2.614606 6.26339,6.87821 9.1469,10.79194 l 0.47622,0.64637 -0.90625,0.31985 c -3.49889,1.23488 -7.98615,3.26159 -11.18273,5.0508 -5.46716,3.06011 -9.95419,6.40651 -14.22247,10.60704 -2.57365,2.53279 -4.34702,4.54025 -6.24665,7.07124 -6.5789002,8.7654 -10.3782702,18.76053 -11.3769302,29.92967 -0.20587,2.30255 -0.32694,14.8396 -0.16541,17.12913 0.3991,5.65678 1.7439,10.94105 4.48833,17.63645 0.32417,0.79085 1.18479,2.79807 1.9125002,4.46049 1.25372,2.86407 1.35966,3.07144 2.01997,3.95393 1.04792,1.40054 2.15947,3.26915 2.15947,3.63027 0,0.0665 -0.10478,0.15783 -0.23284,0.20304 -0.12805,0.0452 -1.75683,0.64446 -3.6195,1.33167 -3.2275302,1.19075 -8.3889102,3.00904 -9.3319802,3.28754 l -0.44197996,0.13052 z M 205.70156,210.29223 c -0.89558,-0.2373 -5.11915,-1.59591 -8.128,-2.61455 -1.706,-0.57756 -5.00357,-1.78723 -5.1022,-1.87168 -0.0122,-0.0104 0.52548,-0.92976 1.19487,-2.04291 3.35861,-5.58505 5.73266,-10.64075 7.55019,-16.07857 1.45053,-4.33981 2.22861,-7.78894 2.65486,-11.76867 0.23867,-2.2283 0.23962,-2.24157 0.35963,-5.00967 0.32044,-7.3912 -0.72253,-15.59379 -2.89602,-22.7761 -1.61609,-5.34042 -3.80128,-9.94452 -7.14588,-15.05612 -4.35766,-6.65985 -9.50076,-12.38648 -15.28445,-17.01859 -5.63325,-4.51162 -12.08229,-8.11291 -18.64784,-10.41337 -0.50059,-0.1754 -0.91017,-0.35303 -0.91017,-0.39474 0,-0.13269 1.59351,-2.67696 2.77503,-4.43075 1.5993,-2.373918 3.52698,-4.933576 6.03031,-8.007336 0.12164,-0.149356 0.18062,-0.135073 1.397,0.338306 5.64357,2.19631 11.11126,5.256575 16.08667,9.00371 5.88891,4.43513 11.12281,9.56117 17.66539,17.30137 1.67606,1.98286 3.23166,4.1187 4.17431,5.73135 0.85868,1.46896 1.58479,3.04351 4.33946,9.40991 2.66464,6.15835 4.5538,13.40229 5.47712,21.00203 0.4583,3.7722 0.63375,6.45393 0.69797,10.668 l 0.049,3.21733 -0.30805,3.34434 c -1.00775,10.94056 -1.68485,14.34035 -4.88836,24.54509 -1.75246,5.58242 -4.19436,11.65242 -5.15498,12.81408 -0.24816,0.3001 -0.28889,0.31728 -0.74322,0.31347 -0.26437,-0.002 -0.82357,-0.0949 -1.24267,-0.20593 z m -186.341645,-4.2889 c -1.93283,-2.04891 -3.61795,-4.77204 -5.15666,-8.33312 -1.4805,-3.42634 -3.76919,-10.37376 -4.5095502,-13.6889 -1.01587,-4.54878 -1.69009,-11.53349 -1.47323,-15.26213 0.41275,-7.09655 1.50574,-12.9915 3.5035302,-18.89598 2.06776,-6.11129 4.4564,-10.65278 8.27474,-15.73269 3.09386,-4.11606 4.59474,-5.74028 7.69114,-8.32317 5.0521,-4.21425 11.39522,-7.85937 18.87367,-10.84589 4.0158,-1.60371 4.73877,-1.79996 5.38998,-1.46312 0.43186,0.22339 1.0564,0.87746 1.79373,1.87852 0.32583,0.44238 1.49913,1.85208 2.60733,3.13266 2.69664,3.11611 4.24041,4.97296 5.27932,6.35 l 0.86233,1.143 -0.44868,0.0675 c -6.51812,0.98065 -12.3208,3.12381 -17.29735,6.38862 -2.41448,1.584 -4.17574,3.03713 -6.48104,5.34722 -2.43917,2.44423 -4.11896,4.50732 -6.17604,7.58532 -2.59895,3.88879 -3.74044,6.04489 -4.6842,8.84767 -0.43785,1.30034 -1.61091,5.59584 -1.99113,7.29113 -2.67106,11.9094 -0.22309,24.00805 6.8631,33.91965 0.98624,1.37947 2.43452,3.19662 3.48037,4.36681 0.45024,0.50377 0.81851,0.94192 0.81839,0.97367 -3.4e-4,0.0873 -2.23162,0.90294 -6.64612,2.42942 -5.26809,1.82165 -8.08674,2.87805 -9.28935,3.48157 -0.21964,0.11023 -0.41631,0.20042 -0.43703,0.20042 -0.0207,0 -0.40199,-0.38618 -0.84725,-0.85819 z m 165.344305,-2.31166 c -1.83007,-0.52629 -3.67002,-1.08805 -8.89,-2.71423 -1.44356,-0.44972 -3.45497,-1.05722 -4.46981,-1.34999 l -1.84513,-0.53234 0.99847,-0.7879 c 1.27048,-1.00254 3.89608,-3.62914 4.95389,-4.95578 4.23308,-5.30883 6.79002,-11.57731 7.64737,-18.74791 0.18917,-1.58216 0.25592,-5.28879 0.12902,-7.16497 -0.29489,-4.36011 -0.8244,-7.12046 -2.83211,-14.7637 -0.74303,-2.82868 -1.20997,-4.03878 -2.67635,-6.93586 -4.55775,-9.00461 -11.9576,-15.91944 -21.6028,-20.18687 -2.43425,-1.07701 -6.00898,-2.34793 -8.38564,-2.98134 l -0.90508,-0.24121 0.47759,-0.6812 c 0.26268,-0.37465 1.37644,-2.01469 2.47501,-3.64452 2.87198,-4.26085 4.70089,-6.7233 5.59038,-7.5269 l 0.36035,-0.32555 0.89842,0.0384 c 0.78859,0.0337 1.03816,0.086 2.04142,0.42768 1.49476,0.50913 3.15864,1.25299 5.92017,2.64669 6.85338,3.45881 11.93457,7.0598 16.7786,11.89084 2.65325,2.64613 4.23804,4.5116 6.38331,7.51383 3.45575,4.8362 6.74041,11.26941 8.55938,16.76409 1.08169,3.26756 2.37649,9.32685 2.78242,13.02095 0.26251,2.38889 0.28754,2.93068 0.26008,5.63033 -0.0316,3.10889 -0.21311,5.08842 -0.77241,8.42434 -1.4904,8.88955 -4.79072,17.30188 -9.749,24.84966 -1.37645,2.09532 -1.95559,2.87949 -2.12248,2.87391 -0.0783,-0.003 -0.9806,-0.2458 -2.00507,-0.54042 z m -42.46033,-2.64287 c -0.16299,-0.0156 -0.56304,-0.0499 -0.889,-0.0763 l -0.59267,-0.0481 v -3.02161 c 0,-1.66188 -0.0333,-5.25046 -0.0739,-7.97461 -0.0538,-3.6059 -0.0463,-5.50565 0.0278,-6.985 0.12517,-2.50094 0.29451,-4.10602 0.44414,-4.20985 0.11648,-0.0808 5.26162,-0.0217 6.08931,0.07 l 0.47596,0.0527 0.0543,0.68891 c 0.0298,0.3789 0.092,2.75722 0.13805,5.28515 0.0801,4.39551 8.5e-4,13.24275 -0.13801,15.40627 l -0.0557,0.86783 -2.59195,-0.0135 c -1.42557,-0.008 -2.72529,-0.0263 -2.88828,-0.0418 z M 65.695885,119.76068 c -1.15029,-1.18149 -1.76242,-1.90275 -3.71859,-4.3815 -2.1608,-2.73805 -2.54016,-3.18595 -3.77281,-4.45445 -1.28109,-1.31836 -1.51184,-1.68296 -1.45296,-2.29577 0.0772,-0.80356 0.3776,-1.14333 4.93203,-5.57875 2.41804,-2.35486 4.0615,-3.743081 6.39424,-5.401188 6.0874,-4.326908 12.75601,-7.408673 21.545763,-9.956949 4.84557,-1.404801 8.53656,-2.128165 12.335962,-2.417614 1.92661,-0.146775 6.46205,-0.05633 8.28037,0.165124 10.56199,1.286354 19.56689,4.601118 28.12792,10.354073 2.61194,1.755203 4.50394,3.220992 7.51674,5.823434 1.00119,0.86482 2.14419,1.84429 2.54,2.1766 0.91377,0.76717 1.74983,1.63669 1.86502,1.93968 0.18841,0.49552 -0.17458,1.25389 -1.39115,2.90657 -0.43183,0.58661 -1.06554,1.46662 -1.40826,1.95557 -0.34271,0.48895 -1.48055,2.05105 -2.52855,3.47134 -1.04799,1.42028 -2.33957,3.19193 -2.87016,3.937 -0.53059,0.74506 -0.97887,1.36935 -0.99617,1.3873 -0.0173,0.0179 -0.1374,-0.0363 -0.26692,-0.12058 -0.48396,-0.31488 -1.34146,-1.21721 -2.20954,-2.32506 -2.8595,-3.64934 -5.10929,-5.75174 -8.6516,-8.08485 -7.66051,-5.04551 -16.70718,-7.41112 -27.00083,-7.06045 -12.465452,0.42466 -22.339905,4.4907 -30.603895,12.60189 -1.95521,1.91906 -3.50419,3.65509 -5.04561,5.65491 -0.29612,0.38418 -0.56406,0.6985 -0.59542,0.6985 -0.0314,0 -0.49287,-0.44767 -1.02558,-0.99483 z m -13.58879,-16.16953 c -0.41408,-0.4996 -1.77624,-2.10933 -3.02702,-3.57717 -3.2494,-3.813317 -5.947,-7.189449 -5.88087,-7.360106 0.0957,-0.246833 3.85567,-3.635836 5.7933,-5.221642 5.64212,-4.617664 12.9593,-9.372045 20.77671,-13.499791 6.41588,-3.387709 13.27507,-5.771071 20.193003,-7.01647 3.71363,-0.668544 8.17709,-1.108642 11.247322,-1.108986 1.12832,-1.27e-4 1.27863,-0.01743 1.47191,-0.169475 0.19739,-0.155266 0.34269,-0.169257 1.74903,-0.168417 1.05048,6.28e-4 1.65379,0.03731 1.91474,0.116425 0.48196,0.146117 1.12513,0.204804 3.34434,0.305164 8.8502,0.400233 18.30005,2.815458 27.27209,6.970288 9.64004,4.46417 18.12963,10.061462 24.35097,16.054898 l 0.75219,0.724644 -0.4977,0.719666 c -0.27374,0.395817 -1.32703,1.935248 -2.34063,3.420958 -2.49292,3.654049 -5.37518,7.635404 -5.65097,7.805844 -0.042,0.026 -0.41292,-0.30819 -0.82418,-0.74261 -5.33254,-5.632836 -15.50127,-12.522713 -23.50377,-15.925123 -5.72283,-2.433164 -11.57589,-3.955155 -17.31434,-4.5023 -7.32735,-0.698646 -15.278862,-0.09642 -22.384632,1.695366 -8.957693,2.258756 -18.463703,6.784889 -25.790703,12.279824 -2.83233,2.124125 -5.24132,4.274933 -7.10782,6.346043 -2.01983,2.24125 -3.52572,3.76133 -3.72622,3.76133 -0.0351,0 -0.40266,-0.40876 -0.81675,-0.90836 z' id='path57'/%3E%3C/g%3E%3C/svg%3E" // Replace with actual base64 or encoded SVG
        },
        {
            name: "check",
            data: "data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20448%20512%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20pointer-events%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M438.6%20105.4c12.5%2012.5%2012.5%2032.8%200%2045.3l-256%20256c-12.5%2012.5-32.8%2012.5-45.3%200l-128-128c-12.5-12.5-12.5-32.8%200-45.3s32.8-12.5%2045.3%200L160%20338.7l233.4-233.3c12.5-12.5%2032.8-12.5%2045.3%200z%22%2F%3E%3C%2Fsvg%3E"
        },
        {
            name: "cross",
            data: "data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20384%20512%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20pointer-events%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M342.6%20150.6c12.5-12.5%2012.5-32.8%200-45.3s-32.8-12.5-45.3%200L192%20210.7%2086.6%20105.4c-12.5-12.5-32.8-12.5-45.3%200s-12.5%2032.8%200%2045.3L146.7%20256%2041.4%20361.4c-12.5%2012.5-12.5%2032.8%200%2045.3s32.8%2012.5%2045.3%200L192%20301.3l105.4%20105.3c12.5%2012.5%2032.8%2012.5%2045.3%200s12.5-32.8%200-45.3L237.3%20256z%22%2F%3E%3C%2Fsvg%3E"
        },
        {
            name: "fire",
            data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23Z'%3E%3C/path%3E%3C/svg%3E"
        },
        {
            name: "question",
            data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z'%3E%3C/path%3E%3C/svg%3E"
        }
    ];

    let container = document.getElementById("RotateCircleContainer");
    let currentImage = document.getElementById("circleimage");
    let currentIndex = imageList.findIndex(
        img => img.name === (currentImage.dataset.current || "hsnu")
    );
    let targetIndex = imageList.findIndex(img => img.name === target);

    if (currentIndex === targetIndex) return;
    let reverse = (currentIndex > targetIndex);
    function animateTransition(index) {
        currentImage = document.getElementById("circleimage");
        let nextImage = document.createElement("img");
        nextImage.src = imageList[index].data;
        nextImage.dataset.current = imageList[index].name;
        nextImage.classList.add("spin-in");
        nextImage.style.margin = "10%";
        nextImage.style.width = "80%";
        nextImage.style.aspectRatio = "1";
        nextImage.style.left = "0";
        nextImage.style.top = "0";
        nextImage.style.position = "absolute";

        container.appendChild(nextImage);
        currentImage.classList.add("spin-out");
        setTimeout(() => {
            if (container.contains(currentImage)) {
                container.removeChild(currentImage);
            }
            nextImage.id = "circleimage";
            currentImage = nextImage;
            if (reverse ? index - 1 < targetIndex : index + 1 > targetIndex) {
                return;
            }
            setTimeout(() => animateTransition(reverse ? index - 1 : index + 1), 0);
        }, 100);
    }
    animateTransition(reverse ? currentIndex - 1 : currentIndex + 1);
}

function enable() {
    document.getElementById("send").style.display = "block";
    document.getElementById("loader").style.display = "none";
    document.getElementById("submitbox").style.opacity = 1;
    document.getElementById("submitbox").removeAttribute("disabled");
}
function showhelp() {
    const helpArea = document.getElementById("helparea");
    helpArea.style.display = "block";
    helpArea.style.animation ="helparea-in 0.5s ease-out";
    document.getElementsByTagName("body")[0].style.animation = "helparea-in-background 1s ease-out";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#052236";
    document.addEventListener("click", function hideHelp(event) {
        if (event.target.id != "togglehelp") {
            if (!document.getElementById("helptext").contains(event.target)) {
                helpArea.style.display = "none"; 
                document.removeEventListener("click", hideHelp); 
                document.getElementsByTagName("body")[0].style.backgroundColor = "#07385a";
            }
        }

    });
}