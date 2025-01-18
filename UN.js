 // Search Functionality
 document.getElementById('search').addEventListener('keyup', function() {
    var searchValue = this.value.toLowerCase();
    var papers = document.querySelectorAll('.papers li');
    papers.forEach(function(paper) {
        var paperText = paper.textContent.toLowerCase();
        if (paperText.indexOf(searchValue) > -1) {
            paper.style.display = 'block';
        } else {
            paper.style.display = 'none';
        }
    });
});