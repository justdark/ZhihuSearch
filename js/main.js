
function parseDom(arg) { 
    var xmlDoc = null;
    xmlDoc = new DOMParser().parseFromString(arg, "text/html");
    return xmlDoc;
};  

function create_answer_dom(url,title,content)
{
    var li = document.createElement('li');
    li.setAttribute("class","item clearfix");

    var div = document.createElement('div');
    div.setAttribute("class","title");
    div.innerHTML = '<a target="_blank" href="'+ url + '" class="question-link">'+title+'</a>';

    var ct = document.createElement('div');
    ct.setAttribute("class","content");
    ct.innerHTML = '<div class="summary hidden-expanded">'+ content +'</div>';

    li.insertBefore(ct,li.childNodes[0]);
    li.insertBefore(div,li.childNodes[0]);

    return li;
}
function ajaxRequest(url,parentNode)
{
    var xmlHttpRequest = null;
    if(window.XMLHttpRequest)
    {
        xmlHttpRequest = new XMLHttpRequest();
    }

    if(null != xmlHttpRequest)
    {
        xmlHttpRequest.open("GET", url, true);
        xmlHttpRequest.onreadystatechange = function(){
            if (xmlHttpRequest.readyState == 4){
                if (xmlHttpRequest.status == 200) {
                    //alert("ajax okay");
                    var content = xmlHttpRequest.responseText;
                    var UserDOM = parseDom(content);
                    //alert("ajax okay");
                    var results = UserDOM.getElementsByClassName("result c-container ");
                    //alert(results.length);
                    var url_set = new Array();
                    var titles = new Array();
                    var contents = new Array();
                    var index = 0;
                    var mainlist = document.createElement('ul');
                    mainlist.setAttribute("class","list questions navigable");

                    

                    for (var i=0;i<results.length;i++)
                    {
                        //console.log(results[i].getElementsByClassName('g')[0].innerHTML);
                        if (results[i].getElementsByClassName('g')[0].innerHTML.indexOf('question')>0)
                        {
                                url_set[index] = results[i].childNodes[0].childNodes[0].getAttribute('href');
                                titles[index] = results[i].childNodes[0].childNodes[0].innerHTML;
                                contents[index] = results[i].getElementsByClassName('c-abstract')[0].innerHTML;

                                var sublist = create_answer_dom(url_set[index],titles[index],contents[index]);

                                mainlist.insertBefore(sublist,mainlist.childNodes[mainlist.childNodes.length]);
                                
                                console.log(contents[index]);
                                index = index + 1;
                        }
                    }
                    parentNode.insertBefore(mainlist,parentNode.childNodes[2]);
                    //alert(url_set);
                    //alert(titles);
                }
            }
        }
        xmlHttpRequest.send(null); 
    }
}

    var mores = document.getElementsByClassName("list questions navigable");
    
    var more_button = document.getElementsByClassName("zg-btn-white zu-button-more");

    if (more_button.length>0)
    {
        more_button[0].parentNode.removeChild(more_button[0]);
    }
    var morelength = mores.length;
    var parentNode = mores[0].parentNode;
    for (var i = 0; i < mores.length; ++i)
    {
        mores[i].parentNode.removeChild(mores[i]);
    }
    if (morelength>0)
    {
        
        //var s = document.createElement('div');
        //s.innerHTML = "To be calculated";
        //parentNode.insertBefore(s,parentNode.childNodes[2]);

        var search_name = document.getElementById('q').value;
        //alert(search_name);
        //学习机器学习 知乎 question
        var url = "http://www.baidu.com/s?wd=site:zhihu.com "+search_name+" 知乎 question";
        //     https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=site%3Azhihu.com%20%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%20%E7%9F%A5%E4%B9%8E%20question&rsv_pq=bd243d7e00005fac&rsv_t=d2f8zRf9bSXYniy2%2Btg2fx%2BUeQygKzlWiWbEl8H9QhEkERc0%2FaSMyWv1nz0&rsv_enter=0&inputT=963&rsv_sug3=90&rsv_sug4=1929
        //url = "https://www.baidu.com/s?wd=site:zhihu.com "+search_name+" 知乎 question";
        ajaxRequest(url,parentNode);
        console.log("ajaxRequest");
    }
