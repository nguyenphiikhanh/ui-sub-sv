function SWAL(title = 'Thông báo', text = 'Thành công!', type = 'success', back = false, redirect = null) {
    if (back) {
        Swal.fire({
            title: title,
            text: text,
            type: type
        }, function () {
            window.history.back();
        });
    } else {
        if (redirect) {
            Swal.fire({
                title: title,
                text: text,
                type: type
            }).then(function () {
                window.location.href = window.location.href;
            });
        } else {
            Swal.fire({
                title: title,
                text: text,
                type: type
            }, function () {
            });
        }
    }
}
function getTimeStamp(data = null) {
    return data ? new Date(data).getTime() / 1000 : new Date().getTime() / 1000;
}
function LOADER(show = true) {
    if (show) {
        $('.preloader').show();
    } else {
        $('.preloader').hide();
    }
}
function FEResolver() {
    if (localStorage.getItem('theme-view') != null) {
        var theme_view = localStorage.getItem('theme-view');
        $('body').attr('data-theme', theme_view);
        if (theme_view == 'dark') {
            $('#theme-view').attr('checked', true);
        }
    } else {
        $('body').attr('data-theme', 'light');
    }

    if (localStorage.getItem('sidebar-type') != null) {
        var sidebar_type = localStorage.getItem('sidebar-type');
        $('#main-wrapper').attr('data-sidebar-position', sidebar_type);
        if (sidebar_type == 'fixed') {
            $('#sidebar-type').attr('checked', true);
        } else {
            $('#sidebar-type').removeAttr('checked');
        }
    } else {
        $('#main-wrapper').attr('data-sidebar-position', 'fixed');
    }

    if (localStorage.getItem('header-type') != null) {
        var header_type = localStorage.getItem('header-type');
        $('#main-wrapper').attr('data-header-position', header_type);
        if (header_type == 'fixed') {
            $('#header-type').attr('checked', true);
        } else {
            $('#header-type').removeAttr('checked');
        }
    } else {
        $('#main-wrapper').attr('data-header-position', 'fixed');
    }

    if (localStorage.getItem('layout-type') != null) {
        var boxed_layout = localStorage.getItem('layout-type');
        $('#main-wrapper').attr('data-boxed-layout', boxed_layout);
        if (boxed_layout == 'boxed') {
            $('#layout-type').attr('checked', true);
        } else {
            $('#layout-type').removeAttr('checked');
        }
    } else {
        $('#main-wrapper').attr('data-boxed-layout', 'full');
    }

    if (localStorage.getItem('logobg') != null) {
        $('.navbar-header').attr('data-logobg', localStorage.getItem('logobg'));
        $('.theme-item > .theme-link[data-logobg="' + localStorage.getItem('logobg') + '"]').addClass('selected-circle');
    }

    if (localStorage.getItem('navbarbg') != null) {
        $('#main-wrapper, #navbarSupportedContent').attr('data-navbarbg', localStorage.getItem('navbarbg'));
        $('.theme-item > .theme-link[data-navbarbg="' + localStorage.getItem('navbarbg') + '"]').addClass('selected-circle');
    }

    if (localStorage.getItem('sidebarbg') != null) {
        $('.left-sidebar').attr('data-sidebarbg', localStorage.getItem('sidebarbg'));
        $('.theme-item > .theme-link[data-sidebarbg="' + localStorage.getItem('sidebarbg') + '"]').addClass('selected-circle');
    }


}
function processFrontEnd(config_type, el) {
    if (config_type == 'theme-view') {
        if ($(el).is(':checked')) {
            localStorage.setItem('theme-view', 'dark');
        } else {
            localStorage.setItem('theme-view', 'light');
        }
    } else if (config_type == 'sidebar-type') {
        if ($(el).is(':checked')) {
            localStorage.setItem('sidebar-type', 'fixed');
            $('#main-wrapper').attr("data-sidebar-position", 'fixed');
            $('.topbar .top-navbar .navbar-header').attr("data-navheader", 'fixed');
        } else {
            localStorage.setItem('sidebar-type', 'absolute');
            $('#main-wrapper').attr("data-sidebar-position", 'absolute');
            $('.topbar .top-navbar .navbar-header').attr("data-navheader", 'relative');
        }
    } else if (config_type == 'header-type') {
        if ($(el).is(':checked')) {
            localStorage.setItem('header-type', 'fixed');
            $('#main-wrapper').attr("data-header-position", 'fixed');
        } else {
            localStorage.setItem('header-type', 'absolute');
            $('#main-wrapper').attr("data-header-position", 'relative');
        }
    } else if (config_type == 'layout-type') {
        if ($(el).is(':checked')) {
            localStorage.setItem('layout-type', 'boxed');
            $('#main-wrapper').attr('data-boxed-layout', 'boxed');
        } else {
            localStorage.setItem('layout-type', 'full');
            $('#main-wrapper').attr('data-boxed-layout', 'full');
        }
    } else if (config_type == 'logobg') {
        localStorage.setItem('logobg', $(el).data('logobg'));
        $('.theme-item > .theme-link[data-logobg]').removeClass('selected-circle');
        $(el).addClass('selected-circle');
    } else if (config_type == 'navbarbg') {
        localStorage.setItem('navbarbg', $(el).data('navbarbg'));
        $('.theme-item > .theme-link[data-navbarbg]').removeClass('selected-circle');
        $(el).addClass('selected-circle');
    } else if (config_type == 'sidebarbg') {
        localStorage.setItem('sidebarbg', $(el).data('sidebarbg'));
        $('.theme-item > .theme-link[data-sidebarbg]').removeClass('selected-circle');
        $(el).addClass('selected-circle');
    }
}
function resetLanguage() {
    $('#\\:1\\.container').contents().find('#\\:1\\.restore').click();
}

function copyText(element) {
    try{
        var $temp = $("<textarea>");
        var brRegex = /<br\s*[\/]?>/gi;
        $("body").append($temp);
        $temp.val($(element).html().replace(brRegex, "\r\n").replace(/<\/?[a-zA-Z]+\/?>/g, '').trim()).select();
        document.execCommand("copy");
        $temp.remove();
        toastr.success('Copied!');
    }catch(e){
        toastr.error('Error!');
    }
    
}
function _processStoriesFB(url) {
    var match = url.match(/stories\/(.*)\/(.*==)?/);
    if (match != null && match[1] != null && match[2] != null) {
        return match[1] + '_' + match[2];
    }
    return url;
}

// TODO process youtube
function _processYoutube(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    var value = (match && match[7].length == 11) ? match[7] : false;
    if (!value) {
        var pattern = /^(?:(http|https):\/\/[a-zA-Z-]*\.{0,1}[a-zA-Z-]{3,}\.[a-z]{2,})\/channel\/([a-zA-Z0-9_]{3,})$/;
        var matchs = url.match(pattern);
        if (matchs[2]) {
            return matchs[2];
        }
        return url;
    }
    return value;
}

// TODO process instagram
function _processInstagram(link) {
    LOADER();
    var regExp = /\/p\/(.*?)\//;
    var match = link.match(regExp);
    LOADER(false);
    if (match == null) {
        regExp = /\/reel\/(.*?)\//;
        match = link.match(regExp);
        if (match == null) {
            regExp = /instagram\.com\/(.*?)(\/|\?)/;
            match = link.match(regExp);
            return match != null && match[1] != null ? match[1] : link;
        }
        return match != null && match[1] != null ? match[1] : link;
    }
    return match[1];
}


function initDatatable($element, $ajax = null, $columns = null, $rowConfig = null) {
    LOADER();
    $($element).DataTable().clear().destroy();
    var $configObj = {
        initComplete: function () {
            LOADER(false);
        },
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "order": [
            [0, "desc"]
        ],
        "pageLength": 20,
        "lengthMenu": [
            [5, 10, 20, 30, 40, 50, 100, 200, 500, 1000, -1],
            [5, 10, 20, 30, 40, 50, 100, 200, 500, 1000, "Tất cả"]
        ],
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        "info": true,
        "language": {
            "lengthMenu": "Hiển thị _MENU_ kết quả trên trang",
            "zeroRecords": "Không tìm thấy kết quả nào",
            "info": "Hiển thị _START_ đến _END_ trong tổng số _MAX_ kết quả",
            "infoEmpty": "Không tìm thấy kết quả nào phù hợp",
            "infoFiltered": "(lọc từ _MAX_ tổng số bản ghi)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Hiển thị _MENU_ kết quả",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lí...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy kết quả nào phù hợp",
            "searchPlaceholder": "Nhập nội dung...",
            "paginate": {
                "first": "Trang đầu",
                "last": "Trang cuối",
                "next": "Tiếp",
                "previous": "Trước"
            },
            "aria": {
                "sortAscending": ": kích hoạt sắp xếp tăng dần",
                "sortDescending": ": kích hoạt sắp xếp giảm dần"
            }
        }
    };
    if ($ajax) {
        $configObj.ajax = $ajax;
    }
    if ($columns) {
        $configObj.columns = $columns;
    }
    if ($rowConfig) {
        $configObj.createdRow = $rowConfig;
    }
    $($element).DataTable($configObj);
    $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
}
function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function formatNumber(number, decimal = 0) {
    number = parseFloat(number);
    return number.toFixed(decimal).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
}

function countUpPrice(price) {
    $('.order-amount > #default_value').remove();
    var $order_amount = $('.order-amount');
    $order_amount.find('#price').remove();
    $order_amount.find('.price-unit').remove();
    $order_amount.append(`<span id="price">${formatNumber(price)}</span> <span class="price-unit">VNĐ</span>`);
    $('.order-amount > #price').countUp({ time: 1000 });

}

function checkId(url, btn, el) {
    var $url = url, $button = btn, $this = el;
    $.post('/api/utils/checkid', { url: $url, key: window.API_KEY }, function (result) {
        $button.removeAttr('disabled');
        LOADER();
        if (result.success) {
            $this.val(result.data.id)
            $('#name').val('DEFAULT NAME');
            LOADER(false);
        }
        setTimeout(function () {
            LOADER(false);
        }, 1000);
    })
}
