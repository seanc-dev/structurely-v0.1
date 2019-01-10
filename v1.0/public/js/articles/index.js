document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.querySelector('.article-starter-row').addEventListener('click', function(e){
            var columns = this.children
            for(var i = 0; i < columns.length; i++){
                columns[i].classList.add('.hover-reduce');
            };
        });
        document.querySelector('.article-starter-row').addEventListener('mouseout', function(e){
            var columns = this.children
            for(var i = 0; i < columns.length; i++){
                columns[i].classList.remove('.hover-reduce');
            };
        });
    }
}