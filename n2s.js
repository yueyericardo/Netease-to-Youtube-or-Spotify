<!-- search and show -->
<script type="text/javascript">
$("#submit").click(function(){
var playlistId = $("#playlistId").val();
if(!playlistId){
playlistId = 9699105;
}
var url = "https://api.hibai.cn/api/index/index";
var postContent = {"TransCode":"020111","OpenId":"123456789","Body":{"SongListId":"9699105"}};
postContent.Body.SongListId=playlistId.toString();
$.ajax({
type: "POST",
url: url,
dataType: 'json',
data: postContent,
success: function(result){
console.log(result); // 'name', 'age', 'city'
var list = [];
var body = result.Body;
var playlistName = body.name;
var tracks = body.songs;
console.log(body);
console.log(playlistId);
console.log(tracks);
console.log(tracks.length);

for (i=0; i<tracks.length; i++){
    var title = tracks[i].title;
    var author = tracks[i].author;
    var custom = title +' - '+ author +'\n' ;
    list.push(custom);
    }

    console.log(list);
    console.log(list);
    list = list.join("");
    $("#output").val(list);
    $('#plname').text(playlistName);
    $('#numsongs').text(tracks.length);
    return false;
    },
    error: function(request) {
    alert("Connection error");
    return false;
    }
    });
    }
    );
    </script>
    <!-- copy -->
    <script>
    function copyArticle(event){
    const range = document.createRange();
    range.selectNode(document.getElementById('output'));
    const selection = window.getSelection();
    if(selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    }
    document.getElementById('copy').addEventListener('click', copyArticle, false);
    </script>
