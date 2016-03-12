(function($) {
    var matrix = function (arr, ncol) {
        var matrix = [];
        while(arr.length)
            matrix.push(arr.splice(0, ncol));
        return matrix;
    }

    var url_tracker = function(url) {
        if (url[0] === "#")
            ga('send', 'pageview', url.replace("#", "/"));
        else
            ga('send', 'event', 'outbound', 'click', url);
        return false;
    }

    var search_url = function (term) {
        return "https://www.google.com.br/#q=" + term;
    }

    var createSection = function (data) {
        var section = $(Mustache.render($("#section-template").html(), data));

        section.find("a").each(function () {
            if ($(this).attr("href") == "") {
                $(this).attr("class", "bg-warning")
                $(this).attr("href", search_url($(this).attr("title")))
            }

            $(this).click(function (e) {
                url_tracker($(e.target).attr("href"));
            });
        });

        return section;
    }

    var createMain = function () {
        main = $("#content");

        var resources = [
            "data/crc.json",
            "data/junta-comercial.json",
            "data/redesim.json",
            "data/sefaz.json",
            "data/termos-e-significados.json",
            "data/com.json",
            "data/gov.json",
            "data/org.json"
        ];

        $.each(matrix(resources, 3), function(i, subresources) {
            var row = $("<div>", {"class": "row"});

            $.each(subresources, function(j, resource) {
                $.getJSON(resource, function(data) {
                    createSection(data).appendTo(row);
                });
            });

            row.appendTo(main);
        });
    }

    createMain();
})(jQuery);
